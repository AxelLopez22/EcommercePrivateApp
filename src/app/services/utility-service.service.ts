import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { Carrito, Login, Product, TotalPago } from '../models/models';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {
  changeCart = new Subject();
  constructor(private jwt: JwtHelperService,private navigationService: NavigationService) { }

  GetUserLogin(){
    let token = this.jwt.decodeToken();
    let user: Login = {
      nameUser: token.Usuario,
      password: ''
    }
    return user;
  }

  setUser(token:string){
    localStorage.setItem('user', token);
  }

  isLoggedIn(){
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser(){
    localStorage.removeItem('user');
  }

  addToCart(product: Product){
    let IdProducto = product.idProductos;
    console.log(product);
    
    this.navigationService.AddProductToCart(IdProducto).subscribe((res:any) => {
      console.log(res);
      if(res.status === "Ok") this.changeCart.next(1);
    });
  }

  CalculoPago(cart: Carrito, total: TotalPago){
    total.TotalItems = cart.productos.length;
    total.Total = 0;

    for(let cartItem of cart.productos){
      total.Total += cartItem.precio;
    }
  }
}
