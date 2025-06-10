
"use client";

import type { ImageFile } from "@/types";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2, CheckCircle2, AlertTriangle, FileImage } from "lucide-react";

interface ImagePreviewCardProps {
  imageFile: ImageFile;
}

function ImagePreviewCardComponent({ imageFile }: ImagePreviewCardProps) {
  const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (imageFile?.file) {
      objectUrl = URL.createObjectURL(imageFile.file);
      setInternalPreviewUrl(objectUrl);
    } else {
      setInternalPreviewUrl(null); // Ensure cleanup if file becomes null
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      // Set to null on unmount or if file changes and new URL isn't generated
      // This helps if the component re-renders without a file prop initially
      if (!imageFile?.file) setInternalPreviewUrl(null);
    };
  }, [imageFile?.file]);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (imageFile?.compressedFile) {
      objectUrl = URL.createObjectURL(imageFile.compressedFile);
      setCompressedPreviewUrl(objectUrl);
    } else {
      setCompressedPreviewUrl(null); // Ensure cleanup
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      if (!imageFile?.compressedFile) setCompressedPreviewUrl(null);
    };
  }, [imageFile?.compressedFile]);


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

  const showSideBySide = imageFile.status === 'compressed' && internalPreviewUrl && compressedPreviewUrl;

  return (
    <Card className="overflow-hidden shadow-lg flex flex-col bg-card">
      <CardHeader className="p-0 relative aspect-video flex flex-row">
        {showSideBySide ? (
          <>
            <div className="w-1/2 h-full relative flex flex-col items-center justify-center border-r border-border">
              <p className="absolute top-1 left-1 text-xs bg-black/50 text-white px-1 py-0.5 rounded">Original</p>
              <img
                src={internalPreviewUrl!}
                alt={`Original preview of ${imageFile.file.name}`}
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
              />
            </div>
            <div className="w-1/2 h-full relative flex flex-col items-center justify-center">
               <p className="absolute top-1 left-1 text-xs bg-black/50 text-white px-1 py-0.5 rounded">Compressed</p>
              <img
                src={compressedPreviewUrl!}
                alt={`Compressed preview of ${imageFile.file.name}`}
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
              />
            </div>
          </>
        ) : internalPreviewUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={internalPreviewUrl}
              alt={`Preview of ${imageFile.file.name}`}
              className="max-w-full max-h-full object-contain transition-opacity duration-300"
            />
          </div>
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary/70" />
            Pending...
          </div>
        )}
        {imageFile.status === 'queued' && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary/80" />
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

