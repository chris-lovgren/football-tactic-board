/**
 * Main Application Module
 * Initializes and coordinates all other modules
 */

import { Team } from './player.js';
import { DragDropManager } from './drag-drop.js';
import { PitchRenderer } from './pitch.js';

class FootballTacticsBoard {
    constructor() {
        this.pitchElement = document.getElementById('pitch');
        this.redTeamPool = document.getElementById('red-team-pool');
        this.blueTeamPool = document.getElementById('blue-team-pool');

        this.initialize();
    }

    initialize() {
        // Initialize teams
        this.redTeam = new Team('red');
        this.blueTeam = new Team('blue');

        // Initialize pitch renderer
        this.pitchRenderer = new PitchRenderer(this.pitchElement);

        // Initialize drag and drop manager
        this.dragDropManager = new DragDropManager(this.pitchElement);

        // Add players to their respective pools
        this.addPlayersToPools();
    }

    addPlayersToPools() {
        // Add red team players to pool
        this.redTeam.players.forEach(player => {
            this.redTeamPool.appendChild(player.element);
        });

        // Add blue team players to pool
        this.blueTeam.players.forEach(player => {
            this.blueTeamPool.appendChild(player.element);
        });
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FootballTacticsBoard();
}); 