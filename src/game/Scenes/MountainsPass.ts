import {Scene} from "./Scene";
import {Game} from "../Game";
import {EnvironmentMountainsPass} from "../Environment/environmentMountainsPass";
import {Guard} from "../Characters/npc/Guard";
import * as BABYLON from 'babylonjs';

export class MountainsPass extends Scene {

    static TYPE = 5;

    initScene(game: Game) {
        let self = this;
        BABYLON.SceneLoader.Load("assets/scenes/MountainsPass/", "MountainsPass.babylon", game.engine, function (scene) {
            self
                .setDefaults(game, scene)
                .executeWhenReady(function () {
                    self.environment = new EnvironmentMountainsPass(game);
                }, function() {
                    new Guard(game, new BABYLON.Vector3(-117, 0, 128), new BABYLON.Vector3(0, -4.3, 0));
                    // new NPC.Trader(game, new BABYLON.Vector3(-122, 0, -16), new BABYLON.Vector3(0, 0.7, 0));
                    // new NPC.BigWarrior(game, new BABYLON.Vector3(-10, 0, -53), new BABYLON.Vector3(0, 1.54, 0));

                });
        });
    }

}
