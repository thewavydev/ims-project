import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  /** Load initial products from backend */
  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  /** Add product (update local state without full reload) */
  addProduct(product: Product): void {
    this.http.post<{ id: number }>(this.apiUrl, product).subscribe(res => {
      const newProduct = { ...product, id: res.id };
      this.productsSubject.next([...this.productsSubject.value, newProduct]);
    });
  }

  /** Update product in API and BehaviorSubject */
  updateProduct(product: Product): void {
    this.http.put(`${this.apiUrl}/${product.id}`, product).subscribe(() => {
      const updated = this.productsSubject.value.map(p =>
        p.id === product.id ? product : p
      );
      this.productsSubject.next(updated);
    });
  }

  /** Delete product from API and BehaviorSubject */
  deleteProduct(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      const filtered = this.productsSubject.value.filter(p => p.id !== id);
      this.productsSubject.next(filtered);
    });
  }

  /** Get current snapshot value (for form pre-fill, etc.) */
  snapshot(): Product[] {
    return this.productsSubject.value;
  }
}
