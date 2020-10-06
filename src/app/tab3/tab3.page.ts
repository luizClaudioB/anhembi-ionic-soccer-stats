import { Component, Injectable, OnInit, OnChanges } from '@angular/core';
import FootballLiveService from './../services/football-live/football-live.service';
import { MatchesModel } from '../models/matches.model'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

@Injectable()
export class Tab3Page implements OnInit {

  isLoading: boolean = false;
  matches: MatchesModel;
  country: string = 'brasil';
  clubs: any;
  standings: Array<Object> = null;

  constructor(
    private footballLiveService: FootballLiveService,
  ) {}

  async ngOnInit(){
    await this.initializeData(this.country)
  }

  async initializeData(country: string){
    await this.getChampionshipData(country);
    await this.getClubsFromChampionship(country);
  }

  public async getChampionshipData(country: string) {
    this.isLoading = true;
    const result: MatchesModel = await this.footballLiveService.getChampionship(country)
        this.matches = result;
        this.isLoading = false;
     
    return this.matches;
  }

  public async getClubsFromChampionship(country: string) {
    const result: any = await this.footballLiveService.getClubsFromChampionship(country)
      this.clubs = result;
      console.log('teste', this.clubs.clubs[0].name);
      this.getStandings();
    return this.clubs;
  }

  public getStandings() {
    let allMatchesClub: any;
    let team: any;
    let provisoryStandings: any = [{}];
    let wins: number = 0;
    let defeats: number = 0;
    let draw: number = 0;
    let points: number = 0;
    let playedGames: number = 0;
    for(let i = 0; i < this.clubs.clubs.length; i++){
      wins = 0;
      defeats = 0;
      draw = 0;
      points = 0;

      team = this.clubs.clubs[i].name;
      allMatchesClub = this.matches.matches.filter((team) => team.team1 === this.clubs.clubs[i].name || 
        team.team2 === this.clubs.clubs[i].name);
        
      for(let i = 0; i < allMatchesClub.length; i++){
          if(team === allMatchesClub[i].team1 && allMatchesClub[i].score != undefined){
            allMatchesClub[i].score.ft[0] > allMatchesClub[i].score.ft[1] 
              ? (wins = wins + 1, points = points + 3) : null;
            allMatchesClub[i].score.ft[0] === allMatchesClub[i].score.ft[1]
              ? (draw = draw + 1, points = points + 1) + 1 : null;
            allMatchesClub[i].score.ft[0] < allMatchesClub[i].score.ft[1]
              ? (defeats = defeats + 1) : null;
          }
          else if(team === allMatchesClub[i].team2 && allMatchesClub[i].score != undefined){
            allMatchesClub[i].score.ft[0] < allMatchesClub[i].score.ft[1] 
              ? (wins = wins + 1, points = points + 3) : null;
            allMatchesClub[i].score.ft[0] === allMatchesClub[i].score.ft[1]
              ? (draw = draw + 1, points = points + 1) + 1 : null;
            allMatchesClub[i].score.ft[0] > allMatchesClub[i].score.ft[1]
              ? (defeats = defeats + 1) : null;
          }

          playedGames = wins + draw + defeats;
      }

      provisoryStandings.push({team: team, jogos: playedGames, pontos: points, vitorias: wins, empates: draw, derrotas: defeats});
      provisoryStandings.sort((a,b) => (a.pontos < b.pontos) ? 1 : ((b.pontos < a.pontos) ? -1 : 0)); 
    }

    this.standings = provisoryStandings;
    return this.standings;
  }
}
