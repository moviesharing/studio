
"use client";

import React, { useState, useCallback, useEffect } from "react";
import type { ImageFile } from "@/types";
import { ImageUploader } from "@/components/image-uploader";
import { ImagePreviewCard } from "@/components/image-preview-card";
import { Button } from "@/components/ui/button";
import { Archive, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function HomePage() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const { toast } = useToast();

  const updateImageFile = useCallback((id: string, updates: Partial<ImageFile>) => {
    setImageFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === id ? { ...file, ...updates } : file))
    );
  }, []);

  const simulateCompression = useCallback((fileToProcess: ImageFile) => {
    // Simulate uploading
    setTimeout(() => {
      updateImageFile(fileToProcess.id, { status: "uploading" });
    }, 100);

    // Simulate compressing
    setTimeout(() => {
      updateImageFile(fileToProcess.id, { status: "compressing", progress: 0 });
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 10) + 5; // Random progress
        if (currentProgress >= 100) {
          clearInterval(interval);
          updateImageFile(fileToProcess.id, {
            status: "compressed",
            progress: 100,
            compressedSize: Math.floor(fileToProcess.originalSize * (Math.random() * 0.4 + 0.3)), // Compress to 30-70%
          });
          toast({
            title: "Compression Complete",
            description: `${fileToProcess.file.name} has been compressed.`,
          });
        } else {
          updateImageFile(fileToProcess.id, { progress: currentProgress });
        }
      }, 200 + Math.random() * 300); // Random interval
    }, 1000 + Math.random() * 500); // Random start time for compression
  }, [updateImageFile, toast]);

  const handleFilesAdded = useCallback((files: File[]) => {
      const newImageFiles: ImageFile[] = files.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        status: "pending",
        progress: 0,
        originalSize: file.size,
      }));
      
      const updatedFiles = [...imageFiles, ...newImageFiles];
      // Basic check for too many files (example limit)
      if (updatedFiles.length > 10) {
        toast({
          title: "Too many files",
          description: "You can upload a maximum of 10 files at a time.",
          variant: "destructive",
        });
        // Only add up to the limit
        const filesToAdd = newImageFiles.slice(0, 10 - imageFiles.length);
        setImageFiles(prev => [...prev, ...filesToAdd]);
        filesToAdd.forEach(simulateCompression);
        return;
      }
      
      // Basic check for file size (example limit 5MB)
      const largeFiles = newImageFiles.filter(f => f.originalSize > 5 * 1024 * 1024);
      if (largeFiles.length > 0) {
        largeFiles.forEach(f => {
          toast({
            title: "File too large",
            description: `${f.file.name} is larger than 5MB and will not be processed.`,
            variant: "destructive",
          });
        });
        const filesToProcess = newImageFiles.filter(f => f.originalSize <= 5 * 1024 * 1024);
        setImageFiles(prev => [...prev, ...filesToProcess]);
        filesToProcess.forEach(simulateCompression);
        return;
      }

      setImageFiles(prev => [...prev, ...newImageFiles]);
      newImageFiles.forEach(simulateCompression);
    },
    [simulateCompression, toast, imageFiles]
  );

  const handleBatchDownload = () => {
    toast({
      title: "Batch Download",
      description: "Simulating ZIP download of all compressed images. This feature is for demonstration.",
    });
    // Actual ZIP creation would require a library like JSZip and more complex logic
  };

  const isCompressingAny = imageFiles.some(
    (f) => f.status === "compressing" || f.status === "uploading" || f.status === "pending"
  );
  
  const allCompressed = imageFiles.length > 0 && imageFiles.every(f => f.status === 'compressed' || f.status === 'error');

  // Removed the useEffect for imageFiles cleanup as ImagePreviewCard now handles its own URL revocation.

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto space-y-10">
          <header className="text-center space-y-2">
            <h1 className="text-5xl font-bold font-headline text-primary sm:text-6xl">JPEGify</h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Drag & drop your JPEGs to compress them instantly.
            </p>
          </header>

          <ImageUploader onFilesAdded={handleFilesAdded} />
          
          <Alert variant="default" className="bg-accent/50 border-primary/30">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary/90">Demonstration Purpose</AlertTitle>
            <AlertDescription className="text-primary/80">
              This app simulates image compression. Uploaded images are not actually sent to a server or modified. Downloaded files will be the originals.
            </AlertDescription>
          </Alert>

          {imageFiles.length > 0 && (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-semibold font-headline">Your Images</h2>
                <Button 
                  onClick={handleBatchDownload} 
                  disabled={!allCompressed || imageFiles.filter(f => f.status === 'compressed').length === 0}
                  size="lg"
                >
                  <Archive className="mr-2 h-5 w-5" />
                  Download All (ZIP)
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
        JPEGify &copy; {new Date().getFullYear()}. Built with Next.js & ShadCN UI.
      </footer>
    </div>
  );
}
