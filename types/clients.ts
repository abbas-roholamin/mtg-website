import { ApiResponse } from './response';

export interface InAction {
  title: string;
  url: string;
}

export type InActionsResponse = ApiResponse<InAction[]>;
