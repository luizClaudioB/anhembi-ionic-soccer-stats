import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { MatchesModel } from '../../models/matches.model'

export interface clubsImg {
  clube: string,
  url: string
}

const arrayPaises = {
    brasil: "2020/br.1.json",
    inglaterra: "2020-21/en.1.json"
}

const arrayImgEnClubs: Array<clubsImg> = [
  {
    clube: 'Liverpool FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
  },
  {
    clube: 'Manchester United FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/b/b6/Manchester_United_FC_logo.png",
  },
  {
    clube: 'Chelsea FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
  },
  {
    clube: 'Everton FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/a/ae/Everton_FC_logo_2014.png",
  },
  {
    clube: 'Burnley FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/07/BurnleyFC_logo2014.gif",
  },
  {
    clube: 'Aston Villa FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/2/26/Aston_villa_logo16.png",
  },
  {
    clube: 'Fulham FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/1/13/Fulham_FC.svg/1200px-Fulham_FC.svg.png",
  },
  {
    clube: 'Arsenal FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
  },
  {
    clube: 'Crystal Palace FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/c/c1/Crystal_Palace_FC_logo.png",
  },
  {
    clube: 'Southampton FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/6/6c/Southampton_FC_logo.png",
  },
  {
    clube: 'Leeds United FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/05/Leeds_United_Logo.png",
  },
  {
    clube: 'West Ham United FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/1/1d/West_Ham_United_FC_logo.png",
  },
  {
    clube: 'Newcastle United FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/2/25/Newcastle_United_Logo.png",
  },
  {
    clube: 'West Bromwich Albion FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/b/b1/West_Bromwich_Albion.png",
  },
  {
    clube: 'Leicester City FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/0e/LeicesterCity_logo2014.png",
  },
  {
    clube: 'Tottenham Hotspur FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png",
  },
  {
    clube: 'Sheffield United FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/4/49/Sheffield_United_FC.png",
  },
  {
    clube: 'Wolverhampton Wanderers FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/6/6c/Wolverhampton_Wanderers.png",
  },
  {
    clube: 'Brighton & Hove Albion FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/3/3f/Brighton_%26_Hove_Albion.png",
  },
  {
    clube: 'Manchester City FC',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/02/Manchester_City_Football_Club.png",
  },
]
const arrayImgBrClubs: Array<clubsImg> = [
  {
  clube: 'Atlético GO',
  url: "https://a1.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F10357.png"
  },
  {
  clube: 'Atlético PR',
  url: "https://a.espncdn.com/i/teamlogos/soccer/500/3458.png",
  },
  {
  clube: 'EC Bahia',
  url: "https://www.esporteclubebahia.com.br/wp-content/themes/2016/img/main/logo-bahia-max.png",
  },
  {
  clube: 'RB Bragantino',
  url: "https://upload.wikimedia.org/wikipedia/pt/9/9e/RedBullBragantino.png",
  },
  {
  clube: 'Botafogo RJ',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png",
  },
  {
  clube: 'Coritiba PR',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Coritiba_FBC_%282011%29_-_PR.svg/1200px-Coritiba_FBC_%282011%29_-_PR.svg.png",
  },
  {
  clube: 'Ceára SC',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/1200px-Cear%C3%A1_Sporting_Club_logo.svg.png",
  },
  {
  clube: 'Corinthians SP',
  url: "https://a3.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F874.png",
  },
  {
  clube: 'Goiás EC',
  url: "https://upload.wikimedia.org/wikipedia/pt/3/38/GoiasEC2019.png",
  },
  {
  clube: 'Flamengo RJ',
  url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Flamengo-RJ_%28BRA%29.png" 
  },
  {
  clube: 'Santos SP',
  url: "https://www.santosfc.com.br/wp-content/themes/santosfc-theme/assets/images/logo-santos.png",
  },
  {
  clube: 'Sport Recife',
  url: "https://upload.wikimedia.org/wikipedia/pt/1/17/Sport_Club_do_Recife.png",
  },
  {
  clube: 'Palmeiras SP', 
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/200px-Palmeiras_logo.svg.png"
  },
  {
  clube: 'São Paulo FC',
  url: "https://upload.wikimedia.org/wikipedia/pt/4/4b/S%C3%A3o_Paulo_Futebol_Clube.png" 
  },
  {
  clube: 'Internacional Porto Alegre',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/1200px-Escudo_do_Sport_Club_Internacional.svg.png" 
  },
  {
  clube: 'CR Vasco da Gama',
  url: "https://upload.wikimedia.org/wikipedia/pt/8/89/Club_de_Regatas_Vasco_da_Gama.png" 
  },
  {
  clube: 'Grêmio RS',
  url: "https://upload.wikimedia.org/wikipedia/pt/a/a1/Gremio.png" 
  },
  {
  clube: 'Fortaleza EC',
  url: "https://upload.wikimedia.org/wikipedia/pt/5/5e/FortalezaEC2019.png" 
  },
  {
  clube: 'Fluminense RJ',
  url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png" 
  },
  {
  clube: 'Atlético MG',
  url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Atletico_mineiro_galo.png" 
  }
]
const arrayClubesPaises = {
  brasil: "2020/br.1.clubs.json",
  inglaterra: "2020-21/en.1.clubs.json"
}

@Injectable({
  providedIn: 'root'
})
export default class FootballLiveService {
  constructor(private connectionService: ConnectionService) { }
  
  getChampionship(país) {
      let teamsImg1: any = '';
      let teamsImg2: any = '';
      let PAIS_SELECIONADO: string = null;

      país === 'brasil' ? PAIS_SELECIONADO = arrayPaises.brasil : PAIS_SELECIONADO = arrayPaises.inglaterra

      return new Promise((resolve,reject) => {
      const query = "https://raw.githubusercontent.com/openfootball/football.json/master/" + PAIS_SELECIONADO;
      this.connectionService.executeGet(query)
        .subscribe((result: MatchesModel) => {
            for(let i = 0; i < result.matches.length; i++){
            país === 'brasil' 
              ? (teamsImg1 = arrayImgBrClubs.filter((club) => club.clube === result.matches[i].team1),
            teamsImg2 = arrayImgBrClubs.filter((club) => club.clube === result.matches[i].team2))
              : (teamsImg1 = arrayImgEnClubs.filter((club) => club.clube === result.matches[i].team1),
              teamsImg2 = arrayImgEnClubs.filter((club) => club.clube === result.matches[i].team2));

            result.matches[i] = Object.assign(result.matches[i], { team1Img: teamsImg1[0].url, team2Img: teamsImg2[0].url })
            }
            console.log('trying', result)
            resolve(result);
        });
      });
    }

  getClubsFromChampionship(country) {
    let SELECTED_COUNTRY: string = null;

    country === 'brasil' 
      ? SELECTED_COUNTRY = arrayClubesPaises.brasil 
      : SELECTED_COUNTRY = arrayClubesPaises.inglaterra

    return new Promise((resolve, reject) => {
      const query = "https://raw.githubusercontent.com/openfootball/football.json/master/" + SELECTED_COUNTRY;
      this.connectionService.executeGet(query)
        .subscribe((result: any) => {
          console.log('clubs', result)
          resolve(result);
        });
    });
  }
}