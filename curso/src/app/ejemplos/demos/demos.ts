import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-demos',
  imports: [],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demos {
  readonly conSignal = signal(0)
  readonly doble = computed(() => this.conSignal() * 2)
  sinSignal = 0

  constructor() {
    setInterval(() => this.conSignal.update(value => value + 1), 2_000)
    setInterval(() => this.sinSignal++, 1_000)
    effect(() => {
      console.log(`Contador: ${this.conSignal()}`)
    })
  }

  addSignal() {
    this.conSignal.update(value => value + 1)
  }
  addSinSignal() {
    this.sinSignal++
  }
}
