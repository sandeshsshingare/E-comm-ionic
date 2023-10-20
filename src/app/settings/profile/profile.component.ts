import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private settingService: SettingService) {}
  profileData: any;
  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    this.settingService.getProfileData().subscribe({
      next: (data: any) => {
        console.log(data);
        this.profileData = data.results;
      },
    });
  }
}
