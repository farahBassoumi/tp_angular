import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { TTCComponent } from "./ttc/ttc.component";
import { MasterDetailsComponent } from "./components/master-details/master-details.component";
import { DetailsComponent } from "./components/details/details.component";
import { CvResolverService } from "./cv/services/cv-resolver.service";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "rh", component: RhComponent },



  {
    path: "cv",
    component: CvComponent,
    resolve: {
      cvs: CvResolverService
    }
  },
  { path: "cv/add", component: AddCvComponent, canActivate: [AuthGuard] },
  { path: "cv/:id", component: DetailsCvComponent },


  {
    path: "",
    component: FrontComponent,
    children: [
      {
        path: 'todo', component: TodoComponent,

      },
      { path: "word", component: MiniWordComponent },
    ],
  },
  {
    path: "master",
    component: MasterDetailsComponent,
    children: [
      { path: ":id", component: DetailsComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  {
    path: "ttc",
    component: TTCComponent
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
