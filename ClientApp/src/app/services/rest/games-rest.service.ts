import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, Game } from './models';

@Injectable({
  providedIn: 'root',
})
export class GamesRestService {
  baseUrl = 'api/games';
  constructor(private readonly httpClient: HttpClient) {}

  getGames(): Observable<Game[]> {
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
