import {Component, Input, OnInit} from '@angular/core';
import { DateService }            from '../../services/date.service';
@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent implements OnInit {

  @Input() numWeek: any;
  public   items  : any;
  constructor(private dateServive: DateService) { }

  ngOnInit() {
    this.items = this.dateServive.showCurrMonth()[3][this.numWeek];
  }

  public getStyle(type: string) {
    return type;
  }


}
