import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { NavbarModule }       from './navbar/navbar.module';
import { DaysModule }         from './days/days.module';
import { ContainerComponent } from './container.component';

import { DateService }                 from './services/date.service';
import { ShareableStreamStoreService } from "./services/shareable-stream-store.service";

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    DaysModule
  ],
  declarations: [ContainerComponent],
  exports:      [ContainerComponent],
  providers:    [DateService, ShareableStreamStoreService]
})
export class ContainerModule { }
