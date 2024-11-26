import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { map, Observable, of } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$!: Observable<Cv[]> ;
  juniorCv$!: Observable<Cv[]> ; 
  seniorCv$!: Observable<Cv[]> ;
  selectedCv: Cv | null = null;
  currentTab: "junior" | "senior" = "junior";
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,   
     private route: ActivatedRoute

  ) {
   

    const resolvedData = this.route.snapshot.data['cvs'] as Cv[]; // Access resolver data

  console.log('Resolved data from resolver:', resolvedData); // Log to check if data is correct

  this.cvs$ = of(resolvedData || []);
  this.juniorCv$ = this.cvs$.pipe(
    map(cvs => cvs.filter(cv => cv.age < 40))
  );
  
  this.seniorCv$ = this.cvs$.pipe(
    map(cvs => cvs.filter(cv => cv.age >= 40))
  );
  
   
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }

  changeTab(tab: 'junior' | 'senior') {
    this.currentTab = tab;
  }

}
