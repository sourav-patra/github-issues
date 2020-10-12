export interface IssueItem {
  number: string;
  title: string;
  id: number;
  body: string;
  [additionalProperties: string]: any;
}

export interface IssuesData {
  totalCount: number;
  items: IssueItem[];
  [additionalProperties: string]: any;
}
