import { Component, inject, OnInit } from '@angular/core';
import { ProductDTO } from '../../dtos/product-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../servicios/registro.service';
import { error } from 'console';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alerta } from '../../dtos/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { MessageDTO } from '../../dtos/message-dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AlertaComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export default class PrincipalComponent implements OnInit {

  alerta!: Alerta;
  product: ProductDTO;
  errors: string[];

  constructor(
    private registroService: RegistroService,
    private router: Router, private route: ActivatedRoute) {

    this.product = new ProductDTO();
    this.errors = [];

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.registroService.mostrarInformacionProducto(parseInt(id)).subscribe(c => {

        this.product = c.mensaje;

      });
    }
  }

  public create() {

    this.registroService.agregarProducto(this.product).subscribe({
      next: (data) => {
        this.alerta = new Alerta(data.mensaje, "success");
        this.router.navigate(["/"]);
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.mensaje, "danger");
      }
    });
  }
}