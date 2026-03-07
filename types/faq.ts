import { ApiResponse } from './response';

export interface Faq {
  question: string;
  answer: string;
  locales: string;
}

export type FaqResponse = ApiResponse<Faq[]>;
