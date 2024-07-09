import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegistroService } from '../../servicios/registro.service';
import { Alerta } from '../../dtos/alerta';
import { ProductDTO } from '../../dtos/product-dto';
import { AlertaComponent } from '../alerta/alerta.component';


@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [RouterModule, FormsModule, AlertaComponent],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export default class ActualizarComponent {

  codigo: number = 0;
  productDTO: ProductDTO;
  alerta!: Alerta;

  constructor(
    private registroService: RegistroService,
    private router: Router, private route: ActivatedRoute) {

    this.route.params.subscribe((params) => {
      this.codigo = params['codigo'];
      this.obtenerProducto();
    });

    this.productDTO = new ProductDTO();
  }

  public obtenerProducto() {

    this.registroService.mostrarInformacionProducto(this.codigo).subscribe({
      next: data => {
        this.productDTO = data.mensaje;

      },
      error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, "danger");

      }
    });
  }

  public update() {

    this.registroService.modificarProducto(this.codigo, this.productDTO).subscribe({
      next: (data) => {
        this.productDTO = data.mensaje;
        this.alerta = new Alerta(data.mensaje, "success");
        this.router.navigate(["/"]);
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }

}
