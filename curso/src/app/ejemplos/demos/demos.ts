/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoggerService } from '@my/library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { Notification } from "src/app/layout";

@Component({
  selector: 'app-demos',
  imports: [Notification, FormsModule, CommonModule, ],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [ NotificationService ],
})
export class Demos {

  readonly nombre = signal<string>('mundo')
  readonly fontSize = signal<number>(24)
  readonly listado = signal([
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'barcelona' },
    { id: 3, nombre: 'SEVILLA' },
    { id: 4, nombre: 'ciudad Real' },
  ])
  readonly idProvincia = signal<number>(2)
  readonly total = computed(() => this.listado().length)

  fecha = new Date('2026-06-02')

  public get Fecha(): string { return this.fecha.toISOString().substring(0, 10) }
  public set Fecha(valor: string) {
    const f = new Date(valor)
    if (f.toString() === 'Invalid Date' || f === this.fecha) return;
    this.fecha = f
  }

  readonly resultado = signal<string>('')
  readonly visible = signal<boolean>(true)
  readonly estetica = signal({ importante: true, error: false, urgente: true })

  saluda() {
    this.resultado.set(`Hola ${this.nombre()}`)
  }

  despide() {
    this.resultado.set(`Adios ${this.nombre()}`)
  }

  di(algo: string) {
    this.resultado.set(`Dice ${algo}`)
  }

  cambia() {
    this.visible.update(value => !value)
    // this.estetica.update(value => ({ ...value, importante: !value.importante}))
    // this.estetica.update(value => ({ ...value, error: !value.error}))
    this.estetica.update(value => ({ ...value, importante: !value.importante, error: !value.error }))
  }

  calculo(a: number, b: number) { return a + b }

  add(provincia: string) {
    const id = this.listado()[this.listado().length - 1].id + 1
    this.listado.update(value => [...value, { id, nombre: provincia }])
    this.idProvincia.set(id)
  }

  // Ejemplo de servicios
  // constructor(public vm: NotificationService) {
  //   effect(() => {
  //     if (this.vm.HayNotificaciones() && this.vm.Listado()[this.vm.Listado().length - 1].Type === NotificationType.error) {
  //       window.alert(`Efecto: ${this.vm.Listado()[this.vm.Listado().length - 1].Message}`);
  //       this.vm.remove(this.vm.Listado().length - 1);
  //     }
  //   })
  //  }

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
