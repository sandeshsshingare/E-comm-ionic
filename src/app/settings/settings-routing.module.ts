import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsPage } from "./settings.page";
import { ProfileComponent } from "./profile/profile.component";
import { AddressComponent } from "./address/address.component";
import { GeneralSettingComponent } from "./general-setting/general-setting.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { PaymentComponent } from "./payment/payment.component";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "address",
        component: AddressComponent,
      },
      {
        path: "general-setting",
        component: GeneralSettingComponent,
      },
      {
        path: "checkout",
        component: CheckoutComponent,
      },
      {
        path: "payment",
        component: PaymentComponent,
      },

      {
        path: "",
        redirectTo: "profile",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
