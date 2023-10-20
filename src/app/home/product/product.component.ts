import { Component, OnInit } from "@angular/core";
import { HomeService } from "../service/home.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  productList: any[] = [];
  menuItem: boolean = false;
  allController: any = {
    page: 1,
    limit: 5,
    search: "",
    sort: "",
  };
  constructor(
    private homeService: HomeService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  menuButtonClicked() {
    this.menuItem = !this.menuItem;
  }

  getProduct() {
    this.showLoading();
    console.log("get product called");
    this.homeService.getProductList(this.allController).subscribe({
      next: (data: any) => {
        console.log(data);

        this.productList = data.results;
        this.loadingCtrl.dismiss();
      },
    });
  }
  itemClicked(productId: any) {
    this.router.navigate(["/home/product-details/" + productId]);
  }
  searchProduct(data: any) {
    if (data.length >= 3) {
      this.allController.search = data;
      this.getProduct();
    } else if (data.length === 0) {
      this.allController.search = "";
      this.getProduct();
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: "Loading...",
    });

    loading.present();
  }
}
