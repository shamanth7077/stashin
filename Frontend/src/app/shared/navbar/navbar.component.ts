import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  public user: string;
  public COAF: string;


    constructor(private users: UserService,
                private router: Router) {
      this.user = ''+ this.users.getUser();
      this.users.userObs.subscribe(
          res => {
              this.user =  ''+res;
              console.log('event triggered')
              //this.router.navigate(['/home']);
          },
          err => console.log('Error fetching changed user')
      );


  }

  switchUser() {
    this.users.setUser(+this.user);
    if(this.user == '3'){

        this.router.navigate(['/register/owner'], { queryParams: { 'owner': 1 } });
    }
    if(this.user == '4'){

        this.router.navigate(['/register/owner'], { queryParams: { 'owner': 2 } });
    }
    else if(this.user == '5')
       this.router.navigate(['/action/insurer'], { queryParams: { 'insurer': 1 } });
    else if(this.user == '6')
        this.router.navigate(['/action/insurer'], { queryParams: { 'insurer': 2 } });
    else if(this.user == '2')
          this.router.navigate(['/home']);
    else if(this.user == '1')
                this.router.navigate(['/action/marketplace']);
  }

  clearCOAF() {

    this.router.navigate(['/home']);
  }

  ngOnInit() {
  //  $('.ui.dropdown')
    //  .dropdown();
  }
}
