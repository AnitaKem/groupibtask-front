import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { RecordService } from '../_rest/record.service';
import { AuthService } from '../_rest/auth.service';
import { Record } from '../_models/Record';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
})
export class TextareaComponent implements OnInit {
  @Input() header: string;
  @Input() text: string;
  @Input() section: number;

  constructor(
    private recordService: RecordService,
    private authService: AuthService,
    private toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    let user = this.authService.getAuthData();
    this.recordService.getRecords(user ? user.id : null, this.section).subscribe(records =>{
      if(records && records.length > 0){
        this.text = records[records.length - 1].text;
      }      
    });
  }

  save():void{    
    let record = new Record({ text: this.text, section: this.section});
    this.recordService.addRecord(record).subscribe(res => {     
      this.toastr.success('Saved!');
    });
  }
}
