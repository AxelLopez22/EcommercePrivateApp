import { Component, OnInit } from '@angular/core';
import { SuggestedProducts } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  suggestedProduct: SuggestedProducts[] = [
    {
      banerimage: 'Baner_Mobile.png',
      category: {
        id: 1003,
        category: 'electronics'
      }
    },
    {
      banerimage: 'Baner_Laptop.png',
      category: {
        id: 1002,
        category: 'electronics'
      }
    },
    {
      banerimage: 'Baner_Chair.png',
      category: {
        id: 1,
        category: 'furniture'
      }
    }
  ]

  constructor(){}

  ngOnInit(): void {
    
  }
}
