import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Boxscore, Team} from 'espn-fantasy-football-api';
import {BaseScoreChallengesComponent} from '../base-score-challenges/base-score-challenges.component';

@Component({
  selector: 'app-wblm-challenge',
  templateUrl: '../base-score-challenges/base-score-challenges.component.html',
})
export class WblmChallengeComponent extends BaseScoreChallengesComponent {
  protected sort(): void {
    this.scores.sort((a, b) => b.score - a.score);
  }

  protected handleBoxscore(
    boxscore: Boxscore,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined
  ): void {
    if (boxscore.homeScore > boxscore.awayScore) {
      this.scores.push({
        name: homeTeam?.name,
        logo: homeTeam?.logoURL,
        score:
          '+' + Math.abs(boxscore.homeScore - boxscore.awayScore).toString(),
      });
    } else if (boxscore.awayScore > boxscore.homeScore) {
      this.scores.push({
        name: awayTeam?.name,
        logo: awayTeam?.logoURL,
        score:
          '+' + Math.abs(boxscore.awayScore - boxscore.homeScore).toString(),
      });
    }
  }
}
