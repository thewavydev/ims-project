import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet,RouterLink],
  template: `
    <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div *ngIf="!toggle" class="w-96 bg-blue-500 text-white flex flex-col py-8 px-4">
        <h2 class="text-2xl font-bold mb-8">IMS Menu</h2>
        <nav class="flex flex-col gap-4">
        <a routerLink="/" routerLinkActive="font-bold" class="hover:bg-blue-600 rounded px-3 py-2">Dashboard</a>
      </nav>
      <div class="mt-auto text-xs text-blue-200 pt-8">
        &copy; {{ currentYear }} IMS Project
        </div>
        </div>
        <button (click)="toggleMenu()" class="h-12 bg-blue-500  py-4 px-2 text-white "><span class="material-symbols-outlined">menu</span></button>
        <div class="w-full px-20">
                <div class="w-full flex place-items-center mt-8">
                        <div class="w-1/2">
                        <h1 class="text-3xl font-bold mb-6 text-blue-500">Inventory Management System</h1>
                        </div>
                        <div class="w-1/2 justify-end text-right px-8">
                            <a routerLink="/form" class="bg-blue-500 text-white px-4 py-2 rounded-2xl mb-4 inline-block">
                                Add Product
                            </a>
                        </div>
                    </div>
                <div class="w-full">
                    <div class="w-full">
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </div>
    </div>
  `
})
export class AppComponent {
    toggle = false;
    currentYear = new Date().getFullYear();

    toggleMenu() {
        this.toggle = !this.toggle;
    }
}
