import { Component } from '@angular/core';
import { MiscService } from '../../_rest/misc.service';

@Component({
  selector: 'app-private2',
  templateUrl: './private2.component.html',
})
export class Private2Component {

  public text: string;
  public section = MiscService.Sections.section2;

}
