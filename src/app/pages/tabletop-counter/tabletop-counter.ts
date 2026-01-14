import { Component, ViewEncapsulation } from '@angular/core';
import gameData from '../../data/game-data.json';
import {
  SortableTableComponent,
  TableColumn,
} from '../../component/sortable-table/sortable-table';

@Component({
  selector: 'app-tabletop-counter',
  standalone: true,
  imports: [SortableTableComponent],
  templateUrl: './tabletop-counter.html',
  styleUrl: './tabletop-counter.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TabletopCounterComponent {
  games = gameData.game;
  players = gameData.players;
  gameDays = gameData.gameDays;

  gamesColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];

  playersColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];

  gameDaysColumns: TableColumn[] = [
    { key: 'date', label: 'Date' },
    {
      key: 'gamers',
      label: 'Players',
      sortable: false,
      render: (_, row) =>
        this.formatPlayers((row as { gamers: number[] }).gamers),
    },
    {
      key: 'games',
      label: 'Games Played',
      sortable: false,
      render: (_, row) => this.formatGames((row as { games: number[] }).games),
    },
    {
      key: 'winner',
      label: 'Winners',
      sortable: false,
      render: (_, row) =>
        this.formatWinners(row as { winner: number[]; games: number[] }),
    },
  ];

  private getPlayerName(id: number): string {
    return this.players.find((p) => p.id === id)?.name || 'Unknown';
  }

  private getGameName(id: number): string {
    return this.games.find((g) => g.id === id)?.name || 'Unknown';
  }

  private formatPlayers(ids: number[]): string {
    return ids.map((id) => this.getPlayerName(id)).join(', ');
  }

  private formatGames(ids: number[]): string {
    return ids.map((id) => this.getGameName(id)).join(', ');
  }

  private formatWinners(row: { winner: number[]; games: number[] }): string {
    return row.winner
      .map(
        (winnerId, i) =>
          `${this.getPlayerName(winnerId)} (${this.getGameName(row.games[i])})`
      )
      .join(', ');
  }
}
