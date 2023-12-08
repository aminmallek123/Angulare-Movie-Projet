import { Component } from '@angular/core';
import { Categorie } from '../categorie';
import { MovieCatService } from '../movie-cat.service';

@Component({
  selector: 'app-creat-catg',
  templateUrl: './creat-catg.component.html',
  styleUrls: ['./creat-catg.component.css']
})
export class CreatCatgComponent {
  display = "none";
  products: Categorie = new Categorie();
 
  constructor(private service: MovieCatService) { }

  ajoutarticle = () => {
    this.service.create(this.products).subscribe((data => {
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
  

}
