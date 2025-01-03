// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage  , getDownloadURL,

//   ref,
//   uploadBytesResumable,} from "firebase/storage";


// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC9QNjFdjNfhutMxad32cHXvvajI5t46CY",
//   authDomain: "bav-it-uk.firebaseapp.com",
//   projectId: "bav-it-uk",
//   storageBucket: "bav-it-uk.firebasestorage.app",
//   messagingSenderId: "18638262840",
//   appId: "1:18638262840:web:97a273faae5ecd85ed8ccd",
//   measurementId: "G-KHX22YP1B9",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// export const uploadSingleFile = ({ file, folderName, urlSetter, setProgress }) => {
//   folderName = folderName || "uploads";
//   if (!file) return;
//   const storageRef = ref(storage, `/${folderName}/${file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const prog = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       setProgress(prog);
//     },
//     (err) => console.log(err),
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(
//         (url) => urlSetter(url)
//         // url fetched... store it
//         // handleChangeCategory({ name: "image", value: url })
//       );
//     }
//   );
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCALbU1ilA1O9ZOEP8A1_6gLHqzWfOuFIk",
    authDomain: "axiom-528ab.firebaseapp.com",
    projectId: "axiom-528ab",
    storageBucket: "axiom-528ab.appspot.com",
    messagingSenderId: "788965920996",
    appId: "1:788965920996:web:a4fb1e2abf626159ff5cf1",
    measurementId: "G-E4M3F5JNZY"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Type definition for the uploadSingleFile function parameters
interface UploadSingleFileProps {
  file: File | null; // `File` object or null if no file is selected
  folderName?: string; // Folder name is optional
  urlSetter: (url: string) => void; // Function to set the URL
  setProgress: (progress: number) => void; // Function to set upload progress
}

// Function to handle file uploads
export const uploadSingleFile = ({
  file,
  folderName,
  urlSetter,
  setProgress,
}: UploadSingleFileProps): void => {
  if (!file) return; // If no file is selected, exit early

  folderName = folderName || "uploads"; // Default folder name if none provided
  const storageRef = ref(storage, `/${folderName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog); // Update the progress
    },
    (err) => {
      console.error(err); // Log errors
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (url) => {
          urlSetter(url); // Set the URL after upload is complete
        }
      );
    }
  );
};

// Type definition for the sign-in function (Google Auth)
export const signInWithGoogle = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('User Info:', user); // Log user info
  } catch (error) {
    console.error('Authentication Error:', error); // Handle authentication error
  }
};
