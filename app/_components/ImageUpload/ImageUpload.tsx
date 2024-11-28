/* eslint-disable @next/next/no-img-element */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import imageCompression from "browser-image-compression";
import { EyeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import { uploadSingleFile } from "@/app/_utils/firebase";
interface Image {
  preview: string;
  file: File;
  key?: string;
}

interface ImageUploadProps {
  text?: string;
  subText?: string;
  subSubText?: string;
  maxFiles?: number;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
  fieldName: string;
  type: "image" | "other";
  coverImageEnabled?: boolean;
  draggable?: boolean;
  compressImage?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  text = "Upload Profile Picture",
  subText,
  subSubText,
  maxFiles = 1,
  setValue, fieldName, errors,
  coverImageEnabled = false,

  compressImage = true,
}) => {
  const [images, setImages] = useState<(Image | string)[]>([]);
  const [titleImage, setTitleImage] = useState<Image | string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      setTitleImage(images[0]);
    }
  }, [images]);

  const handleFileSelect = async (acceptedFiles: File[]) => {
    let validFiles = acceptedFiles.slice(0, maxFiles - images.length);

    const updatedImages = await Promise.all(
      validFiles.map(async (file: File) => {
        if (file.type.startsWith("image") && compressImage) {
          const compressedFile = await imageCompression(file, { maxWidthOrHeight: 1920 });
          return { preview: URL.createObjectURL(compressedFile), file: compressedFile };
        }
        return { preview: URL.createObjectURL(file), file };
      })
    );

    // Firebase Upload: Add progress tracking and URL generation
    updatedImages.forEach(async (imageObj) => {
      const { file } = imageObj;
      const folderName = "uploads"; // Change folder name if needed
      const setProgress = (progress: number) => {
        console.log(`Upload Progress: ${progress}%`); // You can replace this with a UI progress indicator
      };
      const urlSetter = (url: string) => {
        setImages((prev) => [...prev, url]); // Update the images with Firebase URL
        setValue(
          fieldName,
          [...images.map((img) => (typeof img === "string" ? img : img.preview)), url] // Set value with new URL
        );
      };

      uploadSingleFile({ file, folderName, setProgress, urlSetter });
    });
  };


  const handleFileDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue(
      fieldName,
      newImages.length
        ? newImages.map((img) => {
          if (typeof img === "string") {
            return img;
          }
          return img.file;
        })
        : null
    );
  };

  const handleCoverImage = (image: Image | string) => {
    if (coverImageEnabled) {
      setTitleImage(image);
      // Swap the first image with the selected image
      const updatedImages = [...images];
      const index = updatedImages.findIndex((img) => img === image);
      updatedImages.splice(index, 1);
      updatedImages.unshift(image);

      setImages(updatedImages);
      setValue(
        fieldName,
        updatedImages.map((img) => {
          if (typeof img === "string") {
            return img;
          }
          return img.file;
        })
      );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelect,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxFiles,
  });

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const updatedImages = Array.from(images);
    const [movedImage] = updatedImages.splice(source.index, 1);
    updatedImages.splice(destination.index, 0, movedImage);
    setImages(updatedImages);
    setTitleImage(updatedImages[0]);
    setValue(
      fieldName,
      updatedImages.map((img) => {
        if (typeof img === "string") {
          return img;
        }
        return img.file;
      })
    );
  };

  return (
    <div className="container mx-auto mt-5">
      <fieldset className={`h - ${images.length > 0 ? "520" : "300"} rounded-md border p-4`}>
        <legend className="rounded-md bg-gray-200 px-4 py-2 text-xl">{text}</legend>
        <div {...getRootProps()} className="h-[220px] cursor-pointer rounded-md border-2 border-dashed p-6 text-center">
          <input {...getInputProps()} />
          <div className="mt-16 flex flex-col items-center justify-center gap-1">
            <p>{subText}</p>
            <p className="text-gray-500">{subSubText}</p>
          </div>
        </div>
        {images.length > 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="m-2 mt-4 grid grid-cols-1 gap-6 rounded-md border p-4 shadow-md sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {images.map((image, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="relative h-44 w-44">
                          <img src={typeof image === "string" ? image : image.preview} alt={typeof image === "string" ? "Uploaded image" : image.file?.name || "Uploaded image"} className={`h-full w-full cursor-pointer rounded-md  border object-contain ${titleImage === image ? "border-red-700" : "border-orange-500"}`} onClick={() => handleCoverImage(image)} />

                          <button type="button" className="absolute bottom-0 right-0 w-full cursor-pointer rounded-b-md bg-orange-500 p-1 text-white" onClick={() => handleFileDelete(index)}>
                            Remove
                          </button>
                          <button type="button" className="absolute right-0 top-0 m-1 cursor-pointer rounded-full bg-white p-1" onClick={() => openModal(typeof image === "string" ? image : image.preview)}>
                            <EyeIcon className="h-5 w-5 text-red-500" />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {errors?.[fieldName] && errors?.[fieldName].message && <p className="mt-2 text-red-500">{errors[fieldName]?.message.toString()}</p>}
      </fieldset>

      {titleImage && images.length > 0 && (
        <div className="p-5">
          <h2 className="flex justify-center text-lg font-semibold">Cover Image</h2>
          <div className="mt-5 flex items-center justify-center">
            <img src={typeof titleImage === "string" ? titleImage : titleImage.preview} alt="Cover" className="mt-2 h-48 w-48 rounded-md border border-orange-500 object-contain" />
          </div>
        </div>
      )}

      {isModalOpen && modalImage && (
        <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative  rounded-md bg-white p-4">
            <button className="absolute right-2 top-0 m-2 p-2 text-orange-600" onClick={closeModal}>
              X
            </button>
            <img src={modalImage} alt="modal" className="h-96 w-96 rounded-md object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
