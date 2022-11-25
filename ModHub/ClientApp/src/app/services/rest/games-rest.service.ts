import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, Game } from './models';

@Injectable({
  providedIn: 'root',
})
export class GamesRestService {
  baseUrl: string;
  constructor(private readonly httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}api/games`
  }

  getGames(): Observable<Game[]> {
    console.log(this.baseUrl);
    return this.httpClient.get<Game[]>(this.baseUrl);
  }

  getGame(gameId: number): Observable<Game> {
    return this.httpClient.get<Game>(`${this.baseUrl}/${gameId}`);
  }

  deleteGame(game: Game) {
    return this.httpClient.delete<Game>(`${this.baseUrl}/${game.id}`);
  }

  postGame(game: Game) {
    return this.httpClient.post<Game>(`${this.baseUrl}`, game);
  }

  putGame(gameId: number, game: Game) {
    return this.httpClient.put<Game>(`${this.baseUrl}/${gameId}`, game);
  }
}
