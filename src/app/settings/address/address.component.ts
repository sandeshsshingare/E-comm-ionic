import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { AnimationController, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent  implements OnInit {
  addresses : any [] =[]
  isAllLoaded :boolean = false
  updateAddressData :any
  @ViewChild('close') close !: any
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor(private settingService: SettingService, private animationCtrl : AnimationController) { }

  ngOnInit() {

    this.getAddress()
    this.isAllLoaded= true;
  }

  getAddress(){
    this.settingService.getSavedAddress().subscribe({
      next:(data:any)=>{
        this.addresses = data.results
        console.log(data)
      }
    })
  }

  addAddress(data:any){
   
    this.settingService.addAddress(data).subscribe((data)=>{
      this.getAddress();
    })
  }

  updateAddress(data:any,addressId:string){
      this.settingService.updateAddress(data, addressId).subscribe({
        next:(data)=>{
          this.getAddress()
        }
      })
  }
  setResult(event:any,addressId:string){
    console.log(event.detail.role)
    if(event.detail.role==="confirm"){
      this.deleteAddress(addressId)
    }
  }
  deleteAddress(addressId:any){

    this.settingService.deleteAddress(addressId).subscribe({
      next:(data)=>{
        this.getAddress();
      }
    })
  }



  // animation for modal

  enterAnimation = (baseEl: HTMLElement) => {
    const root:any = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };




  public actionSheetButtons = [
    {
      text: 'Delete',
      
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
   
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];


  logResult(ev:any) {
    console.log(JSON.stringify(ev.detail, null, 2));
  }

}
