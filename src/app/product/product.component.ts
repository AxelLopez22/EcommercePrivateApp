import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem'= 'grid';
  @Input() product: Product = {
    idProductos: 0,
    nombreProducto: '',
    descripcion: '',
    stock: 0,
    precio: 0,
    imagenUrl: '',
    idCategoria: 0,
    nombreCategoria: ''
  }

  constructor(public utilityService:UtilityServiceService){}

  ngOnInit(): void {
    
  }
}
