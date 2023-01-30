import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  view: 'grid' | 'list' = 'grid';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      let category = params.category;
      
      if(category){
        this.navigationService.getProductos(category , 10).subscribe((res:any) => {
          this.products = res.data          
        });
      }
    });
  }
}
