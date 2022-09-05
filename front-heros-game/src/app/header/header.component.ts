import { ChangeDetectionStrategy, Component} from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(private authService :AuthService) { }

  isBtnLogoutVisibility$=this.authService.loggedIn$;

  hLogOut(){
    this.authService.logOutUser();
  }

}
