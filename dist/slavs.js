var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Enemy = (function () {
    function Enemy(game) {
        //
        //
        //
        //
        //
        //
    }
    return Enemy;
}());
/// <reference path="../game.ts"/>
var Controller = (function () {
    function Controller(game) {
        this.game = game;
    }
    return Controller;
}());
/// <reference path="Controller.ts"/>
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Keyboard.prototype.handleKeyUp = function (evt) {
        if (evt.keyCode == 65) {
            this.left = true;
        }
        if (evt.keyCode == 68) {
            this.right = true;
        }
        if (evt.keyCode == 87) {
            this.forward = true;
        }
        if (evt.keyCode == 83) {
            this.back = true;
        }
        if (evt.keyCode == 32) {
            this.game.player.runAnimationHit();
        }
    };
    Keyboard.prototype.handleKeyDown = function (evt) {
        if (evt.keyCode == 65) {
            this.left = false;
        }
        if (evt.keyCode == 68) {
            this.right = false;
        }
        if (evt.keyCode == 87) {
            this.forward = false;
        }
        if (evt.keyCode == 83) {
            this.back = false;
        }
    };
    Keyboard.prototype.registerControls = function (scene) {
        var self = this;
        window.addEventListener("keydown", function (event) {
            self.game.controller.handleKeyUp(event);
        });
        window.addEventListener("keyup", function (event) {
            self.game.controller.handleKeyDown(event);
        });
    };
    return Keyboard;
}(Controller));
/// <reference path="../game.ts"/>
/// <reference path="../../bower_components/babylonjs/dist/babylon.d.ts"/>
/// <reference path="../../bower_components/babylonjs/dist/gui/babylon.gui.d.ts"/>
var Scene = (function () {
    function Scene() {
    }
    Scene.prototype.setDefaults = function (game) {
        this.game = game;
        this.guiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gameUI");
        return this;
    };
    Scene.prototype.setShadowGenerator = function (light) {
        this.shadowGenerator = new BABYLON.ShadowGenerator(4096, light);
        this.shadowGenerator.bias = -0.0000001;
        this.shadowGenerator.setDarkness(0.5);
        //this.shadowGenerator.forceBackFacesOnly = true;
        //this.shadowGenerator.usePoissonSampling = true;
        //this.shadowGenerator.useExponentialShadowMap = true;
        //this.shadowGenerator.useBlurExponentialShadowMap = true;
        return this;
    };
    Scene.prototype.setCamera = function (scene) {
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), scene);
        camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        camera.orthoTop = 18;
        camera.orthoBottom = 0;
        camera.orthoLeft = -15;
        camera.orthoRight = 15;
        camera.maxZ = 20;
        camera.minZ = -70;
        var ratio = window.innerWidth / window.innerHeight;
        var zoom = camera.orthoTop;
        var newWidth = zoom * ratio;
        camera.orthoLeft = -Math.abs(newWidth);
        camera.orthoRight = newWidth;
        camera.orthoBottom = -Math.abs(zoom);
        camera.rotation = new BABYLON.Vector3(0.751115, 0, 0);
        scene.activeCamera = camera;
        return this;
    };
    Scene.prototype.optimizeScene = function (scene) {
        scene.collisionsEnabled = false;
        scene.fogEnabled = false;
        scene.shadowsEnabled = false;
        scene.lensFlaresEnabled = false;
        scene.probesEnabled = false;
        scene.postProcessesEnabled = false;
        scene.spritesEnabled = false;
        scene.renderTargetsEnabled = false;
        return this;
    };
    Scene.prototype.createGameGUI = function () {
        var self = this;
        // var dialogUser = new CASTORGUI.GUIPanel("Panel1", {w: 300, h: 50, x: 10, y: 20}, this.game.gui);
        // dialogUser.setVisible(true);
        // dialogUser.add(new CASTORGUI.GUIText("You", {size:15, text:"You", x: 10}, this.game.gui, true));
        // var hpBar = new CASTORGUI.GUIProgress("hpbar_you", {w:280,h:20,x:10,y:20, value: 100}, this.game.gui);
        // hpBar.setVisible(false);
        // this.game.guiElements.hpBar = hpBar;
        // dialogUser.add(hpBar);
        //
        // var dialogEnemy = new CASTORGUI.GUIPanel("Panel2", {w: 300, h: 50, x: 10, y: 100}, this.game.gui);
        // dialogEnemy.setVisible(true);
        // dialogEnemy.add(new CASTORGUI.GUIText("Enemy", {size:15, text:"Enemy", x: 10}, this.game.gui, true));
        // var hpBarEnemy = new CASTORGUI.GUIProgress("hpbar_enemy", {w:280,h:20,x:10,y:20, value: 100}, this.game.gui);
        // hpBarEnemy.setVisible(false);
        // this.game.guiElements.hpBarEnemy = hpBarEnemy;
        // dialogEnemy.add(hpBarEnemy);
        //
        // new CASTORGUI.GUIButton("gui.button.inventory", {x:15,y:155, value:"Inventory"}, this.game.gui, function() {
        //     console.log('inwentory');
        //     alert('Inwentory');
        // });
        //
        // let sliderAttack = new CASTORGUI.GUISlider("gui.slider.attack", {x:100,y:185, min: 0, max: 200, value: 100}, this.game.gui, function(event: Event) {
        //     self.game.player.attackSpeed = event.target.value;
        // });
        // new CASTORGUI.GUIText("attack.speed", {size:15, text:"Attack speed", x: 10, y:190, color: "white"}, this.game.gui, true)
        //
        // let sliderWalk = new CASTORGUI.GUISlider("gui.slider.walk", {x:100,y:220, min: 0, max: 200, value: 100}, this.game.gui, function(event: Event) {
        //     self.game.player.walkSpeed = event.target.value;
        // });
        //
        // new CASTORGUI.GUIText("walk.speed", {size:15, text:"Walk speed", x: 10, y:225, color: "white"}, this.game.gui, true)
        //
        //
        // var dialog = new CASTORGUI.GUIPanel("Panel", {w: 400, h: 100, x: 15, y: (this.game.gui.getCanvasSize().height - 110)}, this.game.gui);
        // dialog.setVisible(true);
        // dialog.add(new CASTORGUI.GUIText("textDialog", {size:15, text:"Chat"}, this.game.gui, true));
    };
    return Scene;
}());
/// <reference path="../../babel/Characters/Warrior/Warrior.d.ts"/>
/// <reference path="../game.ts"/>
var Characters = (function () {
    function Characters(game, scene) {
        var characterFactory = new Warrior.MeshFactory(scene, '/babel/Characters/Warrior');
        game.characters['player'] = characterFactory;
        var wormFactory = new worm.MeshFactory(scene, '/babel/Characters/Worm');
        game.characters['worm'] = wormFactory;
    }
    return Characters;
}());
/// <reference path="../../babel/Items/Sword/Sword.d.ts"/>
/// <reference path="../../babel/Items/Shield/Shield.d.ts"/>
/// <reference path="../game.ts"/>
var Items = (function () {
    function Items(game, scene) {
        var swordFactory = new Sword.MeshFactory(scene, 'babel/Items/Sword');
        game.items['sword'] = swordFactory;
        var shieldFactory = new Shield.MeshFactory(scene, 'babel/Items/Shield');
        game.items['shield'] = shieldFactory;
    }
    return Items;
}());
/// <reference path="../game.ts"/>
var Environment = (function () {
    function Environment(game, scene) {
        var self = this;
        this.trees = [];
        this.bushes = [];
        this.colliders = [];
        for (var i = 0; i < scene.meshes.length; i++) {
            var sceneMesh = scene.meshes[i];
            var meshName = scene.meshes[i]['name'];
            if (meshName.search("Forest_ground") >= 0) {
                sceneMesh.receiveShadows = true;
                sceneMesh.actionManager = new BABYLON.ActionManager(scene);
                this.ground = sceneMesh;
            }
            else if (meshName.search("Spruce") >= 0) {
                sceneMesh.isPickable = false;
                this.trees.push(sceneMesh);
                this.colliders.push(sceneMesh);
            }
            else if (meshName.search("Fance") >= 0) {
                this.colliders.push(sceneMesh);
            }
            //game.sceneManager.shadowGenerator.getShadowMap().renderList.push(sceneMesh);
        }
        for (var i = 0; i < this.trees.length; i++) {
            var meshTree = this.trees[i];
            var minimum = meshTree.getBoundingInfo().boundingBox.minimum.clone();
            var maximum = meshTree.getBoundingInfo().boundingBox.maximum.clone();
            var scaling = BABYLON.Matrix.Scaling(0.5, 0.5, 0.5);
            minimum = BABYLON.Vector3.TransformCoordinates(minimum, scaling);
            maximum = BABYLON.Vector3.TransformCoordinates(maximum, scaling);
            meshTree._boundingInfo = new BABYLON.BoundingInfo(minimum, maximum);
            meshTree.computeWorldMatrix(true);
        }
        var cone = scene.getMeshByName("Fireplace");
        if (cone) {
            var smokeSystem = new Particles.FireplaceSmoke(game, cone).particleSystem;
            smokeSystem.start();
            var fireSystem = new Particles.FireplaceFire(game, cone).particleSystem;
            fireSystem.start();
            var sfxFireplace = new BABYLON.Sound("Fire", "assets/sounds/fireplace.mp3", scene, null, { loop: true, autoplay: true });
            sfxFireplace.attachToMesh(cone);
        }
        var plane = scene.getMeshByName("Entrace_city");
        if (plane) {
            plane.visibility = 0;
            plane.isPickable = false;
            var smokeSystem = new Particles.Entrace(game, plane).particleSystem;
            smokeSystem.start();
            game.getScene().registerAfterRender(function () {
                if (game.player && self.entrace) {
                    if (game.player.mesh.intersectsMesh(self.entrace, true)) {
                        game.player.mesh.position = new BABYLON.Vector3(3, 0.1, 0);
                    }
                }
            });
        }
        this.entrace = plane;
        for (var i = 0; i < scene.meshes.length; i++) {
            var sceneMesh = scene.meshes[i];
            sceneMesh.freezeWorldMatrix();
        }
        var bowls = new BABYLON.Sound("Fire", "assets/sounds/forest_night.mp3", scene, null, { loop: true, autoplay: true });
    }
    return Environment;
}());
/// <reference path="Scene.ts"/>
/// <reference path="../game.ts"/>
/// <reference path="../objects/characters.ts"/>
/// <reference path="../objects/items.ts"/>
/// <reference path="../objects/environment.ts"/>
var Simple = (function (_super) {
    __extends(Simple, _super);
    function Simple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Simple.prototype.initScene = function (game) {
        var self = this;
        var serverUrl = window.location.hostname + ':3003';
        BABYLON.SceneLoader.Load("assets/scenes/map01/", "map01.babylon", game.engine, function (scene) {
            game.sceneManager = self;
            self
                .setDefaults(game)
                .optimizeScene(scene)
                .setCamera(scene);
            // scene.debugLayer.show();
            var sceneIndex = game.scenes.push(scene);
            game.activeScene = sceneIndex - 1;
            scene.executeWhenReady(function () {
                scene.lights[0].intensity = 0;
                //scene.lights[0].diffuse = new BABYLON.Color3(0.5, 0.5, 1);
                self.environment = new Environment(game, scene);
                new Characters(game, scene);
                new Items(game, scene);
                game.controller.registerControls(scene);
                game.client.connect(serverUrl);
            });
        });
    };
    return Simple;
}(Scene));
/// <reference path="../../babylon/babylon.d.ts"/>
/// <reference path="../game.ts"/>
var Character = (function () {
    function Character(name, game) {
        this.name = name;
        this.game = game;
        var skeleton = this.mesh.skeleton;
        skeleton.beginAnimation(Character.ANIMATION_STAND_WEAPON, true);
        this.registerFunctionAfterRender();
        game.getScene().registerAfterRender(this.afterRender);
        this.bloodParticles = new Particles.Blood(game, this.mesh).particleSystem;
    }
    Character.prototype.mount = function (mesh, boneName) {
        var boneIndice = -1;
        var meshCharacter = this.mesh;
        var skeleton = meshCharacter.skeleton;
        for (var i = 0; i < skeleton.bones.length; i++) {
            if (skeleton.bones[i].name == boneName) {
                boneIndice = i;
                break;
            }
        }
        var bone = skeleton.bones[boneIndice];
        mesh.attachToBone(bone, meshCharacter);
        mesh.position = new BABYLON.Vector3(0, 0, 0);
        bone.getRotationToRef(BABYLON.Space.WORLD, meshCharacter, mesh.rotation);
        mesh.rotation = mesh.rotation.negate();
        mesh.rotation.z = -mesh.rotation.z;
    };
    ;
    /**
     * ANIMATIONS
     */
    Character.prototype.runAnimationHit = function () {
        if (!this.animation) {
            var self_1 = this;
            var childMesh = this.mesh;
            if (childMesh) {
                var skeleton_1 = childMesh.skeleton;
                this.game.client.socket.emit('attack', {
                    attack: true
                });
                self_1.attackAnimation = true;
                self_1.onHitStart();
                self_1.animation = skeleton_1.beginAnimation(Character.ANIMATION_ATTACK, false, this.attackSpeed / 100, function () {
                    skeleton_1.beginAnimation(Character.ANIMATION_STAND_WEAPON, true);
                    self_1.animation = null;
                    self_1.attackAnimation = false;
                    self_1.onHitEnd();
                    self_1.game.client.socket.emit('attack', {
                        attack: false
                    });
                });
            }
        }
    };
    Character.prototype.emitPosition = function () {
        var rotation;
        if (this.game.client.socket) {
            if (this.mesh.rotationQuaternion) {
                rotation = this.mesh.rotationQuaternion;
            }
            else {
                rotation = new BABYLON.Quaternion(0, 0, 0, 0);
            }
            this.game.client.socket.emit('moveTo', {
                p: this.mesh.position,
                r: rotation
            });
        }
    };
    Character.prototype.runAnimationWalk = function (emit) {
        var self = this;
        var childMesh = this.mesh;
        var loopAnimation = this.isControllable;
        if (childMesh) {
            var skeleton_2 = childMesh.skeleton;
            if (emit) {
                this.emitPosition();
            }
            if (!this.animation) {
                self.sfxWalk.play();
                self.onWalkStart();
                self.animation = skeleton_2.beginAnimation(Character.ANIMATION_WALK, loopAnimation, this.walkSpeed / 100, function () {
                    skeleton_2.beginAnimation(Character.ANIMATION_STAND_WEAPON, true);
                    self.animation = null;
                    self.sfxWalk.stop();
                    self.onWalkEnd();
                });
            }
        }
    };
    Character.prototype.isAnimationEnabled = function () {
        return this.animation;
    };
    /** Events */
    Character.prototype.onHitStart = function () { };
    ;
    Character.prototype.onHitEnd = function () { };
    ;
    Character.prototype.onWalkStart = function () { };
    ;
    Character.prototype.onWalkEnd = function () { };
    ;
    Character.WALK_SPEED = 0.25;
    Character.ROTATION_SPEED = 0.05;
    Character.ANIMATION_WALK = 'Run';
    Character.ANIMATION_STAND = 'stand';
    Character.ANIMATION_STAND_WEAPON = 'Stand_with_weapon';
    Character.ANIMATION_ATTACK = 'Attack';
    return Character;
}());
/// <reference path="characters/character.ts"/>
/// <reference path="game.ts"/>
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game, id, name, registerMoving) {
        var _this = this;
        _this.id = id;
        _this.name = name;
        _this.hp = 100;
        _this.attackSpeed = 100;
        _this.walkSpeed = 125;
        _this.damage = 10;
        _this.blockChance = 50;
        _this.isControllable = registerMoving;
        _this.sfxWalk = new BABYLON.Sound("CharacterWalk", "/babel/Characters/Warrior/walk.wav", game.getScene(), null, { loop: true, autoplay: false });
        //this.sfxHit = new BABYLON.Sound("CharacterHit", "/babel/Characters/Warrior/hit.wav", game.getScene(), null, { loop: false, autoplay: false });
        _this.sfxHit = new BABYLON.Sound("CharacterHit", "/", game.getScene(), null, { loop: false, autoplay: false });
        var mesh = game.characters['player'].instance('Warrior', true);
        mesh.position = new BABYLON.Vector3(3, 0.1, 0);
        game.getScene().activeCamera.position = mesh.position;
        _this.mesh = mesh;
        _this.game = game;
        _this.createItems();
        //this.mount(this.items.shield, 'shield.bone');
        // this.guiCharacterName = new BABYLON.GUI.TextBlock();
        // this.guiCharacterName.text = this.name;
        // this.guiCharacterName.paddingTop = -85;
        // game.sceneManager.guiTexture.addControl(this.guiCharacterName);
        // this.guiCharacterName.linkWithMesh(this.mesh);
        if (_this.isControllable) {
            _this.mesh.isPickable = false;
            //let playerLight = new BABYLON.SpotLight("playerLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -1, 0), 1.2, 16, game.getScene());
            //playerLight.diffuse = new BABYLON.Color3(1, 1, 1);
            //playerLight.specular = new BABYLON.Color3(1, 1, 1);
            //playerLight.position.y = 64;
            var playerLight = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 12, 0), game.getScene());
            playerLight.diffuse = new BABYLON.Color3(1, 1, 1);
            //playerLight.specular = new BABYLON.Color3(1, 1, 1);
            playerLight.intensity = 1;
            playerLight.range = 40;
            playerLight.parent = _this.mesh;
            game.getScene().lights.push(playerLight);
            var characterBottomPanel = new BABYLON.GUI.StackPanel();
            characterBottomPanel.width = "50%";
            characterBottomPanel.top = -10;
            characterBottomPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            game.sceneManager.guiTexture.addControl(characterBottomPanel);
            _this.guiPanel = characterBottomPanel;
            var hpSlider = new BABYLON.GUI.Slider();
            hpSlider.minimum = 0;
            hpSlider.maximum = 100;
            hpSlider.value = 90;
            hpSlider.width = "100%";
            hpSlider.height = "10px";
            hpSlider.thumbWidth = 0;
            hpSlider.barOffset = 0;
            hpSlider.background = 'black';
            hpSlider.color = "red";
            hpSlider.borderColor = 'black';
            _this.guiHp = hpSlider;
            var expSlider = new BABYLON.GUI.Slider();
            expSlider.minimum = 0;
            expSlider.maximum = 100;
            expSlider.value = 5;
            expSlider.width = "100%";
            expSlider.height = "10px";
            expSlider.thumbWidth = 0;
            expSlider.barOffset = 0;
            expSlider.background = 'black';
            expSlider.color = "blue";
            expSlider.borderColor = 'black';
            characterBottomPanel.addControl(hpSlider);
            characterBottomPanel.addControl(expSlider);
            game.gui = new GUI.Main(game, _this);
            var attackArea = BABYLON.MeshBuilder.CreateBox('player_attackArea', {
                width: 4,
                height: 0.1,
                size: 4
            }, game.getScene());
            attackArea.parent = _this.mesh;
            attackArea.visibility = 0;
            attackArea.isPickable = false;
            _this.attackArea = attackArea;
        }
        _this.walkSmoke = new Particles.WalkSmoke(game, _this.mesh).particleSystem;
        _this = _super.call(this, name, game) || this;
        return _this;
    }
    /**
     * Moving events
     */
    Player.prototype.registerMoving = function () {
        var walkSpeed = Character.WALK_SPEED * (this.walkSpeed / 100);
        var game = this.game;
        var mesh = this.mesh;
        if (game.controller.left) {
            mesh.rotate(BABYLON.Axis.Y, -Character.ROTATION_SPEED, BABYLON.Space.LOCAL);
            this.emitPosition();
        }
        if (game.controller.right) {
            mesh.rotate(BABYLON.Axis.Y, Character.ROTATION_SPEED, BABYLON.Space.LOCAL);
            this.emitPosition();
        }
        if (game.controller.forward) {
            mesh.translate(BABYLON.Axis.Z, -walkSpeed, BABYLON.Space.LOCAL);
            this.runAnimationWalk(true);
            return;
        }
        if (game.controller.back) {
            mesh.translate(BABYLON.Axis.Z, walkSpeed, BABYLON.Space.LOCAL);
            this.runAnimationWalk(true);
            return;
        }
        ///stop move and start attack animation
        if (this.animation && !this.attackAnimation) {
            this.animation.stop();
        }
    };
    /**
     * Attack Collisions
     *
     * @returns {Player}
     */
    Player.prototype.weaponCollisions = function () {
        var game = this.game;
        var self = this;
        if (this.attackArea && this.attackAnimation && !this.attackHit) {
            this.attackHit = true;
            var _loop_1 = function () {
                enemy = game.enemies[i];
                var enemyMesh = enemy.mesh;
                if (this_1.attackArea.intersectsMesh(enemyMesh, false)) {
                    var animationEnemty_1 = enemy;
                    setTimeout(function () {
                        if (!animationEnemty_1.sfxHit.isPlaying) {
                            animationEnemty_1.sfxHit.setVolume(2);
                            animationEnemty_1.sfxHit.play();
                        }
                        animationEnemty_1.createGUI();
                        animationEnemty_1.bloodParticles.start();
                        var newValue = animationEnemty_1.hp - self.damage;
                        animationEnemty_1.hp = (newValue);
                        animationEnemty_1.guiHp.value = newValue;
                        if (newValue <= 0) {
                            animationEnemty_1.removeFromWorld();
                            game.controller.attackPoint = null;
                        }
                    }, 300);
                }
            };
            var this_1 = this, enemy;
            for (var i = 0; i < game.enemies.length; i++) {
                _loop_1();
            }
        }
        return this;
    };
    Player.prototype.envCollisions = function () {
        var game = this.game;
        if (game.controller.forward) {
            for (var i = 0; i < game.sceneManager.environment.colliders.length; i++) {
                var sceneMesh = game.sceneManager.environment.colliders[i];
                if (game.getScene().isActiveMesh(sceneMesh)) {
                    if (this.mesh.intersectsMesh(sceneMesh, true)) {
                        game.controller.targetPoint = null;
                        game.controller.ball.visibility = 0;
                        game.controller.forward = false;
                        this.mesh.translate(BABYLON.Axis.Z, 0.5, BABYLON.Space.LOCAL);
                        game.getScene().activeCamera.position = this.mesh.position;
                    }
                }
            }
        }
        return this;
    };
    Player.prototype.removeFromWorld = function () {
        this.game.getScene().unregisterAfterRender(this.afterRender);
        this.mesh.dispose();
        //this.items.weapon.mesh.dispose();
        //this.items.shield.mesh.dispose();
        this.game.sceneManager.guiTexture.removeControl(this.guiCharacterName);
    };
    Player.prototype.registerFunctionAfterRender = function () {
        var self = this;
        this.afterRender = function () {
            if (self.isControllable) {
                self.weaponCollisions().envCollisions();
                self.registerMoving();
                if (self.game.controller.forward) {
                    self.game.getScene().activeCamera.position = self.mesh.position;
                }
            }
        };
    };
    Player.prototype.createItems = function () {
        this.inventory = new Character.Inventory(this.game, this);
    };
    Player.prototype.onHitStart = function () {
        //this.items.weapon.sfxHit.play(0.3);
    };
    ;
    Player.prototype.onHitEnd = function () {
        this.attackHit = false;
    };
    ;
    Player.prototype.onWalkStart = function () {
        this.walkSmoke.start();
    };
    Player.prototype.onWalkEnd = function () {
        this.walkSmoke.stop();
    };
    return Player;
}(Character));
/// <reference path="../character.ts"/>
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(name, game) {
        var _this = this;
        var attackArea = BABYLON.MeshBuilder.CreateBox('enemy_attackArea', {
            width: _this.attackAreaSize,
            height: 0.1,
            size: _this.attackAreaSize
        }, game.getScene());
        attackArea.parent = _this.mesh;
        attackArea.visibility = 0;
        _this.attackArea = attackArea;
        var visivilityArea = BABYLON.MeshBuilder.CreateBox('enemy_visivilityArea', {
            width: _this.visibilityAreaSize,
            height: 0.1,
            size: _this.visibilityAreaSize
        }, game.getScene());
        visivilityArea.parent = _this.mesh;
        visivilityArea.visibility = 0;
        visivilityArea.isPickable = false;
        _this.visibilityArea = visivilityArea;
        game.enemies[_this.id] = _this;
        _this.mesh.skeleton.beginAnimation(Character.ANIMATION_STAND, true);
        _this.mesh.isPickable = false;
        _this = _super.call(this, name, game) || this;
        return _this;
    }
    Monster.prototype.createGUI = function () {
        if (this.guiPanel) {
            this.game.sceneManager.guiTexture.removeControl(this.guiPanel);
        }
        var monsterPanel = new BABYLON.GUI.StackPanel();
        monsterPanel.width = "25%";
        monsterPanel.top = 10;
        monsterPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.guiPanel = monsterPanel;
        this.game.sceneManager.guiTexture.addControl(monsterPanel);
        var hpSlider = new BABYLON.GUI.Slider();
        hpSlider.minimum = 0;
        hpSlider.maximum = this.hpMax;
        hpSlider.value = this.hp;
        hpSlider.width = "100%";
        hpSlider.height = "10px";
        hpSlider.thumbWidth = 0;
        hpSlider.barOffset = 0;
        hpSlider.background = 'black';
        hpSlider.color = "red";
        hpSlider.borderColor = 'black';
        this.guiHp = hpSlider;
        monsterPanel.addControl(hpSlider);
    };
    Monster.prototype.emitPosition = function () {
        if (this.game.client.socket) {
            this.game.client.socket.emit('updateEnemy', {
                enemyKey: this.id,
                position: this.mesh.position,
                rotation: this.mesh.rotationQuaternion,
                target: this.target
            });
        }
    };
    Monster.prototype.removeFromWorld = function () {
        this.game.getScene().unregisterAfterRender(this.afterRender);
        var self = this;
        self.visibilityArea.dispose();
        self.attackArea.dispose();
        self.mesh.dispose();
    };
    Monster.prototype.registerFunctionAfterRender = function () {
        var self = this;
        var walkSpeed = Character.WALK_SPEED * (self.walkSpeed / 100);
        var playerMesh = self.game.player.mesh;
        this.afterRender = function () {
            if (self.game.player && self.game.getScene().isActiveMesh(self.mesh) && (!self.target || self.target == self.game.player.id)) {
                if (self.visibilityArea.intersectsMesh(playerMesh, false)) {
                    self.mesh.lookAt(playerMesh.position);
                    self.target = self.game.player.id;
                    if (self.attackArea.intersectsMesh(playerMesh, false)) {
                        self.runAnimationHit();
                    }
                    else {
                        self.mesh.translate(BABYLON.Axis.Z, -walkSpeed, BABYLON.Space.LOCAL);
                        self.runAnimationWalk(true);
                    }
                }
                else {
                    if (self.target) {
                        self.target = null;
                        self.runAnimationWalk(true);
                    }
                }
            }
        };
    };
    Monster.prototype.onHitEnd = function () {
        if (Game.randomNumber(1, 100) <= this.hitChange) {
            if (!this.game.player.sfxHit.isPlaying) {
                this.game.player.sfxHit.setVolume(2);
                this.game.player.sfxHit.play();
            }
            this.game.player.bloodParticles.start();
            var value = this.game.player.guiHp.value;
            this.game.player.guiHp.value = (value - this.damage);
            if (this.game.player.guiHp.value - this.damage < 0) {
                alert('Padłeś');
                window.location.reload();
            }
        }
    };
    return Monster;
}(Character));
/// <reference path="game.ts"/>
/// <reference path="characters/monsters/monster.ts"/>
var SocketIOClient = (function () {
    function SocketIOClient(game) {
        this.game = game;
    }
    SocketIOClient.prototype.connect = function (socketUrl) {
        this.socket = io.connect(socketUrl, { player: this.game.player });
        this.playerConnected();
        this.showEnemies();
    };
    /**
     * @returns {SocketIOClient}
     */
    SocketIOClient.prototype.playerConnected = function () {
        var self = this;
        var game = this.game;
        var playerName = Game.randomNumber(1, 100);
        this.socket.on('clientConnected', function (data) {
            game.remotePlayers = [];
            self.socket.emit('createPlayer', playerName);
            game.player = new Player(game, data.id, playerName, true);
            self.updatePlayers().removePlayer().connectPlayer();
        });
        return this;
    };
    /**
     * @returns {SocketIOClient}
     */
    SocketIOClient.prototype.showEnemies = function () {
        var game = this.game;
        this.socket.on('showEnemies', function (data) {
            data.forEach(function (enemyData, key) {
                var position = new BABYLON.Vector3(enemyData.position.x, enemyData.position.y, enemyData.position.z);
                var rotationQuaternion = new BABYLON.Quaternion(enemyData.rotation.x, enemyData.rotation.y, enemyData.rotation.z, enemyData.rotation.w);
                var enemy = game.enemies[key];
                if (enemy) {
                    enemy.target = enemyData.target;
                    enemy.mesh.position = position;
                    enemy.mesh.rotationQuaternion = rotationQuaternion;
                    enemy.runAnimationWalk(false);
                }
                else {
                    if (enemyData.type == 'worm') {
                        new Worm(key, data.id, game, position, rotationQuaternion);
                    }
                    else if (enemyData.type == 'bigWorm') {
                        new BigWorm(key, data.id, game, position, rotationQuaternion);
                    }
                }
            });
        });
        return this;
    };
    SocketIOClient.prototype.connectPlayer = function () {
        var game = this.game;
        this.socket.on('newPlayerConnected', function (data) {
            data.forEach(function (socketRemotePlayer) {
                var remotePlayerKey = null;
                if (socketRemotePlayer.id !== game.player.id) {
                    game.remotePlayers.forEach(function (remotePlayer, key) {
                        if (remotePlayer.id == socketRemotePlayer.id) {
                            remotePlayerKey = key;
                            return;
                        }
                    });
                    if (remotePlayerKey === null) {
                        var player = new Player(game, socketRemotePlayer.id, socketRemotePlayer.name, false);
                        game.remotePlayers.push(player);
                    }
                }
            });
        });
        return this;
    };
    /**
     * @returns {SocketIOClient}
     */
    SocketIOClient.prototype.updatePlayers = function () {
        var game = this.game;
        this.socket.on('updatePlayer', function (updatedPlayer) {
            var remotePlayerKey = null;
            game.remotePlayers.forEach(function (remotePlayer, key) {
                if (remotePlayer.id == updatedPlayer.id) {
                    remotePlayerKey = key;
                    return;
                }
            });
            if (remotePlayerKey != null) {
                var player = game.remotePlayers[remotePlayerKey];
                if (!player.isAnimationEnabled() && !updatedPlayer.attack) {
                    player.runAnimationWalk(false);
                }
                else if (updatedPlayer.attack == true) {
                    player.runAnimationHit();
                }
                player.mesh.position = new BABYLON.Vector3(updatedPlayer.p.x, updatedPlayer.p.y, updatedPlayer.p.z);
                player.mesh.rotationQuaternion = new BABYLON.Quaternion(updatedPlayer.r.x, updatedPlayer.r.y, updatedPlayer.r.z, updatedPlayer.r.w);
            }
        });
        return this;
    };
    /**
     *
     * @returns {SocketIOClient}
     */
    SocketIOClient.prototype.removePlayer = function () {
        var app = this.game;
        this.socket.on('removePlayer', function (id) {
            app.remotePlayers.forEach(function (remotePlayer, key) {
                if (remotePlayer.id == id) {
                    var player = app.remotePlayers[key];
                    player.removeFromWorld();
                    app.remotePlayers.splice(key, 1);
                }
            });
        });
        return this;
    };
    return SocketIOClient;
}());
/// <reference path="../bower_components/babylonjs/dist/babylon.d.ts"/>
/// <reference path="controllers/Keyboard.ts"/>
/// <reference path="scenes/Simple.ts"/>
/// <reference path="player.ts"/>
/// <reference path="socketIOClient.ts"/>
var Game = (function () {
    function Game(canvasElement) {
        this.canvas = canvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.controller = new Mouse(this);
        this.client = new SocketIOClient(this);
        this.items = [];
        this.characters = [];
        this.enemies = [];
        this.scenes = [];
        this.activeScene = null;
        this.createScene().animate();
    }
    Game.prototype.getScene = function () {
        return this.scenes[this.activeScene];
    };
    Game.prototype.createScene = function () {
        new Simple().initScene(this);
        return this;
    };
    Game.prototype.animate = function () {
        var _this = this;
        var self = this;
        this.engine.runRenderLoop(function () {
            if (_this.activeScene != null) {
                self.getScene().render();
            }
        });
        window.addEventListener('resize', function () {
            _this.engine.resize();
        });
        return this;
    };
    Game.randomNumber = function (minimum, maximum) {
        return Math.round(Math.random() * (maximum - minimum) + minimum);
    };
    return Game;
}());
var Character;
(function (Character) {
    var Inventory = (function () {
        function Inventory(game, player) {
            this.game = game;
            this.player = player;
            this.items = [];
            this.initPlayerItems();
        }
        Inventory.prototype.initPlayerItems = function () {
            var sword = new Items.Weapons.Sword(this.game);
            var shield = new Items.Shields.BigWoodShield(this.game);
            var armor = new Items.Armors.PrimaryArmor(this.game);
            var helm = new Items.Helms.PrimaryHelm(this.game);
            var gloves = new Items.Gloves.PrimaryGloves(this.game);
            var boots = new Items.Boots.PrimaryBoots(this.game);
            this.items.push(sword);
            this.items.push(shield);
            this.items.push(armor);
            this.items.push(helm);
            this.items.push(gloves);
            this.items.push(boots);
            this.mount(sword);
            this.mount(shield);
            this.mount(armor);
            this.mount(helm);
            this.mount(gloves);
            this.mount(boots);
            this.weapon = sword;
            this.shield = shield;
            this.armor = armor;
            this.helm = helm;
            this.gloves = gloves;
            this.boots = boots;
            var sword = new Items.Weapons.Sword(this.game);
            this.items.push(sword);
            var sword = new Items.Weapons.BigSword(this.game);
            this.items.push(sword);
            var sword = new Items.Weapons.BigSword(this.game);
            this.items.push(sword);
            var sword = new Items.Shields.WoodShield(this.game);
            this.items.push(sword);
            var sword = new Items.Shields.WoodShield(this.game);
            this.items.push(sword);
            var sword = new Items.Weapons.Sword(this.game);
            this.items.push(sword);
        };
        /**
         * @param item
         */
        Inventory.prototype.removeItem = function (item) {
            if (item) {
                item.mesh.visibility = 0;
            }
        };
        /**
         * @param item
         * @param setItem
         */
        Inventory.prototype.equip = function (item, setItem) {
            switch (item.getType()) {
                case Items.Weapon.TYPE:
                    this.removeItem(this.weapon);
                    if (setItem) {
                        this.weapon = item;
                    }
                    break;
                case Items.Shield.TYPE:
                    this.removeItem(this.shield);
                    if (setItem) {
                        this.shield = item;
                    }
                    break;
                case Items.Helm.TYPE:
                    this.removeItem(this.helm);
                    if (setItem) {
                        this.helm = item;
                    }
                    break;
                case Items.Gloves.TYPE:
                    this.removeItem(this.gloves);
                    if (setItem) {
                        this.gloves = item;
                    }
                    break;
                case Items.Boots.TYPE:
                    this.removeItem(this.boots);
                    if (setItem) {
                        this.boots = item;
                    }
                    break;
                case Items.Armor.TYPE:
                    this.removeItem(this.armor);
                    if (setItem) {
                        this.armor = item;
                    }
                    break;
            }
            if (setItem) {
                item.mesh.visibility = 1;
            }
        };
        /**
         * Value 1 define mounting item usign bone, value 2 define mounting using skeleton.
         * @param item
         * @returns {Character.Inventory}
         */
        Inventory.prototype.mount = function (item) {
            if (item.mountType == 1) {
                this.player.mount(item.mesh, item.mountBoneName);
            }
            else if (item.mountType == 2) {
                item.mesh.parent = this.player.mesh;
                item.mesh.skeleton = this.player.mesh.skeleton;
            }
            this.equip(item, true);
            return this;
        };
        Inventory.prototype.umount = function (item) {
            this.equip(item, false);
            return this;
        };
        return Inventory;
    }());
    Character.Inventory = Inventory;
})(Character || (Character = {}));
/// <reference path="Controller.ts"/>
var Mouse = (function (_super) {
    __extends(Mouse, _super);
    function Mouse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mouse.prototype.registerControls = function (scene) {
        var self = this;
        var clickTrigger = false;
        var ball = BABYLON.Mesh.CreateBox("sphere", 0.4, scene);
        ball.isPickable = false;
        ball.visibility = 0;
        this.ball = ball;
        scene.onPointerUp = function (evt, pickResult) {
            clickTrigger = false;
        };
        scene.onPointerDown = function (evt, pickResult) {
            var pickedMesh = pickResult.pickedMesh;
            clickTrigger = true;
            if (pickedMesh) {
                if (self.game.player && pickedMesh.name == 'Forest_ground') {
                    self.attackPoint = null;
                    self.targetPoint = pickResult.pickedPoint;
                    self.targetPoint.y = 0;
                    self.ball.position = self.targetPoint;
                    self.ball.visibility = 1;
                    self.game.player.mesh.lookAt(self.ball.position);
                    self.game.player.emitPosition();
                }
                if (self.game.player && pickedMesh.name.search('enemy_attackArea') >= 0) {
                    self.attackPoint = pickedMesh;
                    self.game.player.mesh.lookAt(pickResult.pickedPoint);
                    self.targetPoint = null;
                    self.ball.visibility = 0;
                }
            }
        };
        scene.onPointerMove = function (evt, pickResult) {
            if (clickTrigger) {
                var pickedMesh = pickResult.pickedMesh;
                if (pickedMesh && self.targetPoint) {
                    if (self.game.player) {
                        self.targetPoint = pickResult.pickedPoint;
                        self.targetPoint.y = 0;
                        self.ball.position = self.targetPoint;
                        self.game.player.mesh.lookAt(self.ball.position);
                    }
                }
            }
        };
        scene.registerBeforeRender(function () {
            if (self.game.player) {
                if (self.attackPoint) {
                    if (self.game.player.mesh.intersectsMesh(self.attackPoint)) {
                        self.game.player.runAnimationHit();
                        self.game.controller.forward = false;
                    }
                    else {
                        self.game.controller.forward = true;
                    }
                }
                if (self.targetPoint) {
                    if (!self.game.player.mesh.intersectsPoint(self.targetPoint)) {
                        self.game.controller.forward = true;
                    }
                    else {
                        if (!clickTrigger) {
                            self.game.controller.forward = false;
                            self.targetPoint = null;
                            self.ball.visibility = 0;
                        }
                    }
                }
            }
        });
    };
    return Mouse;
}(Controller));
/// <reference path="../../babylon/babylon.d.ts"/>
/// <reference path="../game.ts"/>
var GUI;
(function (GUI) {
    var Main = (function () {
        function Main(game, player) {
            this.game = game;
            this.player = player;
            this.texture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('gui.main');
            this.initInventory().initAttributes();
        }
        Main.prototype.initInventory = function () {
            var self = this;
            this.inventory = new GUI.Inventory(this);
            var buttonPanel = new BABYLON.GUI.StackPanel();
            buttonPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            buttonPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            buttonPanel.width = 0.2;
            buttonPanel.isPointerBlocker = true;
            this.buttonpanel = buttonPanel;
            this.texture.addControl(buttonPanel);
            var button = BABYLON.GUI.Button.CreateSimpleButton("button.inventory", "Inventory");
            button.width = 1;
            button.height = "40px";
            button.color = "white";
            button.background = "black";
            button.isPointerBlocker = true;
            buttonPanel.addControl(button);
            button.onPointerUpObservable.add(function () {
                self.inventory.open();
            });
            this.registerBlockMoveCharacter(button);
            return this;
        };
        Main.prototype.initAttributes = function () {
            var self = this;
            this.attributes = new GUI.Attributes(this);
            var button = BABYLON.GUI.Button.CreateSimpleButton("button.attributes", "Attributes");
            button.width = 1;
            button.height = "40px";
            button.color = "white";
            button.background = "black";
            this.buttonpanel.addControl(button);
            button.onPointerUpObservable.add(function () {
                self.attributes.open();
            });
            this.registerBlockMoveCharacter(button);
            return this;
        };
        /**
         *
         * @param control
         * @returns {GUI.Main}
         */
        Main.prototype.registerBlockMoveCharacter = function (control) {
            var self = this;
            control.onPointerEnterObservable.add(function () {
                self.game.sceneManager.environment.ground.isPickable = false;
            });
            control.onPointerOutObservable.add(function () {
                self.game.sceneManager.environment.ground.isPickable = true;
            });
            return this;
        };
        return Main;
    }());
    GUI.Main = Main;
})(GUI || (GUI = {}));
/// <reference path="../game.ts"/>
var Items;
(function (Items) {
    var Item = (function () {
        /**
         * @param game
         */
        function Item(game) {
            this.game = game;
        }
        Item.TYPE = 0;
        return Item;
    }());
    Items.Item = Item;
})(Items || (Items = {}));
/// <reference path="../../babylon/babylon.d.ts"/>
/// <reference path="../game.ts"/>
var Particles;
(function (Particles) {
    var AbstractParticle = (function () {
        function AbstractParticle(game, emitter) {
            this.game = game;
            this.emitter = emitter;
            this.initParticleSystem();
        }
        return AbstractParticle;
    }());
    Particles.AbstractParticle = AbstractParticle;
})(Particles || (Particles = {}));
/// <reference path="AbstractParticle.ts"/>
var Particles;
(function (Particles) {
    var Blood = (function (_super) {
        __extends(Blood, _super);
        function Blood() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Blood.prototype.initParticleSystem = function () {
            var particleSystem = new BABYLON.ParticleSystem("particle1s", 500, this.game.getScene());
            particleSystem.particleTexture = new BABYLON.Texture("/assets/Smoke3.png", this.game.getScene());
            particleSystem.emitter = this.emitter;
            particleSystem.minEmitBox = new BABYLON.Vector3(0, this.emitter.geometry.extend.maximum.y * 0.7, 0); // Starting all from
            particleSystem.maxEmitBox = new BABYLON.Vector3(0, this.emitter.geometry.extend.maximum.y * 0.7, 0); // To...
            particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 1);
            particleSystem.color2 = new BABYLON.Color4(1, 0, 0, 0.1);
            particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 1);
            particleSystem.minSize = 0.3;
            particleSystem.maxSize = 0.5;
            particleSystem.minLifeTime = 0.05;
            particleSystem.maxLifeTime = 0.7;
            particleSystem.emitRate = 500;
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
            particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
            particleSystem.direction1 = new BABYLON.Vector3(-2, 2, -2);
            particleSystem.direction2 = new BABYLON.Vector3(2, 2, 2);
            particleSystem.targetStopDuration = 0.6;
            particleSystem.minAngularSpeed = -10.0;
            particleSystem.maxAngularSpeed = 10.0;
            particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 2;
            particleSystem.updateSpeed = 0.02;
            this.particleSystem = particleSystem;
        };
        return Blood;
    }(Particles.AbstractParticle));
    Particles.Blood = Blood;
})(Particles || (Particles = {}));
/// <reference path="AbstractParticle.ts"/>
var Particles;
(function (Particles) {
    var Entrace = (function (_super) {
        __extends(Entrace, _super);
        function Entrace() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Entrace.prototype.initParticleSystem = function () {
            var particleSystem = new BABYLON.ParticleSystem("particles", 1500, this.game.getScene());
            particleSystem.particleTexture = new BABYLON.Texture("/assets/flare.png", this.game.getScene());
            particleSystem.emitter = this.emitter; // the starting object, the emitter
            particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, -1); // Starting all from
            particleSystem.maxEmitBox = new BABYLON.Vector3(-1, 2, 1); // To...
            particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
            particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
            particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
            particleSystem.minSize = 0.1;
            particleSystem.maxSize = 0.5;
            particleSystem.minLifeTime = 0.3;
            particleSystem.maxLifeTime = 1.5;
            particleSystem.emitRate = 1500;
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
            particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
            particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
            particleSystem.direction2 = new BABYLON.Vector3(0, 0.25, 0);
            particleSystem.minAngularSpeed = 0;
            particleSystem.maxAngularSpeed = Math.PI;
            particleSystem.minEmitPower = 0.5;
            particleSystem.maxEmitPower = 1.5;
            particleSystem.updateSpeed = 0.004;
            this.particleSystem = particleSystem;
        };
        return Entrace;
    }(Particles.AbstractParticle));
    Particles.Entrace = Entrace;
})(Particles || (Particles = {}));
/// <reference path="AbstractParticle.ts"/>
var Particles;
(function (Particles) {
    var FireplaceFire = (function (_super) {
        __extends(FireplaceFire, _super);
        function FireplaceFire() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FireplaceFire.prototype.initParticleSystem = function () {
            var fireSystem = new BABYLON.ParticleSystem("particles", 200, this.game.getScene());
            fireSystem.particleTexture = new BABYLON.Texture("/assets/flare.png", this.game.getScene());
            fireSystem.emitter = this.emitter;
            fireSystem.minEmitBox = new BABYLON.Vector3(0.5, 0, 0.5);
            fireSystem.maxEmitBox = new BABYLON.Vector3(-0.5, 0, -0.5);
            fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
            fireSystem.minSize = 0.2;
            fireSystem.maxSize = 0.7;
            fireSystem.minLifeTime = 0.2;
            fireSystem.maxLifeTime = 0.4;
            fireSystem.emitRate = 200;
            fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
            fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);
            fireSystem.direction1 = new BABYLON.Vector3(0, 2, 0);
            fireSystem.direction2 = new BABYLON.Vector3(0, 2, 0);
            fireSystem.minAngularSpeed = -10;
            fireSystem.maxAngularSpeed = Math.PI;
            fireSystem.minEmitPower = 1;
            fireSystem.maxEmitPower = 3;
            fireSystem.updateSpeed = 0.007;
            this.particleSystem = fireSystem;
        };
        return FireplaceFire;
    }(Particles.AbstractParticle));
    Particles.FireplaceFire = FireplaceFire;
})(Particles || (Particles = {}));
/// <reference path="AbstractParticle.ts"/>
var Particles;
(function (Particles) {
    var FireplaceSmoke = (function (_super) {
        __extends(FireplaceSmoke, _super);
        function FireplaceSmoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FireplaceSmoke.prototype.initParticleSystem = function () {
            var smokeSystem = new BABYLON.ParticleSystem("particles", 250, this.game.getScene());
            smokeSystem.particleTexture = new BABYLON.Texture("/assets/flare.png", this.game.getScene());
            smokeSystem.emitter = this.emitter;
            smokeSystem.minEmitBox = new BABYLON.Vector3(0.5, 1.5, 0.5);
            smokeSystem.maxEmitBox = new BABYLON.Vector3(-0.5, 1.5, -0.5);
            smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
            smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
            smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
            smokeSystem.minSize = 0.3;
            smokeSystem.maxSize = 1;
            smokeSystem.minLifeTime = 0.3;
            smokeSystem.maxLifeTime = 0.6;
            smokeSystem.emitRate = 250;
            smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
            smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);
            smokeSystem.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
            smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);
            smokeSystem.minAngularSpeed = 50;
            smokeSystem.maxAngularSpeed = Math.PI;
            smokeSystem.minEmitPower = 0.5;
            smokeSystem.maxEmitPower = 1.5;
            smokeSystem.updateSpeed = 0.005;
            this.particleSystem = smokeSystem;
        };
        return FireplaceSmoke;
    }(Particles.AbstractParticle));
    Particles.FireplaceSmoke = FireplaceSmoke;
})(Particles || (Particles = {}));
/// <reference path="AbstractParticle.ts"/>
var Particles;
(function (Particles) {
    var WalkSmoke = (function (_super) {
        __extends(WalkSmoke, _super);
        function WalkSmoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WalkSmoke.prototype.initParticleSystem = function () {
            var smokeSystem = new BABYLON.ParticleSystem("particles", 50, this.game.getScene());
            smokeSystem.particleTexture = new BABYLON.Texture("/assets/flare.png", this.game.getScene());
            smokeSystem.emitter = this.emitter;
            smokeSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0.8);
            smokeSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0.8);
            smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
            smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
            smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
            smokeSystem.minSize = 0.3;
            smokeSystem.maxSize = 2;
            smokeSystem.minLifeTime = 0.1;
            smokeSystem.maxLifeTime = 0.2;
            smokeSystem.emitRate = 30;
            smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
            smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);
            smokeSystem.direction1 = new BABYLON.Vector3(0, 8, 0);
            smokeSystem.direction2 = new BABYLON.Vector3(0, 8, 0);
            smokeSystem.minAngularSpeed = 0;
            smokeSystem.maxAngularSpeed = Math.PI;
            smokeSystem.minEmitPower = 1;
            smokeSystem.maxEmitPower = 1;
            smokeSystem.updateSpeed = 0.004;
            this.particleSystem = smokeSystem;
        };
        return WalkSmoke;
    }(Particles.AbstractParticle));
    Particles.WalkSmoke = WalkSmoke;
})(Particles || (Particles = {}));
/// <reference path="../../babylon/babylon.d.ts"/>
/// <reference path="../../babylon/ts/babylon.gui.d.ts"/>
/// <reference path="Scene.ts"/>
/// <reference path="../game.ts"/>
/// <reference path="../objects/characters.ts"/>
/// <reference path="../objects/items.ts"/>
/// <reference path="../objects/environment.ts"/>
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(game) {
        var _this = _super.call(this, game) || this;
        var scene = new BABYLON.Scene(game.engine);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        var camera = new BABYLON.ArcRotateCamera("Camera", -1, 0.8, 100, BABYLON.Vector3.Zero(), scene);
        var background = new BABYLON.Layer("back", "assets/logo.png", scene);
        background.isBackground = true;
        background.texture.level = 0;
        background.texture.wAng = 0;
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var buttonStart = BABYLON.GUI.Button.CreateSimpleButton("buttonStart", "Start game");
        buttonStart.width = "250px";
        buttonStart.height = "40px";
        buttonStart.color = "white";
        buttonStart.cornerRadius = 20;
        buttonStart.top = 150;
        buttonStart.background = "orange";
        buttonStart.zIndex = 1;
        buttonStart.onPointerUpObservable.add(function () {
            new Simple(game);
            game.activeScene = 1;
        });
        advancedTexture.addControl(buttonStart);
        var buttonOptions = BABYLON.GUI.Button.CreateSimpleButton("buttonOptions", "Options");
        buttonOptions.width = "250px";
        buttonOptions.height = "40px";
        buttonOptions.color = "white";
        buttonOptions.cornerRadius = 20;
        buttonOptions.top = 200;
        buttonOptions.background = "orange";
        buttonOptions.zIndex = 1;
        buttonOptions.onPointerUpObservable.add(function () {
            var optionsPanel = new BABYLON.GUI.StackPanel();
            optionsPanel.alpha = 0.8;
            optionsPanel.width = "220px";
            optionsPanel.background = "#edecd7";
            optionsPanel.zIndex = 2;
            advancedTexture.addControl(optionsPanel);
            var header = new BABYLON.GUI.TextBlock();
            header.text = "Shadows quality: 1024";
            header.height = "30px";
            header.color = "white";
            var slider = new BABYLON.GUI.Slider();
            slider.minimum = 1024;
            slider.maximum = 4096;
            slider.value = 0;
            slider.height = "20px";
            slider.width = "200px";
            slider.onValueChangedObservable.add(function (value) {
                header.text = "Shadows quality: " + value + "";
            });
            var optionsButtonClose = BABYLON.GUI.Button.CreateSimpleButton("aboutUsBackground", "Close");
            optionsButtonClose.width = "150px";
            optionsButtonClose.height = "40px";
            optionsButtonClose.color = "white";
            optionsButtonClose.cornerRadius = 20;
            optionsButtonClose.top = 50;
            optionsButtonClose.background = "orange";
            optionsButtonClose.zIndex = 3;
            optionsButtonClose.onPointerUpObservable.add(function () {
                advancedTexture.removeControl(optionsPanel);
            });
            optionsPanel
                .addControl(header)
                .addControl(slider)
                .addControl(optionsButtonClose);
        });
        advancedTexture.addControl(buttonOptions);
        var buttonAboutUs = BABYLON.GUI.Button.CreateSimpleButton("buttonAboutUs", "About us");
        buttonAboutUs.width = "250px";
        buttonAboutUs.height = "40px";
        buttonAboutUs.color = "white";
        buttonAboutUs.cornerRadius = 20;
        buttonAboutUs.top = 250;
        buttonAboutUs.background = "orange";
        buttonAboutUs.zIndex = 1;
        buttonAboutUs.onPointerUpObservable.add(function () {
            var aboutUsBackground = new BABYLON.GUI.Rectangle();
            aboutUsBackground.alpha = 0.8;
            aboutUsBackground.width = 0.5;
            aboutUsBackground.height = "180px";
            aboutUsBackground.cornerRadius = 20;
            aboutUsBackground.color = "Orange";
            aboutUsBackground.thickness = 1;
            aboutUsBackground.background = "#edecd7";
            aboutUsBackground.zIndex = 2;
            advancedTexture.addControl(aboutUsBackground);
            var aboutUsText = new BABYLON.GUI.TextBlock();
            aboutUsText.text = "Tomasz Furca & Artur Owsianowski";
            aboutUsText.color = "black";
            aboutUsText.fontSize = 20;
            aboutUsText.zIndex = 2;
            var aboutUsButtonClose = BABYLON.GUI.Button.CreateSimpleButton("aboutUsBackground", "Close");
            aboutUsButtonClose.width = "150px";
            aboutUsButtonClose.height = "40px";
            aboutUsButtonClose.color = "white";
            aboutUsButtonClose.cornerRadius = 20;
            aboutUsButtonClose.top = 50;
            aboutUsButtonClose.background = "orange";
            aboutUsButtonClose.zIndex = 3;
            aboutUsButtonClose.onPointerUpObservable.add(function () {
                advancedTexture.removeControl(aboutUsBackground);
            });
            aboutUsBackground.addControl(aboutUsButtonClose).addControl(aboutUsText);
        });
        advancedTexture.addControl(buttonAboutUs);
        game.scenes.push(scene);
        return _this;
    }
    return MainMenu;
}(Scene));
/// <reference path="../../game.ts"/>
/// <reference path="monster.ts"/>
var BigWorm = (function (_super) {
    __extends(BigWorm, _super);
    function BigWorm(serverKey, name, game, position, rotationQuaternion) {
        var _this = this;
        var mesh = game.characters['worm'].instance('Worm', true);
        mesh.visibility = true;
        mesh.position = position;
        mesh.rotation = rotationQuaternion;
        mesh.scaling = new BABYLON.Vector3(2, 2, 2);
        _this.hp = 125;
        _this.hpMax = 125;
        _this.attackSpeed = 100;
        _this.walkSpeed = 50;
        _this.damage = 5;
        _this.blockChance = 50;
        _this.id = serverKey;
        _this.mesh = mesh;
        _this.visibilityAreaSize = 10;
        _this.attackAreaSize = 4;
        _this.hitChange = 100;
        //this.sfxWalk = new BABYLON.Sound("WormWalk", "/babel/Characters/Worm/walk.wav", game.getScene(), null, { loop: true, autoplay: false });
        _this.sfxHit = new BABYLON.Sound("WormWalk", "/babel/Characters/Worm/hit.wav", game.getScene(), null, { loop: false, autoplay: false });
        _this = _super.call(this, name, game) || this;
        return _this;
    }
    BigWorm.prototype.runAnimationWalk = function (emit) {
        var self = this;
        var childMesh = this.mesh;
        var loopAnimation = this.isControllable;
        if (childMesh) {
            var skeleton_3 = childMesh.skeleton;
            if (emit) {
                this.emitPosition();
            }
            if (!this.animation) {
                self.animation = skeleton_3.beginAnimation('Walk', loopAnimation, 1, function () {
                    skeleton_3.beginAnimation(Character.ANIMATION_STAND_WEAPON, true);
                    self.animation = null;
                });
            }
        }
    };
    return BigWorm;
}(Monster));
/// <reference path="../../game.ts"/>
/// <reference path="monster.ts"/>
var Worm = (function (_super) {
    __extends(Worm, _super);
    function Worm(serverKey, name, game, position, rotationQuaternion) {
        var _this = this;
        var mesh = game.characters['worm'].instance('Worm', true);
        mesh.visibility = true;
        mesh.position = position;
        mesh.rotation = rotationQuaternion;
        _this.hp = 50;
        _this.hpMax = 50;
        _this.attackSpeed = 100;
        _this.walkSpeed = 30;
        _this.damage = 3;
        _this.blockChance = 50;
        _this.id = serverKey;
        _this.mesh = mesh;
        _this.visibilityAreaSize = 30;
        _this.attackAreaSize = 6;
        _this.hitChange = 100;
        //this.sfxWalk = new BABYLON.Sound("WormWalk", "/babel/Characters/Worm/walk.wav", game.getScene(), null, { loop: true, autoplay: false });
        _this.sfxHit = new BABYLON.Sound("WormWalk", "/babel/Characters/Worm/hit.wav", game.getScene(), null, { loop: false, autoplay: false });
        _this = _super.call(this, name, game) || this;
        return _this;
    }
    Worm.prototype.runAnimationWalk = function (emit) {
        var self = this;
        var childMesh = this.mesh;
        var loopAnimation = this.isControllable;
        if (childMesh) {
            var skeleton_4 = childMesh.skeleton;
            if (emit) {
                this.emitPosition();
            }
            if (!this.animation) {
                self.animation = skeleton_4.beginAnimation('Walk', loopAnimation, 1, function () {
                    skeleton_4.beginAnimation(Character.ANIMATION_STAND_WEAPON, true);
                    self.animation = null;
                });
            }
        }
    };
    return Worm;
}(Monster));
/// <reference path="../Main.ts"/>
/// <reference path="../../../bower_components/babylonjs/dist/gui/babylon.gui.d.ts"/>
var GUI;
(function (GUI) {
    var Popup = (function () {
        function Popup(guiMain) {
            this.guiMain = guiMain;
        }
        /**
         * @returns {GUI.Popup}
         */
        Popup.prototype.initTexture = function () {
            this.guiTexture = this.guiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('gui.' + this.name);
            var container = new BABYLON.GUI.StackPanel();
            container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            container.width = 0.33;
            container.height = 1;
            this.container = container;
            var image = new BABYLON.GUI.Image('gui.popup.image.' + this.name, this.imageUrl);
            image.horizontalAlignment = this.position;
            image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            image.width = 1;
            image.height = 1;
            this.guiMain.registerBlockMoveCharacter(image);
            this.container.addControl(image);
            this.containerBackground = image;
            return this;
        };
        return Popup;
    }());
    GUI.Popup = Popup;
})(GUI || (GUI = {}));
/// <reference path="Popup.ts"/>
var GUI;
(function (GUI) {
    var Attributes = (function (_super) {
        __extends(Attributes, _super);
        function Attributes(guiMain) {
            var _this = _super.call(this, guiMain) || this;
            _this.name = 'Inventory';
            _this.imageUrl = "assets/gui/attrs.png";
            _this.position = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            _this.initTexture();
            return _this;
        }
        Attributes.prototype.open = function () {
            var self = this;
            this.guiTexture.addControl(this.container);
            if (!this.buttonClose) {
                var buttonClose_1 = BABYLON.GUI.Button.CreateSimpleButton("attributesButtonClose", "Close");
                buttonClose_1.color = "white";
                buttonClose_1.background = "black";
                buttonClose_1.width = "70px;";
                buttonClose_1.height = "40px";
                buttonClose_1.horizontalAlignment = this.position;
                buttonClose_1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                buttonClose_1.onPointerUpObservable.add(function () {
                    self.close();
                    self.guiTexture.removeControl(buttonClose_1);
                    self.buttonClose = null;
                });
                this.guiMain.registerBlockMoveCharacter(buttonClose_1);
                this.guiTexture.addControl(buttonClose_1);
                this.buttonClose = buttonClose_1;
            }
        };
        Attributes.prototype.close = function () {
            this.guiTexture.removeControl(this.container);
        };
        Attributes.prototype.initData = function () {
        };
        return Attributes;
    }(GUI.Popup));
    GUI.Attributes = Attributes;
})(GUI || (GUI = {}));
/// <reference path="Popup.ts"/>
var GUI;
(function (GUI) {
    var Inventory = (function (_super) {
        __extends(Inventory, _super);
        function Inventory(guiMain) {
            var _this = _super.call(this, guiMain) || this;
            _this.name = 'Inventory';
            _this.imageUrl = "assets/gui/inventory.png";
            _this.position = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            return _this;
        }
        Inventory.prototype.open = function () {
            this.initTexture();
            var self = this;
            this.guiTexture.addControl(this.container);
            this.showItems();
            this.showEquipedItems();
            if (!this.buttonClose) {
                var buttonClose = BABYLON.GUI.Button.CreateSimpleButton("aboutUsBackground", "Close");
                buttonClose.color = "white";
                buttonClose.background = "black";
                buttonClose.width = "70px;";
                buttonClose.height = "40px";
                buttonClose.horizontalAlignment = this.position;
                buttonClose.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                buttonClose.onPointerUpObservable.add(function () {
                    self.close();
                    self.guiTexture.dispose();
                    self.buttonClose = null;
                });
                this.guiMain.registerBlockMoveCharacter(buttonClose);
                this.guiTexture.addControl(buttonClose);
                this.buttonClose = buttonClose;
            }
            return this;
        };
        Inventory.prototype.close = function () {
            this.guiTexture.removeControl(this.container);
        };
        Inventory.prototype.showEquipedItems = function () {
            this.weaponImage = new GUI.Inventory.Weapon(this);
            this.shieldImage = new GUI.Inventory.Shield(this);
            this.glovesImage = new GUI.Inventory.Gloves(this);
            this.bootsImage = new GUI.Inventory.Boots(this);
            this.armorImage = new GUI.Inventory.Armor(this);
            this.helmImage = new GUI.Inventory.Helm(this);
        };
        Inventory.prototype.showItems = function () {
            var self = this;
            ////items
            var left = -42;
            var level = 1;
            var top = 0;
            var panelItems = new BABYLON.GUI.Rectangle();
            panelItems.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            panelItems.width = "32%";
            panelItems.height = "45%";
            panelItems.top = "26%";
            panelItems.thickness = 0;
            var inventory = this.guiMain.player.inventory;
            var _loop_2 = function (i) {
                var item = inventory.items[i];
                if (i == 0) {
                    top = -35;
                }
                else if (i % 5 == 0) {
                    left = -42;
                    top = (30 * level) - 35;
                    level++;
                }
                else {
                    left += 20;
                }
                var result = new BABYLON.GUI.Button(name);
                result.width = 0.20;
                result.height = 0.3;
                result.left = left + "%";
                result.top = top + "%";
                result.thickness = 0;
                result.fontSize = '14';
                var textBlock = new BABYLON.GUI.TextBlock(i + "_guiImage", item.name);
                textBlock.top = '-25%';
                textBlock.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                result.addControl(textBlock);
                var image = this_2.createItemImage(item);
                result.addControl(image);
                panelItems.addControl(result);
                result.onPointerUpObservable.add(function () {
                    self.guiMain.game.player.inventory.mount(item);
                    self.onPointerUpItemImage(item);
                });
            };
            var this_2 = this;
            for (var i = 0; i < inventory.items.length; i++) {
                _loop_2(i);
            }
            this.guiTexture.addControl(panelItems);
            window.addEventListener('resize', function () {
                if (window.innerWidth > 1600) {
                    panelItems.height = "45%";
                    panelItems.top = "26%";
                }
                else if (window.innerWidth > 1200) {
                    panelItems.height = "30%";
                    panelItems.top = "20%";
                }
                else {
                    panelItems.height = "20%";
                    panelItems.top = "15%";
                }
            });
            return this;
        };
        /**
         * @param item
         * @returns {GUI.Inventory}
         */
        Inventory.prototype.onPointerUpItemImage = function (item) {
            switch (item.getType()) {
                case Items.Weapon.TYPE:
                    if (this.weaponImage.block) {
                        this.guiTexture.removeControl(this.weaponImage.block);
                    }
                    this.weaponImage = new GUI.Inventory.Weapon(this);
                    break;
                case Items.Shield.TYPE:
                    if (this.shieldImage.block) {
                        this.guiTexture.removeControl(this.shieldImage.block);
                    }
                    this.shieldImage = new GUI.Inventory.Shield(this);
                    break;
                case Items.Helm.TYPE:
                    if (this.helmImage.block) {
                        this.guiTexture.removeControl(this.helmImage.block);
                    }
                    this.helmImage = new GUI.Inventory.Helm(this);
                    break;
                case Items.Gloves.TYPE:
                    if (this.glovesImage.block) {
                        this.guiTexture.removeControl(this.glovesImage.block);
                    }
                    this.glovesImage = new GUI.Inventory.Gloves(this);
                    break;
                case Items.Boots.TYPE:
                    if (this.bootsImage.block) {
                        this.guiTexture.removeControl(this.bootsImage.block);
                    }
                    this.bootsImage = new GUI.Inventory.Boots(this);
                    break;
                case Items.Armor.TYPE:
                    if (this.armorImage.block) {
                        this.guiTexture.removeControl(this.armorImage.block);
                    }
                    this.armorImage = new GUI.Inventory.Armor(this);
                    break;
            }
            return this;
        };
        /**
         * @param item
         * @returns {BABYLON.GUI.Image}
         */
        Inventory.prototype.createItemImage = function (item) {
            var image = new BABYLON.GUI.Image('gui.popup.image.' + item.name, 'assets/Miniatures/' + item.image + '.png');
            image.height = 0.6;
            image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            return image;
        };
        Inventory.prototype.initData = function () {
        };
        return Inventory;
    }(GUI.Popup));
    GUI.Inventory = Inventory;
})(GUI || (GUI = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Armor = (function (_super) {
        __extends(Armor, _super);
        function Armor(game) {
            return _super.call(this, game) || this;
        }
        /**
         * @returns {number}
         */
        Armor.prototype.getType = function () {
            return Items.Armor.TYPE;
        };
        Armor.TYPE = 6;
        return Armor;
    }(Items.Item));
    Items.Armor = Armor;
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Armors;
    (function (Armors) {
        var PrimaryArmor = (function (_super) {
            __extends(PrimaryArmor, _super);
            function PrimaryArmor(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Armor';
                _this.image = 'Armor';
                _this.mountType = 2;
                _this.mesh = _this.game.characters.player.instance('Armor', false);
                _this.mesh.visibility = 0;
                return _this;
            }
            return PrimaryArmor;
        }(Items.Armor));
        Armors.PrimaryArmor = PrimaryArmor;
    })(Armors = Items.Armors || (Items.Armors = {}));
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Boots = (function (_super) {
        __extends(Boots, _super);
        function Boots(game) {
            return _super.call(this, game) || this;
        }
        /**
         * @returns {number}
         */
        Boots.prototype.getType = function () {
            return Items.Boots.TYPE;
        };
        Boots.TYPE = 5;
        return Boots;
    }(Items.Item));
    Items.Boots = Boots;
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Boots;
    (function (Boots) {
        var PrimaryBoots = (function (_super) {
            __extends(PrimaryBoots, _super);
            function PrimaryBoots(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Boots';
                _this.image = 'Boots';
                _this.mountType = 2;
                _this.mesh = _this.game.characters.player.instance('Boots', false);
                _this.mesh.visibility = 0;
                return _this;
            }
            return PrimaryBoots;
        }(Boots));
        Boots.PrimaryBoots = PrimaryBoots;
    })(Boots = Items.Boots || (Items.Boots = {}));
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Gloves = (function (_super) {
        __extends(Gloves, _super);
        function Gloves(game) {
            return _super.call(this, game) || this;
        }
        /**
         * @returns {number}
         */
        Gloves.prototype.getType = function () {
            return Items.Gloves.TYPE;
        };
        Gloves.TYPE = 4;
        return Gloves;
    }(Items.Item));
    Items.Gloves = Gloves;
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Gloves;
    (function (Gloves) {
        var PrimaryGloves = (function (_super) {
            __extends(PrimaryGloves, _super);
            function PrimaryGloves(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Gloves';
                _this.image = 'Gloves';
                _this.mountType = 2;
                _this.mesh = _this.game.characters.player.instance('Gloves', false);
                _this.mesh.visibility = 0;
                return _this;
            }
            return PrimaryGloves;
        }(Gloves));
        Gloves.PrimaryGloves = PrimaryGloves;
    })(Gloves = Items.Gloves || (Items.Gloves = {}));
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Helm = (function (_super) {
        __extends(Helm, _super);
        function Helm(game) {
            return _super.call(this, game) || this;
        }
        /**
         * @returns {number}
         */
        Helm.prototype.getType = function () {
            return Items.Helm.TYPE;
        };
        Helm.TYPE = 3;
        return Helm;
    }(Items.Item));
    Items.Helm = Helm;
})(Items || (Items = {}));
/// <reference path="Helm.ts"/>
var Items;
(function (Items) {
    var Helms;
    (function (Helms) {
        var PrimaryHelm = (function (_super) {
            __extends(PrimaryHelm, _super);
            function PrimaryHelm(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Helm';
                _this.image = 'Helm';
                _this.mountType = 2;
                _this.mesh = _this.game.characters.player.instance('Helm', false);
                _this.mesh.visibility = 0;
                return _this;
            }
            return PrimaryHelm;
        }(Items.Helm));
        Helms.PrimaryHelm = PrimaryHelm;
    })(Helms = Items.Helms || (Items.Helms = {}));
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Shield = (function (_super) {
        __extends(Shield, _super);
        function Shield(game) {
            return _super.call(this, game) || this;
        }
        /**
         * @returns {number}
         */
        Shield.prototype.getType = function () {
            return Items.Shield.TYPE;
        };
        Shield.TYPE = 2;
        return Shield;
    }(Items.Item));
    Items.Shield = Shield;
})(Items || (Items = {}));
/// <reference path="Shield.ts"/>
var Items;
(function (Items) {
    var Shields;
    (function (Shields) {
        var BigWoodShield = (function (_super) {
            __extends(BigWoodShield, _super);
            function BigWoodShield(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Big Wood Shield';
                _this.image = 'Shield';
                _this.mountType = 1;
                _this.mountBoneName = 'shield.bone';
                _this.mesh = _this.game.items.shield.instance('Shield', false);
                _this.mesh.visibility = 0;
                _this.mesh.scaling = new BABYLON.Vector3(1, 2, 1);
                return _this;
            }
            return BigWoodShield;
        }(Items.Shield));
        Shields.BigWoodShield = BigWoodShield;
    })(Shields = Items.Shields || (Items.Shields = {}));
})(Items || (Items = {}));
/// <reference path="Shield.ts"/>
var Items;
(function (Items) {
    var Shields;
    (function (Shields) {
        var WoodShield = (function (_super) {
            __extends(WoodShield, _super);
            function WoodShield(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Wood Shield';
                _this.image = 'Shield';
                _this.mountType = 1;
                _this.mountBoneName = 'shield.bone';
                _this.mesh = _this.game.items.shield.instance('Shield', false);
                _this.mesh.visibility = 0;
                return _this;
            }
            return WoodShield;
        }(Items.Shield));
        Shields.WoodShield = WoodShield;
    })(Shields = Items.Shields || (Items.Shields = {}));
})(Items || (Items = {}));
/// <reference path="../Item.ts"/>
var Items;
(function (Items) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(game) {
            return _super.call(this, game) || this;
        }
        /**
         * @returns {number}
         */
        Weapon.prototype.getType = function () {
            return Items.Weapon.TYPE;
        };
        Weapon.TYPE = 1;
        return Weapon;
    }(Items.Item));
    Items.Weapon = Weapon;
})(Items || (Items = {}));
/// <reference path="Weapon.ts"/>
var Items;
(function (Items) {
    var Weapons;
    (function (Weapons) {
        var BigSword = (function (_super) {
            __extends(BigSword, _super);
            function BigSword(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Big Sword';
                _this.image = 'BigSword';
                _this.mountType = 1;
                _this.mountBoneName = 'weapon.bone';
                _this.mesh = _this.game.items.sword.instance('Sword', false);
                _this.mesh.visibility = 0;
                _this.mesh.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
                _this.sfxHit = new BABYLON.Sound("Fire", "/babel/Items/Sword/Sword.wav", _this.game.getScene(), null, {
                    loop: false,
                    autoplay: false
                });
                return _this;
            }
            return BigSword;
        }(Items.Weapon));
        Weapons.BigSword = BigSword;
    })(Weapons = Items.Weapons || (Items.Weapons = {}));
})(Items || (Items = {}));
/// <reference path="Weapon.ts"/>
var Items;
(function (Items) {
    var Weapons;
    (function (Weapons) {
        var Sword = (function (_super) {
            __extends(Sword, _super);
            function Sword(game) {
                var _this = _super.call(this, game) || this;
                _this.name = 'Sword';
                _this.image = 'Sword';
                _this.mountType = 1;
                _this.mountBoneName = 'weapon.bone';
                _this.mesh = _this.game.items.sword.instance('Sword', false);
                _this.mesh.visibility = 0;
                _this.sfxHit = new BABYLON.Sound("Fire", "/babel/Items/Sword/Sword.wav", _this.game.getScene(), null, {
                    loop: false,
                    autoplay: false
                });
                return _this;
            }
            return Sword;
        }(Items.Weapon));
        Weapons.Sword = Sword;
    })(Weapons = Items.Weapons || (Items.Weapons = {}));
})(Items || (Items = {}));
/// <reference path="../Inventory.ts"/>
var GUI;
(function (GUI) {
    var Inventory;
    (function (Inventory) {
        var EquipBlock = (function () {
            function EquipBlock(inventory) {
                this.inventory = inventory;
            }
            /**
             * @returns {GUI.Inventory.EquipBlock}
             */
            EquipBlock.prototype.createBlockWithImage = function () {
                if (this.item) {
                    var panelItem = new BABYLON.GUI.Rectangle();
                    panelItem.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    panelItem.thickness = 0;
                    panelItem.width = this.blockWidth;
                    panelItem.height = this.blockHeight;
                    panelItem.top = this.blockTop;
                    panelItem.left = this.blockLeft;
                    this.inventory.guiTexture.addControl(panelItem);
                    this.block = panelItem;
                    this.createImage();
                }
                return this;
            };
            /**
             * @returns {GUI.Inventory.EquipBlock}
             */
            EquipBlock.prototype.createImage = function () {
                var self = this;
                var image = this.inventory.createItemImage(this.item);
                this.inventory.guiMain.registerBlockMoveCharacter(image);
                image.onPointerUpObservable.add(function () {
                    self.inventory.guiMain.game.player.inventory.umount(self.item);
                    self.inventory.guiTexture.removeControl(self.block);
                });
                this.block.addControl(image);
                return this;
            };
            return EquipBlock;
        }());
        Inventory.EquipBlock = EquipBlock;
    })(Inventory = GUI.Inventory || (GUI.Inventory = {}));
})(GUI || (GUI = {}));
/// <reference path="EquipBlock.ts"/>
var GUI;
(function (GUI) {
    var Inventory;
    (function (Inventory) {
        var Armor = (function (_super) {
            __extends(Armor, _super);
            function Armor(inventory) {
                var _this = _super.call(this, inventory) || this;
                _this.blockWidth = "15%";
                _this.blockHeight = "30%";
                _this.blockTop = "-25%";
                _this.blockLeft = "-8%";
                _this.item = inventory.guiMain.player.inventory.armor;
                _this.createBlockWithImage();
                return _this;
            }
            return Armor;
        }(Inventory.EquipBlock));
        Inventory.Armor = Armor;
    })(Inventory = GUI.Inventory || (GUI.Inventory = {}));
})(GUI || (GUI = {}));
/// <reference path="EquipBlock.ts"/>
var GUI;
(function (GUI) {
    var Inventory;
    (function (Inventory) {
        var Boots = (function (_super) {
            __extends(Boots, _super);
            function Boots(inventory) {
                var _this = _super.call(this, inventory) || this;
                _this.blockWidth = "4%";
                _this.blockHeight = "20%";
                _this.blockTop = "-10%";
                _this.blockLeft = "-23.5%";
                _this.item = inventory.guiMain.player.inventory.boots;
                _this.createBlockWithImage();
                return _this;
            }
            return Boots;
        }(Inventory.EquipBlock));
        Inventory.Boots = Boots;
    })(Inventory = GUI.Inventory || (GUI.Inventory = {}));
})(GUI || (GUI = {}));
/// <reference path="EquipBlock.ts"/>
var GUI;
(function (GUI) {
    var Inventory;
    (function (Inventory) {
        var Gloves = (function (_super) {
            __extends(Gloves, _super);
            function Gloves(inventory) {
                var _this = _super.call(this, inventory) || this;
                _this.blockWidth = "5%";
                _this.blockHeight = "20%";
                _this.blockTop = "-11%";
                _this.blockLeft = "-4%";
                _this.item = inventory.guiMain.player.inventory.gloves;
                _this.createBlockWithImage();
                return _this;
            }
            return Gloves;
        }(Inventory.EquipBlock));
        Inventory.Gloves = Gloves;
    })(Inventory = GUI.Inventory || (GUI.Inventory = {}));
})(GUI || (GUI = {}));
/// <reference path="EquipBlock.ts"/>
var GUI;
(function (GUI) {
    var Inventory;
    (function (Inventory) {
        var Helm = (function (_super) {
            __extends(Helm, _super);
            function Helm(inventory) {
                var _this = _super.call(this, inventory) || this;
                _this.blockWidth = "6%";
                _this.blockHeight = "20%";
                _this.blockTop = "-44%";
                _this.blockLeft = "-13%";
                _this.item = inventory.guiMain.player.inventory.helm;
                _this.createBlockWithImage();
                return _this;
            }
            return Helm;
        }(Inventory.EquipBlock));
        Inventory.Helm = Helm;
    })(Inventory = GUI.Inventory || (GUI.Inventory = {}));
})(GUI || (GUI = {}));
/// <reference path="EquipBlock.ts"/>
var GUI;
(function (GUI) {
    var Inventory;
    (function (Inventory) {
        var Shield = (function (_super) {
            __extends(Shield, _super);
            function Shield(inventory) {
                var _this = _super.call(this, inventory) || this;
                _this.blockWidth = "6%";
                _this.blockHeight = "20%";
                _this.blockTop = "-27%";
                _this.blockLeft = "-3%";
                _this.item = inventory.guiMain.player.inventory.shield;
                _this.createBlockWithImage();
                return _this;
            }
            return Shield;
        }(Inventory.EquipBlock));
        Inventory.Shield = Shield;
    })(Inventory = GUI.Inventory || (GUI.Inventory = {}));
})(GUI || (GUI = {}));
/// <reference path="EquipBlock.ts"/>
var GUI;
(function (GUI) {
    var Inventory;
    (function (Inventory) {
        var Weapon = (function (_super) {
            __extends(Weapon, _super);
            function Weapon(inventory) {
                var _this = _super.call(this, inventory) || this;
                _this.blockWidth = "6%";
                _this.blockHeight = "20%";
                _this.blockTop = "-27%";
                _this.blockLeft = "-22.5%";
                _this.item = inventory.guiMain.player.inventory.weapon;
                _this.createBlockWithImage();
                return _this;
            }
            return Weapon;
        }(Inventory.EquipBlock));
        Inventory.Weapon = Weapon;
    })(Inventory = GUI.Inventory || (GUI.Inventory = {}));
})(GUI || (GUI = {}));
