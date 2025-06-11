
"use client";

import type { ChangeEvent, DragEvent } from "react";
import React, { useState, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UploadCloud, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      // Reset the input value to allow uploading the same file again
      event.target.value = "";
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
    // Check if the leave target is outside the dropzone
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragging) setIsDragging(true); 
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
  
  const handleClickDropzone = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card 
      className={cn(
        "border-2 border-dashed hover:border-primary/80 transition-all duration-300 ease-in-out rounded-xl group",
        isDragging ? "border-primary bg-primary/10 scale-105 shadow-2xl" : "border-border bg-card hover:shadow-lg"
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClickDropzone}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClickDropzone()}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 space-y-6 min-h-[250px]">
        <UploadCloud 
            className={cn(
                "h-16 w-16 sm:h-20 sm:w-20 transition-colors duration-300", 
                isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary/80"
            )} 
        />
        <div className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-semibold font-headline">
            {isDragging ? "Drop JPEGs to Upload!" : "Drag & Drop Your JPEGs Here"}
            </CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-base font-body">
            or click to browse files from your device.
            </CardDescription>
        </div>
        <Button 
            variant="outline" 
            size="lg"
            className={cn(
                "pointer-events-none transition-colors", 
                isDragging ? "border-primary text-primary bg-primary/10" : "group-hover:border-primary/70 group-hover:text-primary/90"
            )}
        >
          Select Files
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg"
          multiple
          onChange={handleFileChange}
          id="file-upload-input"
        />
        <p className="text-xs text-muted-foreground flex items-center justify-center pt-4 font-body">
          <FileImage className="h-4 w-4 mr-2" /> Max 10 files, 10MB each. Only JPEG format accepted.
        </p>
      </CardContent>
    </Card>
  );
}
