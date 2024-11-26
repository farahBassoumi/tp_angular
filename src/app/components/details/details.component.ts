import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cv } from 'src/app/cv/model/cv';
import { CvService } from 'src/app/cv/services/cv.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  cv: Cv | null = null;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cvService: CvService
  ) {}
  ngOnInit(): void {
    console.log('DetailsComponent::ngOnInit');
    
  
    this.route.params.subscribe((params) => {
      console.log('Raw Params Object:', params);
    });
  }
  
  
}
