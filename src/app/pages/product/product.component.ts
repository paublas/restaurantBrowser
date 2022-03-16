import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: Product;

  public path: string = "assets/images/"


  constructor() { }

  ngOnInit(): void {
    console.log(this.product)
    this.path += this.product.image

  }

}


export interface Product{
  name: string
  description: string
  image: string
  price: number
}

