
"use client";

import type { ImageFile } from "@/types";
import React, { useState, useEffect, useRef, useCallback } from "react";
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

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage
  const isDraggingRef = useRef(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (imageFile?.file) {
      objectUrl = URL.createObjectURL(imageFile.file);
      setInternalPreviewUrl(objectUrl);
    } else {
      setInternalPreviewUrl(null);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (!imageFile?.file) setInternalPreviewUrl(null);
    };
  }, [imageFile?.file]);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (imageFile?.compressedFile) {
      objectUrl = URL.createObjectURL(imageFile.compressedFile);
      setCompressedPreviewUrl(objectUrl);
    } else {
      setCompressedPreviewUrl(null);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (!imageFile?.compressedFile) setCompressedPreviewUrl(null);
    };
  }, [imageFile?.compressedFile]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    let newX = clientX - rect.left;
    let newPosition = (newX / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    handleDragMove(event.clientX);
  }, [handleDragMove]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length === 1) {
      // Prevent page scroll while dragging slider
      event.preventDefault();
      handleDragMove(event.touches[0].clientX);
    }
  }, [handleDragMove]);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleDragEnd);
    window.removeEventListener('touchcancel', handleDragEnd);
  }, [handleMouseMove, handleTouchMove]);
  
  const handleDragStart = useCallback(() => {
    if (!imageContainerRef.current) return;
    isDraggingRef.current = true;
    // Add global listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
    window.addEventListener('touchcancel', handleDragEnd);
  }, [handleMouseMove, handleDragEnd, handleTouchMove]);

  const onMouseDownSlider = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleDragStart();
  };

  const onTouchStartSlider = (event: React.TouchEvent<HTMLDivElement>) => {
     if (event.touches.length === 1) {
      // event.preventDefault(); // Already handled in handleTouchMove's options and logic
      handleDragStart();
    }
  };

  useEffect(() => {
    // Cleanup global event listeners if the component unmounts while dragging
    return () => {
      if (isDraggingRef.current) {
        handleDragEnd();
      }
    };
  }, [handleDragEnd]);


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

  const showInteractiveSideBySide = imageFile.status === 'compressed' && internalPreviewUrl && compressedPreviewUrl;

  return (
    <Card className="overflow-hidden shadow-lg flex flex-col bg-card">
      <CardHeader className="p-0 relative aspect-video"> {/* Removed flex flex-row for interactive slider */}
        {showInteractiveSideBySide ? (
          <div ref={imageContainerRef} className="relative w-full h-full select-none overflow-hidden">
            {/* Compressed image (bottom layer) */}
            <img
              src={compressedPreviewUrl!}
              alt={`Compressed preview of ${imageFile.file.name}`}
              className="absolute inset-0 w-full h-full object-contain"
              draggable="false"
            />
            {/* Original image (top layer, clipped) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={internalPreviewUrl!}
                alt={`Original preview of ${imageFile.file.name}`}
                className="absolute inset-0 w-full h-full object-contain"
                draggable="false"
              />
            </div>

            {/* Draggable Slider Line/Handle */}
            <div
              className="absolute top-0 bottom-0 w-1.5 bg-primary/70 cursor-ew-resize group hover:bg-primary transition-colors duration-150"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onMouseDown={onMouseDownSlider}
              onTouchStart={onTouchStartSlider}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary shadow-md flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M8 14l-4-4 4-4M16 10l4 4-4 4"/></svg>
              </div>
            </div>
             {/* Labels */}
            <p className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded select-none pointer-events-none z-10">Original</p>
            <p className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded select-none pointer-events-none z-10">Compressed</p>
          </div>
        ) : internalPreviewUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={internalPreviewUrl}
              alt={`Preview of ${imageFile.file.name}`}
              className="max-w-full max-h-full object-contain transition-opacity duration-300"
              draggable="false"
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
