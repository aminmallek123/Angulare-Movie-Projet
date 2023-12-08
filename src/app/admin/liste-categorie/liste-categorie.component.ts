import { Component, ViewChild ,OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovieCatService } from '../movie-cat.service';
import { Categorie } from '../categorie';

@Component({
  selector: 'app-liste-categorie',
  templateUrl: './liste-categorie.component.html',
  styleUrls: ['./liste-categorie.component.css']
})
export class ListeCategorieComponent implements OnInit {
  movie:any;
  @ViewChild(MatPaginator, { static:  true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static:  true }) sort!: MatSort;
  columns: string[] = ['categorieName','_id'];
  constructor(public service:MovieCatService){}
  ngOnInit(): void {
      this.service.getAllCat().subscribe((data:Categorie[])=>{
        console.log(data);
          this.movie=new MatTableDataSource<any>(data);
          this.movie.paginator=this.paginator;
          this.movie.sort = this.sort;
        
      })
      
  }
  deletMovie(id:object){
      this.service.deleteMovie(id).subscribe(res=>{
        const data = this.movie.filteredData.filter((item: { _id: object; }) => item._id !== id)
        this.movie = new MatTableDataSource<any>(data)
        this.movie.paginator = this.paginator;
        this.movie.sort = this.sort;

          console.log('Post deleted successfully!');
      })
  }
}
