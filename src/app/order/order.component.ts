import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Carrito, Compra, MetodoPago, TotalPago } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent  implements OnInit{
  formPay!:FormGroup;
  selectedPaymentMethodName = 'a';
  selectedPaymentMethod = new FormControl('0');
  metodoPago: MetodoPago[] = [];
  displaySpinner = false;
  message: string = '';
  classname: string = '';
  pagoid: number = 0;

  pago:TotalPago = {
    Total: 0,
    TotalItems: 0
  }

  cart:Carrito = {
    productos: []
  }

  

  constructor(private navigationService:NavigationService, private utilityService:UtilityServiceService, private fb: FormBuilder,
    private router: Router){}

  ngOnInit(): void {

    //console.log(this.selectedPaymentMethod.value);

    this.navigationService.ObtenerMetodoDePago().subscribe((data:any) => {
      this.metodoPago = data.data;
    });

    this.selectedPaymentMethod.valueChanges.subscribe((res : any) => {
      if(res === '0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName = res.toString();
    });

    this.navigationService.VerCarrito().subscribe((next:any) => {
      this.cart = next.data;
      this.utilityService.CalculoPago(this.cart, this.pago);
    });

    this.formPay = this.fb.group({
      titular: ['',[Validators.required]],
      numeroTarjeta: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      CVV: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      direccion: ['',[Validators.required]]
    });
  }

  EjecutarCompra(){
    this.displaySpinner = true;
    let isPaymentSuccesfully = this.payMoney();

    if(!isPaymentSuccesfully){
      this.displaySpinner = false;
      this.message = 'Ha ocurrido un error, intentelo nuevamente';
      this.classname = 'text-danger';
      return;
    }
    
    let step = 0;
    let count = timer(0,3000).subscribe((res) => {
      ++step;
      if(step === 1){
        this.message = 'Comprobando tarjeta';
        this.classname = 'text-success';        
      }
      if(step === 2){
        this.storeOrder();
        this.message = 'Estamos trabajando en su compra';
        this.classname = 'text-success';
      }
      if(step === 3){
        this.message = 'Compra exitosa';
        this.classname = 'text-success';
      }
      if(step === 4){
        this.router.navigateByUrl('/home');
        count.unsubscribe();
      }
    });
  }

  payMoney(){
    return true;
  }

  storeOrder(){
    let compra: Compra;
    let metodo = 0;
    if(this.selectedPaymentMethod.value)
      metodo = parseInt(this.selectedPaymentMethod.value);
    
    this.navigationService.VerCarritoDetalle().subscribe((res:any) => {
      compra = {
        idMetodoPago: metodo,
        detalle: res.data
      }

      this.navigationService.RealizarCompra(compra).subscribe((res:any) => {
        console.log(res);
      });
    });

    // this.navigationService.VerCarrito().subscribe((next:any) => {
    //   this.cart = next.data;
    // });
  }

  ObtenerMetodoPago(id:string){
    let x = this.metodoPago.find((v) => v.id === parseInt(id));
    return x?.id;
  }

  get Titular(): FormControl{
    return this.formPay.get('titular') as FormControl;
  }

  get NumeroTarjeta(): FormControl{
    return this.formPay.get('numeroTarjeta') as FormControl;
  }

  get CVV(): FormControl{
    return this.formPay.get('CVV') as FormControl;
  }

  get Direccion(): FormControl{
    return this.formPay.get('direccion') as FormControl;
  }
}
