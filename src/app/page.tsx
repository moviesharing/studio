
"use client";

import React, { useState, useCallback } from "react";
import type { ImageFile } from "@/types";
import { ImageUploader } from "@/components/image-uploader";
import { ImagePreviewCard } from "@/components/image-preview-card";
import { Button } from "@/components/ui/button";
import { Archive, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import imageCompression from 'browser-image-compression';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;

export default function HomePage() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const { toast } = useToast();

  const updateImageFile = useCallback((id: string, updates: Partial<ImageFile>) => {
    setImageFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === id ? { ...file, ...updates } : file))
    );
  }, []);

  const compressAndProcessImage = useCallback(
    async (fileToProcess: ImageFile) => {
      updateImageFile(fileToProcess.id, { status: "compressing", progress: 0 });

      try {
        const options = {
          maxSizeMB: 2, 
          maxWidthOrHeight: 1920, 
          useWebWorker: true,
          initialQuality: 0.7, 
          alwaysKeepResolution: false, 
          onProgress: (p: number) => {
            updateImageFile(fileToProcess.id, { progress: p });
          },
          fileType: 'image/jpeg', 
        };

        const compressedBlob = await imageCompression(fileToProcess.file, options);
        
        const compressedFile = new File([compressedBlob], `jpegify_${fileToProcess.file.name}`, {
          type: compressedBlob.type,
          lastModified: Date.now(),
        });

        updateImageFile(fileToProcess.id, {
          status: "compressed",
          progress: 100,
          compressedSize: compressedFile.size,
          compressedFile: compressedFile,
        });

        toast({
          title: "Compression Complete",
          description: `${fileToProcess.file.name} has been compressed.`,
        });

      } catch (error) {
        console.error("Compression error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown compression error";
        updateImageFile(fileToProcess.id, {
          status: "error",
          error: errorMessage,
          progress: 0,
        });
        toast({
          title: "Compression Failed",
          description: `${fileToProcess.file.name}: ${errorMessage}`,
          variant: "destructive",
        });
      }
    },
    [updateImageFile, toast]
  );

  const handleFilesAdded = useCallback(
    (files: File[]) => {
      const newImageFiles: ImageFile[] = files
        .filter(file => {
          if (file.size > MAX_FILE_SIZE) {
            toast({
              title: "File too large",
              description: `${file.name} is larger than ${MAX_FILE_SIZE / (1024*1024)}MB and will not be processed.`,
              variant: "destructive",
            });
            return false;
          }
          return true;
        })
        .map((file) => ({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          status: "pending",
          progress: 0,
          originalSize: file.size,
        }));

      if (imageFiles.length + newImageFiles.length > MAX_FILES) {
        toast({
          title: "Too many files",
          description: `You can upload a maximum of ${MAX_FILES} files at a time. Only the first ${MAX_FILES - imageFiles.length} files will be added.`,
          variant: "destructive",
        });
        const filesToActuallyAdd = newImageFiles.slice(0, MAX_FILES - imageFiles.length);
        setImageFiles((prev) => [...prev, ...filesToActuallyAdd]);
        filesToActuallyAdd.forEach(compressAndProcessImage);
        return;
      }
      
      setImageFiles((prev) => [...prev, ...newImageFiles]);
      newImageFiles.forEach(compressAndProcessImage);
    },
    [compressAndProcessImage, toast, imageFiles.length]
  );

  const handleBatchDownload = () => {
    toast({
      title: "Batch Download (Demo)",
      description: "Simulating ZIP download of all compressed images. This feature is for demonstration purposes.",
    });
  };
  
  const allProcessed = imageFiles.length > 0 && imageFiles.every(f => f.status === 'compressed' || f.status === 'error');
  const anyCompressedSuccessfully = imageFiles.some(f => f.status === 'compressed');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto space-y-10">
          <header className="text-center space-y-2">
            <h1 className="text-5xl font-bold font-headline text-primary sm:text-6xl">JPEGify</h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Drag & drop your JPEGs to compress them instantly in your browser.
            </p>
          </header>

          <ImageUploader onFilesAdded={handleFilesAdded} />
          
          <Alert variant="default" className="bg-accent/50 border-primary/30">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary/90">In-Browser Compression</AlertTitle>
            <AlertDescription className="text-primary/80">
              JPEGify compresses images directly in your browser. Your files are not uploaded to any server. The batch download (ZIP) feature is currently a demonstration.
            </AlertDescription>
          </Alert>

          {imageFiles.length > 0 && (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-semibold font-headline">Your Images</h2>
                <Button 
                  onClick={handleBatchDownload} 
                  disabled={!allProcessed || !anyCompressedSuccessfully}
                  size="lg"
                >
                  <Archive className="mr-2 h-5 w-5" />
                  Download All (ZIP Demo)
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imageFiles.map((file) => (
                  <ImagePreviewCard key={file.id} imageFile={file} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        JPEGify &copy; {new Date().getFullYear()}. Built with Next.js, ShadCN UI & Browser Image Compression.
      </footer>
    </div>
  );
}
