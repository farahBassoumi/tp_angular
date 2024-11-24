import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  suggestions: Cv[] = [];
  cvService = inject(CvService);
  selectedCv: Cv | null = null;

  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  constructor() {    this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }
  form = this.formBuilder.group({ search: [""] });
  ngOnInit(): void {
    this.form.controls['search'].valueChanges
      .pipe(
        debounceTime(300), // Attendre 300ms entre chaque frappe
        distinctUntilChanged(), // Ne pas répéter la requête si la valeur n’a pas changé
        switchMap(value => this.cvService.selectByName(value)) // Appeler le service avec la chaîne saisie
      )
      .subscribe((results: Cv[]) => {
        this.suggestions = results; // Met à jour les suggestions
      });
  }
  selectCv(cv: Cv): void {
    console.log('cvId', cv);
      this.cvService.selectCv(cv);
    }  
}
