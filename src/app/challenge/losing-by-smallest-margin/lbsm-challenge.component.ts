import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Boxscore, Team} from 'espn-fantasy-football-api/web-dev';
import {BaseScoreChallengesComponent} from '../base-score-challenges/base-score-challenges.component';

@Component({
  selector: 'app-lbsm-challenge',
  templateUrl: '../base-score-challenges/base-score-challenges.component.html',
})
export class LbsmChallengeComponent extends BaseScoreChallengesComponent {
  protected sort(): void {
    this.scores.sort((a, b) => b.score - a.score);
  }

  protected handleBoxscore(
    boxscore: Boxscore,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined
  ): void {
    if (boxscore.homeScore < boxscore.awayScore) {
      this.scores.push({
        name: homeTeam?.name,
        logo: homeTeam?.logoURL,
        score: '-' + (boxscore.awayScore - boxscore.homeScore).toString(),
      });
    } else if (boxscore.awayScore < boxscore.homeScore) {
      this.scores.push({
        name: awayTeam?.name,
        logo: awayTeam?.logoURL,
        score: '-' + (boxscore.homeScore - boxscore.awayScore).toString(),
      });
    }
  }
}
