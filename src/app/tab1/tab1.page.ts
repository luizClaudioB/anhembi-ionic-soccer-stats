import { Component, Injectable, OnInit, OnChanges } from '@angular/core';
import FootballLiveService from './../services/football-live/football-live.service';
import { MatchesModel } from '../models/matches.model'

export interface teamsImg {
  team: string,
  img: string,
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

@Injectable()
export class Tab1Page implements OnInit {

  isLoading: boolean = false;
  matches: MatchesModel;
  filteredMatches: any;
  filtrarJogos: boolean = false;
  country: string = 'brasil';
  clubs: any;
  standings: Array<any> = null;
  eachRound: any;

  constructor(
    private footballLiveService: FootballLiveService,
  ) {}

  async ngOnInit(){
    await this.initializeData(this.country)
  }

  async initializeData(country: string){
    await this.getChampionshipData(country);
    await this.getClubsFromChampionship();
    this.getStandings();
  }

  public async getChampionshipData(country: string) {
    console.log('received country', country)
    this.isLoading = true;
    const result: MatchesModel = await this.footballLiveService.getChampionship(country)
        this.matches = result;
        this.getPastRounds();
        this.getEachRoundSeparated();
        //this.isLoading = false;
     
    return this.matches;
  }

  public async getClubsFromChampionship() {
    const result: any = await this.footballLiveService.getClubsFromChampionship('brasil')
      this.clubs = result;
      console.log('teste', this.clubs.clubs[0].name);
    return this.clubs;
  }

  public getStandings() {
    let teste: any;
    let team: any;
    let testeTabela: any = [{}];
    let vitorias: number = 0;
    let derrotas: number = 0;
    let empates: number = 0;
    let pontos: number = 0;
    let jogos: number = 0;
    for(let i = 0; i < this.clubs.clubs.length; i++){
      vitorias = 0;
      derrotas = 0;
      empates = 0;
      pontos = 0;

      team = this.clubs.clubs[i].name;
      teste = this.matches.matches.filter((team) => team.team1 === this.clubs.clubs[i].name || 
        team.team2 === this.clubs.clubs[i].name);
        
      for(let i = 0; i < teste.length; i++){
          if(team === teste[i].team1 && teste[i].score != undefined){
            teste[i].score.ft[0] > teste[i].score.ft[1] 
              ? (vitorias = vitorias + 1, pontos = pontos + 3) : null;
            teste[i].score.ft[0] === teste[i].score.ft[1]
              ? (empates = empates + 1, pontos = pontos + 1) + 1 : null;
            teste[i].score.ft[0] < teste[i].score.ft[1]
              ? (derrotas = derrotas + 1) : null;
          }
          else if(team === teste[i].team2 && teste[i].score != undefined){
            teste[i].score.ft[0] < teste[i].score.ft[1] 
              ? (vitorias = vitorias + 1, pontos = pontos + 3) : null;
            teste[i].score.ft[0] === teste[i].score.ft[1]
              ? (empates = empates + 1, pontos = pontos + 1) + 1 : null;
            teste[i].score.ft[0] > teste[i].score.ft[1]
              ? (derrotas = derrotas + 1) : null;
          }

          jogos = vitorias + empates + derrotas;
      }

      testeTabela.push({team: team, jogos: jogos, pontos: pontos, vitorias: vitorias, empates: empates, derrotas: derrotas});
      testeTabela.sort((a,b) => (a.pontos < b.pontos) ? 1 : ((b.pontos < a.pontos) ? -1 : 0)); 
    }

    this.standings = testeTabela;
    console.log('standings', this.standings)
    return this.standings;
  }

  getPastRounds(){
    this.filteredMatches = this.matches.matches.filter((placar) => placar?.score?.ft.length > 0);

    return this.filteredMatches;
  }

  getEachRoundSeparated(){
    let newArray: any = []
    let rodadasSeparadas: any;
    let teamsImg: any;
    let teamsImg1: any;
    rodadasSeparadas = this.matches.matches.reduce((h, match) => Object.assign(h, { [match.round]:( h[match.round] || [] )
      .concat({date: match.date, score: match.score, team1: match.team1, team2: match.team2, 
        teamImg1: match.team1Img, teamImg2: match.team2Img}) }), [{}]);
    
    for(let i = 1; i <= 38; i++){
      let str1 = i.toString();
      let str2 = this.country === 'brasil' ? 'Rodada' : 'Matchday';
      let concat = str2 + ' ' + str1;
      newArray.push(rodadasSeparadas[concat])
    }
    this.eachRound = newArray;
    console.log('aaa', this.eachRound)
    this.isLoading = false;
    return this.eachRound;
  }
}
