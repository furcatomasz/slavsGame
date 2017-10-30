/// <reference path="../../babylon/babylon.d.ts"/>
/// <reference path="../game.ts"/>

abstract class AbstractCharacter {

    public static WALK_SPEED:number = 1.8;
    public static ROTATION_SPEED:number = 0.05;

    public static ANIMATION_WALK:string = 'Run';
    public static ANIMATION_STAND:string = 'stand';
    public static ANIMATION_STAND_WEAPON:string = 'Stand_with_weapon';
    public static ANIMATION_ATTACK:string = 'Attack';
    public static ANIMATION_SKILL_01:string = 'Skill01';

    public mesh:BABYLON.Mesh;
    public id:string;
    public name:string;

    public x:number;
    public y:number;
    public z:number;

    /** Character atuts */
    public statistics: Attributes.CharacterStatistics;

    protected game:Game;
    protected speed:number;
    public animation:BABYLON.Animatable;
    protected afterRender;
    protected isControllable:boolean;
    protected attackAnimation: boolean;
    protected attackHit: boolean;
    public attackArea:BABYLON.Mesh;

    public sfxWalk: BABYLON.Sound;
    protected sfxHit: BABYLON.Sound;

    public bloodParticles: BABYLON.ParticleSystem;

    constructor(name:string, game:Game) {
        this.game = game;
        this.mesh.skeleton.beginAnimation(AbstractCharacter.ANIMATION_STAND_WEAPON, true);
    }

    public mount(mesh, boneName) {
        var boneIndice = -1;
        var meshCharacter = this.mesh;
        let skeleton = meshCharacter.skeleton;

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


    /**
     * ANIMATIONS
     */
    public runAnimationHit(animation: string, callbackStart = null, callbackEnd = null):void {
        if (!this.animation) {
            let self = this;
            var childMesh = this.mesh;

            if (childMesh) {
                let skeleton = childMesh.skeleton;
                if(skeleton) {
                    this.game.client.socket.emit('attack', {
                        attack: true
                    });

                    self.attackAnimation = true;
                    self.onHitStart();
                    if(callbackEnd) {
                        callbackStart();
                    }
                    self.animation = skeleton.beginAnimation(animation, false, this.statistics.getAttackSpeed() / 100, function () {
                        if(callbackEnd) {
                            callbackEnd();
                        }
                        skeleton.beginAnimation(AbstractCharacter.ANIMATION_STAND_WEAPON, true);
                        self.animation = null;
                        self.attackAnimation = false;
                        self.game.controller.attackPoint = null;
                        self.onHitEnd();

                        self.game.client.socket.emit('attack', {
                            attack: false
                        });
                    });
                }
            }
        }
    }

    public emitPosition() {
        let rotation;

        if (this.game.client.socket) {
            if (this.mesh.rotationQuaternion) {
                rotation = this.mesh.rotationQuaternion;
            } else {
                rotation = new BABYLON.Quaternion(0, 0, 0, 0);
            }

            this.game.client.socket.emit('moveTo', {
                p: this.mesh.position,
                r: rotation
            });
        }
    }

    public runAnimationWalk(emit:boolean):void {
        let self = this;
        var childMesh = this.mesh;
        let loopAnimation = this.isControllable;

        if (childMesh) {
            let skeleton = childMesh.skeleton;



            if (!this.animation && skeleton) {
                self.sfxWalk.play();
                self.onWalkStart();
                self.animation = skeleton.beginAnimation(AbstractCharacter.ANIMATION_WALK, loopAnimation, this.statistics.getWalkSpeed() / 100, function () {
                    skeleton.beginAnimation(AbstractCharacter.ANIMATION_STAND_WEAPON, true);
                    self.animation = null;
                    self.sfxWalk.stop();
                    self.onWalkEnd();
                    if (emit) {
                        self.emitPosition();
                    }
                });


            }

        }
    }

    public isAnimationEnabled() {
        return this.animation;
    }

    abstract removeFromWorld();

    /** Events */
    protected onHitStart() {};
    protected onHitEnd() {};

    protected onWalkStart() {};
    protected onWalkEnd() {};
}