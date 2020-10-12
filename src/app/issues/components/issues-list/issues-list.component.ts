import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IssueItem } from "../../models/issues.model";
import { IssuesService } from "../../services/issues/issues.service";

@Component({
  selector: "app-issues-list",
  templateUrl: "./issues-list.component.html",
  styleUrls: ["./issues-list.component.scss"],
})
export class IssuesListComponent implements OnInit {
  openIssues;
  closedIssues;
  searchIssue;
  public pages$ = this.issuesService.pagesObs;
  public issueDetails = this.issuesService.issueListsObs;
  get currentPageNumber(): number {
    return this.issuesService.currentPageNumber;
  }
  constructor(private issuesService: IssuesService, private router: Router) {}

  /**
   * Fetch issues list
   */
  ngOnInit(): void {
    this.issuesService.getIssuesData();
  }

  /**
   * Display the issue details in a new component
   * @param issueItem issue item selected
   */
  showDetails(issueItem: IssueItem): void {
    this.router.navigate([`/home/issues/${issueItem.number}`]);
  }

  /**
   * Switch to previous page
   */
  public previousPage(): void {
    if (this.issuesService.currentPageNumber > 1) {
      this.issuesService.currentPageNumber -= 1;
      this.issuesService.getIssuesData();
    }
  }

  /**
   * Get details for the selected page
   * @param pageNumber selected page number
   */
  public getDetailsForPage(pageNumber: number): void {
    this.issuesService.currentPageNumber = pageNumber;
    this.issuesService.getIssuesData();
  }

  /**
   * Switch to next page
   */
  public nextPage(): void {
    if (
      this.issuesService.currentPageNumber * 10 <=
      this.issuesService.totalRecords
    ) {
      this.issuesService.currentPageNumber += 1;
      this.issuesService.getIssuesData();
    }
  }
}
