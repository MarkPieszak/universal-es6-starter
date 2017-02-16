import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export function getLazyModule() {
  return System.import('./+lazy/lazy.module')
    .then(mod => mod['LazyModule']);
}

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'lazy', loadChildren: getLazyModule }
    ])
  ],
})
export class AppRoutingModule { }


// Typescript if you could do AoT
// export function getLazyModule() {
//   return System.import('./+lazy/lazy.module' + (process.env.AOT ? '.ngfactory' : ''))
//     .then(mod => mod[(process.env.AOT ? 'LazyModuleNgFactory' : 'LazyModule')]);
// }
