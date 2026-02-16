import { Component, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { AddPlayLogPayload } from './add-play-log.model';

export type { AddPlayLogPayload } from './add-play-log.model';

@Component({
    selector: '[add-play-log]',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './add-play-log.html',
    styleUrl: './add-play-log.scss',
    encapsulation: ViewEncapsulation.None,
})
export class AddPlayLogComponent {
// CANCEL
    cancel = output<void>();

    onCancel() {
        this.cancel.emit();
    }

// ADD PLAY
    addPlayLog = output<AddPlayLogPayload>();

    // Form model
    date = '';
    gameName = '';
    winnerName = '';

    onAddContent() {
        this.addPlayLog.emit({
            date: this.date,
            gameName: this.gameName,
            playerNames: this.playerNames.slice(0, this.numberOfPlayers),
            winnerName: this.winnerName,
        });
    }

    // NUMBER OF PLAYERS
    // Template Bindings
    readonly playerCountOptions = [1, 2, 3, 4, 5, 6, 7, 8]; // Option standard values
    numberOfPlayers = 4; // Default number of players
    playerNames: string[] = ['', '', '', ''];

    // Temporary array for looping in the template
    get playerIndexes(): number[] {
        const n = Number(this.numberOfPlayers);
        return [...Array(n).keys()]; // Get indexes for the array and pass it to the template
    }

    // Function as safety guard, sync with the "Number of Players" that can change
    onNumberOfPlayersChange(): void {
        const n = Number(this.numberOfPlayers); // Convert the input value into a number (input value are considered often as strings)
        this.numberOfPlayers = n;
        this.playerNames = this.playerNames.slice(0, n);  // if we go smaller, we shrink arrays
        while (this.playerNames.length < n) {             // if we go bigger, we grow arrays with empty strings
            this.playerNames.push('');
        }
    }
}
