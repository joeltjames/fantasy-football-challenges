declare module 'espn-fantasy-football-api/web-dev' {
  export type INJURY_STATUSES =
    | 'ACTIVE'
    | 'BEREAVEMENT'
    | 'DAY_TO_DAY'
    | 'DOUBTFUL'
    | 'FIFTEEN_DAY_DL'
    | 'INJURY_RESERVE'
    | 'OUT'
    | 'PATERNITY'
    | 'PROBABLE'
    | 'QUESTIONABLE'
    | 'SEVEN_DAY_DL'
    | 'SIXTY_DAY_DL'
    | 'SUSPENSION'
    | 'TEN_DAY_DL';
  export type PLAYER_AVAILABILITY_STATUSES = 'FREEAGENT' | 'ONTEAM' | 'WAIVERS';
  export interface ClientOptions {
    leagueId: number;
  }
  /*
   *Represents a fantasy football team in a league.
   */
  export interface Team {
    /*
     * The id of the team in the ESPN universe.
     */
    id: number;

    /*
     * The team's abbreviation.
     */
    abbreviation: string;

    /*
     * The team's name.
     */
    name: string;

    /*
     * The URL for the team's uploaded logo.
     */
    logoURL: string;

    /*
     * The team's position in the current wavier order.
     */
    wavierRank: number;

    /*
     * The team's roster of players.
     */
    roster: Array<Player>;

    /*
     * The number of regular season match-ups the team has won.
     */
    wins: number;

    /*
     * The number of regular season match-ups the team has lost.
     */
    losses: number;

    /*
     * The number of regular season match-ups the team has tied.
     */
    ties: number;

    /*
     * The number of regular season match-ups the team has won in the division.
     */
    divisionWins: number;

    /*
     * The number of regular season match-ups the team has lost in the division.
     */
    divisionLosses: number;

    /*
     * The number of regular season match-ups the team has tied in the division.
     */
    divisionTies: number;

    /*
     * The number of regular season match-ups the team has won at home.
     */
    homeWins: number;

    /*
     * The number of regular season match-ups the team has lost at home.
     */
    homeLosses: number;

    /*
     * The number of regular season match-ups the team has tied at home.
     */
    homeTies: number;

    /*
     * The number of regular season match-ups the team has won away.
     */
    awayWins: number;

    /*
     * The number of regular season match-ups the team has lost away.
     */
    awayLosses: number;

    /*
     * The number of regular season match-ups the team has tied away.
     */
    awayTies: number;

    /*
     * The total points scored by the team in the regular season and playoffs combined.
     */
    totalPointsScored: number;

    /*
     * The total points scored by the team in the regular season.
     */
    regularSeasonPointsFor: number;

    /*
     * The total points scored against the team in the regular season.
     */
    regularSeasonPointsAgainst: number;

    /*
     * The percentage of games won by the team in the regular season.
     */
    winningPercentage: number;

    /*
     * The seeding for the team entering the playoffs.
     */
    playoffSeed: number;

    /*
     * The final standings position the team ended the season in.
     */
    finalStandingsPosition: number;
  }
  /**
   * Represents an NFL player. This model is not directly associated with any fantasy team.
   */
  export interface Player {
    /*
     * The id of the player in the ESPN universe.
     */
    id: number;

    /*
     * The first name of the player.
     */
    firstName: string;

    /*
     * The last name of the player.
     */
    lastName: string;

    /*
     * The full name of the player.
     */
    fullName: string;

    /*
     * The jersey number the player wears.
     */
    jerseyNumber: number;

    /*
     * The NFL team the player is rostered on.
     */
    proTeam: string;

    /*
     * The NFL team abbreviation the player is rostered on.
     */
    proTeamAbbreviation: string;

    /*
     * The default position in a fantasy roster for the player.
     */
    defaultPosition: string;

    /*
     * A list of the eligible positions in a fantasy roster the player may be slotted in.
     */
    eligiblePositions: Array<string>;

    /*
     * The average position the player was drafted at in ESPN snake drafts.
     */
    averageDraftPosition: number;

    /*
     * The average auction price the player fetched in ESPN auction drafts.
     */
    averageAuctionValue: number;

    /*
     * The change in player ownership percentage in the last week across all ESPN leagues.
     */
    percentChange: number;

    /*
     * The percentage of ESPN league in which this player is/was started.
     */
    percentStarted: number;

    /*
     * The percentage of ESPN leagues in which this player is owned.
     */
    percentOwned: number;

    /*
     * The datetime the player was acquired by their current fantasy team.
     */
    acquiredDate: Date;

    /*
     * The fantasy roster status of the player.
     */
    availabilityStatus: PLAYER_AVAILABILITY_STATUSES;

    /*
     * Whether or not the player can be dropped from a team.
     */
    isDroppable: boolean;

    /*
     * Whether or not the player is injured.
     */
    isInjured: boolean;

    /*
     * The specific injury status/timeline of the player.
     */
    injuryStatus: INJURY_STATUSES;
  }
  export interface PlayerStats {
    /*
     * Total passing yards (typically a QB stat).
     */
    passingYards: number;

    /*
     * Total passing TDs (typically a QB stat).
     */
    passingTouchdowns: number;

    /*
     * Total passing 2 point conversion (typically a QB stat).
     */
    passing2PtConversion: number;

    /*
     * Total passing attempts resulting in an interception (typically negative points) (typically a QB stat).
     */
    passingInterceptions: number;

    /*
     * Total rushing yards.
     */
    rushingYards: number;

    /*
     * Total rushing touchdowns.
     */
    rushingTouchdowns: number;

    /*
     * Total rushing 2 point conversions.
     */
    rushing2PtConversions: number;

    /*
     * Total receiving yards.
     */
    receivingYards: number;

    /*
     * Total receiving touchdowns.
     */
    receivingTouchdowns: number;

    /*
     * Total receiving 2 point conversions.
     */
    receiving2PtConversions: number;

    /*
     * Total receptions (only populated in PPR leagues).
     */
    receivingReceptions: number;

    /*
     * Total fumbles lost (typically negative points) (applies to all offensive players).
     */
    lostFumbles: number;

    /*
     * Total made field goals from 50 yards or further.
     */
    madeFieldGoalsFrom50Plus: number;

    /*
     * Total made field goals from 40 yards to 49 yards.
     */
    madeFieldGoalsFrom40To49: number;

    /*
     * Total made field goals from under 40 yards.
     */
    madeFieldGoalsFromUnder40: number;

    /*
     * Total missed field goals (typically negative or zero points).
     */
    missedFieldGoals: number;

    /*
     * Made extra point attempts.
     */
    madeExtraPoints: number;

    /*
     * Missed extra point attempts (typically negative points).
     */
    missedExtraPoints: number;

    /*
     * When a DST allowed 0 points in their NFL game.
     */
    defensive0PointsAllowed: number;

    /*
     * When a DST allowed 1-6 points in their NFL game.
     */
    defensive1To6PointsAllowed: number;

    /*
     * When a DST allowed 7-13 points in their NFL game.
     */
    defensive7To13PointsAllowed: number;

    /*
     * When a DST allowed 14-17 points in their NFL game.
     */
    defensive14To17PointsAllowed: number;

    /*
     * When a DST allowed 28-34 points in their NFL game.
     */
    defensive28To34PointsAllowed: number;

    /*
     * When a DST allowed 35-45 points in their NFL game.
     */
    defensive35To45PointsAllowed: number;

    /*
     * When a DST blocks any kick and returns it for a touchdown.
     */
    defensiveBlockedKickForTouchdowns: number;

    /*
     * When a DST records an interception.
     */
    defensiveInterceptions: number;

    /*
     * When a DST recovers a fumble.
     */
    defensiveFumbles: number;

    /*
     * When a DST blocks any kick.
     */
    defensiveBlockedKicks: number;

    /*
     * When a DST records a safety.
     */
    defensiveSafeties: number;

    /*
     * When a DST records a sack.
     */
    defensiveSacks: number;

    /*
     * When a DST returns a kickoff for a touchdown.
     */
    kickoffReturnTouchdown: number;

    /*
     * When a DST returns a punt for a touchdown.
     */
    puntReturnTouchdown: number;

    /*
     * When a DST returns a fumble for a touchdown.
     */
    fumbleReturnTouchdown: number;

    /*
     * When a DST returns an interception for a touchdown.
     */
    interceptionReturnTouchdown: number;

    /*
     * When a DST allows 100-199 yards in their NFL game.
     */
    defensive100To199YardsAllowed: number;

    /*
     * When a DST allows 200-299 yards in their NFL game.
     */
    defensive200To299YardsAllowed: number;

    /*
     * When a DST allows 350-399 yards in their NFL game.
     */
    defensive350To399YardsAllowed: number;

    /*
     * When a DST allows 400-449 yards in their NFL game.
     */
    defensive400To449YardsAllowed: number;

    /*
     * When a DST allows 450-499 yards in their NFL game.
     */
    defensive450To499YardsAllowed: number;

    /*
     * When a DST allows 500-549 yards in their NFL game.
     */
    defensive500To549YardsAllowed: number;

    /*
     * When a DST allows 550 or more yards in their NFL game.
     */
    defensiveOver550YardsAllowed: number;
  }

  /**
   * Represents a player and their stats on a boxscore.
   */
  export interface BoxscorePlayer {
    /**
     * The player model representing the NFL player.
     */
    player: Player;
    /**
     * The position the player is slotted at in the fantasy lineup.
     */
    position: string;
    /**
     * The total points scored by the player.
     */
    totalPoints: number;
    /**
     * The PlayerStats model with the points scored by the player.
     */
    pointBreakdown: PlayerStats;
    /**
     * The PlayerStats model with the raw statistics registered by the player.
     */
    rawStats: PlayerStats;
  }
  /**
   * Represents a boxscore for a week.
   */
  export interface Boxscore {
    /**
     * The total points scored by the home team.
     */
    homeScore: number;
    /**
     * The home team's id. Can be used to load a cached Team.
     */
    homeTeamId: number;
    /**
     * The home team's roster, containing player info and stats.
     */
    homeRoster: BoxscorePlayer[];
    /**
     * The total points scored by the away team.
     */
    awayScore: number;
    /**
     * The away team's id. Can be used to load a cached Team.
     */
    awayTeamId: number;
    /**
     * The away team's roster, containing player info and stats.
     */
    awayRoster: BoxscorePlayer[];
  }
  /**
   * Provides functionality to make a variety of API calls to ESPN for a given fantasy football league.
   * This class should be used by consuming projects.
   */
  export class Client {
    constructor(options: ClientOptions);
    /**
     * Returns all boxscores for a week.
     *
     * NOTE: Due to the way ESPN populates data, both the scoringPeriodId and matchupPeriodId are required and must correspond with each other correctly.
     * @param seasonId {number} The season in which the boxscore occurs.
     * @param matchupPeriodId {number} The matchup period in which the boxscore occurs.
     * @param scoringPeriodId {number} The scoring period in which the boxscore occurs.
     * @return {Promise<Boxscore[]} All boxscores for the week
     */
    getBoxscoreForWeek(params: {
      seasonId: number;
      matchupPeriodId: number;
      scoringPeriodId: number;
    }): Promise<Boxscore[]>;
    getTeamsAtWeek(params: {
      seasonId: number;
      scoringPeriodId: number;
    }): Promise<Team[]>;
  }
}


