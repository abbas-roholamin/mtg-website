import { ApiResponse } from './response';

export interface Setting {
  name: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
  whats_app: string;
  about: string;
  meta_title: string;
  meta_description: string;
  logo: string;
}

export type SettingsResponse = ApiResponse<Setting>;
