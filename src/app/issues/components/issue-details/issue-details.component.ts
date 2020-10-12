import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { concat, Observable, Subject } from "rxjs";
import { concatMap, takeUntil } from "rxjs/operators";
import { IssueItem } from "../../models/issues.model";
import { IssuesService } from "../../services/issues/issues.service";

@Component({
  selector: "app-issue-details",
  templateUrl: "./issue-details.component.html",
  styleUrls: ["./issue-details.component.scss"],
})
export class IssueDetailsComponent implements OnInit, OnDestroy {
  issueDetails: IssueItem;
  destroy$ = new Subject<boolean>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private issuesService: IssuesService
  ) {}

  /**
   * Fetch id from route params and
   * then display the details
   * TODO: Handle invalid id
   */
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        concatMap(
          (params: Params): Observable<IssueItem> =>
            this.issuesService.getIssueDetials(params.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: IssueItem): void => {
          this.issueDetails = response;
        },
        error: (): void => {},
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
