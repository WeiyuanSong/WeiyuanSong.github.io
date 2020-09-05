export class Movie {
  public Title: string;
  public imdbID: string;
  public Year: number;
  public ShowNominationBtn: boolean = true;
  public Poster: string;

  constructor(Title: string, imdbID: string, Year: number, Poster: string) {
    this.Title = Title;
    this.imdbID = imdbID;
    this.Year = Year;
    this.ShowNominationBtn = true;
    this.Poster = Poster;
  }
}
