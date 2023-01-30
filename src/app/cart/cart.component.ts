import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito, Product, TotalPago } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:Carrito = {
    productos: []
  }

  pago:TotalPago = {
    Total: 0,
    TotalItems: 0
  }

  productos:Product[] = []

  constructor(private navigationService: NavigationService,private utilityService:UtilityServiceService){}

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(){
    this.navigationService.VerCarrito().subscribe((next:any) => {
      this.cart = next.data;
      this.utilityService.CalculoPago(this.cart, this.pago);
    });
  }
}
