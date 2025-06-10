
"use client";

import React, { useState, useCallback, useEffect } from "react";
import type { ImageFile } from "@/types";
import { ImageUploader } from "@/components/image-uploader";
import { ImagePreviewCard } from "@/components/image-preview-card";
import { Button } from "@/components/ui/button";
import { Archive, Info, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;
const MAX_CONCURRENT_COMPRESSIONS = 3;

export default function JPEGifyAppPage() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [compressionQuality, setCompressionQuality] = useState(0.7);
  const [activeCompressions, setActiveCompressions] = useState(0);
  const { toast } = useToast();

  const updateImageFile = useCallback((id: string, updates: Partial<ImageFile>) => {
    setImageFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === id ? { ...file, ...updates } : file))
    );
  }, []);

  const doCompressImage = useCallback(
    async (fileToProcess: ImageFile) => {
      updateImageFile(fileToProcess.id, { status: "compressing", progress: 0 });

      try {
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: compressionQuality,
          alwaysKeepResolution: false,
          onProgress: (p: number) => {
            updateImageFile(fileToProcess.id, { progress: p });
          },
          fileType: 'image/jpeg',
        };

        const compressedBlob = await imageCompression(fileToProcess.file, options);

        const compressedFile = new File([compressedBlob], fileToProcess.file.name, {
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
      } finally {
        setActiveCompressions((prev) => Math.max(0, prev - 1));
      }
    },
    [updateImageFile, toast, compressionQuality]
  );
  
  useEffect(() => {
    let slotsToFill = MAX_CONCURRENT_COMPRESSIONS - activeCompressions;
    if (slotsToFill <= 0 || imageFiles.every(f => f.status !== 'pending')) return;

    const pendingFiles = imageFiles.filter(f => f.status === 'pending');
    const filesToStartNow = pendingFiles.slice(0, slotsToFill);

    if (filesToStartNow.length > 0) {
      setActiveCompressions(prev => prev + filesToStartNow.length);
      filesToStartNow.forEach(file => {
        updateImageFile(file.id, { status: 'queued' });
        // Call doCompressImage asynchronously to allow state update to propagate
        setTimeout(() => doCompressImage(file), 0);
      });
    }
  }, [imageFiles, activeCompressions, doCompressImage, updateImageFile]);


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
          description: `You can upload a maximum of ${MAX_FILES} files at a time. Only the first ${MAX_FILES - imageFiles.length} of the new files will be added.`,
          variant: "destructive",
        });
        const filesToActuallyAdd = newImageFiles.slice(0, Math.max(0, MAX_FILES - imageFiles.length));
        setImageFiles((prev) => [...prev, ...filesToActuallyAdd]);
        return;
      }

      setImageFiles((prev) => [...prev, ...newImageFiles]);
    },
    [toast, imageFiles.length]
  );

  const handleBatchDownload = async () => {
    const compressedFilesToDownload = imageFiles.filter(
      (f) => f.status === "compressed" && f.compressedFile
    );

    if (compressedFilesToDownload.length === 0) {
      toast({
        title: "No Compressed Images",
        description: "There are no successfully compressed images to download.",
        variant: "default",
      });
      return;
    }

    toast({
      title: "Preparing ZIP...",
      description: `Zipping ${compressedFilesToDownload.length} compressed images. This may take a moment.`,
    });

    const zip = new JSZip();
    compressedFilesToDownload.forEach((imageFile) => {
      if (imageFile.compressedFile) {
        zip.file(imageFile.compressedFile.name, imageFile.compressedFile);
      }
    });

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = 'jpegify_compressed_images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      toast({
        title: "Download Started",
        description: "Your ZIP file should begin downloading shortly.",
      });
    } catch (error) {
      console.error("Error creating ZIP file:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "ZIP Creation Failed",
        description: `Could not create ZIP file: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  const anyCompressedSuccessfully = imageFiles.some(f => f.status === 'compressed');
  const processingInProgress = activeCompressions > 0 || imageFiles.some(f => f.status === 'pending' || f.status === 'queued' || f.status === 'compressing');


  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto space-y-10">
          <header className="text-center space-y-2">
            <h1 className="text-5xl font-bold font-headline text-primary sm:text-6xl">Compress JPEGs</h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Drag & drop your JPEGs to compress them instantly in your browser.
            </p>
          </header>

          <ImageUploader onFilesAdded={handleFilesAdded} />

          <Card className="bg-card shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Compression Settings</CardTitle>
              <CardDescription>
                Adjust the desired quality for image compression. This setting applies to newly uploaded images.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="qualitySlider" className="text-base font-medium text-foreground/90">
                    JPEG Quality
                  </Label>
                  <span className="text-sm font-semibold text-primary tabular-nums">
                    {Math.round(compressionQuality * 100)}%
                  </span>
                </div>
                <Slider
                  id="qualitySlider"
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  value={[compressionQuality]}
                  onValueChange={(value) => setCompressionQuality(value[0])}
                  className="w-full"
                  aria-label={`Compression quality ${Math.round(compressionQuality * 100)}%`}
                />
                <p className="text-xs text-muted-foreground">
                  Lower values result in smaller file sizes but may reduce image quality. Higher values retain more quality but result in larger files.
                </p>
              </div>
            </CardContent>
          </Card>

          <Alert variant="default" className="bg-accent/50 border-primary/30">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary/90">In-Browser Compression</AlertTitle>
            <AlertDescription className="text-primary/80">
              JPEGify compresses images directly in your browser. Your files are not uploaded to any server.
            </AlertDescription>
          </Alert>

          {imageFiles.length > 0 && (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-semibold font-headline">Your Images</h2>
                <Button
                  onClick={handleBatchDownload}
                  disabled={!anyCompressedSuccessfully || processingInProgress}
                  size="lg"
                >
                  {processingInProgress ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Archive className="mr-2 h-5 w-5" />
                  )}
                  {processingInProgress ? 'Processing...' : (anyCompressedSuccessfully ? 'Download All Compressed' : 'No Images Compressed')}
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
        JPEGify &copy; {new Date().getFullYear()}.
      </footer>
    </div>
  );
}
