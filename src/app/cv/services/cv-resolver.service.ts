import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from './cv.service';

@Injectable({
  providedIn: 'root'
})
export class CvResolverService {

  constructor(private cvService: CvService) {}

  resolve(): Observable<Cv[]> {
    return this.cvService.getCvs().pipe(
      catchError((error) => {
        console.error('Error fetching CVs:', error);
        return of([]); // Return an empty array if there's an error
      })
    );
  }}
