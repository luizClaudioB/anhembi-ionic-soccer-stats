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
  bestAttackTeam: string = '';
  numberOfGoals: number = 0;
  bestDefenseTeam: string = '';
  numberGC: number = 100;

  constructor(
    private footballLiveService: FootballLiveService,
  ) {}

  async ngOnInit(){
    await this.initializeData(this.country)
  }

  async initializeData(country: string){
    this.isLoading = true;
    await this.getChampionshipData(country);
    await this.getClubsFromChampionship(country);
    this.isLoading = false;
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
      this.getStandings();
    return this.clubs;
  }

  public getStandings() {
    let allMatchesClub, team, provisoryStandings: any = [{}];
    let wins: number = 0, defeats: number = 0, draw: number = 0, points: number = 0, playedGames: number = 0;
    let golsPro: number = 0, golsContra: number = 0; 
        
    for(let i = 0; i < this.clubs.clubs.length; i++){
      wins = 0;
      defeats = 0;
      draw = 0;
      points = 0;
      golsPro = 0;
      golsContra = 0;

      team = this.clubs.clubs[i].name;
      allMatchesClub = this.matches.matches.filter((team) => team.team1 === this.clubs.clubs[i].name || 
        team.team2 === this.clubs.clubs[i].name);
        
      for(let i = 0; i < allMatchesClub.length; i++){
          if(team === allMatchesClub[i].team1 && allMatchesClub[i].score != undefined){
            
            golsPro = golsPro + allMatchesClub[i].score.ft[0];
            golsContra = golsContra + allMatchesClub[i].score.ft[1];
            
            allMatchesClub[i].score.ft[0] > allMatchesClub[i].score.ft[1] 
              ? (wins = wins + 1, points = points + 3) : null;
            allMatchesClub[i].score.ft[0] === allMatchesClub[i].score.ft[1]
              ? (draw = draw + 1, points = points + 1) + 1 : null;
            allMatchesClub[i].score.ft[0] < allMatchesClub[i].score.ft[1]
              ? (defeats = defeats + 1) : null;
          }
          else if(team === allMatchesClub[i].team2 && allMatchesClub[i].score != undefined){
            
            golsPro = golsPro + allMatchesClub[i].score.ft[1];
            golsContra = golsContra + allMatchesClub[i].score.ft[0];
            
            allMatchesClub[i].score.ft[0] < allMatchesClub[i].score.ft[1] 
              ? (wins = wins + 1, points = points + 3) : null;
            allMatchesClub[i].score.ft[0] === allMatchesClub[i].score.ft[1]
              ? (draw = draw + 1, points = points + 1) + 1 : null;
            allMatchesClub[i].score.ft[0] > allMatchesClub[i].score.ft[1]
              ? (defeats = defeats + 1) : null;
          }

          playedGames = wins + draw + defeats;
      }

      provisoryStandings.push({team: this.clubs.clubs[i].clubName, jogos: playedGames,
          pontos: points, vitorias: wins, empates: draw, derrotas: defeats, golsPro: golsPro,
            golsContra: golsContra, sg: (golsPro - golsContra)});
      provisoryStandings.sort((a,b) => (a.pontos < b.pontos) ? 1 : ((b.pontos < a.pontos) ? -1 : 0)); 
    }

    this.standings = provisoryStandings;
    this.bestAttack(this.standings);
    return this.bestDefense(this.standings);
  }
  
  public bestAttack(championshipData: any) {
    this.bestAttackTeam = '';
    this.numberOfGoals = 0;
    championshipData.forEach(team => {
      team && team.golsPro && team.golsPro > this.numberOfGoals 
        ? (this.bestAttackTeam = team.team, this.numberOfGoals = team.golsPro, this.imgBestAttack = team.img)
        : null
    });
  }
  
  public bestDefense(championshipData: any) {
    this.bestDefenseTeam = '';
    this.numberGC = 100;
    championshipData.forEach(team => {
      team && team.golsContra && team.golsContra < this.numberGC 
        ? (this.bestDefenseTeam = team.team, this.numberGC = team.golsContra, this.imgBestDefense = team.img)
        : null
    });
  }

}
