import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { PlayersModule } from './players/players.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from 'src/app/signup/services/signup.service';
import { LoginService } from 'src/app/login/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    PlayersModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule
  ],
  providers: [LoginService, SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
