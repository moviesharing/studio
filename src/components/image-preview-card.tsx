
"use client";

import type { ImageFile } from "@/types";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2, CheckCircle2, AlertTriangle, FileImage, Clock3, ArrowRightLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Added for status

interface ImagePreviewCardProps {
  imageFile: ImageFile;
}

function ImagePreviewCardComponent({ imageFile }: ImagePreviewCardProps) {
  const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); 
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
      event.preventDefault();
      handleDragMove(event.touches[0].clientX);
    }
  }, [handleDragMove]);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleDragEnd);
    document.removeEventListener('touchcancel', handleDragEnd);
  }, [handleMouseMove, handleTouchMove]);
  
  const handleDragStart = useCallback(() => {
    if (!imageContainerRef.current) return;
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('touchcancel', handleDragEnd);
  }, [handleMouseMove, handleDragEnd, handleTouchMove]);

  const onMouseDownSlider = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleDragStart();
  };

  const onTouchStartSlider = (event: React.TouchEvent<HTMLDivElement>) => {
     if (event.touches.length === 1) {
      handleDragStart();
    }
  };

  useEffect(() => {
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
      return saved > 0.1 ? `${saved.toFixed(1)}% saved` : (saved < -0.1 ? `${Math.abs(saved).toFixed(1)}% larger` : 'No size change');
    }
    return null;
  }

  const showInteractiveSideBySide = imageFile.status === 'compressed' && internalPreviewUrl && compressedPreviewUrl;

  const statusInfo = {
    pending: { icon: <Clock3 className="h-4 w-4 text-muted-foreground" />, text: "Awaiting Compression", badgeVariant: "outline" as const, textColor: "text-muted-foreground" },
    queued: { icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />, text: "Queued...", badgeVariant: "secondary" as const, textColor: "text-blue-500" },
    compressing: { icon: <Loader2 className="h-4 w-4 animate-spin text-primary" />, text: `Compressing... ${imageFile.progress}%`, badgeVariant: "secondary" as const, textColor: "text-primary" },
    compressed: { icon: <CheckCircle2 className="h-4 w-4 text-green-600" />, text: "Compressed!", badgeVariant: "default" as const, textColor: "text-green-600" },
    error: { icon: <AlertTriangle className="h-4 w-4 text-destructive" />, text: "Error", badgeVariant: "destructive" as const, textColor: "text-destructive" },
    uploading: { icon: <Loader2 className="h-4 w-4 animate-spin text-primary" />, text: "Preparing...", badgeVariant: "secondary" as const, textColor: "text-primary" },
  };
  
  const currentStatus = statusInfo[imageFile.status];

  return (
    <Card className="overflow-hidden shadow-lg flex flex-col bg-card rounded-xl hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative aspect-[4/3] bg-muted/30">
        {showInteractiveSideBySide ? (
          <div ref={imageContainerRef} className="relative w-full h-full select-none overflow-hidden">
            <img
              src={compressedPreviewUrl!}
              alt={`Compressed preview of ${imageFile.file.name}`}
              className="absolute inset-0 w-full h-full object-contain"
              draggable="false"
            />
            <div
              className="absolute inset-0 w-full h-full overflow-hidden" // Added overflow-hidden
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={internalPreviewUrl!}
                alt={`Original preview of ${imageFile.file.name}`}
                className="absolute inset-0 w-full h-full object-contain" // Ensure this is also object-contain
                draggable="false"
              />
            </div>
            <div
              className="absolute top-0 bottom-0 w-1 bg-primary/70 cursor-ew-resize group hover:bg-primary transition-colors duration-150 z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onMouseDown={onMouseDownSlider}
              onTouchStart={onTouchStartSlider}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <ArrowRightLeft className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <Badge variant="outline" className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded select-none pointer-events-none z-20">Original</Badge>
            <Badge variant="outline" className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded select-none pointer-events-none z-20">Compressed</Badge>
          </div>
        ) : internalPreviewUrl ? (
          <div className="w-full h-full flex items-center justify-center p-2">
            <img
              src={internalPreviewUrl}
              alt={`Preview of ${imageFile.file.name}`}
              className="max-w-full max-h-full object-contain transition-opacity duration-300 rounded-md"
              draggable="false"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <FileImage className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-2">
        <CardTitle className="text-base font-semibold truncate mb-1 font-headline" title={imageFile.file.name}>
          {imageFile.file.name}
        </CardTitle>
        <div className="text-xs text-muted-foreground font-body">
          Original: <span className="font-medium text-card-foreground">{formatBytes(imageFile.originalSize)}</span>
        </div>
        {imageFile.status === 'compressed' && imageFile.compressedSize !== undefined && (
          <div className="text-xs font-medium text-green-600 font-body">
            Compressed: <span className="font-semibold">{formatBytes(imageFile.compressedSize)}</span> ({getSavePercentage()})
          </div>
        )}

        <div className="pt-1 space-y-1">
            <div className={`flex items-center text-sm gap-2 font-medium ${currentStatus.textColor}`}>
                {currentStatus.icon}
                <span>{currentStatus.text}</span>
            </div>
            {imageFile.status === 'compressing' && imageFile.progress !== undefined && imageFile.progress > 0 && (
                 <Progress value={imageFile.progress} className="w-full h-1.5 bg-primary/20 [&>div]:bg-primary" />
            )}
            {imageFile.status === 'error' && imageFile.error && (
                <p className="text-xs text-destructive mt-1 break-words">{imageFile.error}</p>
            )}
        </div>

      </CardContent>
      <CardFooter className="p-4 bg-muted/30 border-t">
        {imageFile.status === 'compressed' ? (
          <Button onClick={handleDownload} className="w-full shadow-sm hover:shadow-md transition-shadow" variant="default">
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
