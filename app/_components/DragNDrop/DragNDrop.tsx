import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { EyeIcon } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

interface DragNDropProps {
  setTitleImage: (image: any) => void; 
  data: { preview?: string; [key: string]: any }[]; 
  form: {
    setFieldValue: (field: string, value: any) => void;
  };
  fieldName: string;
}

const DragNDrop: React.FC<DragNDropProps> = ({ setTitleImage, data, form, fieldName }) => {
  const [state, setState] = React.useState(data || []);
  const [previewImage, setPreviewImage] = React.useState<{ preview?: string; [key: string]: any } | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    setState(data);
  }, [data]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const updatedState = Array.from(state);
    const [movedItem] = updatedState.splice(source.index, 1);
    updatedState.splice(destination.index, 0, movedItem);
    setState(updatedState);
    form.setFieldValue(fieldName, updatedState);
  };

  const handlePreview = (image: any) => {

    setPreviewImage(image);
    setIsModalOpen(true);
  };

  const getImageSrc = (image: any) => {
    return typeof image === "string" ? image : image.preview || "";
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex overflow-x-auto rounded-md bg-gray-100 p-2"
            >
              {state.map((item, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative p-1"
                    >
                      <EyeIcon
                        className="absolute right-1 top-1 h-5 w-5 cursor-pointer text-gray-700"
                        onClick={() => handlePreview(item)}
                      />
                      <div
                        className={`rounded-md ${index === 0 ? "border-4 border-red-500" : "border"}`}
                        onClick={() => setTitleImage(item)}
                      >
                        <Image src={getImageSrc(item)} alt="preview" layout="fill" objectFit="cover" />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            {previewImage && <Image src={getImageSrc(previewImage)} alt="preview" layout="fill" objectFit="cover" />}
            <button className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DragNDrop;
