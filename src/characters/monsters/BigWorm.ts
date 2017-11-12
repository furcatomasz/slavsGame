/// <reference path="../../game.ts"/>
/// <reference path="monster.ts"/>

class BigWorm extends Monster {

    constructor(serverKey: number, name:string, game:Game, position: BABYLON.Vector3, rotationQuaternion: BABYLON.Quaternion) {

        let mesh = game.factories['worm'].createInstance('Worm', true);

        mesh.visibility = true;
        mesh.position = position;
        mesh.rotation = rotationQuaternion;
        mesh.scaling = new BABYLON.Vector3(2,2,2);
        this.statistics = new Attributes.CharacterStatistics(125,125,100,5,10,50,0,100);
        this.id = serverKey;
        this.mesh = mesh;
        this.visibilityAreaSize = 10;
        this.attackAreaSize = 4;

        //this.sfxWalk = new BABYLON.Sound("WormWalk", "/babel/Characters/Worm/walk.wav", game.getScene(), null, { loop: true, autoplay: false });
        this.sfxHit = new BABYLON.Sound("WormWalk", "/assets/Characters/Worm/hit.wav", game.getScene(), null, { loop: false, autoplay: false });
        super(name, game);
    }

    public runAnimationWalk():void {
        let self = this;
        var childMesh = this.mesh;
        let loopAnimation = this.isControllable;

        if (childMesh) {
            let skeleton = childMesh.skeleton;

            if (!this.animation) {
                self.animation = skeleton.beginAnimation('Walk', loopAnimation, 1, function () {
                    skeleton.beginAnimation(AbstractCharacter.ANIMATION_STAND_WEAPON, true);
                    self.animation = null;
                });


            }

        }
    }
    
}
