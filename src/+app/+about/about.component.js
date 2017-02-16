import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'about',
    template: 'About component'
})
export class AboutComponent {
    constructor(req) {
        // console.log('req',  req)
    }
}

AboutComponent.parameters = [
  [new Inject('req')]
];
