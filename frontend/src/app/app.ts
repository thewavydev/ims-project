import { Component } from '@angular/core';
import { ProductForm } from './features/products/product-form/product-form';
import { ProductList } from './features/products/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductForm, ProductList],
  template: `
    <app-product-form></app-product-form>
    <app-product-list></app-product-list>
  `
})
export class App {}