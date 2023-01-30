import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Compra, Login, Usuarios } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = 'https://localhost:7206/api/';

  constructor(private http: HttpClient) { }

  GetCategorias():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + 'Categoria');
  }

  getProductos(idCategoria: number, Cantidad: number){
    return this.http.get<any[]>(this.baseUrl + 'Producto/obtenerProductos', {
      params: new HttpParams()
        .set('idCategoria', idCategoria)
        .set('Cantidad', Cantidad)
    });
  }

  getProductsId(id: number):Observable<any>{
    return this.http.get<any>(this.baseUrl + 'Producto/' + id);
  }

  registerUser(user: Usuarios){
    return this.http.post<any>(this.baseUrl + 'Cuentas/registrar', user);
  }

  loginUser(user: Login){
    return this.http.post<any>(this.baseUrl + 'Cuentas/login', user);
  }

  AddProductToCart(IdProducto: number){
    let token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'Carrito/' + IdProducto, {headers: headers});
  }

  VerCarrito():Observable<any>{
    let token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.baseUrl + 'Carrito', {headers: headers})
  }

  ObtenerMetodoDePago():Observable<any>{
    return this.http.get<any>(this.baseUrl + 'MetodoPago');
  }

  VerCarritoDetalle():Observable<any>{
    let token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.baseUrl + 'Carrito/carritoDetalle', {headers: headers});
  }

  RealizarCompra(compra: Compra):Observable<any>{
    let token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'Venta', compra, {headers: headers});
  }
}
