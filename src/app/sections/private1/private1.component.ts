import { Component } from '@angular/core';
import { MiscService } from '../../_rest/misc.service';

@Component({
  selector: 'app-private1',
  templateUrl: './private1.component.html',
})
export class Private1Component {

  public text: string;
  public section = MiscService.Sections.section1;

}
