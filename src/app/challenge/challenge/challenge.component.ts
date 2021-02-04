import {animate, style, transition, trigger} from '@angular/animations';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client, Team} from 'espn-fantasy-football-api/web-dev';
import {challengeList, Challenges} from 'src/app/challenges';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
  animations: [
    trigger('inAnimation', [
      transition(':enter', [
        style({opacity: 0, offset: 1}),
        animate('1s ease-out', style({opacity: 1, offset: 0})),
      ]),
    ]),
    trigger('longInAnimation', [
      transition(':enter', [
        style({opacity: 0, offset: 1}),
        animate('2s ease-out', style({opacity: 1, offset: 0})),
      ]),
    ]),
    trigger('outAnimation', [
      transition(':leave', [
        style({opacity: 1, offset: 0}),
        animate('1s ease-out', style({opacity: 0, offset: 1})),
      ]),
    ]),
  ],
})
export class ChallengeComponent implements OnInit {
  public challenges = Challenges;

  @Input()
  public challenge!: string | null;

  @Input()
  public year!: string | null;

  @Input()
  public week!: string | null;

  @Input()
  public leagueId!: string | null;

  loading = true;

  @Output() exit = new EventEmitter<boolean>();

  teams: Team[] | null = null;

  constructor() {}

  ngOnInit(): void {
    const leagueId = parseInt(this.leagueId || '', 10);
    const year = parseInt(this.year || '', 10);
    const week = parseInt(this.week || '', 10);

    new Client({leagueId})
      .getTeamsAtWeek({
        seasonId: year,
        scoringPeriodId: week,
      })
      .then(teams => (this.teams = teams));
  }

  public get title(): string | undefined {
    return challengeList.find(challenge => challenge.key === this.challenge)?.name;
  }
}
