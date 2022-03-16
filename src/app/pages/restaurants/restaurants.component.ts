import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { GeolocationService } from '@ng-web-apis/geolocation'

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  lat: string | undefined 
  lon: string | undefined

  public restaurants: any[] | undefined

  constructor(private req: RequestService, private geolocalization: GeolocationService) { }


  async ngOnInit() {


    const response = await this.req.get('restaurants')
    this.restaurants = <Restaurant[]>JSON.parse(JSON.stringify(response));


    this.geolocalization.subscribe(async position => {
        this.lat = position.coords.latitude.toString()
        this.lon = position.coords.longitude.toString()
        const response = await this.req.get('restaurants?latitude='+this.lat+'&longitude='+this.lon)
        this.restaurants = <Restaurant[]>JSON.parse(JSON.stringify(response));

      }
    )

  }

  

}

export interface Restaurant {
  id: number
  name: string
  image: string
  open: boolean
}
