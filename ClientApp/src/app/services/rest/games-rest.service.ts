import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './models';

@Injectable({
  providedIn: 'root',
})
export class GamesRestService {
  baseUrl = 'api/games';

  getGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.baseUrl);
  }

  getGame(gameId: number): Observable<Game> {
    return this.httpClient.get<Game>(`${this.baseUrl}/${gameId}`);
  }

  constructor(private readonly httpClient: HttpClient) {}
}
