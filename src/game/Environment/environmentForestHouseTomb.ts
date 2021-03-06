import {Game} from "../Game";
import {AbstractEnvironment} from "./AbstractEnvironment";
import {Collisions} from "../Initializers/Collisions";
import * as BABYLON from 'babylonjs';

export class EnvironmentForestHouseTomb extends AbstractEnvironment{

    colliders: Array<BABYLON.AbstractMesh>;

    constructor(game: Game, scene: BABYLON.Scene) {
        super();
        let self = this;
        this.colliders = [];

        for (let i = 0; i < scene.meshes.length; i++) {
            let sceneMesh = <BABYLON.Mesh> scene.meshes[i];
            let meshName = scene.meshes[i]['name'];

            if (meshName.search("Ground") >= 0) {
                sceneMesh.actionManager = new BABYLON.ActionManager(scene);
                sceneMesh.receiveShadows = true;
                //TODO: fix material
                // sceneMesh.material.diffuseTexture.uScale = 1.2;
                // sceneMesh.material.diffuseTexture.vScale = 1.2;

                this.ground = sceneMesh;

            } else if (meshName.search("Box_Cube") >= 0) {

                this.colliders.push(sceneMesh);

            } else {
                sceneMesh.isPickable = false;
            }
        }


        var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
        light.intensity = 0.4;
        light.position = new BABYLON.Vector3(0, 80, -210);
        light.direction = new BABYLON.Vector3(0.45, -0.45, 0.45);

        ///register colliders
        for (let i = 0; i < this.colliders.length; i++) {
            let sceneMeshCollider = this.colliders[i];
            Collisions.setCollider(scene, sceneMeshCollider);
        }

        //Freeze world matrix all static meshes
        for (let i = 0; i < scene.meshes.length; i++) {
            scene.meshes[i].freezeWorldMatrix();
        }
    }

    createStecnil(scene: BABYLON.Scene) {
    }



}
