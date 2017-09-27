import { Component, OnInit } from '@angular/core';
import {DateService} from "../../../services/date.service";
import {MONTHS} from "../../../shared/cal.data";
import {LocalStorageService} from "../../../services/local-storage-service.service";
import {ShareableStreamStoreService} from "../../../services/shareable-stream-store.service";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

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
    // номер выбраного месяца
    const value = this.localStorageSer.getData('selectedMY');
    value['month'].number = item;
    this.localStorageSer.setData('selectedMY', value);

    // делаем все false => поле year делаем true
    for (const i in value) {
      if (value[i].active === true)
        value[i].active = false;
    }
    value['weeks'].active = true;

    console.log(value);

    //TODO: Сменить сервис
    this.shareableStreamStoreService.emit('selectMonth' ,
      this.dateServive.getDaysOfMonth(value['year'].number, value['month'].number));
    // сменить отображение другого компонента
    this.shareableStreamStoreService.emit('SelectedMY', value );
  }

}