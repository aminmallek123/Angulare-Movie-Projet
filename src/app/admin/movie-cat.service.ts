import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from './movie';
import { Categorie } from './categorie';
@Injectable({
  providedIn: 'root'
})
export class MovieCatService {
  private apiURL = 'http://localhost:3001/api/'
  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }
  private handleError(error: any) {
    // You can handle the error here, log it, show a user-friendly message, etc.
    console.error('Error in API call:', error);
    return throwError(error); // Rethrow it back to the caller or handle as needed
  }
  constructor(private httpClient: HttpClient) { }
  // api movie
  getAllMovie(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'movie/')
      .pipe(
        catchError(this.handleError)
      )

  }
  createMovie(movie: Movie): Observable<any> {
    return this.httpClient.post(this.apiURL + 'movie/', JSON.stringify(movie), this.httpOptions)
      .pipe(
        catchError(this.handleError)

      )

  }
  findMovie(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + 'movie/' + _id)
      .pipe(

        catchError(this.handleError)

      )
  }
  updateMovie(_id: object, movie: Movie): Observable<any> {

    return this.httpClient.put(this.apiURL + 'movie/' + _id, JSON.stringify(movie), this.httpOptions)
      .pipe(

        catchError(this.handleError)

      )
  }
  deleteMovie(_id: object) {

    return this.httpClient.delete(this.apiURL + 'movie/' + _id, this.httpOptions)
      .pipe(

        catchError(this.handleError)

      )

  }
  // categorie api
  getAllCat(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'categorie/')
      .pipe(
        catchError(this.handleError)
      )

  }
  create(cat: Categorie): Observable<any> {
    return this.httpClient.post(this.apiURL + 'categorie/', JSON.stringify(cat), this.httpOptions)
      .pipe(
        catchError(this.handleError)

      )

  }
  find(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + 'categorie/' + _id)
      .pipe(

        catchError(this.handleError)

      )
  }
  update(_id: object, cat: Categorie): Observable<any> {

    return this.httpClient.put(this.apiURL + 'categorie/' + _id, JSON.stringify(cat), this.httpOptions)
      .pipe(

        catchError(this.handleError)

      )
  }

  findByCategorie(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + 'movie/getCategorie/' + _id)
      .pipe(

        catchError(this.handleError)

      )
  }

  delete(_id: object) {

    return this.httpClient.delete(this.apiURL + 'categorie/' + _id, this.httpOptions)
      .pipe(

        catchError(this.handleError)

      )

  }
  uploadSignature(vals: any): Observable<any>{ 
    let data = vals;
    return this.httpClient.post('https://api.cloudinary.com/v1_1/dgnv9nmqw/image/upload',data)
  }
  private panierSubject = new BehaviorSubject<any[]>([]);
  panier$ = this.panierSubject.asObservable();

  ajouterAuPanier(article: any) {
    const panierActuel = this.panierSubject.value;
    panierActuel.push(article);
    this.panierSubject.next(panierActuel);
  }

  viderPanier() {
    this.panierSubject.next([]);
  }
}
