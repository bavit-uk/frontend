// Firebase storage import
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // importing services
import { storage } from "./firebase";

// Define the FileInput type
type FileInput = {
  preview: string;
  file: File;
};

// File upload function
export const uploadImage = async (
  file: FileInput | File | string | null,
  folderName: string
) => {
  if (!file) {
    return null;
  }

  // If the file is a string, return it directly
  if (typeof file === "string") {
    return file;
  }

  // If the file is an object and has a file property, use that
  if (typeof file === "object" && "file" in file) {
    file = file.file; // Extract the File object from the FileInput type
  }

  // Check if the file is an instance of File
  if (file instanceof File) {
    const storageRef = ref(storage, `${folderName}/${uuidv4()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  return null;
};

// Upload multiple images
type FileInputArray = (FileInput | File | string)[] | null;

export const uploadAllImages = async (
  files: (File | string)[],
  folderName: string
) => {
  if (!files || files.length === 0) {
    return [];
  }

  const urls: string[] = [];
  return Promise.all(
    files.map(async (file) => {
      const url = await uploadImage(file, folderName);
      if (url) {
        urls.push(url);
      }
    })
  ).then(() => {
    return urls;
  });
};

export const uploadMultipleImages = async (
  files: FileInputArray,
  folderName: string
) => {
  if (!files || files.length === 0) {
    return [];
  }

  const urls: string[] = [];
  return Promise.all(
    files.map(async (file) => {
      if (!file || (typeof file === "string" && file.length === 0)) {
        urls.push("");
      } else if (typeof file === "string") {
        urls.push(file);
      } else if (typeof file === "object" && "file" in file) {
        // Extract the File object from the FileInput type
        const fileObj = file.file;
        const storageRef = ref(
          storage,
          `${folderName}/${uuidv4()}-${fileObj.name}`
        );
        const snapshot = await uploadBytes(storageRef, fileObj);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }
    })
  ).then(() => {
    return urls;
  });
};

// // Firebase storage import
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid"; // importing services
// import { storage } from "./firebase";
// import { FileInput } from "lucide-react";

// // File upload function

// type FileInput = {
//   preview: string;
//   file: File;
// };

// export const uploadImage = async (file: FileInput, folderName: string) => {
//   if (file == null) {
//     return null;
//   }

//   if (typeof file === "string") {
//     return file;
//   }

//   if (typeof file === "object" && Array.isArray(file) && file?.length > 0) {
//     file = file[0] as File;
//   }

//   if (typeof file === "object" && file instanceof File) {
//     // Add this condition to ensure file is of type File
//     const storageRef = ref(storage, `${folderName}/${uuidv4() + "-" + file.name}`);
//     const snapshot = await uploadBytes(storageRef, file);
//     return await getDownloadURL(snapshot.ref);
//   }
//   return null;
// };

// // Upload multiple images

// type FileInputArray = File[] | string[] | null;
// export const uploadAllImages = async (files: FileInputArray, folderName: string) => {
//   if (files == null || files.length == 0) {
//     return [];
//   }
//   const urls: string[] = [];
//   return Promise.all(
//     files.map(async (file) => {
//       const url = await uploadImage(file, folderName);
//       if (url != null) {
//         urls.push(url);
//       }
//     }),
//   ).then(() => {
//     return urls;
//   });
// };

// export const uploadMultipleImages = async (files: FileInputArray, folderName: string) => {
//   if (files == null || files.length == 0) {
//     return [];
//   }

//   const urls: string[] = [];
//   return Promise.all(
//     files.map(async (file) => {
//       if (file == null || file === "" || (typeof file === "string" && file.length == 0)) {
//         urls.push("");
//       } else if (typeof file === "string") {
//         urls.push(file);
//       } else {
//         const storageRef = ref(storage, `${folderName}/${uuidv4() + "-" + file.name}`);
//         const snapshot = await uploadBytes(storageRef, file);
//         const url = await getDownloadURL(snapshot.ref);
//         urls.push(url);
//       }
//     }),
//   ).then(() => {
//     return urls;
//   });
// };
