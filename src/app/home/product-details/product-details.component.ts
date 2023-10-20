import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../service/home.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  productData: any;
  loaded: boolean = false;
  cartArray: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService
  ) {
    this.cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log(this.productId);
    this.getProductDetails();
  }

  swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  getProductDetails() {
    this.loaded = false;
    this.homeService.getProductDetails(this.productId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loaded = true;
        this.productData = data.data;
      },
    });
  }

  addToCart() {
    let isPresent :boolean  =false
    this.cartArray.forEach((data)=>{
      if(data._id === this.productData._id){
        isPresent = true
      }
      return data
    })
    console.log('called');
    if(isPresent){
     return alert('Already present...')
    }
    let newObj = {...this.productData , qty: 1}
    this.cartArray.push(newObj);
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
  }
}
