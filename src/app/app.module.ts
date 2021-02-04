import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MpslChallengeComponent} from './challenge/most-points-starting-lineup/mpsl-challenge.component';
import {ChallengeComponent} from './challenge/challenge/challenge.component';
import {WbsmChallengeComponent} from './challenge/win-by-smallest-margin/wbsm-challenge.component';
import {LbsmChallengeComponent} from './challenge/losing-by-smallest-margin/lbsm-challenge.component';
import {LpbwChallengeComponent} from './challenge/least-points-by-winner/lpbw-challenge.component';
import {LpsChallengeComponent} from './challenge/least-points-starting-lineup/lpsl-challenge.component';
import {LblmChallengeComponent} from './challenge/lose-by-largest-margin/lblm-challenge.component';
import {WblmChallengeComponent} from './challenge/win-by-largest-margin/wblm-challenge.component';
import {MpsllChallengeComponent} from './challenge/most-points-starting-lineup-loser/mpsll-challenge.component';
import {MpbetChallengeComponent} from './challenge/most-points-by-entire-team/mpbet-challenge.component';
import {LpbbChallengeComponent} from './challenge/least-points-by-bench/lpbb-challenge.component';
import {MpbbChallengeComponent} from './challenge/most-points-by-bench/mpbb-challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    MpslChallengeComponent,
    ChallengeComponent,
    WbsmChallengeComponent,
    LbsmChallengeComponent,
    LpbwChallengeComponent,
    LpsChallengeComponent,
    LblmChallengeComponent,
    WblmChallengeComponent,
    MpsllChallengeComponent,
    MpbbChallengeComponent,
    LpbbChallengeComponent,
    MpbetChallengeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
