import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {groupBy} from 'lodash';
import {filter} from 'rxjs/operators';
import {
  challengeMap,
  Challenge,
  ChallengeType,
} from './challenge/challenge/challenges';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgEspnFantasyFootballService} from 'NgEspnFantasyFootball';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // tslint:disable-next-line:variable-name
  private _challenge: string | undefined = undefined;
  year: string | null = localStorage.getItem('year') || '2019';
  week: string | null = localStorage.getItem('week') || '1';
  espnLeagueId: string | null = localStorage.getItem('leagueId') || '48153503';
  privateLeague = localStorage.getItem('isPrivate') === 'true';
  espnS2 = this.getCookie('espn_s2') || '';
  swid = this.getCookie('SWID') || '';
  active = 'chrome';

  years = [2020, 2019];
  weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  theme = localStorage.getItem('theme') || 'dark';

  showChallenge = false;

  constructor(
    private espnSvc: NgEspnFantasyFootballService,
    private modalService: NgbModal
  ) {}

  public openCookieInfoModal(content: any): void {
    this.modalService.open(content);
  }

  public updateTheme(theme: string): void {
    const light = `https://cdn.jsdelivr.net/npm/bootswatch@4.6.0/dist/cosmo/bootstrap.min.css`;
    const dark = `https://cdn.jsdelivr.net/npm/bootswatch@4.6.0/dist/darkly/bootstrap.min.css`;
    const linkBootstrap = document.getElementById('theme-bootstrap');
    localStorage.setItem('theme', theme);
    if (linkBootstrap) {
      if (theme === 'dark') {
        (linkBootstrap as HTMLLinkElement).href = dark;
      } else {
        (linkBootstrap as HTMLLinkElement).href = light;
      }
    }
  }

  public canSubmit(): boolean {
    return this.year != null && this.challenge != null && this.week != null;
  }

  public get challenge(): Challenge | undefined {
    if (this._challenge) {
      const chlg = Object.entries(Challenge).find(
        ([, value]) => value === this._challenge
      );
      return chlg ? chlg[1] : undefined;
    } else {
      return undefined;
    }
  }

  public set challenge(value: Challenge | undefined) {
    this._challenge = value;
  }

  private getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts?.pop()?.split(';').shift();
    }
    return undefined;
  }

  public submit(): void {
    this.espnSvc.setCookies(this.espnS2, this.swid);
    localStorage.setItem('leagueId', this.espnLeagueId || '');
    localStorage.setItem('year', this.year || '');
    localStorage.setItem('week', this.week || '');
    localStorage.setItem('isPrivate', this.privateLeague ? 'true' : 'false');
    this.showChallenge = true;
  }

  public get challenges(): any {
    const chlgs = Object.values(challengeMap);
    const grouped = groupBy(chlgs, 'type');
    return [
      {
        display: 'Team Point Challenges',
        children: grouped[ChallengeType.TEAM_POINT],
      },
      {
        display: 'Team Margin Challenges',
        children: grouped[ChallengeType.TEAM_MARGIN],
      },
      {
        display: 'Player Point Challenges',
        children: grouped[ChallengeType.PLAYER_POINT],
      },
      {
        display: 'Player Stat Challenges',
        children: grouped[ChallengeType.PLAYER_STAT],
      },
      {display: 'Miscellaneous', children: grouped[ChallengeType.MISC]},
    ];
  }

  public resetChallenge(): void {
    this.showChallenge = false;
  }
}
