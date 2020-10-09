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
  },
  {
  team: 'Atlético GO',
  img: "https://a1.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F10357.png"
  },
  {
  team: 'Athletico PR',
  img: "https://a.espncdn.com/i/teamlogos/soccer/500/3458.png",
  },
  {
  team: 'EC Bahia',
  img: "https://www.esporteclubebahia.com.br/wp-content/themes/2016/img/main/logo-bahia-max.png",
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
  timeDoCoracao: string = 'Flamengo RJ';
  teamsImg: any = '';
  teamsImg1: any = '';
  supportedTeamGame: any = null;
  supportTeamInfo: any = '';
  todaysDate: string = (new Date()).toISOString().split('T')[0];
  clubsNextMatch: MatchesModel;
  getAllClubs: any;
  changeSupporterTeam: boolean = false;
  country: string = 'brasil';

  constructor(
    private footballLiveService: FootballLiveService,
  ) {}

  async ngOnInit(){
    await this.initializeData(this.country, this.timeDoCoracao);
  }

  public async initializeData(country, supporterTeam) {
    await this.getSupportedTeamData(country, supporterTeam);
    await this.getClubInformation(country, supporterTeam);
    this.getNextMatch();
  }

  public async getSupportedTeamData(country: string, supportedTeam: string) {
    const result: any = await this.footballLiveService.getChampionship(country)
      this.supportedTeamGame = result.matches.filter((time) => time?.team1 === supportedTeam 
      || time?.team2 === supportedTeam);
    return this.supportedTeamGame;
  }

  public async getClubInformation(country: string, supporterTeam) {
    const result: any = await this.footballLiveService.getClubsFromChampionship(country)
      this.supportTeamInfo = result.clubs.filter((club) => club?.name === supporterTeam);
      this.supportTeamInfo = this.supportTeamInfo[0];
      this.getAllClubs = result.clubs;
      return this.supportTeamInfo;
  }

  public getNextMatch(){
    let nextMatch = null;
    let previousDate: string = '2030-01-01';
    for(let i = 0; i < this.supportedTeamGame.length; i++){
      if(this.supportedTeamGame[i].date > this.todaysDate && this.supportedTeamGame[i].date < previousDate){
        nextMatch = this.supportedTeamGame[i];
        previousDate = this.supportedTeamGame[i].date;
      }
    }
    this.clubsNextMatch = nextMatch;
    console.log('it worked!', this.clubsNextMatch)
    return this.clubsNextMatch;
  }
  
}

