import { Component } from '@angular/core';
import { MiscService } from '../../_rest/misc.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
})
export class PublicComponent {

  public text: string;
  public section = MiscService.Sections.public;

}
