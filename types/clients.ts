import { ApiResponse } from './response';

export interface Client {
  name: string;
  url: string;
  image: string;
}

export type ClientsResponse = ApiResponse<Client[]>;
