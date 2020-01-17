import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeedComponent } from './seed/seed.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SeedComponent
  ],
  entryComponents: [
    SeedComponent
  ]
})
export class SharedModule { }
