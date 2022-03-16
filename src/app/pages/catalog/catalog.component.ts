import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private route: ActivatedRoute, private req: RequestService) { }

  public catalogo: any[] | undefined

  private id: string | undefined

  async ngOnInit() {
    this.route.params.subscribe(data =>{
      this.id = data["id"].toString()
    })

    const response = await this.req.get('restaurant:'+this.id+'/catalog?')
    this.catalogo = <Plato[]>JSON.parse(JSON.stringify(response));
    
    
  }

}

export interface Plato{
  category: string
  products: Product[]
}

export interface Product{
  name: string
  description: string
  image: string
  price: number
}

