import { Component, OnInit, Input, Output } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent implements OnInit {

  data: string
  
  @Output() finish =  new EventEmitter<any>();

  constructor(private geolocation: Geolocation) {}

  ngOnInit() {}

  async getLocation(){

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.data = 'Lat: ' + resp.coords.latitude + ', Long: ' + resp.coords.longitude
    }).catch((error) => {
      
      this.data = 'Error getting location ' + error
      console.log('Error getting location', error);
       
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    //data.coords.latitude
    //data.coords.longitude
    });

    this.finish.emit(this.data)
  
  } 

}
