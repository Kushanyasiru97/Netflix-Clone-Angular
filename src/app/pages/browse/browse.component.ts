import { Component, inject, OnInit } from '@angular/core';
import { IVideoContent } from 'src/app/shared/models/video-content.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit{

  auth = inject(AuthService);

  movieService = inject(MovieService);

  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  popularMovies: IVideoContent[] = [];

  ngOnInit(): void {
      this.movieService.getMovies()
      .subscribe(res =>{
        console.log(res);
        this.popularMovies = res.results;
      })
  }

  signOut(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }

}
