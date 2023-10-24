import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/components/about/about.component';
import { HomeComponent } from 'src/components/home/home.component';
import { DateSearchComponent } from 'src/components/search/date-search/date-search.component';
import { GuestSearchComponent } from 'src/components/search/guest-search/guest-search.component';
import { TagSearchComponent } from 'src/components/search/tag-search/tag-search.component';
import { TitleSearchComponent } from 'src/components/search/title-search/title-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'guests', component: GuestSearchComponent },
  { path: 'titles', component: TitleSearchComponent },
  { path: 'tags', component: TagSearchComponent },
  { path: 'dates', component: DateSearchComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
