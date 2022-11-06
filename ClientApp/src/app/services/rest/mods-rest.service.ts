import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mod } from './models';

@Injectable({
  providedIn: 'root',
})
export class ModsRestService {
  baseUrl = 'api/games';

  getMods(gameId: number): Observable<Mod[]> {
    return this.httpClient.get<Mod[]>(`${this.baseUrl}/${gameId}/mods`);
  }

  getMod(gameId: number, modId: number): Observable<Mod> {
    return this.httpClient.get<Mod>(`${this.baseUrl}/${gameId}/mods/${modId}`);
  }

  constructor(private readonly httpClient: HttpClient) {}
}
