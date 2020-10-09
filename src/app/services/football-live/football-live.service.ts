import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { MatchesModel } from '../../models/matches.model'

export interface clubsImg {
  clube: string,
  nome: string,
  url: string,
  estadio?: string,
}

const arrayPaises = {
    brasil: "2020/br.1.json",
    inglaterra: "2020-21/en.1.json"
}

const arrayImgEnClubs: Array<clubsImg> = [
  {
    clube: 'Liverpool FC',
    nome: 'Liverpool',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    estadio: "Anfield"
  },
  {
    clube: 'Manchester United FC',
    nome: 'Man United',
    url: "https://upload.wikimedia.org/wikipedia/pt/b/b6/Manchester_United_FC_logo.png",
    estadio: 'Old Trafford'
  },
  {
    clube: 'Chelsea FC',
    nome: 'Chelsea',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    estadio: 'Stamford Bridge'
  },
  {
    clube: 'Everton FC',
    nome: 'Everton',
    url: "https://upload.wikimedia.org/wikipedia/pt/a/ae/Everton_FC_logo_2014.png",
    estadio: 'Goodison Park'
  },
  {
    clube: 'Burnley FC',
    nome: 'Burnley',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/07/BurnleyFC_logo2014.gif",
    estadio: 'Turf Moor'
  },
  {
    clube: 'Aston Villa FC',
    nome: 'Aston Villa',
    url: "https://upload.wikimedia.org/wikipedia/pt/2/26/Aston_villa_logo16.png",
    estadio: 'Villa Park'
  },
  {
    clube: 'Fulham FC',
    nome: 'Fulham',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/1/13/Fulham_FC.svg/1200px-Fulham_FC.svg.png",
    estadio: 'Craven Cottage'
  },
  {
    clube: 'Arsenal FC',
    nome: 'Arsenal',
    url: "https://upload.wikimedia.org/wikipedia/pt/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
    estadio: 'Emirates Stadium'
  },
  {
    clube: 'Crystal Palace FC',
    nome: 'C. Palace',
    url: "https://upload.wikimedia.org/wikipedia/pt/c/c1/Crystal_Palace_FC_logo.png",
    estadio: 'Selhurst Park'
  },
  {
    clube: 'Southampton FC',
    nome: 'Southampton',
    url: "https://upload.wikimedia.org/wikipedia/pt/6/6c/Southampton_FC_logo.png",
    estadio: "St. Mary's Stadium"
  },
  {
    clube: 'Leeds United FC',
    nome: 'Leeds Utd',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/05/Leeds_United_Logo.png",
    estadio: 'Elland Road'
  },
  {
    clube: 'West Ham United FC',
    nome: 'West Ham',
    url: "https://upload.wikimedia.org/wikipedia/pt/1/1d/West_Ham_United_FC_logo.png",
    estadio: 'London Olympic Stadium'
  },
  {
    clube: 'Newcastle United FC',
    nome: 'Newcastle',
    url: "https://upload.wikimedia.org/wikipedia/pt/2/25/Newcastle_United_Logo.png",
    estadio: 'St. James Park'
  },
  {
    clube: 'West Bromwich Albion FC',
    nome: 'West Bromwich',
    url: "https://upload.wikimedia.org/wikipedia/pt/b/b1/West_Bromwich_Albion.png",
    estadio: 'The Hawthorns'
  },
  {
    clube: 'Leicester City FC',
    nome: 'Leicester',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/0e/LeicesterCity_logo2014.png",
    estadio: 'King Power Stadium'
  },
  {
    clube: 'Tottenham Hotspur FC',
    nome: 'Tottenham',
    url: "https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png",
    estadio: 'Tottenham Hotspur Football Stadium'
  },
  {
    clube: 'Sheffield United FC',
    nome: 'Sheffield Utd',
    url: "https://upload.wikimedia.org/wikipedia/pt/4/49/Sheffield_United_FC.png",
    estadio: 'Bramall Lane'
  },
  {
    clube: 'Wolverhampton Wanderers FC',
    nome: 'Wolverhampton',
    url: "https://upload.wikimedia.org/wikipedia/pt/6/6c/Wolverhampton_Wanderers.png",
    estadio: 'Molineux Stadium'
  },
  {
    clube: 'Brighton & Hove Albion FC',
    nome: 'Brighton',
    url: "https://upload.wikimedia.org/wikipedia/pt/3/3f/Brighton_%26_Hove_Albion.png",
    estadio: 'Falmer Stadium'
  },
  {
    clube: 'Manchester City FC',
    nome: 'Man City',
    url: "https://upload.wikimedia.org/wikipedia/pt/0/02/Manchester_City_Football_Club.png",
    estadio: 'Etihad Stadium'
  },
]
const arrayImgBrClubs: Array<clubsImg> = [
  {
  clube: 'Atlético GO',
  nome: 'Atlético GO',
  url: "https://a1.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F10357.png",
  estadio: 'Serra Dourada'
  },
  {
  clube: 'Atlético PR',
  nome: 'Atlético PR',
  url: "https://a.espncdn.com/i/teamlogos/soccer/500/3458.png",
  estadio: 'Arena da Baixada'
  },
  {
  clube: 'EC Bahia',
  nome: 'Bahia',
  url: "https://www.esporteclubebahia.com.br/wp-content/themes/2016/img/main/logo-bahia-max.png",
  estadio: 'Fonte Nova'
  },
  {
  clube: 'RB Bragantino',
  nome: 'RB Bragantino',
  url: "https://upload.wikimedia.org/wikipedia/pt/9/9e/RedBullBragantino.png",
  estadio: 'Nabi Abi Chedid'
  },
  {
  clube: 'Botafogo RJ',
  nome: 'Botafogo',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png",
  estadio: 'Engenhão'
  },
  {
  clube: 'Coritiba PR',
  nome: 'Coritiba',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Coritiba_FBC_%282011%29_-_PR.svg/1200px-Coritiba_FBC_%282011%29_-_PR.svg.png",
  estadio: 'Couto Pereira'
  },
  {
  clube: 'Ceára SC',
  nome: 'Ceará',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/1200px-Cear%C3%A1_Sporting_Club_logo.svg.png",
  estadio: 'Castelão'
  },
  {
  clube: 'Corinthians SP',
  nome: 'Corinthians',
  url: "https://a3.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F874.png",
  estadio: 'Arena Neo Quimica'
  },
  {
  clube: 'Goiás EC',
  nome: 'Goiás',
  url: "https://upload.wikimedia.org/wikipedia/pt/3/38/GoiasEC2019.png",
  estadio: 'Serra Dourada'
  },
  {
  clube: 'Flamengo RJ',
  nome: 'Flamengo',
  url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Flamengo-RJ_%28BRA%29.png" ,
  estadio: 'Maracanã'
  },
  {
  clube: 'Santos SP',
  nome: 'Santos',
  url: "https://www.santosfc.com.br/wp-content/themes/santosfc-theme/assets/images/logo-santos.png",
  estadio: 'Vila Belmiro'
  },
  {
  clube: 'Sport Recife',
  nome: 'Sport',
  url: "https://upload.wikimedia.org/wikipedia/pt/1/17/Sport_Club_do_Recife.png",
  estadio: 'Ilha do Retiro'
  },
  {
  clube: 'Palmeiras SP', 
  nome: 'Palmeiras',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/200px-Palmeiras_logo.svg.png",
  estadio: 'Allianz Parque'
  },
  {
  clube: 'São Paulo FC',
  nome: 'São Paulo',
  url: "https://upload.wikimedia.org/wikipedia/pt/4/4b/S%C3%A3o_Paulo_Futebol_Clube.png",
  estadio: 'Morumbi'
  },
  {
  clube: 'Internacional Porto Alegre',
  nome: 'Internacional',
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/1200px-Escudo_do_Sport_Club_Internacional.svg.png",
  estadio: 'Beira-Rio'
  },
  {
  clube: 'CR Vasco da Gama',
  nome: 'Vasco da Gama',
  url: "https://upload.wikimedia.org/wikipedia/pt/8/89/Club_de_Regatas_Vasco_da_Gama.png",
  estadio: 'São Januário'
  },
  {
  clube: 'Grêmio RS',
  nome: 'Grêmio',
  url: "https://upload.wikimedia.org/wikipedia/pt/a/a1/Gremio.png",
  estadio: 'Arena do Grêmio'
  },
  {
  clube: 'Fortaleza EC',
  nome: 'Fortaleza',
  url: "https://upload.wikimedia.org/wikipedia/pt/5/5e/FortalezaEC2019.png",
  estadio: 'Castelão'
  },
  {
  clube: 'Fluminense RJ',
  nome: 'Fluminense',
  url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png",
  estadio: 'Maracanã'
  },
  {
  clube: 'Atlético MG',
  nome: 'Atlético MG',
  url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Atletico_mineiro_galo.png",
  estadio: 'Mineirão'
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

            result.matches[i] = Object.assign(result.matches[i], { team1Img: teamsImg1[0].url, 
              team2Img: teamsImg2[0].url, stadium: teamsImg1[0].stadium})
            }
            console.log('trying', result)
            resolve(result);
        });
      });
    }

  getClubsFromChampionship(country) {
    let SELECTED_COUNTRY: string = null;
    let clubStadium: any = null;
    country === 'brasil' 
      ? SELECTED_COUNTRY = arrayClubesPaises.brasil 
      : SELECTED_COUNTRY = arrayClubesPaises.inglaterra

    return new Promise((resolve, reject) => {
      const query = "https://raw.githubusercontent.com/openfootball/football.json/master/" + SELECTED_COUNTRY;
      this.connectionService.executeGet(query)
        .subscribe((result: any) => {
          for(let i = 0; i < result.clubs.length; i++){
            country === 'brasil' ? clubStadium = arrayImgBrClubs.filter((club) => club.clube === result.clubs[i].name)
              : clubStadium = arrayImgEnClubs.filter((club) => club.clube === result.clubs[i].name)
            console.log('clubstadium', clubStadium)
            result.clubs[i] = Object.assign(result.clubs[i], 
              { stadium: clubStadium[0].estadio, url: clubStadium[0].url, clubName: clubStadium[0].nome })
          }
          console.log('seraaa', result.clubs)
          resolve(result);
        });
    });
  }
}