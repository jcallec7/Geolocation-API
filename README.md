# Geolocation-API

## Proceso de configuración

Instalamos el API Capacitor

```bash
npm install cordova-plugin-geolocation
npm install @ionic-native/geolocation
ionic cap sync
```

Dentro de app.module.ts en la cabecera importamos Geolocation y en providers agregamos "Geolocation"

```ts

import { Geolocation } from '@ionic-native/geolocation/ngx';

...

providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
```

Creamos el componente

```bash
ionic generate component components/geolocation
```

Dentro del geolocation.components.ts colocar

```ts
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
       console.log('Error getting location', error);
       this.data = 'Error getting location ' + error
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    });

    this.finish.emit(this.data)
  
  } 

}

```
Vamos a nuestro home.module.ts y agregamos nuestro componente en delcarations y exports, si no tiene exports, escribalo

```ts
  declarations: [HomePage,GeolocationComponent],
  exports: [GeolocationComponent]
```

Colocamos la siguiente linea en nuestro HTML del componente
 
 ```html
 <ion-button (click)="getLocation()">Obtener localizacion</ion-button>
 
 ```


En nuestro HTML de home page colocamos el la siguiente linea para llamar al HTML del componente
 
 ```html
 <app-geolocation type="button" (finish)="location($event)"></app-geolocation>
 
 ```
 
 
 Finalmente creamos un evento en nuestro home.page.ts para que el evento sea llamado
 
 ```ts
 
 locate: string
 
 ...
 
 location(data:any){

    console.log(data)
    this.locate = data

  }
 
 ```
 Y lo imprimimos en nuestro HTML de home page
 
 ```HTML
 
 <ion-label>{{locate}}</ion-label>
 
 ```

## Resultados: 

![Test Image 1](https://github.com/jcallec7/Geolocation-API/blob/master/images/geo1.jpeg)
![Test Image 2](https://github.com/jcallec7/Geolocation-API/blob/master/images/geo2.jpeg)


