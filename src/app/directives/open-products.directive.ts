import {Directive, HostListener, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/models';

@Directive({
    selector: '[OpenProducts]'
})

export class OpenProductsDirective {
    @Input() category: Category = {
        id: 0,
        category: ''
    };

    @HostListener('click') OpenProducts(){
        this.router.navigate(['/products'], {
            queryParams: {
                category: this.category.id
            },
        });
    }
    constructor(private router: Router){}
}