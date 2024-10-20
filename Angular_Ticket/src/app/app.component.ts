import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { response } from 'express';


@Component({
  
  selector: 'app-root',
 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private translateService:TranslateService){
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
    
  }
  title = 'Angular_Ticket';
  

  ngOnInit(): void {
    
  }


  

  




}
