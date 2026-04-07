import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  constructor() { }
  //sweetalert2 service 

  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      confirmButtonText: 'OK'
    });
  }

  warning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: message,
      confirmButtonText: 'OK'
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonText: 'OK'
    });
  }
}
