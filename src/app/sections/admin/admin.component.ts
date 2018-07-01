import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../_rest/record.service';
import { DatePipe } from '@angular/common';
import { Record } from '../../_models/Record';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  public records: Array<Record>;

  constructor(
    private recordService: RecordService,
  ) { }

  ngOnInit() {
    this.recordService.getRecords().subscribe(records =>{      
      this.records = records;
    });
  }
}
