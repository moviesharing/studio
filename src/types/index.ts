
export interface ImageFile {
  id: string;
  file: File; // Original file
  previewUrl: string; // URL for the original file preview
  status: 'pending' | 'uploading' | 'compressing' | 'compressed' | 'error';
  progress: number;
  originalSize: number;
  compressedSize?: number;
  compressedFile?: File; // Compressed file
  error?: string;
}
