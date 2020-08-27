
export interface PlayersModel {
    pid: number;
    fullName: string;
    name: string;
    image: any;
    born: string;
    currentAge: string;
    country: string;
    battingStyle: string;
    bowlingstyle: string;
    isFavourite: boolean;
}

export interface MatchStatistics {
    10: string;
    w5w: string;
    w4: string;
    SR: string;
    Econ: string;
    Ave: string;
    BBM: string;
    BBI: string;
    Wkts: string;
    Runs: string;
    Balls: string;
    Inns: string;
    Mat: string;
}



export interface Bowling {
    listA: MatchStatistics;
    firstClass: MatchStatistics;
    T20Is: MatchStatistics;
    ODIs: MatchStatistics;
    tests: MatchStatistics;
}

export interface MatchStatistics2 {
    50: string;
    100: string;
    St: string;
    Ct: string;
    sizes: string;
    fours: string;
    SR: string;
    BF: string;
    Ave: string;
    HS: string;
    Runs: string;
    NO: string;
    Inns: string;
    Mat: string;
}



export interface Batting {
    listA: MatchStatistics2;
    firstClass: MatchStatistics2;
    T20Is: MatchStatistics2;
    ODIs: MatchStatistics2;
    tests: MatchStatistics2;
}

export interface Data {
    bowling: Bowling;
    batting: Batting;
}

export interface Provider {
    source: string;
    url: string;
    pubDate: string;
}

export interface PlayerProfile {
    pid: number;
    profile: string;
    imageURL: string;
    battingStyle: string;
    bowlingStyle: string;
    majorTeams: string;
    currentAge: string;
    born: string;
    fullName: string;
    name: string;
    country: string;
    playingRole: string;
    v: string;
    data: Data;
    ttl: number;
    provider: Provider;
    creditsLeft: number;
}
export interface ManageFavouriteObject {
    pid: number;
    pname: string;
    id: number;
}




