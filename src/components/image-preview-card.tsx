
"use client";

import type { ImageFile } from "@/types";
import React, { useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2, CheckCircle2, XCircle, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePreviewCardProps {
  imageFile: ImageFile;
}

export function ImagePreviewCard({ imageFile }: ImagePreviewCardProps) {
  
  useEffect(() => {
    // Clean up object URL only when component unmounts
    const currentPreviewUrl = imageFile.previewUrl;
    return () => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, []); // Empty dependency array ensures cleanup only on unmount

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageFile.previewUrl; // For mock, download original/preview
    link.download = `compressed_${imageFile.file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <Card className="overflow-hidden shadow-lg flex flex-col">
      <CardHeader className="p-0 relative aspect-video">
        {imageFile.previewUrl ? (
          <Image
            src={imageFile.previewUrl}
            alt={`Preview of ${imageFile.file.name}`}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <FileImage className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-base font-medium truncate mb-1" title={imageFile.file.name}>
          {imageFile.file.name}
        </CardTitle>
        <p className="text-xs text-muted-foreground mb-3">
          Original: {formatBytes(imageFile.originalSize)}
        </p>

        {imageFile.status === 'pending' && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
            Waiting to process...
          </div>
        )}
        {imageFile.status === 'uploading' && (
          <div className="flex items-center text-sm text-primary">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </div>
        )}
        {imageFile.status === 'compressing' && (
          <div>
            <div className="flex items-center text-sm text-primary mb-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Compressing... {imageFile.progress}%
            </div>
            <Progress value={imageFile.progress} className="w-full h-2" />
          </div>
        )}
        {imageFile.status === 'compressed' && (
          <div className="text-sm text-green-600">
            <div className="flex items-center mb-1">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Compressed!
            </div>
            <p className="text-xs text-muted-foreground">
              New size: {imageFile.compressedSize ? formatBytes(imageFile.compressedSize) : 'N/A'}
            </p>
          </div>
        )}
        {imageFile.status === 'error' && (
          <div className="flex items-center text-sm text-destructive">
            <XCircle className="mr-2 h-5 w-5" />
            Error: {imageFile.error || 'Compression failed'}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        {imageFile.status === 'compressed' ? (
          <Button onClick={handleDownload} className="w-full" variant="default">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        ) : (
          <Button className="w-full" variant="outline" disabled>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
