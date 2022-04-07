import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuhnModalComponent } from './luhn-modal/luhn-modal.component';


const routes: Routes = [
  { path: 'luhn-modal', component: LuhnModalComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
