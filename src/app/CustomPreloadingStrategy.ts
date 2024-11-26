import { PreloadingStrategy, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // On ne charge que les modules avec la data preload: true
    if (route.data && route.data['preload']) {
      return load(); // Prélance le module
    }
    return of(null); // Ignore si la donnée preload est false
  }
}
