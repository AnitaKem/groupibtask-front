import { Component } from '@angular/core';
import { MiscService } from '../../_rest/misc.service';

@Component({
  selector: 'app-private3',
  templateUrl: './private3.component.html',
})
export class Private3Component {

  public text: string;
  public section = MiscService.Sections.section3;
}
