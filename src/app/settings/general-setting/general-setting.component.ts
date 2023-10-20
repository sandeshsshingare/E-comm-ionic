import { Component, OnInit } from "@angular/core";
import { SettingService } from "../service/setting.service";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-general-setting",
  templateUrl: "./general-setting.component.html",
  styleUrls: ["./general-setting.component.scss"],
})
export class GeneralSettingComponent implements OnInit {
  name!: string;
  email!: string;
  formData: FormData = new FormData();
  profileInfo: any;
  constructor(
    private settingService: SettingService,
    private router: Router,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async presentToast(position: "top" | "middle" | "bottom", message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  public alertButtons = [
    {
      text: "Cancel",
      role: "cancel",
      handler: () => {
        console.log("Alert canceled");
      },
    },
    {
      text: "OK",
      role: "confirm",
      handler: () => {
        console.log("Alert confirmed");
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    if (ev.detail.role === "confirm") {
      console.log("confirm");
      this.deleteAccount();
    }
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.settingService.getProfileData().subscribe({
      next: (data: any) => {
        this.profileInfo = data.results;
      },
    });
  }

  setFormData(event: any) {
    console.log(event);
    this.formData.append("picture", event.target.files[0]);
  }

  updateProfilePicture() {
    this.settingService.updateCustomerProfilePicture(this.formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.presentToast("top", "Profile picture updated successfull!!!");
      },
    });
  }
  updateNameEmail(data: any) {
    console.log("called");
    this.settingService.updateCustomerProfile(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.profileInfo = data.results;
        this.presentToast("top", "Update successfull!!!");
      },
    });
  }

  changePassword(data: any) {
    console.log("called");
    if (data.password !== data.confirm_password) {
      return alert("Please confirm your password");
    }
    this.settingService
      .chagePassword({
        old_password: data.old_password,
        new_password: data.password,
      })
      .subscribe({
        next: (data) => {
          console.log(data);

          this.presentToast("top", "Password changed successfull!!!");
        },
      });
  }

  deleteAccount() {
    this.settingService.deleteAccount().subscribe({
      next: (data) => {
        console.log(data);
        alert("Account deleted successfull");
        this.presentToast("top", "Account deleted successfull!!!");

        this.navCtrl.navigateForward("/home/products");
      },
    });
  }
}
