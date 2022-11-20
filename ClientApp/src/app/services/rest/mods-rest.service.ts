import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mod } from './models';
import { ModStatus } from '../../shared/enums/mod-status';

@Injectable({
  providedIn: 'root',
})
export class ModsRestService {
  baseUrl = 'api/games';
  constructor(private readonly httpClient: HttpClient) {}

  getMods(gameId: number): Observable<Mod[]> {
    return this.httpClient.get<Mod[]>(`${this.baseUrl}/${gameId}/mods`);
  }

  getUserMods(): Observable<Mod[]> {
    return this.httpClient.get<Mod[]>(`${this.baseUrl}/1/mods/user`);
  }

  getWaitingForApprovalMods(): Observable<Mod[]> {
    return this.httpClient.get<Mod[]>(`${this.baseUrl}/${1}/mods/submissions`);
  }

  getMod(gameId: number, modId: number): Observable<Mod> {
    return this.httpClient.get<Mod>(`${this.baseUrl}/${gameId}/mods/${modId}`);
  }

  postMod(gameId: number, mod: Mod): Observable<Mod> {
    return this.httpClient.post<Mod>(`${this.baseUrl}/${gameId}/mods`, mod);
  }

  putMod(gameId: number, modId: number, mod: Mod): Observable<Mod> {
    return this.httpClient.put<Mod>(
      `${this.baseUrl}/${gameId}/mods/${modId}`,
      mod
    );
  }

  putModStatus(
    gameId: number,
    modId: number,
    modStatus: ModStatus
  ): Observable<Mod> {
    return this.httpClient.put<Mod>(
      `${this.baseUrl}/${gameId}/mods/${modId}/modStatus`,
      { modStatus }
    );
  }

  putModRating(modId: number, newRating: number) {
    return this.httpClient.put<Mod>(
      `${this.baseUrl}/${1}/mods/${modId}/modRating`,
      newRating
    );
  }

  deleteMod(mod: Mod) {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/${mod.gameId}/mods/${mod.id}`
    );
  }
}
