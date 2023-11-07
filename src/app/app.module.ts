import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { InputValueAcessorDirective } from "./directives/input-value-accessor.directive";
import { PichinchaDesignSystemModule } from '@pichincha/ds-angular';
import { SectionHeaderComponent } from './components/section-header/section-header.component';

@NgModule({
  declarations: [AppComponent, InputValueAcessorDirective, SectionHeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PichinchaDesignSystemModule],
  exports:[SectionHeaderComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
