import {groupBy} from 'lodash';
import {Boxscore, BoxscorePlayer, Team} from 'NgEspnFantasyFootball';

export enum Challenge {
  MOST_POINTS_BY_WINNER = 'mpbw',
  WIN_BY_SMALLEST_MARGIN = 'wbsm',
  LOSE_BY_SMALLEST_MARGIN = 'lbsm',
  LEAST_POINTS_BY_WINNER = 'lpbw',
  LEAST_POINTS_BY_LOSER = 'lpbl',
  LOSE_BY_LARGEST_MARGIN = 'lblm',
  WIN_BY_LARGEST_MARGIN = 'wblm',
  MOST_POINTS_BY_LOSER = 'mpbl',
  MOST_POINTS_BY_BENCH = 'mpbb',
  LEAST_POINTS_BY_BENCH = 'lpbb',
  MOST_POINTS_BY_ENTIRE_TEAM = 'mpbet',
  LEAST_POINTS_BY_ENTIRE_TEAM = 'lpbet',
  MOST_POINTS_BY_STARTING_DEFENSE = 'mpbsd',
  MOST_POINTS_BY_STARTING_QB = 'mpbsq',
  MOST_POINTS_BY_STARTING_QB_DUO = 'mpbsqd',
  MOST_POINTS_BY_STARTING_TE = 'mpbst',
  MOST_POINTS_BY_STARTING_WR = 'mpbsw',
  MOST_POINTS_BY_STARTING_RB = 'mpbsr',
  MOST_POINTS_BY_STARTING_K = 'mpbsk',
  MOST_POINTS_BY_STARTING_FLEX = 'mpbsf',
  MOST_RECEPTIONS_BY_STARTING_WR = 'mrbsw',
  MOST_TURNOVERS_BY_STARTING_DEFENSE = 'mtbsd',
  MOST_RECEPTIONS_BY_STARTING_RB = 'mrbsr',
  MOST_RUSHING_YARDS_BY_STARTING_RB = 'mrybsr',
  MOST_SACKS_BY_STARTING_DEFENSE = 'msbsd',
  RB_WITH_RUSHING_YARDS_CLOSEST_TO_100 = 'rbryct1',
  MOST_PASSING_YARDS_BY_STARTING_QB = 'mpybsq',
  FLEX_WITH_MOST_POINTS_WITHOUT_TOUCHDOWN = 'fwmpwt',
  TEAM_WITH_MOST_OFFENSIVE_TOUCHDOWNS = 'twmod',
  TEAM_WITH_MOST_PLAYERS_ON_SAME_TEAM = 'twmpost',
  PLAYER_WHO_OUTPERFORMED_PROJECT_THE_MOST = 'twoptm',
}

export enum ChallengeType {
  TEAM_POINT,
  TEAM_MARGIN,
  PLAYER_POINT,
  PLAYER_STAT,
  MISC,
}

export type ScoreProcessor = (
  teams: Team[],
  scores: Boxscore[]
) => ChallengeScore[];

export interface ChallengeScore {
  name: string;
  logoURL: string;
  score: number;
  scoreDisplay: string;
  scoreDetail?: string;
}

export enum SortDirection {
  ASCENDING,
  DESCENDING,
}