declare module 'espn-fantasy-football-api' {
  export type INJURY_STATUSES =
    | 'ACTIVE'
    | 'BEREAVEMENT'
    | 'DAY_TO_DAY'
    | 'DOUBTFUL'
    | 'FIFTEEN_DAY_DL'
    | 'INJURY_RESERVE'
    | 'OUT'
    | 'PATERNITY'
    | 'PROBABLE'
    | 'QUESTIONABLE'
    | 'SEVEN_DAY_DL'
    | 'SIXTY_DAY_DL'
    | 'SUSPENSION'
    | 'TEN_DAY_DL';
  export type PLAYER_AVAILABILITY_STATUSES = 'FREEAGENT' | 'ONTEAM' | 'WAIVERS';
  export interface ClientOptions {
    leagueId: number;
  }
  /*
   *Represents a fantasy football team in a league.
   */
  export interface Team {
    /*
     * The id of the team in the ESPN universe.
     */
    id: number;

    /*
     * The team's abbreviation.
     */
    abbreviation: string;

    /*
     * The team's name.
     */
    name: string;

    /*
     * The URL for the team's uploaded logo.
     */
    logoURL: string;

    /*
     * The team's position in the current wavier order.
     */
    wavierRank: number;

    /*
     * The team's roster of players.
     */
    roster: Array<Player>;

