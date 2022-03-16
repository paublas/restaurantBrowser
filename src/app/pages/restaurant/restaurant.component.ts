import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  @Input()
  restaurante!: Restaurant;

  public path: string = "assets/images/"

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.path += this.restaurante.image_url
  }


  showRestaurant(){
    console.log("Showing " + this.restaurante.name)
    this.router.navigate(['/catalog', {id: this.restaurante.id}])
  }

}


export interface Restaurant {
  id: number
  name: string
  image_url: string
  open: boolean
}
