/**
 * Pitch Rendering Module
 * Handles the visual representation of the football pitch
 */

export class PitchRenderer {
    constructor(pitchElement) {
        this.pitchElement = pitchElement;
        this.initializePitch();
    }

    initializePitch() {
        // Add pitch markings
        this.addCenterCircle();
        this.addPenaltyAreas();
        this.addHalfwayLine();
        this.addCenterSpot();
        this.addPenaltySpots();
    }

    addCenterCircle() {
        const centerCircle = document.createElement('div');
        centerCircle.className = 'center-circle';
        this.pitchElement.appendChild(centerCircle);
    }

    addPenaltyAreas() {
        // Left penalty area
        const leftPenaltyArea = document.createElement('div');
        leftPenaltyArea.className = 'penalty-area left';
        this.pitchElement.appendChild(leftPenaltyArea);

        // Right penalty area
        const rightPenaltyArea = document.createElement('div');
        rightPenaltyArea.className = 'penalty-area right';
        this.pitchElement.appendChild(rightPenaltyArea);
    }

    addHalfwayLine() {
        const halfwayLine = document.createElement('div');
        halfwayLine.className = 'halfway-line';
        this.pitchElement.appendChild(halfwayLine);
    }

    addCenterSpot() {
        const centerSpot = document.createElement('div');
        centerSpot.className = 'center-spot';
        this.pitchElement.appendChild(centerSpot);
    }

    addPenaltySpots() {
        // Left penalty spot
        const leftPenaltySpot = document.createElement('div');
        leftPenaltySpot.className = 'penalty-spot left';
        this.pitchElement.appendChild(leftPenaltySpot);

        // Right penalty spot
        const rightPenaltySpot = document.createElement('div');
        rightPenaltySpot.className = 'penalty-spot right';
        this.pitchElement.appendChild(rightPenaltySpot);
    }

    addPlayerToPitch(playerElement) {
        this.pitchElement.appendChild(playerElement);
    }

    removePlayerFromPitch(playerElement) {
        if (playerElement.parentNode === this.pitchElement) {
            this.pitchElement.removeChild(playerElement);
        }
    }
} 