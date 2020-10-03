export interface MatchesModel {
    matches?: [
        {
            date?: string,
            round?: string,
            team1?: string,
            team2?: string,
            score?: {
                ft?: Array<number>
            }
        }
    ]
}