    /*
     * The number of regular season match-ups the team has won.
     */
    wins: number;

    /*
     * The number of regular season match-ups the team has lost.
     */
    losses: number;

    /*
     * The number of regular season match-ups the team has tied.
     */
    ties: number;

    /*
     * The number of regular season match-ups the team has won in the division.
     */
    divisionWins: number;

    /*
     * The number of regular season match-ups the team has lost in the division.
     */
    divisionLosses: number;

    /*
     * The number of regular season match-ups the team has tied in the division.
     */
    divisionTies: number;

    /*
     * The number of regular season match-ups the team has won at home.
     */
    homeWins: number;

    /*
     * The number of regular season match-ups the team has lost at home.
     */
    homeLosses: number;

    /*
     * The number of regular season match-ups the team has tied at home.
     */
    homeTies: number;

    /*
     * The number of regular season match-ups the team has won away.
     */
    awayWins: number;

    /*
     * The number of regular season match-ups the team has lost away.
     */
    awayLosses: number;

    /*
     * The number of regular season match-ups the team has tied away.
     */
    awayTies: number;

    /*
     * The total points scored by the team in the regular season and playoffs combined.
     */
    totalPointsScored: number;

    /*
     * The total points scored by the team in the regular season.
     */
    regularSeasonPointsFor: number;

