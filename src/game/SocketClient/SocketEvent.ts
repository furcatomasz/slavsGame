import {Game} from "../Game";

export abstract class SocketEvent {

    protected game: Game;
    protected socket;

    constructor(game: Game, socket) {
        this.game = game;
        this.socket = socket;
    }

    abstract listen();
}
