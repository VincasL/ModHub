import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ImageGetDto} from "./models";



@Injectable({
  providedIn: 'root',
})
export class ImagesRestService {
  baseUrl = 'api/images';
  constructor(private readonly httpClient: HttpClient) {}

  postImage(imageBase64: string): Observable<ImageGetDto> {
    return this.httpClient.post<ImageGetDto>(
      `${this.baseUrl}`,
      { imageBase64 }
    )
  }
}
