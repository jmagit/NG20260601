import { CommonModule } from '@angular/common';
import { Component, effect, Injectable, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, NIFNIEValidator, NotblankValidator, TypeValidator, UppercaseValidator } from '@my/library';
import { FormButtons } from 'src/app/common-component';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { RESTDAOService } from 'src/app/core';

type Mode = 'add' | 'edit'

interface Persona {
  id?: number
  nombre: string
  apellidos?: string
  edad?: number
  correo?: string
  nif?: string
}

const porDefecto: Persona = { nombre: '' }

@Injectable({ providedIn: 'root' })
export class PersonasDAOService extends RESTDAOService<Persona, number> {
  constructor() {
    super('personas')
  }
}
@Injectable({ providedIn: 'root' })
export class PersonasViewModelService {
  Modo = signal<Mode>('add')
  Elemento = signal<Persona>({ ...porDefecto })

  constructor(private notify: NotificationService, private dao: PersonasDAOService) { }

  add() {
    this.Elemento.set({ ...porDefecto })
    this.Modo.set('add')
  }
  edit(key: number) {
    this.dao.get(key).subscribe({
      next: data => {
        this.Elemento.set(data)
        this.Modo.set('edit')
      },
      error: err => this.notify.add(`${err.status}: ${JSON.stringify(err.body)}`)
    })
    // this.Elemento.set({ id: key, nombre: 'Pepito', apellidos: 'Grillo', edad: 99, correo: 'pgrillo@example.com', nif: '4g'})
    // this.Modo.set('edit')
  }

  cancel() {
    // this.Elemento.set({...porDefecto})
  }

  send() {
    switch (this.Modo()) {
      case 'add':
        this.dao.add(this.Elemento()).subscribe({
          next: _data => {
            this.cancel()
          },
          error: err => this.notify.add(`${err.status}: ${JSON.stringify(err.body)}`)
        })
        // this.notify.add(`POST: ${JSON.stringify(this.Elemento())}`, NotificationType.info)
        // this.cancel()
        break
      case 'edit':
        if (this.Elemento().id) {
          this.dao.change(this.Elemento().id as number, this.Elemento()).subscribe({
            next: _data => {
              this.cancel()
            },
            error: err => this.notify.add(`${err.status}: ${JSON.stringify(err.body)}`)
          })
        }
        // this.notify.add(`PUT: ${JSON.stringify(this.Elemento())}`, NotificationType.warn)
        // this.cancel()
        break
    }
  }
}


@Component({
  selector: 'app-formulario',
  imports: [FormsModule, CommonModule, ErrorMessagePipe, FormButtons, NIFNIEValidator, UppercaseValidator, NotblankValidator,
    TypeValidator],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  readonly id = input<number>(0)

  constructor(public vm: PersonasViewModelService) {
    effect(() => {
      if (this.id() !== undefined) {
        vm.edit(+this.id())
      }
    })
  }
}
