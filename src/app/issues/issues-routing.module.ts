import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IssueDetailsComponent } from "./components/issue-details/issue-details.component";
import { IssuesListComponent } from "./components/issues-list/issues-list.component";
import { IssuesHomeComponent } from "./issues-home.component";

const routes: Routes = [
  {
    path: "home",
    component: IssuesHomeComponent,
    children: [
      {
        path: "",
        redirectTo: "issues",
        pathMatch: "full",
      },
      {
        path: "issues",
        component: IssuesListComponent,
      },
      {
        path: "issues/:id",
        component: IssueDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceXRoutingModule {}
