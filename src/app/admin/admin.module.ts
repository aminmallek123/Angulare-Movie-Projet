import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListeFilmeComponent } from './liste-filme/liste-filme.component';
import { MatTableModule } from  '@angular/material/table';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { MatPaginatorModule } from  '@angular/material/paginator';
import { MatSortModule } from  '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoufilmComponent } from './ajoufilm/ajoufilm.component';
import {CloudinaryModule} from '@cloudinary/ng';
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
import  * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import  * as FilepondPluginImageEdit from 'filepond-plugin-image-edit';
import  * as FilepondPluginImagePreview from 'filepond-plugin-image-preview';
import { EditfilmComponent } from './editfilm/editfilm.component';
import { ListeCategorieComponent } from './liste-categorie/liste-categorie.component';
import { CreatCatgComponent } from './creat-catg/creat-catg.component';
registerPlugin(FilePondPluginFileValidateType,FilepondPluginImageEdit,FilepondPluginImagePreview);

@NgModule({
  declarations: [
    SidebarComponent,
    ListeFilmeComponent,
    AjoufilmComponent,
    EditfilmComponent,
    ListeCategorieComponent,
    CreatCatgComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule, 
    ReactiveFormsModule,
    CloudinaryModule,
    FilePondModule

  ],
  exports: [
    SidebarComponent // If you plan to use this component outside the AdminModule
  ]
})
export class AdminModule { }
