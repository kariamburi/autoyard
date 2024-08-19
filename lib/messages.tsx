import { db, storage } from "@/lib/firebase";
import { messageData } from "@/types";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const adsRef = collection(db, "messages");

// fetch all ads from  the database
export const fetchAllMessages = async () => {
  const q = query(adsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

// fetch all ads for a specific user
export const fetchUserAds = async (userEmail: string) => {
  const q = query(adsRef, where("userEmail", "==", userEmail));
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

// fetch Ads with ID
export const fetchAd = async (id: string) => {
  const data = await fetchAllMessages();

  const results = data.filter((ad) => {
    return ad.id == id;
  });

  return results[0];
};

// fetch category with ID
export const fetchAdCategory = async (id: string) => {
  const data = await fetchAllMessages();

  const results = data.filter((ad) => {
    return ad.id == id;
  });

  return results[0];
};

//  Fetch ads by Category
export const fetchAdsByCategory = async (category: string) => {
  const q = query(adsRef, where("category", "==", category));
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

export const searchAdsByTitle = async (title: string) => {
  const q = query(adsRef, where("title", "==", title));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  //console.log("SEARCH: " + title);
  return results;
};

export const createMessage = async ({
  text,
  image,
  createdAt,
  receiverId,
  senderId,
  senderName,
  senderImage,
}: messageData) => {
  let imagesUrl: string = "";

  // Upload images and push them to the imagesUrl array
  //  for (let i = 0; i < images.length; i++) {
  //Put the image in the /userEmail/title/image
  if (image) {
    const date = new Date().getTime();
    const imageRef = ref(storage, `${senderId + date}`);

    const status: any = await uploadBytes(imageRef, image)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        return false;
      });

    if (status) {
      imagesUrl = await getDownloadURL(status.ref).then((url) => {
        return imagesUrl;
      });
      //  imagesUrl.push(uploadImgUrl);
    }
  }
  // }
  //Submit Data
  const adsCollectionRef = collection(db, "messages");
  try {
    await addDoc(adsCollectionRef, {
      text,
      imagesUrl,
      createdAt,
      receiverId,
      senderId,
      senderName,
      senderImage,
    });
  } catch (error) {
    return { error: true, message: "Unable to Submit AD" };
  }

  return {
    error: false,
    message: "Successfully Submitted",
  };
};
