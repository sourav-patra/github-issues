import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Params } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http/http.service";
import {
  snakeToCamelCase,
  stringCamelToSnake,
} from "src/app/core/utils/string-utils";
import { IssueItem, IssuesData } from "../../models/issues.model";
import { IRepoDetails } from "../../models/repo.model";

@Injectable({
  providedIn: "root",
})
export class IssuesService implements OnDestroy {
  private loadingDetails$ = new BehaviorSubject<boolean>(false);
  get loadingDetails(): Observable<boolean> {
    return this.loadingDetails$.asObservable();
  }
  private issueLists$ = new BehaviorSubject<IssueItem[]>([]);
  get issueListsObs(): Observable<any[]> {
    return this.issueLists$.asObservable();
  }

  private pages$ = new BehaviorSubject<number[]>([]);
  get pagesObs(): Observable<number[]> {
    return this.pages$.asObservable();
  }

  totalRecords: number;
  currentPageNumber = 1;
  itemsPerPage = 10;
  pageSet = [];
  activeIssueItem: IssueItem;
  private destroy$ = new Subject<boolean>();

  constructor(private httpService: HttpService) {}

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Set the details provided by response in the data stream
   * @param response response from server
   */
  public setIssueLists(response: IssueItem[] = []): void {
    this.issueLists$.next(response);
  }

  /**
   * Set the details provided by response in the data stream
   * @param response response from server
   */
  public setPages(): void {
    if (
      !this.pageSet.length ||
      !this.pageSet.includes(this.currentPageNumber)
    ) {
      this.pageSet = [];
      for (
        let i = this.currentPageNumber;
        i < this.currentPageNumber + 3;
        i++
      ) {
        this.pageSet.push(i);
      }
      this.pages$.next(this.pageSet);
    }
  }

  /**
   * Show loading spinner
   */
  public showLoading(): void {
    this.loadingDetails$.next(true);
  }

  /**
   * Hide loading spinner
   */
  public hideLoading(): void {
    this.loadingDetails$.next(false);
  }

  /**
   * Get the issues details with added parameters if provided
   */
  public getIssuesData(): void {
    this.showLoading();
    this.httpService
      .fetchData(
        `/search/issues?q=repo:angular/angular/node+type:issue+state:open&per_page=${this.itemsPerPage}&page=${this.currentPageNumber}`
      )
      .pipe(
        map((response: unknown) => snakeToCamelCase(response)),
        tap((issueDetails: IssuesData): void => {
          this.totalRecords = issueDetails.totalCount;
          this.setPages();
          this.setIssueLists(issueDetails.items);
        }),
        // retry(3),
        takeUntil(this.destroy$)
      )
      .subscribe({
        // complete: (): void => this.hideLoading(),
        error: (error: HttpErrorResponse): void => {
          this.setIssueLists();
          this.hideLoading();
          // Should ideally be logged via a logger service
          // Or shown gracefully using notifications/toast
          console.log(error);
        },
      });
  }

  /**
   * Fetch Repo Details
   */
  public getRepoDetails(): Observable<IRepoDetails> {
    return this.httpService.fetchData(`/repos/angular/angular`).pipe(
      map((response: unknown) => snakeToCamelCase(response)),
      takeUntil(this.destroy$)
    );
  }

  /**
   * Get details for a particular issue
   * @param issueId number
   */
  public getIssueDetials(issueId: number): Observable<IssueItem> {
    return this.httpService
      .fetchData(`/repos/angular/angular/issues/${issueId}`)
      .pipe(
        map((response: unknown) => snakeToCamelCase(response)),
        tap((issueDetails: IssueItem): void => {
          this.activeIssueItem = issueDetails;
        }),
        // retry(3),
        takeUntil(this.destroy$)
      );
  }
}
