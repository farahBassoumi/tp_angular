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
import { CustomPreloadingStrategy } from "./CustomPreloadingStrategy";

const routes: Route[] = [
  
  //lazy loading for one route and it must be a standalone
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },

 //lazy loading for one route and it must be a standalone

  {
    path: 'rh',
    loadComponent: () =>
      import('./optimizationPattern/rh/rh.component').then(
        (m) => m.RhComponent
      ),
  },
  //lazy loading for module

  {
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then(m => m.CvModule), // Lazy Loading pour CvTech
    data: { preload: true } // Activer le préchargement si nécessaire
  },

 
  

  {
    path: "",
    component: FrontComponent,
    children: [
     {
      path: 'todo',
      loadChildren: () =>
        import('./todo/todo.module').then((m) => m.TodoModule),
      data: { preload: true },
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
//lazy loading for one route
  {
    path: 'ttc',
    loadComponent: () =>
      import('./ttc/ttc.component').then(
        (m) => m.TTCComponent
      ),
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
