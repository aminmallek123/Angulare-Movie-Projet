import { Component,EventEmitter,OnInit,ViewChild,Output  } from '@angular/core';
import { Movie } from 'src/app/admin/movie';
import { MovieCatService } from 'src/app/admin/movie-cat.service';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AuthService } from 'src/app/auth.service';
import { Categorie } from 'src/app/admin/categorie';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  movie:any=null;
  mov:Movie=new Movie();
  pagedItems: any[] = [];
  categorie:Categorie[]=[];
  currentPage = 1;
  itemsPerPage = 9;
  totalPages: number;
  display = "none";
  currentDate: Date = new Date();
  date1:string;
  date2:string;
  disbale=true;

  imageHeight = 200;
   
    closeModal() {
      this.display = "none";
    }
  constructor(public service: MovieCatService,private sanitizer: DomSanitizer,public ahlabik:AuthService) {}
  prepareVideoUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoId);
  }

  filtrerCat(id:object){
    this.service.findByCategorie(id).subscribe(res=>{
      this.movie=res;
    })
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  openModal(id:object) { 
    this.display = "block";
    this.service.findMovie(id).subscribe(res=>{
     this.mov=res;
     this.date1=this.formattedDate(res.dateDebut);
     this.date2=this.formattedDate(res.dateFin);
     console.log(this.date1);
     this.mov.dateDebut=new Date(this.date1);
     this.mov.dateFin=new Date(this.date2);
   });
 }
  ngOnInit(): void {
    this.service.getAllMovie().subscribe(data => {
      this.movie = data;
      this.totalPages = Math.ceil(this.movie.length / this.itemsPerPage);
      this.setPage(1);
    });
    this.service.getAllCat().subscribe(data=>{
      this.categorie=data;
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.setPage(page);
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.movie.length - 1);
    this.pagedItems = this.movie.slice(startIndex, endIndex + 1);
  }
  detailClick(id:object){
    this.service.findMovie(id).subscribe(res=>{
      this.mov=res;

    });
  }

 formattedDate(isoDateString:string): string {
    return isoDateString.split('T')[0];
  }

  logout(){
    this.ahlabik.doLogout();
  }


  ajouterAuPanier(article:Movie) {
    if(!this.ahlabik.getisLoggedIn())
    alert("Impossible de reserver vos ticket sans connexion")
  else this.service.ajouterAuPanier(article);
  }
}
