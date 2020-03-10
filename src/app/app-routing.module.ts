import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BlocksComponent } from './pages/blocks/blocks.component';
import { TableComponent } from './pages/table/table.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'blocks', pathMatch: 'full', component: BlocksComponent },
  { path: 'table', component: TableComponent },
  { path: 'detail', component: DetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
