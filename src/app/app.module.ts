import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './sections/public/public.component';
import { Private1Component } from './sections/private1/private1.component';
import { Private2Component } from './sections/private2/private2.component';
import { Private3Component } from './sections/private3/private3.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './sections/admin/admin.component';
import { TextareaComponent } from './textarea/textarea.component';
import { AuthService } from './_rest/auth.service';
import { LocalStorageService } from './_rest/local-storage.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecordService } from './_rest/record.service';
import { SectionGuard } from './sectionguard.guard';
import { MiscService } from './_rest/misc.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'public', component: PublicComponent },
  { path: 'private1', component: Private1Component, canActivate: [SectionGuard], data: {section: MiscService.Sections.section1 } },
  { path: 'private2', component: Private2Component, canActivate: [SectionGuard], data: {section: MiscService.Sections.section2 } },
  { path: 'private3', component: Private3Component, canActivate: [SectionGuard], data: {section: MiscService.Sections.section3 } },
  { path: 'admin', component: AdminComponent, canActivate: [SectionGuard], data: {section: MiscService.Sections.admin } },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    PublicComponent,
    Private1Component,
    Private2Component,
    Private3Component,
    HomeComponent,
    AdminComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastModule.forRoot()
  ],
  providers: [
    AuthService, 
    LocalStorageService,
    RecordService,
    SectionGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
