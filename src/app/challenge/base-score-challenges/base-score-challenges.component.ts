import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client, Team} from 'espn-fantasy-football-api';
import {Boxscore} from 'espn-fantasy-football-api/web-dev';

@Component({
  selector: 'app-base-score-challenge',
  template: ``,
})
export abstract class BaseScoreChallengesComponent implements OnInit {
  loading = true;

  @Output() loaded = new EventEmitter<boolean>();

  @Input()
  public year!: string | null;

  @Input()
  public week!: string | null;

  @Input()
  public leagueId!: string | null;

  @Input()
  public teams: Team[] = [];

  public scores: any[] = [];

  ngOnInit(): void {
    const leagueId = parseInt(this.leagueId || '', 10);
    const year = parseInt(this.year || '', 10);
    const week = parseInt(this.week || '', 10);

    new Client({leagueId})
      .getBoxscoreForWeek({
        seasonId: year,
        scoringPeriodId: week,
        matchupPeriodId: week,
      })
      .then(boxscore => {
        boxscore.forEach(bs => {
          const awayTeam = this.teams.find(team => team.id === bs.awayTeamId);
          const homeTeam = this.teams.find(team => team.id === bs.homeTeamId);
          this.handleBoxscore(bs, homeTeam, awayTeam);
        });
        this.sort();

        this.loaded.emit();
        this.loading = false;
      });
  }

  protected abstract sort(): void;
  protected abstract handleBoxscore(
    boxscore: Boxscore,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined
  ): void;
}
