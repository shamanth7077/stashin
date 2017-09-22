import { Component, EventEmitter, Output } from '@angular/core';
import { StashinService } from '../services/stashin.service';
import {UserService} from "../services/user.service";


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


    @Output() coaf = new EventEmitter<string>();

    private user: number;

  constructor(private StashService: StashinService,
              private userService: UserService) {
      this.user = this.userService.getUser();
      this.userService.userObs.subscribe(res => this.user = res);
  }
  getcontract(coaf: string) {
  //    this.StashService.getContractInfo(coaf)
    //      .subscribe(res => {
                  this.coaf.emit(coaf);
                  this.StashService.setCOAF(coaf);

      //        },
        //      err => {
          //        alert('No contract with that reference found.');
            //      console.log(err);
              //});
  }
}
