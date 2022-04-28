import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetayPage } from './detay.page';

const routes: Routes = [
  {
    path: '',
    component: DetayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetayPageRoutingModule {}
