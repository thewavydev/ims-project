import { Component, OnInit  } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductStateService, Product } from '../../../services/product-state.service';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterModule],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private state: ProductStateService, private router: Router) {}

  ngOnInit(): void {
    this.products$ = this.state.products$;
    this.state.loadProducts(); // initial fetch
  }

  edit(product: Product) {
    this.router.navigate(['/form', product.id]);
  }

  delete(id?: number) {
    if (!id) return;
    if (confirm('Delete this product?')) {
      this.state.deleteProduct(id);
    }
  }
}
