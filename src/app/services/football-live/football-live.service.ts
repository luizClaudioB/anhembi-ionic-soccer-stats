import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { MatchesModel } from '../../models/matches.model'
const arrayPaises = {
    brasil: "2020/br.1.json",
    inglaterra: "2020-21/en.1.json"
}

@Injectable({
  providedIn: 'root'
})
export default class FootballLiveService {
  constructor(private connectionService: ConnectionService) { }
  
  getChampionship(país) {
      let PAIS_SELECIONADO: string = null;

      if(país === 'brasil'){
        PAIS_SELECIONADO = arrayPaises.brasil
      }
      if(país === 'inglaterra'){
        PAIS_SELECIONADO = arrayPaises.inglaterra
      }

      return new Promise((resolve,reject) => {
      const query = "https://raw.githubusercontent.com/openfootball/football.json/master/" + PAIS_SELECIONADO;
      this.connectionService.executeGet(query)
        .subscribe((result: MatchesModel) => {
            console.log('trying', result)
            resolve(result);
        });
      });
    }
}