/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { LoggerService } from '@my/library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { Notification } from "src/app/layout";

@Component({
  selector: 'app-demos',
  imports: [Notification],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [ NotificationService ],
})
export class Demos {

  constructor(public vm: NotificationService) {
    // effect(() => {
    //   if (this.vm.HayNotificaciones() && this.vm.Listado()[this.vm.Listado().length - 1].Type === NotificationType.error) {
    //     window.alert(`Efecto: ${this.vm.Listado()[this.vm.Listado().length - 1].Message}`);
    //     this.vm.remove(this.vm.Listado().length - 1);
    //   }
    // })
   }

  // private suscriptor: Unsubscribable | undefined;
  // ngOnInit(): void {
  //   this.suscriptor = this.vm.Notificacion.subscribe(n => {
  //     if (n.Type !== NotificationType.error) { return; }
  //     window.alert(`Suscripción: ${n.Message}`);
  //     this.vm.remove(this.vm.Listado().length - 1);
  //   });
  // }
  // ngOnDestroy(): void {
  //   if (this.suscriptor) {
  //     this.suscriptor.unsubscribe();
  //   }
  // }

  // constructor(private log: LoggerService) {
  //   log.error('esto es un error')
  //   log.warn('esto es un warn')
  //   log.info('esto es un info')
  //   log.log('esto es un log')
  // }

  // ejemplo de señales
  // readonly conSignal = signal(0)
  // readonly doble = computed(() => this.conSignal() * 2)
  // sinSignal = 0

  // constructor() {
  //   setInterval(() => this.conSignal.update(value => value + 1), 2_000)
  //   setInterval(() => this.sinSignal++, 1_000)
  //   effect(() => {
  //     console.log(`Contador: ${this.conSignal()}`)
  //   })
  // }

  // addSignal() {
  //   this.conSignal.update(value => value + 1)
  // }
  // addSinSignal() {
  //   this.sinSignal++
  // }
}
