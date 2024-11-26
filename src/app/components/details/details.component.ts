import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Cv } from 'src/app/cv/model/cv';
import { CvService } from 'src/app/cv/services/cv.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  cv: Cv | null = null;
  id$: Observable<string | null>;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
    console.log('inside the DetailsComponent::constructor');

    // Subscribe to the route parameters and update the view when :id changes
    this.id$ = this.route.paramMap.pipe(
      map(params => {
        console.log('DetailsComponent::constructor');
        return params.get('id')!;
      })
    );
  }






  ngOnInit(): void {
    // Subscribe to the route params when the component is initialized
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('DetailsComponent::ngOnInit - id:', id);
      // Now, you can use the id to fetch the Cv data or update the view
      // if (id) {
      //   this.cvService.getCvById(id).subscribe((cv) => {
      //     this.cv = cv;
      //   });
      // }
    });
  }

 // ngOnInit(): void {
    // console.log('DetailsComponent::ngOnInit');


    // this.route.params.subscribe((params) => {
    //   console.log('Raw Params Object:', params);
    // });
 // }


}
