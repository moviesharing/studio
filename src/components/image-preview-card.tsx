
"use client";

import type { ImageFile } from "@/types";
import React, { useEffect } from "react";
// import Image from "next/image"; // No longer needed
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2, CheckCircle2, XCircle, FileImage, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePreviewCardProps {
  imageFile: ImageFile;
}

function ImagePreviewCardComponent({ imageFile }: ImagePreviewCardProps) {
  
  useEffect(() => {
    const currentPreviewUrl = imageFile.previewUrl;
    // Ensure the URL is only revoked when the component unmounts
    return () => {
      if (currentPreviewUrl) {
         URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, []); 

  const handleDownload = () => {
    if (imageFile.status === 'compressed' && imageFile.compressedFile) {
      const url = URL.createObjectURL(imageFile.compressedFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageFile.compressedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); 
    } else {
      console.warn("Download attempted on a non-compressed or missing file.");
    }
  };

  const formatBytes = (bytes?: number, decimals = 2) => {
    if (bytes === undefined || bytes === null || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const getSavePercentage = () => {
    if (imageFile.status === 'compressed' && imageFile.compressedSize && imageFile.originalSize > 0) {
      const saved = ((imageFile.originalSize - imageFile.compressedSize) / imageFile.originalSize) * 100;
      return saved > 0 ? `${saved.toFixed(1)}% saved` : 'No significant saving';
    }
    return null;
  }

  return (
    <Card className="overflow-hidden shadow-lg flex flex-col bg-card">
      <CardHeader className="p-0 relative aspect-video">
        {imageFile.previewUrl ? (
          <img
            src={imageFile.previewUrl}
            alt={`Preview of ${imageFile.file.name}`}
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <FileImage className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-base font-semibold truncate mb-1" title={imageFile.file.name}>
          {imageFile.file.name}
        </CardTitle>
        <p className="text-xs text-muted-foreground mb-1">
          Original: {formatBytes(imageFile.originalSize)}
        </p>
        {imageFile.status === 'compressed' && imageFile.compressedSize !== undefined && (
          <p className="text-xs text-green-600 font-medium mb-3">
            Compressed: {formatBytes(imageFile.compressedSize)} ({getSavePercentage()})
          </p>
        )}


        {imageFile.status === 'pending' && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
            Queued...
          </div>
        )}
        {imageFile.status === 'uploading' && ( 
          <div className="flex items-center text-sm text-primary">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing...
          </div>
        )}
        {imageFile.status === 'compressing' && (
          <div>
            <div className="flex items-center text-sm text-primary mb-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Compressing... {imageFile.progress}%
            </div>
            <Progress value={imageFile.progress} className="w-full h-2 bg-primary/20" />
          </div>
        )}
        {imageFile.status === 'compressed' && (
          <div className="text-sm text-green-600">
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Compression Successful!
            </div>
          </div>
        )}
        {imageFile.status === 'error' && (
          <div className="flex items-start text-sm text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0" />
            <div>
             <span className="font-semibold">Error:</span> {imageFile.error || 'Compression failed'}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 border-t">
        {imageFile.status === 'compressed' ? (
          <Button onClick={handleDownload} className="w-full" variant="default">
            <Download className="mr-2 h-4 w-4" />
            Download Compressed
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

export const ImagePreviewCard = React.memo(ImagePreviewCardComponent);
