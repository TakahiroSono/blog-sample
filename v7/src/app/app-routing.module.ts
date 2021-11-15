import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostcardComponent } from './page/postcard/postcard.component';

const routes: Routes = [
  {path: '', redirectTo: '/postcard', pathMatch: 'full'},
  {path: 'postcard', component: PostcardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
