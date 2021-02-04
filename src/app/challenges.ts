export enum Challenges {
  MOST_POINTS_STARTING_LINEUP = 'mpsl',
  WIN_BY_SMALLEST_MARGIN = 'wbsm',
  LOSE_BY_SMALLEST_MARGIN = 'lbsm',
  LEAST_POINTS_BY_WINNER = 'lpbw',
  LEAST_POINTS_STARTING_LINEUP = 'lpsl',
  LOSE_BY_LARGEST_MARGIN = 'lblm',
  WIN_BY_LARGEST_MARGIN = 'wblm',
  MOST_POINTS_STARTING_LINEUP_LOSER = 'mpsll',
  MOST_POINTS_BY_BENCH = 'mpbb',
  LEAST_POINTS_BY_BENCH = 'lpbb',
  MOST_POINTS_BY_ENTIRE_TEAM = 'mpbet',
  LEAST_POINTS_BY_STARTING_DEFENSE = 'lpbsd',
}

export const challengeList = [
  {
    key: Challenges.MOST_POINTS_STARTING_LINEUP,
    name: 'Most Points By Starting Lineup',
  },
  {
    key: Challenges.WIN_BY_SMALLEST_MARGIN,
    name: 'Win By Smallest Margin',
  },
  {
    key: Challenges.LOSE_BY_SMALLEST_MARGIN,
    name: 'Lose By Smallest Margin',
  },
  {
    key: Challenges.LEAST_POINTS_BY_WINNER,
    name: 'Least Points By Winner',
  },
  {
    key: Challenges.LEAST_POINTS_STARTING_LINEUP,
    name: 'Least Points By Starting Lineup',
  },
  {
    key: Challenges.LOSE_BY_LARGEST_MARGIN,
    name: 'Lose By Largest Margin',
  },
  {
    key: Challenges.WIN_BY_LARGEST_MARGIN,
    name: 'Win By Largest Margin',
  },
  {
    key: Challenges.MOST_POINTS_STARTING_LINEUP_LOSER,
    name: 'Most Points By Starting Lineup (Loser)',
  },
  {
    key: Challenges.MOST_POINTS_BY_BENCH,
    name: 'Most Points By Bench',
  },
  {
    key: Challenges.LEAST_POINTS_BY_BENCH,
    name: 'Least Points By Bench',
  },
  {
    key: Challenges.MOST_POINTS_BY_ENTIRE_TEAM,
    name: 'Most Points By Entire Team',
  },
];
