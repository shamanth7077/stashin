import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <navbar></navbar>
    
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
}
