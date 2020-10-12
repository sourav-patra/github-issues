/*
 * __author__ = 'Sourav Prakash Patra'
 * Service dedicated to handle all http requests
 */
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpService implements OnDestroy {
  public apiUrl = "https://api.github.com";
  private destroy$ = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Function to fetch data from a server
   * @param appendedURLParams add additional URL params if present
   * @param params http params
   */
  public fetchData(
    appendedURLParams: string,
    httpParams?: HttpParams
  ): Observable<any> {
    return this.httpClient
      .get<any>(this.apiUrl + appendedURLParams, {
        ...(httpParams && { params: httpParams }),
      })
      .pipe(takeUntil(this.destroy$));
  }
}
