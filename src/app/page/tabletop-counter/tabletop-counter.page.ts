import { Component, computed, signal, ViewEncapsulation } from '@angular/core';
import gameData from '../../data/game-data.json';

@Component({
  selector: 'section[pageTabletopCounter]',
  standalone: true,
  templateUrl: './tabletop-counter.page.html',
  styleUrl: './tabletop-counter.page.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PageTabletopCounterComponent {  
  games = gameData.games;
  players = gameData.players;
  dates = gameData.dates;
  gameDays = gameData.gameDays;

  private getDateEventData(dateId: number) {
//    return this.gameDays.find(gameDay => gameDay.dates.includes(dateId));
    return this.gameDays[dateId - 1];
//      return this.gameDays.find(x => x.id === dateId);
  }
/*
  currentEventState = computed(() => this.currentEvent() ? this.currentEvent() : null);
  currentEventDates = computed(() => this.currentEventState()?.dates);

  currentDate = computed(() => this.dates.find(date => date.id === this.currentEventDates()?.[0]));
*/
  currentEvent = signal(this.getDateEventData(1));
  currentEventDates = computed(() => this.currentEvent().dates);
  currentDate = computed(() => {
    const firstDateId = this.currentEventDates()[0];
    return this.dates.find(date => date.id === firstDateId)?.date;
  });


  clickPrevEvent() {
  //  this.currentEvent.set(this.getDateEventData(this.currentEvent().id - 1));
  }
  clickNextEvent() {
//    this.currentEvent.set(this.getDateEventData(this.currentEvent().id + 1));
  }

}

