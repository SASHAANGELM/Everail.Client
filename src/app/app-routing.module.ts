import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Templates
import { DefaultTemplateComponent } from './templates/default.template/default.template.component';

// Pages
import { MiningPageComponent } from './pages/mining.page/mining.page.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultTemplateComponent,
    children: [
      {
        path: 'mining',
        component: MiningPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
