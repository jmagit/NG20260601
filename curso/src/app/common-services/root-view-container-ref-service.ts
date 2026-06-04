import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RootViewContainerRefService {
  private rootViewContainerRef: ViewContainerRef | null = null;

  get RootViewContainerRef(): ViewContainerRef {
    if (!this.rootViewContainerRef) {
      throw new Error(`
        ViewContainerRef debe ser inicializado en el componente principal:
          constructor(window: WindowService, rootViewContainerRef: ViewContainerRef) {
            window.RootViewContainerRef = rootViewContainerRef;
          }`);
    }
    return this.rootViewContainerRef;
  }
  set RootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainerRef = viewContainerRef;
  }
}
