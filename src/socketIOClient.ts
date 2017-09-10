/// <reference path="game.ts"/>
/// <reference path="characters/monsters/monster.ts"/>

class SocketIOClient {
    protected game:Game;
    public socket;
    public characters = [];
    public activePlayer = Number;

    constructor(game:Game) {
        this.game = game;
    }
    
    public connect(socketUrl: string)
    {
        this.socket = io.connect(socketUrl);

        this.playerConnected();
        this.showEnemies();
    }

    /**
     * @returns {SocketIOClient}
     */
    public playerConnected() {
        let self = this;
        let game = this.game;
        let playerName = Game.randomNumber(1,100);

        this.socket.on('clientConnected', function (data) {
            game.remotePlayers = [];
            self.characters = data.characters;
            self.socket.emit('createPlayer', playerName);
            self.updatePlayers().removePlayer().connectPlayer().refreshPlayer();
        });

        return this;
    }

    /**
     * @returns {SocketIOClient}
     */
    protected refreshPlayer() {
        let game = this.game;
        let self = this;
        let playerName = Game.randomNumber(1,100);

        this.socket.on('showPlayer', function (data) {
            self.activePlayer = data.activePlayer;
            game.player = new Player(game, data.id, playerName, true);
            let activeCharacter = data.characters[data.activePlayer];
            game.player.mesh.position = new BABYLON.Vector3(activeCharacter.positionX, activeCharacter.positionY, activeCharacter.positionZ);
            game.player.refreshCameraPosition();
            document.dispatchEvent(game.events.playerConnected);

        });

        return this;
    }

    /**
     * @returns {SocketIOClient}
     */
    public showEnemies() {
        let game = this.game;

        this.socket.on('showEnemies', function (data) {
           data.forEach(function (enemyData, key) {
               let position = new BABYLON.Vector3(enemyData.position.x, enemyData.position.y, enemyData.position.z);
               let rotationQuaternion = new BABYLON.Quaternion(enemyData.rotation.x, enemyData.rotation.y, enemyData.rotation.z, enemyData.rotation.w);
               let enemy = game.enemies[data.id];

               if (enemy) {
                   enemy.target = enemyData.target;
                   enemy.mesh.position = position;
                   enemy.mesh.rotationQuaternion = rotationQuaternion;
                   enemy.runAnimationWalk(false);
               } else {
                   if (enemyData.type == 'worm') {
                       new Worm(key, data.id, game, position, rotationQuaternion);
                   } else if (enemyData.type == 'bigWorm') {
                       new BigWorm(key, data.id, game, position, rotationQuaternion);
                   } else if (enemyData.type == 'bandit') {
                       new Bandit.Bandit(key, game, position, rotationQuaternion);
                   }
               }
           });
        });

        return this;
    }

    protected connectPlayer() {
        let game = this.game;

        this.socket.on('newPlayerConnected', function (data) {
            if(game.player) {
                data.forEach(function (socketRemotePlayer) {
                    let remotePlayerKey = null;

                    if (socketRemotePlayer.id !== game.player.id) {
                        game.remotePlayers.forEach(function (remotePlayer, key) {
                            if (remotePlayer.id == socketRemotePlayer.id) {
                                remotePlayerKey = key;

                                return;
                            }
                        });

                        if (remotePlayerKey === null) {
                            let player = new Player(game, socketRemotePlayer.id, socketRemotePlayer.name, false);
                            game.remotePlayers.push(player);
                        }
                    }
                });
            }
        });

        return this;
    }

    /**
     * @returns {SocketIOClient}
     */
    protected updatePlayers() {
        var game = this.game;

        this.socket.on('updatePlayer', function (updatedPlayer) {
            let remotePlayerKey = null;
            game.remotePlayers.forEach(function (remotePlayer, key) {
                if (remotePlayer.id == updatedPlayer.id) {
                    remotePlayerKey = key;
                    return;
                }
            });

            if (remotePlayerKey != null) {
                let player = game.remotePlayers[remotePlayerKey];

                if (!player.isAnimationEnabled() && !updatedPlayer.attack) {
                    player.runAnimationWalk(false);
                } else if (updatedPlayer.attack == true) {
                    player.runAnimationHit(AbstractCharacter.ANIMATION_ATTACK);
                }

                player.mesh.position = new BABYLON.Vector3(updatedPlayer.p.x, updatedPlayer.p.y, updatedPlayer.p.z);
                player.mesh.rotationQuaternion = new BABYLON.Quaternion(updatedPlayer.r.x, updatedPlayer.r.y, updatedPlayer.r.z, updatedPlayer.r.w);
            }

        });

        return this;
    }

    /**
     *
     * @returns {SocketIOClient}
     */
    protected removePlayer() {
        var app = this.game;

        this.socket.on('removePlayer', function (id) {
            app.remotePlayers.forEach(function (remotePlayer, key) {
                if (remotePlayer.id == id) {
                    let player = app.remotePlayers[key];
                    player.removeFromWorld();
                    app.remotePlayers.splice(key, 1);
                }
            });
        });

        return this;
    }


}