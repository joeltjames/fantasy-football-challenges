import {Component} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
// import {Challenges} from './challenge.utility';
import {filter} from 'rxjs/operators';
import { challengeList, Challenges } from './challenges';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  challenge: string | null = null;
  year: string | null = null;
  week: string | null = null;
  espnLeagueId: string | null = null;

  years = [2020, 2019];
  weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  challenges = challengeList;

  showChallenge = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.year = '2019';
    this.week = '2';
    this.espnLeagueId = '48153503';
    this.challenge = challengeList[challengeList.length - 1].key;

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        if (event instanceof NavigationEnd && event.url === '/') {
          this.showChallenge = false;
        }
      });
  }

  public canSubmit(): boolean {
    return this.year != null && this.challenge != null && this.week != null;
  }

  public submit(): void {
    this.showChallenge = true;
    this.router.navigate(['.'], {
      queryParams: {
        leagueId: this.espnLeagueId,
        year: this.year,
        week: this.week,
      },
    });
  }

  public resetChallenge(): void {
    this.showChallenge = false;
  }
}
