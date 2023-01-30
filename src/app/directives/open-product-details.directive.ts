import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appOpenProductDetails]'
})
export class OpenProductDetailsDirective {
  @Input() idProducto: number = 0;
  @HostListener('click') OpenProducts(){
    window.scrollTo(0,0);
    this.router.navigate(['/product-details'], {
        queryParams: {
            id: this.idProducto
        },
    });
}
  constructor(private router: Router) { }

}
