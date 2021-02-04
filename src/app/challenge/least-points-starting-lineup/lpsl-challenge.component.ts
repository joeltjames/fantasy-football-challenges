import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Boxscore, Team} from 'espn-fantasy-football-api';
import {BaseScoreChallengesComponent} from '../base-score-challenges/base-score-challenges.component';

@Component({
  selector: 'app-lps-challenge',
  templateUrl: '../base-score-challenges/base-score-challenges.component.html',
})
export class LpsChallengeComponent extends BaseScoreChallengesComponent {
  protected sort(): void {
    this.scores.sort((a, b) => a.score - b.score);
  }

  protected handleBoxscore(
    boxscore: Boxscore,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined
  ): void {
    this.scores.push({
      name: awayTeam?.name,
      logo: awayTeam?.logoURL,
      score: boxscore.awayScore,
    });
    this.scores.push({
      name: homeTeam?.name,
      logo: homeTeam?.logoURL,
      score: boxscore.homeScore,
    });
  }
}
