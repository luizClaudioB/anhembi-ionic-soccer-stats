import { Component, Injectable, OnInit } from '@angular/core';
import FootballLiveService from './../services/football-live/football-live.service';
import { MatchesModel } from '../models/matches.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

@Injectable()
export class Tab2Page implements OnInit {
  
  isLoading: boolean = false;
  timeDoCoracao: string = 'Flamengo RJ';
  supportedTeamGame = null;
  supportTeamInfo = '';
  todaysDate: string = (new Date()).toISOString().split('T')[0];
  clubsNextMatch: MatchesModel;
  changeSupporterTeam: boolean = false;
  country: string = 'brasil';
  getAllClubs;

  constructor(
    private footballLiveService: FootballLiveService,
  ) {
    this.changeSupporterTeam = true;
  }

  async ngOnInit(){
    await this.initializeData(this.country, this.timeDoCoracao);
  }

  public async initializeData(country, supporterTeam) {
    this.isLoading = true;
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
    this.isLoading = false;
    return this.clubsNextMatch;
  }
  
}

