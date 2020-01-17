import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MaterialModule } from '../material.module';
import { StarRatingModule } from 'angular-star-rating';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [ComponentsComponent, HomeComponent, HeaderComponent, FooterComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    CoreModule,
    MaterialModule,
    Ng5SliderModule,
    StarRatingModule.forRoot()
  ],
  
})
export class ComponentsModule { }
