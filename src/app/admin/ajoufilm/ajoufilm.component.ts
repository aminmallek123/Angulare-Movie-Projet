import { Component,OnInit, ViewChild, ElementRef  } from '@angular/core';
import { MovieCatService } from '../movie-cat.service';
import { Movie } from '../movie';
import { Categorie } from '../categorie';
import { FilePondComponent } from 'ngx-filepond';
@Component({
  selector: 'app-ajoufilm',
  templateUrl: './ajoufilm.component.html',
  styleUrls: ['./ajoufilm.component.css']
})
export class AjoufilmComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond: FilePondComponent;
 
  display = "none";
  products:Movie=new Movie();
  scategories!:Categorie[] ;
  constructor(private service:MovieCatService) { }
 
  ngOnInit(): void {
    this.service.getAllCat().subscribe((data:Categorie[])=>{
      this.scategories=data;
    })
  }
  ajoutarticle=()=>{
    this.service.createMovie(this.products).subscribe((data=>{
      console.log(data)
      this.closeModal() 
      window.location.reload();
  }))
    

   
 }

  openModal() { 
       this.display = "block";
  }
 
  closeModal() {
    this.display = "none";
  }
  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      process: (fieldName:any, file:any, metadata:any, load:any, error:any, progress:any, abort:any) => {
        
        const data=new FormData();
      
        data.append('file', file);
        data.append('upload_preset', 'movieProjet');
        data.append('cloud_name', 'dgnv9nmqw')
        data.append('public_id', file.name)
    
        this.service
        .uploadSignature(data)
        .subscribe({
          next: (res) => {
           this.products.img = res.url;
           load(res);
          },
          error: (e) => {
            console.log(e);
            error(e);
            return () => {
              abort();
            };
          },
          complete: () => {
          console.log('done');
          return () => {
            abort();
          };
           }
           
        })
        
        },
        revert: (uniqueFileId:any, load:any, error:any) => {
                error('Error');
                load();
      },
 
    }
  }

  

  
}
