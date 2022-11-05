import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesRestService {
  baseUrl = 'api/games'

  getGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.baseUrl);
  }

  constructor(private readonly httpClient: HttpClient) {}
}

export interface Game {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}
