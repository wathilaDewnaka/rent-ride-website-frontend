import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Import RouterModule for routing functionalities
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    // Add shared components, directives, and pipes here
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzSpinModule,
    NzFormModule,
    NzLayoutModule,
    NzButtonModule,
    RouterLink, RouterLinkActive, RouterOutlet,
    RouterModule // Import RouterModule to handle routing
  ],
  exports: [
    CommonModule,
    NzInputModule,
    NzSpinModule,
    NzFormModule,
    NzLayoutModule,
    NzButtonModule,
    RouterLink, RouterLinkActive, RouterOutlet,
    RouterModule // Export RouterModule to make router functionalities available
  ]
})
export class CommonAppModule { }
