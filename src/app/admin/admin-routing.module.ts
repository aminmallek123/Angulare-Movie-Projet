import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeFilmeComponent } from './liste-filme/liste-filme.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListeCategorieComponent } from './liste-categorie/liste-categorie.component';
const routes: Routes = [
  {path:'filmListe',component:ListeFilmeComponent},
  {path:'categorieListe',component:ListeCategorieComponent},
  {path:'cc',component:SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
