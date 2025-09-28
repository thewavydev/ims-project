import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet,RouterLink],
  template: `
  <div class="w-full px-20">
    <div class="w-full flex place-items-center mt-8">
        <div class="w-1/2">
            <h1 class="text-3xl font-bold mb-6">Product Management</h1>
        </div>
        <div class="w-1/2 justify-end text-right px-8">
            <a routerLink="/form" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                Add Product
            </a>
        </div>
    </div>
    <div class="w-full max-w-3xl mx-auto">
        <div class="">
            <router-outlet></router-outlet>
        </div>
    </div>
    </div>
  `
})
export class AppComponent {}
