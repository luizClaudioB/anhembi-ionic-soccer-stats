import { Component, Injectable, OnInit, OnChanges } from '@angular/core';
import FootballLiveService from './../services/football-live/football-live.service';
import { MatchesModel } from '../models/matches.model'
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

  constructor(
    private footballLiveService: FootballLiveService,
  ) {}

  async ngOnInit(){
    await this.initializeData()
  }

  async initializeData(){
    await this.getChampionshipData(this.country);
  }

  public async getChampionshipData(country: string) {
    this.isLoading = true;
    const result: MatchesModel = await this.footballLiveService.getChampionship(country)
        this.matches = result;
        this.getPastRounds();
        this.getEachRoundSeparated();
        this.isLoading = false;
     
    return this.matches;
  }

  getPastRounds(){
    this.filteredMatches = this.matches.matches.filter((placar) => placar?.score?.ft.length > 0);

    return this.filteredMatches;
  }

  getEachRoundSeparated(){
    let rodadasSeparadas: Object;
    rodadasSeparadas = this.matches.matches.reduce((h, match) => Object.assign(h, { [match.round]:( h[match.round] || [] )
      .concat({date: match.date, score: match.score, team1: match.team1, team2: match.team2}) }), {});

    return rodadasSeparadas;
  }
}
