import { Component, OnInit } from "@angular/core";
import { MovieService } from "../service/movie-service.service";
import { Movie } from "../models/movie";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
})
export class SearchBarComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  movieInfo: string;
  options: Movie[] = [];
  nominatedMovies: Movie[] = [];
  showBanner: boolean = false;

  ngOnInit(): void {}

  public showAutoCompleteResults(): void {
    this.options = [];
    console.log("Name is ", this.movieInfo);
    this.movieService.showAutoCompleteResults(this.movieInfo).subscribe(
      (data: any[]) => {
        if (data["Search"] == undefined) {
          window.alert("Oops. There are no results!");
        } else {
          let searchData = data["Search"];
          console.log("data is ", searchData);
          for (let singleData of data["Search"]) {
            this.options.push(
              new Movie(
                singleData["Title"],
                singleData["imdbID"],
                singleData["Year"],
                singleData["Poster"]
              )
            );
          }
          console.log("Movies are ", this.options);
        }
      },
      (error: Error) => {
        console.log("Error is ", error.message);
      },
      () => {
        console.log("complete!");
      }
    );
  }

  public addToNominateList(movie: Movie): void {
    movie.ShowNominationBtn = false;
    let length: number = this.nominatedMovies.push(movie);

    if (length == 5) {
      // show the banner when there are more than 4 banners
      window.alert("Congratulations! You have 5 banners now!");
    } else {
      this.showBanner = false;
    }
  }

  public showNominateButton(movie: Movie): boolean {
    let index: number = this.nominatedMovies.findIndex(
      (m) => m.imdbID == movie.imdbID
    );
    return true ? index == -1 : false;
  }

  public remove(movie: Movie) {
    let index: number = this.nominatedMovies.indexOf(movie);
    this.nominatedMovies.splice(index, 1);
    movie.ShowNominationBtn = true;
  }
}
