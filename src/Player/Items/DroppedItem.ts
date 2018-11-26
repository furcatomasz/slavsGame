namespace Items {
    export class DroppedItem {

        public static showItem(game: Game, item: Item, position: BABYLON.Vector3, itemDropKey: number) {
            let scene = game.getScene();

            let droppedItemBox = BABYLON.Mesh.CreateBox(item.name + '_Box', 3, scene, false);
            droppedItemBox.checkCollisions = false;
            droppedItemBox.visibility = 0;

            droppedItemBox.position.x = position.x;
            droppedItemBox.position.z = position.z;
            droppedItemBox.position.y = 0;

            let itemSpriteManager = new BABYLON.SpriteManager("playerManager",'assets/Miniatures/' + item.image + '.png', 1, {width: 512, height: 512}, scene);
            let itemSprite = new BABYLON.Sprite("player", itemSpriteManager);
            itemSprite.width = 1.8;
            itemSprite.height = 1.8;
            itemSprite.position.x = position.x;
            itemSprite.position.z = position.z;
            itemSprite.position.y = 1.5;
            itemSpriteManager.layerMask = 2;

            const animationBounce = BounceAnimation.getAnimation();
            itemSprite.animations.push(animationBounce);
            scene.beginAnimation(itemSprite, 0, 30, true);

            let tooltip = null;
            droppedItemBox.actionManager = new BABYLON.ActionManager(scene);
            droppedItemBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,
                function () {
                    tooltip = new TooltipMesh(droppedItemBox, item.name);
                }));

            droppedItemBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,
                function () {
                    tooltip.container.dispose();
                }));

            droppedItemBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
                function () {
                    game.gui.playerLogsPanel.addText(item.name + '  has been picked up.', 'green');
                    game.client.socket.emit('addDroppedItem', itemDropKey);
                    droppedItemBox.dispose();
                    tooltip.container.dispose();
                    itemSprite.dispose();
                }));

            let particleSystem = new Particles.DroppedItem(game, droppedItemBox);
            particleSystem.particleSystem.start();
            droppedItemBox.freezeWorldMatrix();
        }
    }
}