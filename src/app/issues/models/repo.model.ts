export interface IRepoDetails {
  name: string;
  issueCount: number;
  owner: IOwnerDetails;
  [additionalProperties: string]: any;
}

export interface IOwnerDetails {
  id: number;
  login: string;
  [additionalProperties: string]: any;
}
