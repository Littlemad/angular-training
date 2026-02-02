import { Component, computed, signal, ViewEncapsulation } from '@angular/core';
import gameData from '../../data/game-data.json';
import { SHARED_IMPORTS } from '../../component/_shared/shared-imports';
import { TabpanelComponent } from '../../component/tabpanel/tabpanel';

@Component({
    selector: 'section[pageTabletopCounter]',
    standalone: true,
    imports: [SHARED_IMPORTS, TabpanelComponent],
    templateUrl: './tabletop-counter.page.html',
    styleUrl: './tabletop-counter.page.scss',
    encapsulation: ViewEncapsulation.None,
})
export class PageTabletopCounterComponent {
    private getGameSessionById(sessionId: number) {
        let myGameSession = this.gameSessions.find(x => x.id === sessionId);
        if (myGameSession === undefined) {
            // Return the first game session as a fallback instead of a string
            return this.gameSessions[0];
        }
        return myGameSession;
    }

    games = gameData.games;
    players = gameData.players;
    dates = gameData.dates;
    gameSessions = gameData.gameSessions;

    /* Current event values */
    currentEventId = signal(this.getGameSessionById(1));
    currentDatesId = computed(() => this.currentEventId().dateId);
    currentPlayersId = computed(() => this.currentEventId().playerId);
    currentResultsId = computed(() => this.currentEventId().results);
    currentResultGames = computed(() => {
        return this.currentResultsId().map(result => {
            const game = this.games.find(x => x.id === result.gameId);
            const winner = this.players.find(y => y.id === result.winnerPlayerId);
            return {
                gameName: game?.name ?? 'Unknown Game',
                winnerName: winner?.name ?? 'Unknown Winner'
            };
        });
    });
    currentDate = computed(() => {
        const firstDateId = this.currentDatesId()[0];
        return this.dates.find(date => date.id === firstDateId)?.date;
    });

    currentPlayers = computed(() => {
        return this.currentPlayersId().map(player => {
            return this.players.find(x => x.id === player)?.name;
        });
    });

    currentResultGamesNames = computed(() => {
        return this.currentResultGames().map(x => x.gameName);
    });

    currentResultWinnersNames = computed(() => {
        return this.currentResultGames().map(x => x.winnerName);
    });

    currentIndex = computed(() => {
        return this.gameSessions.findIndex(x => x.id === this.currentEventId().id);
    });

    /* List of all values of a specific topic */
    allPlayers = computed(() => {
        return this.players.map(x => x.name);
    });
    allGamesNames = computed(() => {
        return this.games.map(x => x.name);
    });
    allSessionDates = computed(() => {
        return this.gameSessions.map(x => x.dateId);
    });
    allWinners = computed(() => {
        return this.gameSessions.map(x => x.results.map(y => y.winnerPlayerId));
    });

    /* Navigation interactions */
    clickPrevEvent() {
        if (this.currentIndex() > 0) {
            this.currentEventId.set(this.gameSessions[this.currentIndex() - 1]);
        } else {
            this.currentEventId.set(this.gameSessions[this.gameSessions.length - 1]);
        }
    }
    clickNextEvent() {
        if (this.currentIndex() < this.gameSessions.length - 1) {
            this.currentEventId.set(this.gameSessions[this.currentIndex() + 1]);
        } else {
            this.currentEventId.set(this.gameSessions[0]);
        }
    }
}