    /*
     * The total points scored against the team in the regular season.
     */
    regularSeasonPointsAgainst: number;

    /*
     * The percentage of games won by the team in the regular season.
     */
    winningPercentage: number;

    /*
     * The seeding for the team entering the playoffs.
     */
    playoffSeed: number;

    /*
     * The final standings position the team ended the season in.
     */
    finalStandingsPosition: number;
  }
  /**
   * Represents an NFL player. This model is not directly associated with any fantasy team.
   */
  export interface Player {
    /*
     * The id of the player in the ESPN universe.
     */
    id: number;

    /*
     * The first name of the player.
     */
    firstName: string;

    /*
     * The last name of the player.
     */
    lastName: string;

    /*
     * The full name of the player.
     */
    fullName: string;

    /*
     * The jersey number the player wears.
     */
    jerseyNumber: number;

    /*
     * The NFL team the player is rostered on.
     */
    proTeam: string;

    /*
     * The NFL team abbreviation the player is rostered on.
     */
    proTeamAbbreviation: string;

    /*
     * The default position in a fantasy roster for the player.
     */
    defaultPosition: string;

    /*
     * A list of the eligible positions in a fantasy roster the player may be slotted in.
     */
    eligiblePositions: Array<string>;

    /*
     * The average position the player was drafted at in ESPN snake drafts.
     */
    averageDraftPosition: number;

    /*
     * The average auction price the player fetched in ESPN auction drafts.
     */
    averageAuctionValue: number;

    /*
     * The change in player ownership percentage in the last week across all ESPN leagues.
     */
    percentChange: number;

    /*
     * The percentage of ESPN league in which this player is/was started.
     */
    percentStarted: number;

    /*
     * The percentage of ESPN leagues in which this player is owned.
     */
    percentOwned: number;

    /*
     * The datetime the player was acquired by their current fantasy team.
     */
    acquiredDate: Date;

    /*
     * The fantasy roster status of the player.
     */
    availabilityStatus: PLAYER_AVAILABILITY_STATUSES;

    /*
     * Whether or not the player can be dropped from a team.
     */
    isDroppable: boolean;

    /*
     * Whether or not the player is injured.
     */
    isInjured: boolean;

    /*
     * The specific injury status/timeline of the player.
     */
    injuryStatus: INJURY_STATUSES;
  }
  export interface PlayerStats {
    /*
     * Total passing yards (typically a QB stat).
     */
    passingYards: number;

    /*
     * Total passing TDs (typically a QB stat).
     */
    passingTouchdowns: number;

    /*
     * Total passing 2 point conversion (typically a QB stat).
     */
    passing2PtConversion: number;

    /*
     * Total passing attempts resulting in an interception (typically negative points) (typically a QB stat).
     */
    passingInterceptions: number;

    /*
     * Total rushing yards.
     */
    rushingYards: number;

    /*
     * Total rushing touchdowns.
     */
    rushingTouchdowns: number;

    /*
     * Total rushing 2 point conversions.
     */
    rushing2PtConversions: number;

    /*
     * Total receiving yards.
     */
    receivingYards: number;

    /*
     * Total receiving touchdowns.
     */
    receivingTouchdowns: number;

    /*
     * Total receiving 2 point conversions.
     */
    receiving2PtConversions: number;

    /*
     * Total receptions (only populated in PPR leagues).
     */
    receivingReceptions: number;

    /*
     * Total fumbles lost (typically negative points) (applies to all offensive players).
     */
    lostFumbles: number;

    /*
     * Total made field goals from 50 yards or further.
     */
    madeFieldGoalsFrom50Plus: number;

    /*
     * Total made field goals from 40 yards to 49 yards.
     */
    madeFieldGoalsFrom40To49: number;

    /*
     * Total made field goals from under 40 yards.
     */
    madeFieldGoalsFromUnder40: number;

    /*
     * Total missed field goals (typically negative or zero points).
     */
    missedFieldGoals: number;

    /*
     * Made extra point attempts.
     */
    madeExtraPoints: number;

    /*
     * Missed extra point attempts (typically negative points).
     */
    missedExtraPoints: number;

    /*
     * When a DST allowed 0 points in their NFL game.
     */
    defensive0PointsAllowed: number;

