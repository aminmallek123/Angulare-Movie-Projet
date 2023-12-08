import { Component ,OnInit, ViewChild, ElementRef, Input  } from '@angular/core';
import { FilePondComponent } from 'ngx-filepond';
import { FilePondOptions } from 'filepond';
import { Movie } from '../movie';
import { Categorie } from '../categorie';
import { MovieCatService } from '../movie-cat.service';

@Component({
  selector: 'app-editfilm',
  templateUrl: './editfilm.component.html',
  styleUrls: ['./editfilm.component.css']
})
export class EditfilmComponent {
  @Input() productId: object;
  date1:string;
  date2:string;
  @ViewChild('myModal') myModal!: ElementRef;

  @ViewChild('myPond') myPond: FilePondComponent;

  display = "none";

  products: Movie = new Movie();
  scategories!: Categorie[];

  constructor(private prodserv: MovieCatService) { }
  ngOnInit() {
    this.loadscategorie();
    
  }

  loadscategorie() {
    return this.prodserv.getAllCat().subscribe(data =>
      this.scategories = data),
      (error: any) => console.log(error)
  }

  updatearticle = () => {
    this.products.dateDebut=new Date(this.date1);
    this.products.dateFin=new Date(this.date2);
    this.prodserv.updateMovie(this.productId,this.products).subscribe((data=>{
      console.log(data)
      this.closeModal() 
      window.location.reload();
  }))


  }
   formattedDate(isoDateString:string): string {
    return isoDateString.split('T')[0];
  }

  openModal() {
    console.log(this.productId);
    this.display = "block";
    this.prodserv.findMovie(this.productId).subscribe(data => {
      this.products = data;
      this.date1=this.formattedDate(data.dateDebut);
      this.date2=this.formattedDate(data.dateFin);
      this.products.dateDebut=new Date(this.date1);
      this.products.dateFin=new Date(this.date2);
      console.log(this.date1);
      this.updatePondFiles();
    });
  }

  closeModal() {
    this.display = "none";
  }

  pondFiles: FilePondOptions["files"]

  updatePondFiles() {
    this.pondFiles = [
      {
        source: this.products.img,
        options: {
          type: 'local'
        },
      },
    ];
  }


  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      load: (source: any, load: any, error: any, progress: any, abort: any, headers: any) => {
        if (typeof source === 'string' && source !== '') {
          var myRequest = new Request(source);
          fetch(myRequest).then(function (response) {
            response.blob().then(function (myBlob) {
              load(myBlob);
            });
          });
        }
        else {
          error('Invalid URL');
        }
      },

      process: (fieldName: any, file: any, metadata: any, load: any, error: any, progress: any, abort: any) => {

        const data = new FormData();

        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'iset-sfax')
        data.append('public_id', file.name)

        this.prodserv
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
      revert: (uniqueFileId: any, load: any, error: any) => {
        error('Error');
        load();
      },

    }
  }


}
