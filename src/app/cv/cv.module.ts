import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'cv/add', component: AddCvComponent, canActivate: [AuthGuard] },
  { path: 'cv/:id', component: DetailsCvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvModule { }
