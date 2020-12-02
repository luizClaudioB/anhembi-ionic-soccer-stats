import {
  Component,
  Injectable,
  OnInit
} from '@angular/core';
import FootballLiveService from './../services/football-live/football-live.service';
import { MatchesModel } from '../models/matches.model';
import * as moment from 'moment';

export interface TeamsImg {
  team: string;
  img: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
@Injectable()
export class Tab1Page implements OnInit {
  isLoading = false;
  matches: MatchesModel;
  filterMatches = false;
  country = 'brasil';
  standings: Array<any> = null;
  eachRound;
  filteredMatches;
  clubs;
  RoundData = 0;
  IndexData = 0;
  nextMatch;

  constructor(private footballLiveService: FootballLiveService) { }

  async ngOnInit() {
    await this.initializeData(this.country);
    await this.getNextMatch();
  }

  async initializeData(country: string) {
    await this.getChampionshipData(country);
    await this.getClubsFromChampionship();
  }

  public async getChampionshipData(country: string) {
    this.isLoading = true;
    const result: MatchesModel = await this.footballLiveService.getChampionship(
      country
    );
    this.matches = result;
    this.getPastRounds();
    this.getEachRoundSeparated();

    return this.matches;
  }

  public async getClubsFromChampionship() {
    const result: any = await this.footballLiveService.getClubsFromChampionship(
      'brasil'
    );
    this.clubs = result;

    return this.clubs;
  }

  getPastRounds() {
    this.filteredMatches = this.matches.matches.filter(
      (placar) => placar?.score?.ft.length > 0
    );

    return this.filteredMatches;
  }

  getEachRoundSeparated() {
    const newArray = [];
    const rodadasSeparadas = this.matches.matches.reduce(
      (h, match) =>
        Object.assign(h, {
          [match.round]: (h[match.round] || []).concat({
            date: match.date,
            score: match.score,
            team1: match.team1,
            team2: match.team2,
            teamImg1: match.team1Img,
            teamImg2: match.team2Img,
          }),
        }),
      [{}]
    );

    for (let i = 1; i <= 38; i++) {
      const str2 = this.country === 'brasil' ? 'Rodada' : 'Matchday';
      const concat = `${str2} ${i.toString()}`;
      newArray.push(rodadasSeparadas[concat]);
    }
    this.eachRound = newArray;
    this.isLoading = false;

    return this.eachRound;
  }

  goToSlide(slides) {
    slides.slideTo(this.RoundData);
  }

  getIndex(slides) {
    slides.getActiveIndex().then((data) => {
      this.IndexData = data;
      this.RoundData = 0;
      this.RoundData = this.IndexData;
    });
  }

  getNextMatch() {
    const currentDate = moment();

    const matchLabel = this.matches.matches.find(match => moment(match.date) > currentDate).round;
    this.nextMatch = matchLabel.split(' ')[1];
  }
}
