import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router : Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  checkUrl(){
    console.log("called")
    let a = this.activatedRoute.snapshot.url
    console.log(a)
  }

}
