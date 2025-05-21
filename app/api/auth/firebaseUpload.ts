// services/firebaseUpload.ts
import { storage } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFileToFirebase = async (file: File, folderPath: string) => {
  // Example folder path: "profileImages/" or "shopDocuments/"
  const fileRef = ref(storage, `${folderPath}/${file.name}-${Date.now()}`);
  // Upload the file
  await uploadBytes(fileRef, file);
  // Retrieve the download URL
  const downloadURL = await getDownloadURL(fileRef);
  console.log(downloadURL);
  return downloadURL;
  
};
