import { Component } from '@angular/core';
import {StashinService} from '../services/stashin.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector:'home',
  templateUrl:'./home.component.html',
  styleUrls:['./home.component.css']
})








export class HomeComponent{
  private contractref:string;
  public user:any;
  public ownerSelected: boolean = false;
  public insurerSelected:boolean = false;
  public stashinDeployed:boolean = false;
  public ContractName:string = '';


  constructor(private Stashin: StashinService, private router:Router,private users: UserService){
    this.user = '' + this.users.getUser();
    this.users.userObs.subscribe(
        res => {
            this.user = '' + res;
            this.router.navigate(['/home']);
        },
        err => console.log('Error fetching changed user')
    );

  this.contractref=this.Stashin.getCOAF();
  this.launchSubscriptions();
  }
launchSubscriptions(){
  this.Stashin.coafObs.subscribe(res=>this.contractref=res);
}
switchUser(action:any) {
  if(action == 'owner'){
    //console.log('owner')
    //this.users.setUser(3);
    //this.router.navigate(['/register/owner']);
    this.ownerSelected = true;

  }
  else if(action == 'insurer'){
    //this.users.setUser(5);
    //this.router.navigate(['action/insurer']);
    this.insurerSelected = true;

  }

}

switchUserScreen(event:any){
  if(event == 3){
    this.users.setUser(3);
    this.router.navigate(['/register/owner']);
  }
  else if(event == 4){
    this.users.setUser(4);
    this.router.navigate(['/register/owner']);
  }
  else if(event == 5){
    this.users.setUser(5);
    this.router.navigate(['action/insurer']);
  }
  else if (event == 6){
    this.users.setUser(6);
    this.router.navigate(['action/insurer']);

  }

}

 newContract(){
   this.stashinDeployed = false;
 }
  deploy(contractref:string){
    this.contractref=contractref;
    this.Stashin.deploycontract(contractref).subscribe(res=>{
   console.info("contract with contract reference : "+contractref+"deployed");
    this.ContractName = contractref;
      this.stashinDeployed = true;
    },
    err =>{
      alert("could not deploy. An error occured. check console.");
      console.log(err);
    });
  }

}