export const challengeMap: {
  [key in Challenge]: {
    key: Challenge;
    type: ChallengeType;
    name: string;
    processor: ScoreProcessor;
    sortDirection: SortDirection;
  };
} = {
  [Challenge.MOST_POINTS_BY_WINNER]: {
    key: Challenge.MOST_POINTS_BY_WINNER,
    type: ChallengeType.TEAM_POINT,
    name: 'Most Points By Winner',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, teamScore: number) => {
          if (team) {
            scores.push({
              name: team?.name,
              logoURL: team?.logoURL,
              score: teamScore,
              scoreDisplay: teamScore.toString(),
            });
          }
        };
        if (boxscore.awayScore > boxscore.homeScore) {
          calc(awayTeam, boxscore.awayScore);
        }
        if (boxscore.awayScore < boxscore.homeScore) {
          calc(homeTeam, boxscore.homeScore);
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_LOSER]: {
    key: Challenge.MOST_POINTS_BY_LOSER,
    type: ChallengeType.TEAM_POINT,
    name: 'Most Points By Loser',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam && boxscore.awayScore > boxscore.homeScore) {
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score: boxscore.homeScore,
            scoreDisplay: boxscore.homeScore.toString(),
          });
        }
        if (awayTeam && boxscore.homeScore > boxscore.awayScore) {
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score: boxscore.awayScore,
            scoreDisplay: boxscore.awayScore.toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.LEAST_POINTS_BY_WINNER]: {
    key: Challenge.LEAST_POINTS_BY_WINNER,
    type: ChallengeType.TEAM_POINT,
    name: 'Least Points By Winner',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam && boxscore.homeScore > boxscore.awayScore) {
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score: boxscore.homeScore,
            scoreDisplay: boxscore.homeScore.toString(),
          });
        }
        if (awayTeam && boxscore.awayScore > boxscore.homeScore) {
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score: boxscore.awayScore,
            scoreDisplay: boxscore.awayScore.toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.ASCENDING,
  },
  [Challenge.LEAST_POINTS_BY_LOSER]: {
    key: Challenge.LEAST_POINTS_BY_LOSER,
    type: ChallengeType.TEAM_POINT,
    name: 'Least Points By Loser',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score: boxscore.homeScore,
            scoreDisplay: boxscore.homeScore.toString(),
          });
        }
        if (awayTeam) {
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score: boxscore.awayScore,
            scoreDisplay: boxscore.awayScore.toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.ASCENDING,
  },
  [Challenge.MOST_POINTS_BY_ENTIRE_TEAM]: {
    key: Challenge.MOST_POINTS_BY_ENTIRE_TEAM,
    type: ChallengeType.TEAM_POINT,
    name: 'Most Points By Entire Team',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
        if (team) {
          const score = roster
            .map(player => player.totalPoints)
            .reduce((prev, curr) => prev + curr, 0);
          scores.push({
            name: team.name,
            logoURL: team.logoURL,
            score,
            scoreDisplay: score.toString(),
          });
        }
      };
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.LEAST_POINTS_BY_ENTIRE_TEAM]: {
    key: Challenge.LEAST_POINTS_BY_ENTIRE_TEAM,
    type: ChallengeType.TEAM_POINT,
    name: 'Least Points By Entire Team',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const score = boxscore.homeRoster
            .map(player => player.totalPoints)
            .reduce((prev, curr) => prev + curr, 0);
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score,
            scoreDisplay: score.toString(),
          });
        }
        if (awayTeam) {
          const score = boxscore.awayRoster
            .map(player => player.totalPoints)
            .reduce((prev, curr) => prev + curr, 0);
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score,
            scoreDisplay: score.toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.ASCENDING,
  },
  [Challenge.MOST_POINTS_BY_BENCH]: {
    key: Challenge.MOST_POINTS_BY_BENCH,
    type: ChallengeType.TEAM_POINT,
    name: 'Most Points By Bench',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const score = boxscore.homeRoster
            .filter(player => player.position === 'Bench')
            .map(player => player.totalPoints)
            .reduce((prev, curr) => prev + curr, 0);
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score,
            scoreDisplay: score.toString(),
          });
        }
        if (awayTeam) {
          const score = boxscore.awayRoster
            .filter(player => player.position === 'Bench')
            .map(player => player.totalPoints)
            .reduce((prev, curr) => prev + curr, 0);
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score,
            scoreDisplay: score.toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.LEAST_POINTS_BY_BENCH]: {
    key: Challenge.LEAST_POINTS_BY_BENCH,
    type: ChallengeType.TEAM_POINT,
    name: 'Least Points By Bench',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const score = boxscore.homeRoster
            .filter(player => player.position === 'Bench')
            .map(player => player.totalPoints)
            .reduce((prev, curr) => prev + curr, 0);
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score,
            scoreDisplay: score.toString(),
          });
        }
        if (awayTeam) {
          const score = boxscore.awayRoster
            .filter(player => player.position === 'Bench')
            .map(player => player.totalPoints)
            .reduce((prev, curr) => prev + curr, 0);
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score,
            scoreDisplay: score.toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.ASCENDING,
  },
  [Challenge.WIN_BY_SMALLEST_MARGIN]: {
    key: Challenge.WIN_BY_SMALLEST_MARGIN,
    type: ChallengeType.TEAM_MARGIN,
    name: 'Win By Smallest Margin',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam && boxscore.homeScore > boxscore.awayScore) {
          const score = boxscore.homeScore - boxscore.awayScore;
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score,
            scoreDisplay: '+' + Math.abs(score).toString(),
          });
        }
        if (awayTeam && boxscore.awayScore > boxscore.homeScore) {
          const score = boxscore.awayScore - boxscore.homeScore;
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score,
            scoreDisplay: '+' + Math.abs(score).toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.ASCENDING,
  },
  [Challenge.LOSE_BY_SMALLEST_MARGIN]: {
    key: Challenge.LOSE_BY_SMALLEST_MARGIN,
    type: ChallengeType.TEAM_MARGIN,
    name: 'Lose By Smallest Margin',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam && boxscore.homeScore < boxscore.awayScore) {
          const score = boxscore.homeScore - boxscore.awayScore;
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score,
            scoreDisplay: '-' + Math.abs(score).toString(),
          });
        }
        if (awayTeam && boxscore.awayScore < boxscore.homeScore) {
          const score = boxscore.awayScore - boxscore.homeScore;
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score,
            scoreDisplay: '-' + Math.abs(score).toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.WIN_BY_LARGEST_MARGIN]: {
    key: Challenge.WIN_BY_LARGEST_MARGIN,
    type: ChallengeType.TEAM_MARGIN,
    name: 'Win By Largest Margin',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam && boxscore.homeScore > boxscore.awayScore) {
          const score = boxscore.homeScore - boxscore.awayScore;
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score,
            scoreDisplay: '+' + Math.abs(score).toString(),
          });
        }
        if (awayTeam && boxscore.awayScore > boxscore.homeScore) {
          const score = boxscore.awayScore - boxscore.homeScore;
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score,
            scoreDisplay: '+' + Math.abs(score).toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.LOSE_BY_LARGEST_MARGIN]: {
    key: Challenge.LOSE_BY_LARGEST_MARGIN,
    type: ChallengeType.TEAM_MARGIN,
    name: 'Lose By Largest Margin',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam && boxscore.homeScore < boxscore.awayScore) {
          const score = boxscore.homeScore - boxscore.awayScore;
          scores.push({
            name: homeTeam?.name,
            logoURL: homeTeam?.logoURL,
            score,
            scoreDisplay: '-' + Math.abs(score).toString(),
          });
        }
        if (awayTeam && boxscore.awayScore < boxscore.homeScore) {
          const score = boxscore.awayScore - boxscore.homeScore;
          scores.push({
            name: awayTeam?.name,
            logoURL: awayTeam?.logoURL,
            score,
            scoreDisplay: '-' + Math.abs(score).toString(),
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.ASCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_DEFENSE]: {
    key: Challenge.MOST_POINTS_BY_STARTING_DEFENSE,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting D/ST',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(player => player.position === 'D/ST')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(player => player.position === 'D/ST')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_QB]: {
    key: Challenge.MOST_POINTS_BY_STARTING_QB,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting QB',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(player => player.position === 'QB')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(player => player.position === 'QB')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_QB_DUO]: {
    key: Challenge.MOST_POINTS_BY_STARTING_QB_DUO,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting QB Duo',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(player => player.position === 'QB')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score =
            players.length > 1
              ? players[0].totalPoints + players[1].totalPoints
              : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 1
                ? `(${players[0].player.name},${players[1].player.name})`
                : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(player => player.position === 'QB')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score =
            players.length > 1
              ? players[0].totalPoints + players[1].totalPoints
              : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 1
                ? `(${players[0].player.name},${players[1].player.name})`
                : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_RB]: {
    key: Challenge.MOST_POINTS_BY_STARTING_RB,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting RB',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(player => player.position === 'RB')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(player => player.position === 'RB')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_WR]: {
    key: Challenge.MOST_POINTS_BY_STARTING_WR,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting WR',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(player => player.position === 'WR')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(player => player.position === 'WR')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_TE]: {
    key: Challenge.MOST_POINTS_BY_STARTING_TE,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting TE',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(player => player.position === 'TE')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(player => player.position === 'TE')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_FLEX]: {
    key: Challenge.MOST_POINTS_BY_STARTING_FLEX,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting Flex',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(
              player =>
                player.position === 'RB/WR/TE' ||
                player.position === 'RB/WR' ||
                player.position === 'QB/RB/WR/TE'
            )
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(
              player =>
                player.position === 'RB/WR/TE' ||
                player.position === 'RB/WR' ||
                player.position === 'QB/RB/WR/TE'
            )
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_POINTS_BY_STARTING_K]: {
    key: Challenge.MOST_POINTS_BY_STARTING_K,
    type: ChallengeType.PLAYER_POINT,
    name: 'Most Points By Starting K',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        if (homeTeam) {
          const players = boxscore.homeRoster
            .filter(player => player.position === 'K')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: homeTeam.name,
            logoURL: homeTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
        if (awayTeam) {
          const players = boxscore.awayRoster
            .filter(player => player.position === 'K')
            .sort((a, b) => b.totalPoints - a.totalPoints);
          const score = players.length > 0 ? players[0].totalPoints : 0;
          scores.push({
            name: awayTeam.name,
            logoURL: awayTeam.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0 ? `(${players[0].player.name})` : '',
          });
        }
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_PASSING_YARDS_BY_STARTING_QB]: {
    key: Challenge.MOST_PASSING_YARDS_BY_STARTING_QB,
    type: ChallengeType.PLAYER_STAT,
    name: 'Most Passing Yards by Starting QB',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position === 'QB')
              .sort(
                (a, b) =>
                  (b.rawStats.passingYards || 0) -
                  (a.rawStats.passingYards || 0)
              );
            const score =
              players.length > 0 ? players[0].rawStats.passingYards || 0 : 0;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
              scoreDetail:
                players.length > 0 ? `(${players[0].player.name})` : '',
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_RECEPTIONS_BY_STARTING_WR]: {
    key: Challenge.MOST_RECEPTIONS_BY_STARTING_WR,
    type: ChallengeType.PLAYER_STAT,
    name: 'Most Receiptions by Starting WR',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position === 'WR')
              .sort(
                (a, b) =>
                  (b.rawStats.receivingReceptions || 0) -
                  (a.rawStats.receivingReceptions || 0)
              );
            const score =
              players.length > 0
                ? players[0].rawStats.receivingReceptions || 0
                : 0;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
              scoreDetail:
                players.length > 0 ? `(${players[0].player.name})` : '',
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_RECEPTIONS_BY_STARTING_RB]: {
    key: Challenge.MOST_RECEPTIONS_BY_STARTING_RB,
    type: ChallengeType.PLAYER_STAT,
    name: 'Most Receiptions by Starting RB',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position === 'RB')
              .sort(
                (a, b) =>
                  (b.rawStats.receivingReceptions || 0) -
                  (a.rawStats.receivingReceptions || 0)
              );
            const score =
              players.length > 0
                ? players[0].rawStats.receivingReceptions || 0
                : 0;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
              scoreDetail:
                players.length > 0 ? `(${players[0].player.name})` : '',
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_RUSHING_YARDS_BY_STARTING_RB]: {
    key: Challenge.MOST_RUSHING_YARDS_BY_STARTING_RB,
    type: ChallengeType.PLAYER_STAT,
    name: 'Most Rushing Yards by Starting RB',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position === 'RB')
              .sort(
                (a, b) =>
                  (b.rawStats.rushingYards || 0) -
                  (a.rawStats.rushingYards || 0)
              );
            const score =
              players.length > 0 ? players[0].rawStats.rushingYards || 0 : 0;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
              scoreDetail:
                players.length > 0 ? `(${players[0].player.name})` : '',
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_TURNOVERS_BY_STARTING_DEFENSE]: {
    key: Challenge.MOST_TURNOVERS_BY_STARTING_DEFENSE,
    type: ChallengeType.PLAYER_STAT,
    name: 'Most Turnovers by Starting D/ST',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position === 'D/ST')
              .sort((a, b) => {
                const bTurnovers =
                  (b.rawStats.defensiveInterceptions || 0) +
                  (b.rawStats.defensiveFumbles || 0);
                const aTurnovers =
                  (a.rawStats.defensiveInterceptions || 0) +
                  (a.rawStats.defensiveFumbles || 0);
                return bTurnovers - aTurnovers;
              });

            const score =
              players.length > 0
                ? (players[0].rawStats.defensiveInterceptions || 0) +
                  (players[0].rawStats.defensiveFumbles || 0)
                : 0;

            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
              scoreDetail:
                players.length > 0 ? `(${players[0].player.name})` : '',
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.MOST_SACKS_BY_STARTING_DEFENSE]: {
    key: Challenge.MOST_SACKS_BY_STARTING_DEFENSE,
    type: ChallengeType.PLAYER_STAT,
    name: 'Most Sacks by Starting D/ST',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position === 'D/ST')
              .sort(
                (a, b) =>
                  (b.rawStats.defensiveSacks || 0) -
                  (a.rawStats.defensiveSacks || 0)
              );
            const score =
              players.length > 0 ? players[0].rawStats.defensiveSacks || 0 : 0;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
              scoreDetail:
                players.length > 0 ? `(${players[0].player.name})` : '',
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.RB_WITH_RUSHING_YARDS_CLOSEST_TO_100]: {
    key: Challenge.RB_WITH_RUSHING_YARDS_CLOSEST_TO_100,
    type: ChallengeType.PLAYER_STAT,
    name: 'RB Closest to 100 Rushing Yards',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position === 'RB')
              .sort(
                (a, b) =>
                  Math.abs(100 - (a.rawStats.rushingYards || 0)) -
                  Math.abs(100 - (b.rawStats.rushingYards || 0))
              );
            const score =
              players.length > 0
                ? Math.abs(100 - (players[0].rawStats.rushingYards || 0))
                : 0;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: (players[0].rawStats.rushingYards || 0).toString(),
              scoreDetail:
                players.length > 0 ? `(${players[0].player.name})` : '',
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.ASCENDING,
  },
  [Challenge.FLEX_WITH_MOST_POINTS_WITHOUT_TOUCHDOWN]: {
    key: Challenge.FLEX_WITH_MOST_POINTS_WITHOUT_TOUCHDOWN,
    type: ChallengeType.PLAYER_POINT,
    name: 'FLEX With Most Points Without a Touchdown',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(
                player =>
                  player.position === 'RB/WR/TE' ||
                  player.position === 'RB/WR' ||
                  player.position === 'QB/RB/WR/TE'
              )
              .sort((a, b) => {
                let bPoints = b.totalPoints;
                const bStats = b.rawStats;
                if (
                  bStats.passingTouchdowns ||
                  bStats.rushingTouchdowns ||
                  bStats.receivingTouchdowns ||
                  bStats.puntReturnTouchdown ||
                  bStats.fumbleReturnTouchdown ||
                  bStats.kickoffReturnTouchdown ||
                  bStats.interceptionReturnTouchdown ||
                  bStats.defensiveBlockedKickForTouchdowns
                ) {
                  bPoints = -100;
                }
                let aPoints = a.totalPoints;
                const aStats = a.rawStats;
                if (
                  aStats.passingTouchdowns ||
                  aStats.rushingTouchdowns ||
                  aStats.receivingTouchdowns ||
                  aStats.puntReturnTouchdown ||
                  aStats.fumbleReturnTouchdown ||
                  aStats.kickoffReturnTouchdown ||
                  aStats.interceptionReturnTouchdown ||
                  aStats.defensiveBlockedKickForTouchdowns
                ) {
                  aPoints = -100;
                }
                return bPoints - aPoints;
              });
            let score = 0;
            let detail =
              players.length > 0 ? `(${players[0].player.name})` : '';
            if (players.length > 0) {
              const totalTds =
                (players[0].rawStats.passingTouchdowns || 0) +
                (players[0].rawStats.rushingTouchdowns || 0) +
                (players[0].rawStats.receivingTouchdowns || 0) +
                (players[0].rawStats.puntReturnTouchdown || 0) +
                (players[0].rawStats.fumbleReturnTouchdown || 0) +
                (players[0].rawStats.kickoffReturnTouchdown || 0) +
                (players[0].rawStats.interceptionReturnTouchdown || 0) +
                (players[0].rawStats.defensiveBlockedKickForTouchdowns || 0);
              score = totalTds > 0 ? 0 : players[0].totalPoints;
              if (totalTds > 0) {
                detail.replace(')', '');
                detail += `, ${totalTds}TD`;
                if (totalTds > 1) {
                  detail += 's';
                }
                detail += ')';
              }
            }
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: (players.length > 0
                ? players[0].totalPoints
                : 0
              ).toString(),
              scoreDetail: detail,
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.TEAM_WITH_MOST_OFFENSIVE_TOUCHDOWNS]: {
    key: Challenge.TEAM_WITH_MOST_OFFENSIVE_TOUCHDOWNS,
    type: ChallengeType.MISC,
    name: 'Team With Most Offensive TDs',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const totalOffensiveTds = (player: BoxscorePlayer) => {
          const stats = player.rawStats;
          return (
            (stats.passingTouchdowns || 0) +
            (stats.rushingTouchdowns || 0) +
            (stats.receivingTouchdowns || 0)
          );
        };
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const players = roster
              .filter(player => player.position !== 'BENCH')
              .sort((a, b) => totalOffensiveTds(b) - totalOffensiveTds(a));
            const score =
              players.length > 0 ? totalOffensiveTds(players[0]) : 0;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },
  [Challenge.TEAM_WITH_MOST_PLAYERS_ON_SAME_TEAM]: {
    key: Challenge.TEAM_WITH_MOST_PLAYERS_ON_SAME_TEAM,
    type: ChallengeType.MISC,
    name: 'Team With Most Players on Same NFL Team',
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      boxscores.forEach(boxscore => {
        const awayTeam = teams.find(team => team.id === boxscore.awayTeamId);
        const homeTeam = teams.find(team => team.id === boxscore.homeTeamId);
        const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
          if (team) {
            const result = groupBy(
              roster.filter(p => p.position !== 'Bench'),
              'player.proTeamAbbreviation'
            );
            const teamCount: {team: string; count: number}[] = [];
            Object.keys(result).forEach(t => {
              teamCount.push({
                team: t,
                count: result[t].length,
              });
            });
            teamCount.sort((a, b) => b.count - a.count);
            const score = teamCount[0].count;
            scores.push({
              name: team.name,
              logoURL: team.logoURL,
              score,
              scoreDisplay: score.toString(),
              scoreDetail: `(${teamCount[0].team})`,
            });
          }
        };
        calc(homeTeam, boxscore.homeRoster);
        calc(awayTeam, boxscore.awayRoster);
      });
      return scores;
    },
    sortDirection: SortDirection.DESCENDING,
  },

  [Challenge.PLAYER_WHO_OUTPERFORMED_PROJECT_THE_MOST]: {
    key: Challenge.PLAYER_WHO_OUTPERFORMED_PROJECT_THE_MOST,
    type: ChallengeType.MISC,
    name: 'Player Who Outperformed Projections the Most',
    sortDirection: SortDirection.DESCENDING,
    processor: (teams, boxscores) => {
      const scores: ChallengeScore[] = [];
      const calc = (team: Team | undefined, roster: BoxscorePlayer[]) => {
        const players = roster
          .filter(player => player.position !== 'Bench')
          .sort((a, b) => {
            const aScore = a.totalPoints - a.totalProjectedPoints;
            const bScore = a.totalPoints - b.totalProjectedPoints;

            return aScore - bScore;
          });

        const score = players.length > 0 ? players[0].totalPoints : 0;
        if (team) {
          scores.push({
            name: team?.name,
            logoURL: team?.logoURL,
            score,
            scoreDisplay: score.toString(),
            scoreDetail:
              players.length > 0
                ? `(${players[0].player.name}, ${players[0].totalProjectedPoints})`
                : '',
          });
        }
      };
      boxscores.forEach(boxscore => {
        calc(
          teams.find(team => team.id === boxscore.homeTeamId),
          boxscore.homeRoster
        );
        calc(
          teams.find(team => team.id === boxscore.awayTeamId),
          boxscore.awayRoster
        );
      });
      return scores;
    },
  },
};
