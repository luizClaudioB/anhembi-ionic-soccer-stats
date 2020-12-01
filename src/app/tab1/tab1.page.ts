import { Component, Injectable, OnInit, OnChanges, ɵɵstylePropInterpolate1 } from '@angular/core';
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
  filterMatches: boolean = false;
  country: string = 'brasil';
  standings: Array<any> = null;
  eachRound;
  filteredMatches;
  clubs;
  RoundData: number= 0;
  IndexData: number = 0;


  
  constructor(
    private footballLiveService: FootballLiveService,
  ) {}

  
  async ngOnInit(){
    await this.initializeData(this.country)
  }

  async initializeData(country: string){
    await this.getChampionshipData(country);
    await this.getClubsFromChampionship();
  }

  public async getChampionshipData(country: string) {
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

    return this.clubs;
  }

  getPastRounds(){
    this.filteredMatches = this.matches.matches.filter((placar) => placar?.score?.ft.length > 0);

    return this.filteredMatches;
  }

  getEachRoundSeparated(){
    let newArray = [], rodadasSeparadas;
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
    this.isLoading = false;

    return this.eachRound;
  }

  goToSlide(slides){
    console.log('Round:',this.RoundData + 1)
    slides.slideTo(this.RoundData)
  }

  getIndex(slides){
    slides.getActiveIndex().then(data => {
      this.IndexData = data; 
      this.RoundData =0;
      this.RoundData = this.IndexData 
    });
  }
  }

