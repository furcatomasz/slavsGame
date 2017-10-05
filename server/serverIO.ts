namespace Server {
    export class IO {
        protected server: SlavsServer;
        protected remotePlayers;

        constructor(server: SlavsServer, serverIO) {

            this.remotePlayers = [];
            let self = this;
            let enemies = server.enemies;
            let remotePlayers = this.remotePlayers;
            this.server = server;
            serverIO.on('connection', function (socket) {
                let player = {
                    id: socket.id,
                    characters: [],
                    itemsDrop: [],
                    activePlayer: 0,
                    activeScene: null,
                    lastPlayerUpdate: 0,
                    p: {
                        x: 3,
                        y: 0.3,
                        z: -10
                    }, r: {
                        x: 0,
                        y: 0,
                        z: 0,
                        w: 0
                    },
                    attack: false,
                };

                ////CLEAR QUESTS
                server.ormManager.structure.playerQuest.allAsync().then(function(playerQuests) {
                    for(let playerQuest of playerQuests) {
                        playerQuest.remove();
                    }
                });

                server.ormManager.structure.user.find({email: "furcatomasz@gmail.com"},
                    function (err, user) {

                        new Promise(function (resolveFind) {
                            server.ormManager.structure.player.find({user_id: user[0].id},
                                function (error, players) {
                                    player.characters = players;
                                    new Promise(function (resolveitems) {
                                        for (let i = 0; i < players.length; i++) {
                                            let playerDatabase = players[i];

                                            playerDatabase.getItems(function (error, items) {
                                                playerDatabase.items = items;
                                                if (i == players.length - 1) {
                                                    resolveitems();
                                                }
                                            });
                                        }
                                    }).then(function () {
                                        resolveFind();
                                    });
                                });

                        }).then(function (resolve) {
                            socket.emit('clientConnected', player);
                        });
                    });


                socket.on('getQuests', function () {
                    let emitData = {
                        quests: server.quests,
                        playerQuests: null,
                        playerRequirements: null
                    };

                    player.characters[player.activePlayer].getActiveQuests(function (error, quests) {
                        emitData.playerQuests = quests;
                        player.characters[player.activePlayer].getQuestRequirements(function (error, requrements) {
                            emitData.playerRequirements = requrements;
                            socket.emit('quests', emitData);
                        });
                    });
                });

                socket.on('acceptQuest', function (quest) {
                    let questId = quest.id;
                    let playerId = player.characters[player.activePlayer].id;

                    server.ormManager.structure.playerQuest.oneAsync({
                        player_id: playerId,
                        questId: questId
                    }).then(function (quest) {
                        if (!quest) {
                            server.ormManager.structure.playerQuest.createAsync({
                                questId: questId,
                                date: 0,
                                player_id: playerId
                            }).then(function (quest) {
                                socket.emit('refreshQuestsStatus', quest);
                            });
                        }
                    });
                });

                socket.on('selectCharacter', function (selectedCharacter) {
                    player.activePlayer = selectedCharacter;

                    //let playerId = player.characters[selectedCharacter].id;
                    //server.ormManager.structure.playerOnline.exists(
                    //    {playerId: playerId},
                    //    function (error, playerOnlineExists) {
                    //        if (error) throw error;
                    //        if (!playerOnlineExists) {
                    //            self.server.ormManager.structure.playerOnline.create({
                    //                playerId: playerId,
                    //                connectDate: Date.now(),
                    //                activityDate: Date.now(),
                    //            }, function (error) {
                    //                if (error) throw error;
                    //            });
                    //
                    //        }
                    //    });

                    socket.emit('characterSelected', player);

                });

                ///Player
                socket.on('createPlayer', function () {
                    remotePlayers.push(player);

                    socket.broadcast.emit('newPlayerConnected', remotePlayers);
                });

                socket.on('moveTo', function (data) {
                    if ((player.lastPlayerUpdate + 1) < new Date().getTime() / 1000) {
                        player.lastPlayerUpdate = new Date().getTime() / 1000;
                        let playerId = player.characters[player.activePlayer].id;
                        self.server.ormManager.structure.player.get(playerId,
                            function (error, playerDatabase) {
                                playerDatabase.positionX = data.p.x;
                                playerDatabase.positionY = data.p.y;
                                playerDatabase.positionZ = data.p.z;
                                playerDatabase.save();
                            });
                    }

                    player.p = data.p;
                    player.r = data.r;
                    socket.broadcast.emit('updatePlayer', player);
                });

                socket.on('attack', function (data) {
                    player.attack = data.attack;
                    socket.broadcast.emit('updatePlayer', player);
                });

                socket.on('itemEquip', function (item) {
                    let itemId = item.id;
                    let equip = item.equip;

                    self.server.ormManager.structure.playerItems.oneAsync({
                        id: itemId,
                        player_id: player.characters[player.activePlayer].id
                    }).then(function (itemDatabase) {
                        itemDatabase.equip = (equip) ? 1 : 0;
                        itemDatabase.saveAsync().then(function () {
                            server.ormManager.structure.playerItems.findAsync(
                                {player_id: player.characters[player.activePlayer].id}).then(
                                function (playerItems) {
                                    player.characters[player.activePlayer].items = playerItems;
                                    socket.broadcast.emit('updateEnemyEquip', player);
                                });
                        });
                    });

                });

                socket.on('addDoppedItem', function (itemsKey) {
                    let playerId = player.characters[player.activePlayer].id;
                    let itemId = player.itemsDrop[itemsKey];

                    if (itemId) {
                        self.server.ormManager.structure.playerItems.create({
                                player_id: playerId,
                                itemId: itemId,
                                improvement: 0,
                                equip: 0
                            },
                            function (error, addedItem) {
                                player.characters[player.activePlayer].items.push(addedItem);
                                socket.emit('updatePlayerEquip', player.characters[player.activePlayer].items);
                            });
                    }
                });

                //socket.on('getEquip', function (characterKey) {
                //    let playerId = player.characters[characterKey].id;
                //    self.server.ormManager.structure.playerItems.find({player_id: playerId},
                //        function (error, itemsDatabase) {
                //            socket.emit('getEquip', itemsDatabase);
                //        });
                //});

                socket.on('disconnect', function () {
                    //if (player.activePlayer >= 0) {
                    //    let playerId = player.characters[player.activePlayer].id;
                    //    server.ormManager.structure.playerOnline
                    //        .find({player_id: playerId})
                    //        .remove();
                    //}

                    remotePlayers.forEach(function (remotePlayer, key) {
                        if (remotePlayer.id == player.id || remotePlayer == null) {
                            remotePlayers.splice(key, 1);
                        }
                    });
                    socket.broadcast.emit('removePlayer', player.id);
                });

                socket.on('changeScenePre', function () {
                    socket.emit('showPlayer', player);

                });

                socket.on('changeScenePost', function (sceneData) {
                    player.activeScene = sceneData.sceneType;

                    socket.emit('showEnemies', enemies[sceneData.sceneType]);
                    socket.emit('newPlayerConnected', remotePlayers);
                });

                ///Enemies
                socket.on('updateEnemy', function (enemyData) {
                    let enemy = enemies[player.activeScene][enemyData.enemyKey];
                    enemy.position = enemyData.position;
                    enemy.rotation = enemyData.rotation;
                    enemy.target = enemyData.target;
                    socket.broadcast.emit('showEnemies', enemies[player.activeScene]);
                });

                socket.on('enemyKill', function (enemyKey) {
                    let enemy = enemies[player.activeScene][enemyKey];
                    let enemyItem = enemy.itemsToDrop[0];
                    let itemDropKey = player.itemsDrop.push(enemyItem) - 1;
                    let earnedExperience = enemy.experience;
                    let playerId = player.characters[player.activePlayer].id;

                    socket.emit('showDroppedItem', {
                        items: enemyItem,
                        itemsKey: itemDropKey,
                        enemyId: enemyKey
                    });

                    self.server.ormManager.structure.player.get(playerId,
                        function (error, playerDatabase) {
                            playerDatabase.experience += earnedExperience;
                            playerDatabase.save();

                            socket.emit('addExperience', {
                                experience: earnedExperience
                            });
                        });

                });
            });
        }
    }
}