import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  map,
  scan,
  switchMap,
  of,
  tap,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  settings: Settings = {
    limit: 12,
    skip: 0,
  };
  productService = inject(ProductService);
  private skip$ = new BehaviorSubject<number>(0);
  private allProductsLoaded = false;
  private PAGE_SIZE = 12;

   // Observable for accumulating products
   products$: Observable<Product[]> = this.skip$.pipe(
    switchMap(skip => {
      if (this.allProductsLoaded) return of([]); // Prevent further API calls
      return this.productService.getProducts({ limit: this.PAGE_SIZE, skip }).pipe(
        //pipe listens for changes and fetch the corresponding products
        tap(products => {
          if (products.total < this.PAGE_SIZE) {
            this.allProductsLoaded = true; // Mark as loaded when fewer products are returned
          }
        
        }),
        map(response => response.products) // Extract the array of products

      );
    }),
    scan<Product[], Product[]>(
      (allProducts, newProducts) => [...allProducts, ...newProducts], []) // Accumulate products
  );

constructor() { }


loadMore(){;
  if(!this.allProductsLoaded){
    this.skip$.next(this.skip$.value + this.PAGE_SIZE);
  }
}


}

