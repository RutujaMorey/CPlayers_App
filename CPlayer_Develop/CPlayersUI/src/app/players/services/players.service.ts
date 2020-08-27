import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { Observable } from 'rxjs';
import { PlayersModel, ManageFavouriteObject } from 'src/app/players/model/players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  endpoint: any;
  apikey: string;
  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }
  searchPlayersByName(playerName: string): Observable<PlayersModel[]> {
    this.apikey = AppConfig.getAPIKey();
    console.log(this.endpoint, `${this.endpoint.api.searchPlayersByName}?apikey=${this.apikey}&name=${playerName}`)

    // return this.http.get<PlayersModel[]>(`${this.endpoint.api.searchPlayersByName}?apikey=${this.apikey}&name=${playerName}`)
    return this.http.get<any>(`https://cricapi.com/api/playerFinder?apikey=${this.apikey}&name=${playerName}`)

  }
  getPlayerStatistics(pid: number) {
    return this.http.get<any>(`https://cricapi.com/api/playerStats?apikey=${this.apikey}&pid=${pid}`)
  }

  addToFavourites(request: ManageFavouriteObject): Observable<any> {
    const res = this.http.post<any>(this.endpoint.api.addFavouritePlayer, request);
    console.log(this.endpoint.api.addFavouritePlayer, res);
    return res;
  }
  deleteFromFavourites(request: ManageFavouriteObject): Observable<any> {
    return this.http.post<ManageFavouriteObject>(this.endpoint.api.deleteFavouritePlayer, request);
  }
  getMyFavourites(userid: number): Observable<ManageFavouriteObject> {
    return this.http.get<ManageFavouriteObject>(`${this.endpoint.api.getAllFavouritePlayers}/${userid}`);
  }

  // getPlayerImage(pid: number): Observable<any> {
  //   debugger;
  //   this.apikey = AppConfig.getAPIKey();


  //   console.log(this.endpoint, `${this.endpoint.api.getPlayerImage}${pid}.jpg`)

  //   // return this.http.get<Observable<any>>(`${this.endpoint.api.getPlayerImage}${pid}.jpg`, responseType: 'blob');
  //   // return this.http.get<any>(`https://cricapi.com/api/playerFinder?apikey=${this.apikey}&name=${playerName}`)
  //   const headers = [
  //     { name: 'Content-Type', value: 'multipart/form-data' },
  //     { name: 'Access-Control-Allow-Origin', value: '*' },
  //     { name: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS, GET' },
  //     { name: 'Access-Control-Allow-Credentials', value: 'true' }
  //   ];
  //   return this.http.post<Blob>(`${this.endpoint.api.getPlayerImage}${pid}.jpg`
  //     , { headers: headers, responseType: 'blob' as 'json' });

  // }
}
