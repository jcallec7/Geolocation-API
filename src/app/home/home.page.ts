import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  locate: string

  constructor() {}

  location(data:any){

    console.log(data)
    this.locate = data

  }

}
