import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          {path: 'dashboard', component: DashboardComponent},
        //   {path: 'progress',  component: ProgressComponent },
        //   {path: 'graficas',  component: Graficas1Component },
        //   {path: 'account-settings',  component: AccountSettingsComponent },

          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

        ]
    },
    ];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)