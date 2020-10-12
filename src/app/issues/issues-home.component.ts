import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IRepoDetails } from "./models/repo.model";
import { IssuesService } from "./services/issues/issues.service";

@Component({
  selector: "app-issues-home",
  templateUrl: "./issues-home.component.html",
  styleUrls: ["./issues-home.component.scss"],
})
export class IssuesHomeComponent implements OnInit, OnDestroy {
  repoOwner: string;
  repoName: string;
  destroy$ = new Subject<boolean>();
  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.issuesService
      .getRepoDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: IRepoDetails): void => {
          this.repoName = response.name;
          this.repoOwner = response.owner?.login;
        },
      });
  }

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
