import { Component, computed, signal, ViewEncapsulation } from '@angular/core';
import gameData from '../../data/game-data.json';
import { SHARED_IMPORTS } from '../../component/_shared/shared-imports';
import { TabpanelComponent } from '../../component/tabpanel/tabpanel';
import {
    AddPlayLogComponent,
    AddPlayLogPayload,
} from '../../component/add-play-log/add-play-log';

@Component({
    selector: 'section[pageTabletopCounter]',
    standalone: true,
    imports: [SHARED_IMPORTS, TabpanelComponent, AddPlayLogComponent],
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

    /** All winner player IDs from every game result, in order. */
    private getAllWinnerIds(): number[] {
        return this.gameSessions.flatMap(session =>
            session.results.map(r => r.winnerPlayerId)
        );
    }

    /** Count how many times each player ID appears in the list. */
    private countWinsById(winnerIds: number[]): Map<number, number> {
        const countById = new Map<number, number>();
        for (const id of winnerIds) {
            countById.set(id, (countById.get(id) ?? 0) + 1);
        }
        return countById;
    }

    private formatWinCount(name: string, wins: number): string {
        return wins === 1 ? `1 win - ${name}` : `${wins} wins - ${name}`;
    }

    games = gameData.games as { id: number; name: string }[];
    players = gameData.players as { id: number; name: string }[];
    dates = gameData.dates as { id: number; date: string }[];
    gameSessions = gameData.gameSessions as {
        id: number;
        dateId: number[];
        playerId: number[];
        results: { gameId: number; winnerPlayerId: number }[];
    }[];

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
        return this.gameSessions.map(session => {
            const firstDateId = session.dateId[0];
            return this.dates.find(d => d.id === firstDateId)?.date ?? 'Unknown';
        });
    });
    /** Leaderboard: all players by win count (most wins first, 0 wins last). */
    winnerLeaderboard = computed(() => {
        const winnerIds = this.getAllWinnerIds();
        const countById = this.countWinsById(winnerIds);
        return this.players
            .map(p => ({ name: p.name, wins: countById.get(p.id) ?? 0 }))
            .sort((a, b) => b.wins - a.wins)
            .map(({ name, wins }) => this.formatWinCount(name, wins));
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

    // Show play log form
    showAddContent = signal(false);

    clickAddContent() {
        this.showAddContent.update((v) => !v);
    }

    private nextId<T extends { id: number }>(arr: T[]): number {
        return arr.length === 0 ? 1 : Math.max(...arr.map((x) => x.id)) + 1;
    }

    private findOrAddDate(dateStr: string): number {
        const existing = this.dates.find((d) => d.date === dateStr);
        if (existing) return existing.id;
        const id = this.nextId(this.dates);
        this.dates.push({ id, date: dateStr });
        return id;
    }

    private findOrAddGame(name: string): number {
        const existing = this.games.find((g) => g.name === name);
        if (existing) return existing.id;
        const id = this.nextId(this.games);
        this.games.push({ id, name });
        return id;
    }

    private findOrAddPlayer(name: string): number {
        const existing = this.players.find((p) => p.name === name);
        if (existing) return existing.id;
        const id = this.nextId(this.players);
        this.players.push({ id, name });
        return id;
    }

    onAddPlayLog(payload: AddPlayLogPayload) {
        const dateId = this.findOrAddDate(payload.date);
        const gameId = this.findOrAddGame(payload.gameName);
        const playerIds = payload.playerNames
            .filter((name) => name.trim() !== '')
            .map((name) => this.findOrAddPlayer(name.trim()));
        const winner = this.players.find(
            (p) => p.name.toLowerCase() === payload.winnerName.trim().toLowerCase()
        );
        const winnerPlayerId = winner
            ? winner.id
            : payload.winnerName.trim()
              ? this.findOrAddPlayer(payload.winnerName.trim())
              : playerIds[0];

        const sessionId = this.nextId(this.gameSessions);
        this.gameSessions.push({
            id: sessionId,
            dateId: [dateId],
            playerId: playerIds.length > 0 ? playerIds : [this.players[0].id],
            results: [{ gameId, winnerPlayerId }],
        });

        this.showAddContent.set(false);
        const newSession = this.gameSessions.find((s) => s.id === sessionId);
        if (newSession) this.currentEventId.set(newSession);
    }
}

