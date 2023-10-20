import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
  loaded: boolean = false;
  cartArray: any[] = [];
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.cartArray = JSON.parse(localStorage.getItem("cart") || "[]");
    setTimeout(() => {
      this.loaded = true;
    }, 0);
  }

  removeFromCart(item: any) {
    let newArr = this.cartArray.filter((data) => data._id !== item._id);
    if (newArr.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(newArr));
    }
    this.cartArray = newArr;
  }
  qtyChange(item: any, action: string) {
    switch (action) {
      case "decrease": {
        let newArr = this.cartArray.map((data) => {
          if (data._id === item._id) {
            if (data.qty > 1) {
              let qty = data.qty - 1;
              let totalPrice = data.price * qty;
              return { ...data, qty: qty, totalPrice: totalPrice };
            }
          }
          return data;
        });
        localStorage.setItem("cart", JSON.stringify(newArr));
        this.cartArray = newArr;
        break;
      }
      case "increase": {
        let newArr = this.cartArray.map((data) => {
          if (data._id === item._id) {
            let qty = data.qty + 1;
            let totalPrice = data.price * qty;

            return { ...data, qty: qty, totalPrice: totalPrice };
          }
          return data;
        });
        localStorage.setItem("cart", JSON.stringify(newArr));
        this.cartArray = newArr;
        break;
      }
      default: {
        break;
      }
    }
  }
  proceedToCheckout() {
    console.log("called");
    this.navCtrl.navigateForward(["/setting/checkout"]);
  }
  ngOnDestroy(): void {
    console.log("Cart destroyed");
  }
}
