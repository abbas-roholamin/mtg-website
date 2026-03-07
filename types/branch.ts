import { ApiResponse } from './response';

export interface Branch {
  address: string;
  country: string;
  email: string;
  phones: Array<string>;
  map_embed_code: string;
}

export type BranchResponse = ApiResponse<Branch[]>;
