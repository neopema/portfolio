import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/globals/background/background.component';
import { DarkmodeDirective } from './directives/darkmode.directive';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { LinktreeComponent } from './components/pages/linktree/linktree.component';
import { AboutComponent } from './components/portfolio/about/about.component';
import { ArtComponent } from './components/portfolio/art/art.component';
import { ProjectsComponent } from './components/portfolio/projects/projects.component';
import { WorkComponent } from './components/portfolio/work/work.component';
import { NavComponent } from './components/portfolio/structure/nav/nav.component';
import { WelcomeComponent } from './components/portfolio/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    DarkmodeDirective,
    PortfolioComponent,
    LinktreeComponent,
    AboutComponent,
    ArtComponent,
    ProjectsComponent,
    WorkComponent,
    NavComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
