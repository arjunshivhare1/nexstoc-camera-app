// import { firebase } from "../config";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const sendDataToFirebase = async (data) => {
  const firestore = firebase.firestore().collection("FormData").doc();
  await firestore
    .set({
      ...data,
      docID: firestore.id,
    })
    .catch((e) => {
      return { successfull: false, message: "There is some Problem" };
    });
  return {
    successfull: true,
    message: "Data has been successfully created.",
  };
};
export async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  let myPromise = await new Promise(function (myResolve, myReject) {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `Pictures/${new Date().toISOString() + Math.random()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);
    //   return uploadTask;

    //   const ref = firebase.storage().ref().child(`Pictures/Image1`);
    //   const snapshot = ref.put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        myReject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          myResolve(downloadURL);
        });
      }
    );
  });
  return myPromise;
}
export async function uploadVideoAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  let myPromise = await new Promise(function (myResolve, myReject) {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `Videos/${new Date().toISOString() + Math.random()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);
    //   return uploadTask;

    //   const ref = firebase.storage().ref().child(`Pictures/Image1`);
    //   const snapshot = ref.put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        myReject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          myResolve(downloadURL);
        });
      }
    );
  });
  return myPromise;
}
