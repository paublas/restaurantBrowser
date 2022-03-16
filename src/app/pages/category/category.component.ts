import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  category!: Plato;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Plato{
  category: string
  products: Product[]
}