    /*
     * When a DST allowed 1-6 points in their NFL game.
     */
    defensive1To6PointsAllowed: number;

    /*
     * When a DST allowed 7-13 points in their NFL game.
     */
    defensive7To13PointsAllowed: number;

    /*
     * When a DST allowed 14-17 points in their NFL game.
     */
    defensive14To17PointsAllowed: number;

    /*
     * When a DST allowed 28-34 points in their NFL game.
     */
    defensive28To34PointsAllowed: number;

    /*
     * When a DST allowed 35-45 points in their NFL game.
     */
    defensive35To45PointsAllowed: number;

    /*
     * When a DST blocks any kick and returns it for a touchdown.
     */
    defensiveBlockedKickForTouchdowns: number;

    /*
     * When a DST records an interception.
     */
    defensiveInterceptions: number;

    /*
     * When a DST recovers a fumble.
     */
    defensiveFumbles: number;

    /*
     * When a DST blocks any kick.
     */
    defensiveBlockedKicks: number;

    /*
     * When a DST records a safety.
     */
    defensiveSafeties: number;

    /*
     * When a DST records a sack.
     */
    defensiveSacks: number;

    /*
     * When a DST returns a kickoff for a touchdown.
     */
    kickoffReturnTouchdown: number;

    /*
     * When a DST returns a punt for a touchdown.
     */
    puntReturnTouchdown: number;

    /*
     * When a DST returns a fumble for a touchdown.
     */
    fumbleReturnTouchdown: number;

    /*
     * When a DST returns an interception for a touchdown.
     */
    interceptionReturnTouchdown: number;

    /*
     * When a DST allows 100-199 yards in their NFL game.
     */
    defensive100To199YardsAllowed: number;

    /*
     * When a DST allows 200-299 yards in their NFL game.
     */
    defensive200To299YardsAllowed: number;

    /*
     * When a DST allows 350-399 yards in their NFL game.
     */
    defensive350To399YardsAllowed: number;

    /*
     * When a DST allows 400-449 yards in their NFL game.
     */
    defensive400To449YardsAllowed: number;

    /*
     * When a DST allows 450-499 yards in their NFL game.
     */
    defensive450To499YardsAllowed: number;

    /*
     * When a DST allows 500-549 yards in their NFL game.
     */
    defensive500To549YardsAllowed: number;

    /*
     * When a DST allows 550 or more yards in their NFL game.
     */
    defensiveOver550YardsAllowed: number;
  }

  /**
   * Represents a player and their stats on a boxscore.
   */
  export interface BoxscorePlayer {
    /**
     * The player model representing the NFL player.
     */
    player: Player;
    /**
     * The position the player is slotted at in the fantasy lineup.
     */
    position: string;
    /**
     * The total points scored by the player.
     */
    totalPoints: number;
    /**
     * The PlayerStats model with the points scored by the player.
     */
    pointBreakdown: PlayerStats;
    /**
     * The PlayerStats model with the raw statistics registered by the player.
     */
    rawStats: PlayerStats;
  }
  /**
   * Represents a boxscore for a week.
   */
  export interface Boxscore {
    /**
     * The total points scored by the home team.
     */
    homeScore: number;
    /**
     * The home team's id. Can be used to load a cached Team.
     */
    homeTeamId: number;
    /**
     * The home team's roster, containing player info and stats.
     */
    homeRoster: BoxscorePlayer[];
    /**
     * The total points scored by the away team.
     */
    awayScore: number;
    /**
     * The away team's id. Can be used to load a cached Team.
     */
    awayTeamId: number;
    /**
     * The away team's roster, containing player info and stats.
     */
    awayRoster: BoxscorePlayer[];
  }
  /**
   * Provides functionality to make a variety of API calls to ESPN for a given fantasy football league.
   * This class should be used by consuming projects.
   */
  export class Client {
    constructor(options: ClientOptions);
    /**
     * Returns all boxscores for a week.
     *
     * NOTE: Due to the way ESPN populates data, both the scoringPeriodId and matchupPeriodId are required and must correspond with each other correctly.
     * @param seasonId {number} The season in which the boxscore occurs.
     * @param matchupPeriodId {number} The matchup period in which the boxscore occurs.
     * @param scoringPeriodId {number} The scoring period in which the boxscore occurs.
     * @return {Promise<Boxscore[]} All boxscores for the week
     */
    getBoxscoreForWeek(params: {
      seasonId: number;
      matchupPeriodId: number;
      scoringPeriodId: number;
    }): Promise<Boxscore[]>;
    getTeamsAtWeek(params: {
      seasonId: number;
      scoringPeriodId: number;
    }): Promise<Team[]>;
  }
}
