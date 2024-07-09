import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../servicios/registro.service';
import { ProductDTO } from '../../dtos/product-dto';
import { RouterModule } from '@angular/router';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dtos/alerta';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertaComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductListComponent implements OnInit {

  alerta!: Alerta;
  listaProductos: ProductDTO[];
  productDTO: ProductDTO;
  valor: number;


  textoBtnEliminar: string;
  seleccionados: ProductDTO[];


  constructor(private registroService: RegistroService) {
    this.productDTO = new ProductDTO();
    this.listaProductos = [];
    this.textoBtnEliminar = "";
    this.seleccionados = [];
    this.valor = 0;
  }

  ngOnInit(): void {

    this.registroService.mostrarTodos().subscribe({

      next: (data) => {
        this.listaProductos = data.mensaje;
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.mensaje, "danger");
      }
    });

    this.totalProductos();
    this.eliminar();
    
  }

  public totalProductos() {

    this.registroService.calcularValorTotal().subscribe({
      next: (data) => {
        this.valor = data.mensaje;
      }
    })
  }

 
  public seleccionar(product: ProductDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(product);

    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(product), 1);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public eliminar() {

    this.seleccionados.forEach(product => {
      this.registroService.eliminarProducto(product.codigo).subscribe({
        next: (data) => {
          this.listaProductos = data.mensaje;
          this.seleccionados = [];
        },
        error: (error) => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
      this.listaProductos = this.listaProductos.filter(p => p.codigo !== product.codigo);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

}



