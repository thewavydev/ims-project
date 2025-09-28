import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ProductForm } from './app/features/products/product-form/product-form';

import { ProductList } from './app/features/products/product-list/product-list';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ProductList },
      { path: 'form', component: ProductForm },
      { path: 'form/:id', component: ProductForm }
    ])
  ]
}).catch(err => console.error(err));