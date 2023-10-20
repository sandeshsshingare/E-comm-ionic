import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthPageModule),
          data:{canReuse:false}
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./../settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      // {
      //   path: 'tab2',
      //   loadChildren: () =>
      //     import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      // },
      // {
      //   path: 'tab3',
      //   loadChildren: () =>
      //     import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      // },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
