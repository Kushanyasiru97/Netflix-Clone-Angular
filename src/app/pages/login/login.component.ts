declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '559456043407-jrdmae4iq52kda6eemm0kbses6u06vuj.apps.googleusercontent.com',
      callback:(res: any)=>{
        this.handleLogin(res);
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size:'large',
      shape:'rectangle',
      width: 350
    })

  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
    if(response){
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      this.router.navigate(['browse']);
    }
  }

}
