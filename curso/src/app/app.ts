import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Footer, Header, Notification, NotificationModal, AjaxWait } from './layout';
import { NavigationService } from './common-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, /*Notification,*/ NotificationModal, AjaxWait],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  nav = inject(NavigationService)
}
