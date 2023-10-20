import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SettingsPageRoutingModule],
  declarations: [SettingsPage, ProfileComponent,AddressComponent,GeneralSettingComponent, CheckoutComponent, PaymentComponent]
})
export class SettingsPageModule {}
