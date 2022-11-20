import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, Mod } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentsRestService {
  baseUrl = 'api/games';
  constructor(private readonly httpClient: HttpClient) {}

  getComments(gameId: number, modId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${this.baseUrl}/${gameId}/mods/${modId}/comments`
    );
  }

  deleteComment(gameId: number, modId: number, commentId: number) {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/${gameId}/mods/${modId}/comments/${commentId}`
    );
  }

  putComment(gameId: number, modId: number, commentId: number, text: string) {
    return this.httpClient.put<Comment>(
      `${this.baseUrl}/${gameId}/mods/${modId}/comments/${commentId}`,
      { text }
    );
  }

  postComment(gameId: number, modId: number, comment: Comment) {
    return this.httpClient.post<Comment>(
      `${this.baseUrl}/${gameId}/mods/${modId}/comments`,
      comment
    );
  }
}
