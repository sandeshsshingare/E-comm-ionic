import { Component, OnInit } from "@angular/core";
import { SettingService } from "../service/setting.service";
import { AnimationController } from "@ionic/angular";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  allItems: any[] = [];
  listOfAddress: any[] = [];
  selectedAddress: any;
  orderPrice: number = 0;
  deliveryFee: number = 40;
  summaryTotal: number = 0;
  constructor(
    private settingService: SettingService,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.allItems = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(this.allItems);
    this.allItems.forEach((data: any) => {
      console.log(data.price);
      this.orderPrice = this.orderPrice + data.price;
    });
    this.summaryTotal = this.deliveryFee + this.orderPrice;
    this.getSavedAddress();
  }
  getSavedAddress() {
    this.settingService.getSavedAddress().subscribe((data: any) => {
      this.listOfAddress = data.results;
      this.selectedAddress = data.results[0];
    });
  }
  addressSelected(event: any, data: any) {
    console.log(event.target);
    this.selectedAddress = data;
  }

  addAddress(data: any) {
    console.log(data);
  }
}
