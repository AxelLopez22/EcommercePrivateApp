import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NavigationItem } from '../models/models';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from '../services/navigation.service';
import { UtilityServiceService } from '../services/utility-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild("modalTitle") modalTitle!: ElementRef;
  @ViewChild("container", {read: ViewContainerRef, static: true}) 
  container!: ViewContainerRef;
  cartItems: number = 0;

  navigationList: NavigationItem[] = [
  ];
  constructor(private service:NavigationService, public utilityService:UtilityServiceService){}

  ngOnInit(): void {

    if(this.utilityService.isLoggedIn()){
      this.service.VerCarrito().subscribe((data:any) => {
        this.cartItems = data.data.productos.length
      });
    }
    
    this.service.GetCategorias().subscribe((list: any) => {
      for(let item of list.data){
        this.navigationList.push({
          idCategoria: item.idCategoria,
          category: item.nombre
        })
      }
    });

    this.utilityService.changeCart.subscribe((res:any) => {
      this.cartItems += parseInt(res);
    });
  }

  openModal(name: string){
    this.container.clear();
    let componentType!: Type<any>;
    if(name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter login information';
    }
    if(name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter register information';
    } 
    this.container.createComponent(componentType);
  }
}
