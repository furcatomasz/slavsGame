/// <reference path="Popup.ts"/>

namespace GUI {
    export class Inventory extends Popup {

        constructor(guiMain: GUI.Main) {
            super(guiMain);
            this.name = 'Inventory';
            this.imageUrl = "assets/gui/inventory.png";
            this.position = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        }

        public open() {
            this.initTexture();

            let self = this;
            this.guiTexture.addControl(this.container);
            this.showItems();
            if (!this.buttonClose) {
                let buttonClose = BABYLON.GUI.Button.CreateSimpleButton("aboutUsBackground", "Close");
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
        }

        public close() {
            this.guiTexture.removeControl(this.container);
        }

        protected showItems() {

            ////items
            let left = -42;
            let level = 1;
            let top = 0;
            var panelItems = new BABYLON.GUI.Rectangle();
            panelItems.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            panelItems.width = "32%";
            panelItems.height = "45%";
            panelItems.top = "26%";
            panelItems.thickness = 0;

            let inventory = this.guiMain.player.inventory;
            for (var i = 0; i < inventory.items.length; i++) {

                let item = inventory.items[i];

                if(i == 0) {
                    top = -35;
                } else if(i % 5 == 0) {
                    left = -42;
                    top = (30 * level)-35;
                    level++;
                } else {
                    left += 20;
                }

                var result = new BABYLON.GUI.Button(name);
                result.width = 0.20;
                result.height = 0.3;
                result.left = left+"%";
                result.top = top+"%";
                result.thickness = 0;

                var textBlock = new BABYLON.GUI.TextBlock(i + "_guiImage", item.name);
                //textBlock.textWrapping = true;
                textBlock.top = -40;
                textBlock.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                result.addControl(textBlock);

                let image = new BABYLON.GUI.Image('gui.popup.image.'+this.name, 'assets/Miniatures/'+item.name +'.png');
                image.height = 0.6;

                image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

                result.addControl(image);
                panelItems.addControl(result);
            }

            this.guiTexture.addControl(panelItems);

            window.addEventListener('resize', function(){
                if(window.innerWidth > 1600) {
                    panelItems.height = "45%";
                    panelItems.top = "26%";
                } else if(window.innerWidth > 1200) {
                    panelItems.height = "30%";
                    panelItems.top = "20%";
                } else {
                    panelItems.height = "20%";
                    panelItems.top = "15%";
                }

            });

            return this;
        }

        public initData() {
        }
}