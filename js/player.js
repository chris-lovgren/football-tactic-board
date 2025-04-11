/**
 * Player Management Module
 * Handles player creation, positioning, and team management
 */

export class Player {
    constructor(number, team, position = null) {
        this.number = number;
        this.team = team;
        this.position = position;
        this.element = this.createPlayerElement();
    }

    createPlayerElement() {
        const playerElement = document.createElement('div');
        playerElement.className = `player ${this.team}-player`;
        playerElement.textContent = this.number;
        playerElement.draggable = true;
        playerElement.dataset.playerNumber = this.number;
        playerElement.dataset.team = this.team;
        return playerElement;
    }

    setPosition(x, y) {
        this.position = { x, y };
        this.element.style.position = 'absolute';
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    resetPosition() {
        this.position = null;
        this.element.style.position = '';
        this.element.style.left = '';
        this.element.style.top = '';
    }
}

export class Team {
    constructor(color, size = 11) {
        this.color = color;
        this.players = [];
        this.createPlayers(size);
    }

    createPlayers(size) {
        for (let i = 1; i <= size; i++) {
            this.players.push(new Player(i, this.color));
        }
    }

    getPlayerByNumber(number) {
        return this.players.find(player => player.number === number);
    }
} 