import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductDTO } from '../dtos/product-dto';
import { MessageDTO } from '../dtos/message-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiURL = "http://localhost:8080/api";

  // private http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  public agregarProducto(productDTO: ProductDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(`${this.apiURL}/create`, productDTO);
  }

  public mostrarTodos(): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.apiURL}/all-products`);
  }

  public eliminarProducto(codigo: number): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.apiURL}/delete/${codigo}`);
  }

  public modificarProducto(codigo: number, productoDTO: ProductDTO ): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.apiURL}/update/${codigo}`,productoDTO);
  }

  public mostrarInformacionProducto(codigo: number): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.apiURL}/get-product/${codigo}`);
  }

  public calcularPrecio(codigo: number, cantidad: number): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.apiURL}/price/${codigo}/${cantidad}`);
  }

  public calcularValorTotal(): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.apiURL}/total-price`);
  }
}
