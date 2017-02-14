import { NgModule, Component } from '@angular/core';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages
import { AppComponent } from '../+app/app.component';

@NgModule({
  declarations : [ AppComponent ],
  bootstrap: [ AppComponent ],
  imports: [
    UniversalModule // BrowserModule, HttpModule, and JsonpModule are included
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode }
  ]
})
export class MainModule {

}
