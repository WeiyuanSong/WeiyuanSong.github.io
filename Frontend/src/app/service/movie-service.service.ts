import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Movie } from "../models/movie";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const movieUrl: string = "http://www.omdbapi.com/?apikey=" + environment.apiKey;

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private http: HttpClient) {}

  public showAutoCompleteResults(movieName: string): Observable<any[]> {
    let movieInfoUrl: string = movieUrl + "&s=" + movieName;
    return this.http.get<any[]>(movieInfoUrl);
  }
}
