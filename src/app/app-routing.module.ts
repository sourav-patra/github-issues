import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IssuesModule } from "./issues/issues.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: (): Promise<IssuesModule> =>
      import("./issues/issues.module").then((m) => m.IssuesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
