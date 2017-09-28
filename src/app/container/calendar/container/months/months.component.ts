import { Component, OnInit } from '@angular/core';
import {DateService} from "../../../services/date.service";
import {MONTHS} from "../../../shared/cal.data";
import {LocalStorageService} from "../../../services/local-storage-service.service";
import {ShareableStreamStoreService} from "../../../services/shareable-stream-store.service";

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {

  public Months: Array<string> = MONTHS;
  public months: any;
  constructor(
    private dateServive: DateService,
    private localStorageSer: LocalStorageService,
    private shareableStreamStoreService: ShareableStreamStoreService
  ) { }

  ngOnInit() {
    this.months = this.dateServive.getNameMonths();
  }

  public selectMonth(item: any) {

    const value = this.localStorageSer.getData('selectedMY');
    value['month'].number = item;                                // номер выбраного месяца

                                                                 // делаем все false => поле year делаем true
    for (const i in value) {
      if (value[i].active === true)
        value[i].active = false;
    }
    value['weeks'].active = true;                                // делаем отображение компонента
    this.localStorageSer.setData('selectedMY', value);           // запишем в локалСтор
    this.shareableStreamStoreService.emit('SelectedMY', value ); // сменить отображение другого компонента
    this.shareableStreamStoreService.emit('selectMonth' ,        // получим выбранный месяц и тоже для подписки
      this.dateServive.getDaysOfMonth(value['year'].number, value['month'].number));
  }

}
