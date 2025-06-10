"use client";

import type { ChangeEvent, DragEvent } from "react";
import React, { useState, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UploadCloud, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onFilesAdded: (files: File[]) => void;
}

export function ImageUploader({ onFilesAdded }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processFiles(event.target.files);
    }
  };

  const processFiles = useCallback((files: FileList) => {
    const acceptedFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === "image/jpeg") {
        acceptedFiles.push(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a JPEG. Only JPEG images are accepted.`,
          variant: "destructive",
        });
      }
    }
    if (acceptedFiles.length > 0) {
      onFilesAdded(acceptedFiles);
    }
  }, [onFilesAdded, toast]);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragging) setIsDragging(true); // Ensure dragging state is true
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card 
      className={cn(
        "border-2 border-dashed hover:border-primary transition-colors duration-200 ease-in-out",
        isDragging ? "border-primary bg-accent" : "border-border bg-card"
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
    >
      <CardHeader className="items-center text-center">
        <UploadCloud className={cn("h-16 w-16 mb-4", isDragging ? "text-primary" : "text-muted-foreground")} />
        <CardTitle className="text-2xl font-semibold">
          {isDragging ? "Drop JPEGs here" : "Drag & Drop JPEGs"}
        </CardTitle>
        <CardDescription>
          or click to browse files. Max 10 files, 10MB each.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg"
          multiple
          onChange={handleFileChange}
        />
        <p className="text-sm text-muted-foreground flex items-center justify-center">
          <FileImage className="h-4 w-4 mr-2" /> Supported format: JPEG
        </p>
      </CardContent>
    </Card>
  );
}
