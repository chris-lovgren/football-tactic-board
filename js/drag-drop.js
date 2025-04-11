/**
 * Drag and Drop Module
 * Handles all drag and drop interactions for players
 */

export class DragDropManager {
    constructor(pitchElement) {
        this.pitchElement = pitchElement;
        this.draggedPlayer = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add event listeners to the pitch
        this.pitchElement.addEventListener('dragover', this.handleDragOver.bind(this));
        this.pitchElement.addEventListener('drop', this.handleDrop.bind(this));
        
        // Add event listeners to player elements
        document.addEventListener('dragstart', this.handleDragStart.bind(this));
        document.addEventListener('dragend', this.handleDragEnd.bind(this));

        // Add event listeners to team pools
        const teamPools = document.querySelectorAll('.player-pool');
        teamPools.forEach(pool => {
            pool.addEventListener('dragover', this.handleDragOver.bind(this));
            pool.addEventListener('drop', this.handleDrop.bind(this));
        });
    }

    handleDragStart(event) {
        if (!event.target.classList.contains('player')) return;
        
        this.draggedPlayer = event.target;
        event.dataTransfer.setData('text/plain', event.target.dataset.playerNumber);
        event.target.style.opacity = '0.5';
    }

    handleDragEnd(event) {
        if (!event.target.classList.contains('player')) return;
        
        event.target.style.opacity = '1';
        this.draggedPlayer = null;
    }

    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    handleDrop(event) {
        event.preventDefault();
        
        if (!this.draggedPlayer) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - (this.draggedPlayer.offsetWidth / 2);
        const y = event.clientY - rect.top - (this.draggedPlayer.offsetHeight / 2);

        // If dropping in the pitch
        if (event.currentTarget === this.pitchElement) {
            // Ensure player stays within pitch boundaries
            const maxX = rect.width - this.draggedPlayer.offsetWidth;
            const maxY = rect.height - this.draggedPlayer.offsetHeight;

            const boundedX = Math.max(0, Math.min(x, maxX));
            const boundedY = Math.max(0, Math.min(y, maxY));

            this.draggedPlayer.style.position = 'absolute';
            this.draggedPlayer.style.left = `${boundedX}px`;
            this.draggedPlayer.style.top = `${boundedY}px`;

            // Move player to pitch if it's not already there
            if (this.draggedPlayer.parentNode !== this.pitchElement) {
                this.pitchElement.appendChild(this.draggedPlayer);
            }

            // Dispatch custom event for position update
            const positionUpdateEvent = new CustomEvent('playerPositionUpdate', {
                detail: {
                    player: this.draggedPlayer,
                    position: { x: boundedX, y: boundedY }
                }
            });
            this.pitchElement.dispatchEvent(positionUpdateEvent);
        } 
        // If dropping in a team pool
        else if (event.currentTarget.classList.contains('player-pool')) {
            // Reset player position
            this.draggedPlayer.style.position = '';
            this.draggedPlayer.style.left = '';
            this.draggedPlayer.style.top = '';
            
            // Move player to the pool
            event.currentTarget.appendChild(this.draggedPlayer);
        }
    }
} 