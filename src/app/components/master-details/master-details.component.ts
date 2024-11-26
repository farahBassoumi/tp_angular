import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { Cv } from 'src/app/cv/model/cv';
import { CvService } from 'src/app/cv/services/cv.service';
import { LoggerService } from 'src/app/services/logger.service';
@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrl: './master-details.component.css'
})
export class MasterDetailsComponent {

  cvs$!: Observable<Cv[]> ;

  selectedCv: Cv | null = null;
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private router: Router
  ) {
    this.cvs$=this.cvService.getCvs().pipe(
      catchError( error => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        //nasna3 observable ml fake cvs
        return of(this.cvService.getFakeCvs());
        
      })
    );
   
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }


  onSelectCv(cvId: number): void {
    console.log('MasterDetailsComponent::onSelectCv: navigate to', cvId);
    this.router.navigate(['/master',cvId]);

  }
 
}
