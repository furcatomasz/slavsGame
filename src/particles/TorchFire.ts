/// <reference path="AbstractParticle.ts"/>

namespace Particles {
    export class TorchFire extends AbstractParticle {

        protected initParticleSystem() {
            var fireSystem = new BABYLON.GPUParticleSystem("particles", { capacity: 20 }, this.game.getScene());

            fireSystem.particleTexture = new BABYLON.Texture("assets/flare.png", this.game.getScene());

            fireSystem.emitter = this.emitter;
            fireSystem.minEmitBox = new BABYLON.Vector3(1, 0, 1);
            fireSystem.maxEmitBox = new BABYLON.Vector3(-1, 0, -1);

            fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

            fireSystem.minSize = 0.4;
            fireSystem.maxSize = 1;

            fireSystem.minLifeTime = 0.2;
            fireSystem.maxLifeTime = 0.8;

            fireSystem.emitRate = 20;

            fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

            fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

            fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
            fireSystem.direction2 = new BABYLON.Vector3(0, 10, 0);

            fireSystem.minAngularSpeed = -10;
            fireSystem.maxAngularSpeed = Math.PI;

            fireSystem.minEmitPower = 1;
            fireSystem.maxEmitPower = 3;
            fireSystem.updateSpeed = 0.007;

            this.particleSystem = fireSystem;
        }
    }
}