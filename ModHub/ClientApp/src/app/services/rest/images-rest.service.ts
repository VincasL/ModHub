import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ImageGetDto} from "./models";



@Injectable({
  providedIn: 'root',
})
export class ImagesRestService {
  baseUrl: string;

  constructor(private readonly httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}api/images`
  }

  postImage(imageBase64: string): Observable<ImageGetDto> {
    return this.httpClient.post<ImageGetDto>(
      `${this.baseUrl}`,
      { imageBase64 }
    )
  }
}
