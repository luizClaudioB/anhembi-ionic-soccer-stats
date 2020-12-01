import { Component, Injectable, OnInit } from '@angular/core';
import FootballLiveService from './../services/football-live/football-live.service';
import { Storage } from '@ionic/storage';
import { MatchesModel } from '../models/matches.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

@Injectable({
  providedIn: 'root'
})
export class Tab2Page implements OnInit {

  isLoading: boolean = false;
  timeDoCoracao: string = '';
  supportedTeamGame = null;
  supportTeamInfo = '';
  matches: any;
  todaysDate: string = (new Date()).toISOString().split('T')[0];
  clubsNextMatch: MatchesModel;
  changeSupporterTeam: boolean = false;
  country: string = 'brasil';
  getAllClubs;
  search: string = '';
  getAllFilteredClubs;
  clubStats: any;

  constructor(
    private footballLiveService: FootballLiveService,
    private storage: Storage
  ) {
    this.changeSupporterTeam = true;
  }

  async ngOnInit() {
    const hasTeamDataStoraged = await this.storage.get('supportTeamInfo');

    if (!hasTeamDataStoraged) {
      await this.initializeData(this.country, this.timeDoCoracao);
    } else {
      await this.loadTeamData();
    }
    this.getAllFilteredClubs = this.getAllClubs;

  }

  public async loadTeamData() {
    this.changeSupporterTeam = false;
    this.supportedTeamGame = await this.storage.get('supportedTeamGame');
    this.supportTeamInfo = await this.storage.get('supportTeamInfo');
    this.getAllClubs = await this.storage.get('clubs');
    this.clubsNextMatch = await this.storage.get('clubsNextMatch');
  }

  public async storeTeamsData() {
    await this.storage.set('supportedTeamGame', this.supportedTeamGame);
    await this.storage.set('supportTeamInfo', this.supportTeamInfo);
    await this.storage.set('clubs', this.getAllClubs);
    await this.storage.set('clubsNextMatch', this.clubsNextMatch);
  }

  public async initializeData(country, supporterTeam) {
    this.isLoading = true;
    await this.getSupportedTeamData(country, supporterTeam);
    await this.getClubInformation(country, supporterTeam);
    await this.getNextMatch();
    await this.storeTeamsData();
  }

  public async getSupportedTeamData(country: string, supportedTeam: string) {
    const result: any = await this.footballLiveService.getChampionship(country)
      this.matches = result;
      this.supportedTeamGame = result.matches.filter((time) => time?.team1 === supportedTeam
        || time?.team2 === supportedTeam);
    return this.supportedTeamGame;
  }

  public async getClubInformation(country: string, supporterTeam?: any) {
    const result: any = await this.footballLiveService.getClubsFromChampionship(country)
    if(supporterTeam !== '') {
      this.supportTeamInfo = result.clubs.filter((club) => club?.name === supporterTeam);
      this.supportTeamInfo = this.supportTeamInfo[0];
      this.getTeamStats();
    }                                            
    this.getAllClubs = result.clubs;
    return this.supportTeamInfo;
  }
                                                 
  public getTeamStats(): any {
    let allMatchesClub, team, provisoryStandings: any = {};
    let wins: number = 0, defeats: number = 0, draw: number = 0, points: number = 0, playedGames: number = 0; 
    let golsPro: number = 0, golsContra: number = 0; 

      team = this.timeDoCoracao;
      allMatchesClub = this.matches.matches.filter((team) => team.team1 === this.timeDoCoracao || 
      team.team2 === this.timeDoCoracao);
        
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

      provisoryStandings = { team: team, jogos: playedGames,
          pontos: points, vitorias: wins, empates: draw, derrotas: defeats, golsPro: golsPro, 
          golsContra: golsContra, sg: (golsPro - golsContra)};
    
    this.clubStats = provisoryStandings;
    console.log('clubstats log', this.clubStats)
    return this.clubStats;
  }  

  public getNextMatch() {
    let nextMatch = null;
    let previousDate: string = '2030-01-01';
    for (let i = 0; i < this.supportedTeamGame.length; i++) {
      if (this.supportedTeamGame[i].date > this.todaysDate && this.supportedTeamGame[i].date < previousDate) {
        nextMatch = this.supportedTeamGame[i];
        previousDate = this.supportedTeamGame[i].date;
      }
    }
    this.clubsNextMatch = nextMatch;
    this.isLoading = false;
    return this.clubsNextMatch;
  }


  public filterClubs(){

    this.getAllFilteredClubs = this.getAllClubs.filter((club)=>club.name.toLowerCase().includes(this.search.toLowerCase()))
    console.log(this.search)
  }
}

