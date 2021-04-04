import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Templates
import { DefaultTemplateComponent } from './templates/default.template/default.template.component';

// Pages
import { MiningPageComponent } from './pages/mining/mining.page.component';
import { AbyssPageComponent } from './pages/abyss/abyss.page.component';
import { AddAbyssPageComponent } from './pages/abyss/add-abyss/add-abyss.page.component';
import { TradePageComponent } from './pages/trade/trade.page.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultTemplateComponent,
    children: [
      {
        path: 'mining',
        component: MiningPageComponent
      },
      {
        path: 'abyss/add',
        component: AddAbyssPageComponent
      },
      {
        path: 'abyss',
        component: AbyssPageComponent
      },
      {
        path: 'trade',
        component: TradePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
