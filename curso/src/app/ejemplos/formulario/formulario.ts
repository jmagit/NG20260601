import { CommonModule } from '@angular/common';
import { Component, effect, Injectable, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, NIFNIEValidator, NotblankValidator, TypeValidator, UppercaseValidator } from '@my/library';
import { FormButtons } from 'src/app/common-component';
import { NotificationService, NotificationType } from 'src/app/common-services';

type Mode = 'add' | 'edit'

interface Persona {
  id?: number
  nombre: string
  apellidos?: string
  edad?: number
  correo?: string
  nif?: string
}

const porDefecto: Persona = { nombre: ''}

@Injectable({providedIn: 'root'})
export class PersonasViewModelService {
  Modo = signal<Mode>('add')
  Elemento = signal<Persona>({...porDefecto})

  constructor(private notify: NotificationService) { }

  add() {
    this.Elemento.set({...porDefecto})
    this.Modo.set('add')
  }
  edit(key: number) {
    this.Elemento.set({ id: key, nombre: 'Pepito', apellidos: 'Grillo', edad: 99, correo: 'pgrillo@example.com', nif: '4g'})
    this.Modo.set('edit')
  }

  cancel() {
    // this.Elemento.set({...porDefecto})
  }

  send() {
    switch(this.Modo()) {
      case 'add':
        this.notify.add(`POST: ${JSON.stringify(this.Elemento())}`, NotificationType.info)
        this.cancel()
        break
      case 'edit':
        this.notify.add(`PUT: ${JSON.stringify(this.Elemento())}`, NotificationType.warn)
        this.cancel()
        break
    }
  }
}


@Component({
  selector: 'app-formulario',
  imports: [ FormsModule, CommonModule, ErrorMessagePipe, FormButtons, NIFNIEValidator, UppercaseValidator, NotblankValidator,
    TypeValidator ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  readonly id = input<number>(0)

  constructor(public vm: PersonasViewModelService) {
    effect(() => {
      if(this.id() !== undefined) {
        vm.edit(+this.id())
      }
    })
  }
}
