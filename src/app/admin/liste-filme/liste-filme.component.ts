import { Component ,OnInit,ViewChild} from '@angular/core';
import { MovieCatService } from '../movie-cat.service';
import { Movie } from '../movie';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from  '@angular/material/sort';
@Component({
  selector: 'app-liste-filme',
  templateUrl: './liste-filme.component.html',
  styleUrls: ['./liste-filme.component.css']
})
export class ListeFilmeComponent implements OnInit {
  movie:any;
  @ViewChild(MatPaginator, { static:  true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static:  true }) sort!: MatSort;
  columns: string[] = ['img','name','time','prix','_id'];
  constructor(public service:MovieCatService){}
  ngOnInit(): void {
      this.service.getAllMovie().subscribe((data:Movie[])=>{
          this.movie=new MatTableDataSource<any>(data);
          this.movie.paginator=this.paginator;
          this.movie.sort = this.sort;
          console.log(this.movie);
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
