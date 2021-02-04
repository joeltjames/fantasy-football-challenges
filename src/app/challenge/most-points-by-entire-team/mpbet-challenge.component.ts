import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Boxscore, Team} from 'espn-fantasy-football-api';
import {BaseScoreChallengesComponent} from '../base-score-challenges/base-score-challenges.component';

@Component({
  selector: 'app-mpbet-challenge',
  templateUrl: '../base-score-challenges/base-score-challenges.component.html',
})
export class MpbetChallengeComponent extends BaseScoreChallengesComponent {
  protected sort(): void {
    this.scores.sort((a, b) => b.score - a.score);
  }

  protected handleBoxscore(
    boxscore: Boxscore,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined
  ): void {
    this.scores.push({
      name: homeTeam?.name,
      logo: homeTeam?.logoURL,
      score: boxscore.homeRoster
      .map(player => player.totalPoints)
      .reduce((prev, curr) => prev + curr, 0),
    });
    this.scores.push({
      name: awayTeam?.name,
      logo: awayTeam?.logoURL,
      score: boxscore.awayRoster
      .map(player => player.totalPoints)
      .reduce((prev, curr) => prev + curr, 0),
    });
  }
}
