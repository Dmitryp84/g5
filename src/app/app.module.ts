import { StorageService } from './services/storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlocksComponent } from './pages/blocks/blocks.component';
import { TableComponent } from './pages/table/table.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { SearchComponent } from './commonComponents/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    BlocksComponent,
    TableComponent,
    DetailComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [StorageService, AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
