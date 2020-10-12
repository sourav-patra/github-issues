import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { IssueDetailsComponent } from "./components/issue-details/issue-details.component";
import { IssuesListComponent } from "./components/issues-list/issues-list.component";
import { IssuesHomeComponent } from "./issues-home.component";
import { SpaceXRoutingModule } from "./issues-routing.module";

@NgModule({
  declarations: [
    IssuesHomeComponent,
    IssuesListComponent,
    IssueDetailsComponent,
  ],
  imports: [
    CommonModule,
    SpaceXRoutingModule,
    HttpClientModule,
    // ReactiveFormsModule,
    // FormsModule
  ],
})
export class IssuesModule {}
