import { Component, Input, OnInit } from '@angular/core';
import { Category, Product } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css']
})
export class SuggestedProductsComponent implements OnInit {
  @Input() category: Category = {
    id: 1,
    category: ''
  };

  @Input() count:number = 3;
  product: Product[] = [];

  constructor(private service:NavigationService){}

  ngOnInit(): void {
    this.service.getProductos(this.category.id, this.count).subscribe((res:any) => 
    {
      for(let item of res.data){
        this.product.push(item)
      }
    });
  }
}
