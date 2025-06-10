export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  status: 'pending' | 'uploading' | 'compressing' | 'compressed' | 'error';
  progress: number;
  originalSize: number;
  compressedSize?: number;
  error?: string;
}
