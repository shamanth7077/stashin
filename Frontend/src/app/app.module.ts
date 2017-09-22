import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import { AppComponent }  from './app.component';
import { HomeComponent } from './shared/home/home.component';
import { UrlService } from './shared/services/url.service';
import { StashinService } from './shared/services/stashin.service';
import { UserService } from './shared/services/user.service';
import { AppRoutingModule } from './app.routes';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OwnerRegisterComponent } from './shared/owner-creation/owner-creation.component';
import { AssetCreationComponent } from './shared/asset-creation/asset-creation.component';
import { UserListComponent } from './shared/user-list/user-list.component';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { SearchComponent } from './shared/search/search.component';
import { InsurerCreationComponent } from './shared/insurer-creation/insurer-creation.component';

import { MarketPlaceComponent } from './shared/market-place/market-place.component';
@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule,
      AppRoutingModule,
      MyDatePickerModule,
      CalendarModule,
      BrowserAnimationsModule,
    ],
  declarations: [
      AppComponent,
      HomeComponent,
      NavbarComponent,
      UserFormComponent,
      AssetCreationComponent,
      OwnerRegisterComponent,
       UserListComponent,
       SearchComponent,
       InsurerCreationComponent,

       MarketPlaceComponent

    ],
  providers: [
      UrlService,
      UserService,
      StashinService,


  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
