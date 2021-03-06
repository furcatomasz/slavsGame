import {MountainsEnvironment} from "../MountainsEnvironment";
import {Game} from "../../../Game";
import * as BABYLON from 'babylonjs';

export class EnvironmentCaveExit extends MountainsEnvironment {

    colliders: Array<BABYLON.AbstractMesh>;

    constructor(game: Game) {
        super();
        const scene = game.getBabylonScene();
        this.colliders = [];
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        for (let i = 0; i < scene.meshes.length; i++) {
            let sceneMesh = <BABYLON.Mesh> scene.meshes[i];
            let meshName = scene.meshes[i]['name'];
            if (meshName.search("Ground") >= 0) {
                sceneMesh.actionManager = new BABYLON.ActionManager(scene);
                sceneMesh.receiveShadows = true;
                sceneMesh.alwaysSelectAsActiveMesh = true;
                sceneMesh.material = this.createStencilMaterial('/assets/scenes/caveExit/stencil1.png', scene);
                this.ground = sceneMesh;

            } else if (meshName.search("Box_Cube") >= 0) {
                this.colliders.push(sceneMesh);
            } else {
                sceneMesh.isPickable = false;

                if (meshName.search("Rock") >= 0) {
                    continue;
                }

                this.staticShadowObjects.push(sceneMesh);
            }
        }

        this.createDefaultLight(scene);
        this.registerColliders(scene);
        this.freezeAllMeshes(scene);
    }

    createStecnil(scene: BABYLON.Scene) {
    }


}
