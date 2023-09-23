import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { AboutComponent } from './components/portfolio/about/about.component';
import { WorkComponent } from './components/portfolio/work/work.component';
import { ArtComponent } from './components/portfolio/art/art.component';
import { ProjectsComponent } from './components/portfolio/projects/projects.component';
import { LinktreeComponent } from './components/pages/linktree/linktree.component';
import { WelcomeComponent } from './components/portfolio/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', 
    component: PortfolioComponent,
    children: 
    [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'about', 
        component: AboutComponent
      },
      {
        path: 'work', 
        component: WorkComponent
      },
      {
        path: 'art', 
        component: ArtComponent
      },
      {
        path: 'projects', 
        component: ProjectsComponent
      },
    ]
  },
  {
    path: 'linktree',
    component: LinktreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
