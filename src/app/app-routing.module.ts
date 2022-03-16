import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';

const routes: Routes = [
  {
    path: 'restaurants', component: RestaurantsComponent
  },
  {
    path: 'catalog', component: CatalogComponent
  },
  { path: '**', redirectTo: '/restaurants', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
