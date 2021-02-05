import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {ChallengeComponent} from './challenge/challenge/challenge.component';
import {HttpClientModule} from '@angular/common/http';
import {NgEspnFantasyFootballModule} from 'NgEspnFantasyFootball';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, ChallengeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgEspnFantasyFootballModule,
    NgbModule,
    NgbModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
