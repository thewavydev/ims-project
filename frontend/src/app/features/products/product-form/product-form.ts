import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductStateService, Product } from '../../../services/product-state.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // <-- ✅ must import this for [formGroup], formControlName etc.
  ],
  templateUrl: './product-form.html',
  // styleUrls: ['./product-form.css'] // <-- should be plural `styleUrls`
})
export class ProductForm implements OnInit {
  form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(
    private state: ProductStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const product = this.state.snapshot().find(p => p.id === id);
      if (product) {
        this.form.patchValue(product);
      } else {
        // fallback: reload if not in snapshot
        this.state.loadProducts();
        this.state.products$.subscribe(list => {
          const p = list.find(x => x.id === id);
          if (p) this.form.patchValue(p);
        });
      }
    }
  }

  submit() {
    if (this.form.invalid) return;
    const val = this.form.value as Product;
    if (val.id) {
      this.state.updateProduct(val);
    } else {
      this.state.addProduct(val);
    }
    this.router.navigate(['/']);
  }
}
