import { Component, Injectable, OnInit } from '@angular/core';
import FootballLiveService from './../services/football-live/football-live.service';
import { MatchesModel } from '../models/matches.model';

export interface teamsImg {
  team: string,
  img: string,
}

const teamsImages: Array<teamsImg> = [
  {
  team: 'Palmeiras SP', 
  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/200px-Palmeiras_logo.svg.png'}, 
  {
  team: 'Ceára SC', 
  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/1200px-Cear%C3%A1_Sporting_Club_logo.svg.png'
  }
];
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

@Injectable()
export class Tab2Page implements OnInit {
  
  isLoading: boolean = false;
  timeDoCoracao: string = 'Palmeiras SP';
  teamsImg: any = '';
  teamsImg1: any = '';
  supportedTeamGame: MatchesModel = null;

  constructor(
    private footballLiveService: FootballLiveService,
  ) {}

  async ngOnInit(){
    await this.initializeData();
  }

  async initializeData() {
    await this.getSupportedTeamData('brasil', this.timeDoCoracao);
    this.getTeamsImages();
  }

  public async getSupportedTeamData(country: string, supportedTeam: string) {
    const result: any = await this.footballLiveService.getChampionship(country)
      this.supportedTeamGame = result.matches.filter((time) => time?.team1 === supportedTeam 
      || time?.team2 === supportedTeam);
    
    return this.supportedTeamGame;
  }

  getTeamsImages(){
    this.teamsImg = teamsImages.filter((times) => times?.team === this.supportedTeamGame[12].team1);
    this.teamsImg1 = teamsImages.filter((times) => times?.team === this.supportedTeamGame[12].team2);
  }
}

