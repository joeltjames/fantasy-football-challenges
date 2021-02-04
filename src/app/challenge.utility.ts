// import { Boxscore } from 'espn-fantasy-football-api';

// export interface ChallengeResult {
//   winners: number[];
//   winningScore: number;
// }

// export class Challenges {
//   static mostPointsByStartingLineup(boxscore: Boxscore[]): ChallengeResult {
//     let winningTeams: number[] = [];
//     let winningScore = -1;
//     boxscore.forEach(bs => {
//       if (bs.awayScore > winningScore || bs.homeScore > winningScore) {
//         winningTeams = [];
//       }
//       if (bs.awayScore >= winningScore) {
//         winningScore = bs.awayScore;
//         winningTeams.push(bs.awayTeamId);
//       }
//       if (bs.homeScore >= winningScore) {
//         winningScore = bs.homeScore;
//         winningTeams.push(bs.homeTeamId);
//       }
//     });

//     return {
//       winners: winningTeams,
//       winningScore
//     };
//   }
// }
