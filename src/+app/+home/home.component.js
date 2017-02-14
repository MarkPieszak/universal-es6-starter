import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { Http } from '@angular/http';

// import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
  constructor(http) {
    this.data = {};
    this.http = http;
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit();
  }

  universalInit() {
    this.http.get('/data.json').subscribe(data => {
      this.data = data;
    });
  }

}
HomeComponent.parameters = [
  [Http]
];