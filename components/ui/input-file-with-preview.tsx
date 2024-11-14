"use client";

import { useState, useEffect, type Dispatch, type SetStateAction, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./button";
import Slack from "../layout/slack";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  onFileSelect: Dispatch<SetStateAction<File | null>>;
};

export default function InputFile({ onFileSelect }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) {
      setSelectedFile(null);
      onFileSelect(null);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    onFileSelect(selectedFile);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, onFileSelect]);

  return (
    <div className="grid w-full  items-center gap-4">
      <Slack className="w-full" justify="between">
        <Label
          htmlFor="picture"
          className="w-fit p-2 py-4 rounded-md shadow-border-1 hover:bg-muted cursor-pointer transition-colors"
        >
          Profile Picture
        </Label>
        {preview && (
          <div className="mt-4 cursor-pointer relative">
            <Image
              src={preview}
              alt="Preview"
              width={200}
              height={200}
              onClick={() => setOpenDialog(true)}
              className="w-[200px] h-[200px] object-cover rounded-lg shadow-md"
            />
            <button
              type="button"
              onClick={clearImage}
              className="text-white absolute right-2 top-2 bg-white/35 rounded-md p-1"
            >
              <X />
            </button>
          </div>
        )}
      </Slack>

      <Input
        id="picture"
        type="file"
        multiple={false}
        placeholder=""
        accept="image/*"
        onChange={handleFileChange}
        className="absolute -z-50 opacity-0 hidden"
        hidden
      />
      {preview && (
        <Dialog
          open={openDialog}
          onOpenChange={(value) => setOpenDialog(value)}
        >
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] p-0">
            <div className="overflow-auto max-h-[calc(80vh-2rem)] p-6">
              <Image
                src={preview}
                alt="Full size preview"
                width={200}
                height={200}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
