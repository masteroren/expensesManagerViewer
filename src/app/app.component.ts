import {Component, OnInit} from '@angular/core';
import {HttpService} from "./shared/services/httpService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
  }

}
