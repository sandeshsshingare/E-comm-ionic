import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log("init called of login");
    this.navCtrl.navigateForward("/setting/profile");
  }

  ngAfterViewInit(): void {
    console.log("view init called");
  }
  ionViewWillEnter() {
    console.log("view will enter called");
  }

  loginFun(data: any) {
    this.authService.login(data).subscribe({
      next: (data: any) => {
        console.log(data);
        localStorage.setItem("customerToken", data.token);
        this.navCtrl.navigateForward("/setting/profile");
      },
    });
    console.log(data);
  }
}
