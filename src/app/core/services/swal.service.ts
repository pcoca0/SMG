import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }
  success(
    title: string = 'Ok!',
    text: string = 'Operación exitosa.',
    timer: number = 1500): boolean {
    Swal.fire({
      title,
      text,
      icon: 'success',
      showConfirmButton: false,
      timer
    });
    return true;
  }

  warning(
    title: string = 'Cuidado!',
    text: string = 'Algo parece andar mal.',
    timer: any = 1500,
    confirmButton = false): boolean {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showConfirmButton: confirmButton,
      confirmButtonColor: '#73ae42',
      timer
    });
    return true;
  }

  error(
    title: string = 'Error!',
    text: string = 'Ha ocurrido un error inesperado',
    timer: number = 2000): boolean {
    Swal.fire({
      title,
      text,
      icon: 'error',
      showConfirmButton: false,
      timer
    });
    return true;
  }
}
