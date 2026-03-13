import { ApiResponse } from './response';

export interface Image {
  id: string;
  image: string;
  featured: boolean;
}

export type GalleryResponse = ApiResponse<Image[]>;
