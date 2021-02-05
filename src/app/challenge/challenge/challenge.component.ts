import {animate, style, transition, trigger} from '@angular/animations';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgEspnFantasyFootballService, Team} from 'NgEspnFantasyFootball';
import {
  challengeMap,
  Challenge,
  ChallengeScore,
  SortDirection,
} from 'src/app/challenge/challenge/challenges';

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
  public challenges = Challenge;

  @Input()
  public challenge!: Challenge | undefined;

  @Input()
  public privateLeague!: boolean;

  @Input()
  public year!: string | null;

  @Input()
  public week!: string | null;

  @Input()
  public leagueId!: string | null;

  loading = true;

  @Output() exit = new EventEmitter<boolean>();

  public scores: ChallengeScore[] = [];

  constructor(private espnSvc: NgEspnFantasyFootballService) {}

  ngOnInit(): void {
    const leagueId = parseInt(this.leagueId || '', 10);
    const year = parseInt(this.year || '', 10);
    const week = parseInt(this.week || '', 10);

    console.log(leagueId);

    this.espnSvc.getTeamsAtWeek(leagueId, year, week).subscribe(teams => {
      this.loadChallengeData(teams);
    });
  }

  public get title(): string | undefined {
    return this.challenge ? challengeMap[this.challenge]?.name : '';
  }

  public loadChallengeData(teams: Team[]): void {
    if (this.challenge) {
      const challengeDetail = challengeMap[this.challenge];
      const leagueId = parseInt(this.leagueId || '', 10);
      const year = parseInt(this.year || '', 10);
      const week = parseInt(this.week || '', 10);

      this.espnSvc
        .getBoxscoresAtWeek(leagueId, year, week, week)
        .subscribe(boxscores => {
          this.scores = challengeDetail.processor(teams, boxscores);
          this.scores.sort((a, b) => {
            if (challengeDetail.sortDirection === SortDirection.ASCENDING) {
              return a.score - b.score;
            } else {
              return b.score - a.score;
            }
          });
          this.loading = false;
        });
    }
  }
}
