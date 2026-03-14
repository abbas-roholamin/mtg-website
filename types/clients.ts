import { ApiResponse } from './response';

export interface Client {
  name: string;
  image: string;
  url: string;
  locale: string;
}

export type ClientsResponse = ApiResponse<Client[]>;
