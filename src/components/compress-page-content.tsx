
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import AdSenseAdUnit from "@/components/adsense-ad-unit";


const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;
const MAX_CONCURRENT_COMPRESSIONS = 3;

type PresetValue = "custom" | "balanced" | "max_compression" | "high_quality";
type ResolutionValue = "original" | "1920" | "1280" | "1024";

interface PresetConfig {
  quality: number;
  resolution: ResolutionValue;
}

const presetConfigs: Record<Exclude<PresetValue, "custom">, PresetConfig> = {
  balanced: { quality: 0.7, resolution: "1920" },
  max_compression: { quality: 0.5, resolution: "1280" },
  high_quality: { quality: 0.85, resolution: "original" },
};

export function CompressPageContent() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [activeCompressions, setActiveCompressions] = useState(0);
  const { toast } = useToast();

  const [selectedPreset, setSelectedPreset] = useState<PresetValue>("balanced");
  const [compressionQuality, setCompressionQuality] = useState<number>(presetConfigs.balanced.quality);
  const [targetResolution, setTargetResolution] = useState<ResolutionValue>(presetConfigs.balanced.resolution);
  const [removeMetadata, setRemoveMetadata] = useState<boolean>(true);


  useEffect(() => {
    if (selectedPreset !== "custom") {
      const config = presetConfigs[selectedPreset];
      setCompressionQuality(config.quality);
      setTargetResolution(config.resolution);
    }
  }, [selectedPreset]);

  const handleQualityChange = (value: number[]) => {
    setCompressionQuality(value[0]);
    setSelectedPreset("custom");
  };

  const handleResolutionChange = (value: ResolutionValue) => {
    setTargetResolution(value);
    setSelectedPreset("custom");
  };

  const updateImageFile = useCallback((id: string, updates: Partial<ImageFile>) => {
    setImageFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === id ? { ...file, ...updates } : file))
    );
  }, []);

  const doCompressImage = useCallback(
    async (fileToProcess: ImageFile) => {
      updateImageFile(fileToProcess.id, { status: "compressing", progress: 0 });

      try {
        const options: imageCompression.Options = {
          maxSizeMB: 5, 
          useWebWorker: true,
          initialQuality: compressionQuality,
          onProgress: (p: number) => {
            updateImageFile(fileToProcess.id, { progress: p });
          },
          fileType: 'image/jpeg',
        };
        
        if (removeMetadata) {
          // browser-image-compression generally strips most metadata by default.
        }


        if (targetResolution === "original") {
          options.alwaysKeepResolution = true;
        } else {
          options.alwaysKeepResolution = false;
          options.maxWidthOrHeight = parseInt(targetResolution, 10);
        }
        
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
    [updateImageFile, toast, compressionQuality, targetResolution, removeMetadata] 
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
              Drag &amp; drop your JPEGs to compress them instantly in your browser with fine-tuned settings.
            </p>
          </header>

          <ImageUploader onFilesAdded={handleFilesAdded} />
          
          {anyCompressedSuccessfully && (
            <AdSenseAdUnit
              adClient="ca-pub-0000000000000000" 
              adSlot="0000000000"      
              adFormat="auto"
              fullWidthResponsive={true}
            />
          )}

          <Card className="bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Compression Settings</CardTitle>
              <CardDescription>
                Adjust the desired quality, resolution, and other options for image compression. Settings apply to newly uploaded images.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <Label htmlFor="presetSelector" className="text-base font-medium text-foreground/90">
                    Preset
                  </Label>
                  <Select value={selectedPreset} onValueChange={(value: PresetValue) => setSelectedPreset(value)}>
                    <SelectTrigger id="presetSelector" className="w-full">
                      <SelectValue placeholder="Select a preset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced (Good quality, good compression)</SelectItem>
                      <SelectItem value="max_compression">Max Compression (Smallest size)</SelectItem>
                      <SelectItem value="high_quality">High Quality (Best quality, larger size)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="resolutionSelector" className="text-base font-medium text-foreground/90">
                    Target Resolution (longest edge)
                  </Label>
                  <Select value={targetResolution} onValueChange={handleResolutionChange}>
                    <SelectTrigger id="resolutionSelector" className="w-full">
                      <SelectValue placeholder="Select target resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original">Original Resolution</SelectItem>
                      <SelectItem value="1920">Full HD (1920px)</SelectItem>
                      <SelectItem value="1280">HD (1280px)</SelectItem>
                      <SelectItem value="1024">Web Standard (1024px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedPreset === "custom" && (
                <div className="space-y-3 pt-4 border-t border-border">
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
                    step={0.01} 
                    value={[compressionQuality]}
                    onValueChange={handleQualityChange}
                    className="w-full"
                    aria-label={`Compression quality ${Math.round(compressionQuality * 100)}%`}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower values mean smaller files but lower quality. Higher values mean better quality but larger files. Manually adjusting this sets Preset to Custom.
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label className="text-base font-medium text-foreground/90">Advanced Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeMetadata"
                    checked={removeMetadata}
                    onCheckedChange={(checked) => setRemoveMetadata(checked as boolean)}
                  />
                  <Label htmlFor="removeMetadata" className="text-sm font-normal text-foreground/80 cursor-pointer">
                    Attempt to remove image metadata (e.g., EXIF data)
                  </Label>
                </div>
                 <p className="text-xs text-muted-foreground pl-6">
                  Helps reduce file size further. Most metadata is removed by default during compression.
                </p>
              </div>
            </CardContent>
          </Card>

          <Alert variant="default" className="bg-accent/50 border-primary/30">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary/90">In-Browser Compression</AlertTitle>
            <AlertDescription className="text-primary/80">
              JPEGify compresses images directly in your browser. Your files are not uploaded to any server, ensuring privacy.
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
    </div>
  );
}
