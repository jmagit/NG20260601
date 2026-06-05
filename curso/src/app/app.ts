import { Component, inject, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Footer, Header, Notification, NotificationModal, AjaxWait } from './layout';
import { NavigationService, RootViewContainerRefService } from './common-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, /*Notification,*/ NotificationModal, AjaxWait],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  nav = inject(NavigationService)

  constructor(view: RootViewContainerRefService, rootViewContainerRef: ViewContainerRef) {
    view.RootViewContainerRef = rootViewContainerRef;
  }
}
