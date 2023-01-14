import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../config";
import {
  sendDataToFirebase,
  uploadImageAsync,
  uploadVideoAsync,
} from "./saveData";

const Form = ({
  multipleCapturedImage = [],
  setMultipleCapturedImage,
  capturedVideo,
  setCapturedVideo,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const onChange = (value) => {
    console.log(value);
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone(null);
    setMultipleCapturedImage([]);
    setCapturedVideo("");
  };
  const uploadImages = async () => {
    let imagesURL = [];
    if (multipleCapturedImage.length) {
      for (const uri of multipleCapturedImage) {
        const uploadTask = await uploadImageAsync(uri)
          .then((res) => {
            // console.log("res", res);
            imagesURL.push(res);
          })
          .catch((e) => {
            console.log(e);
            return [];
          });
      }
    }
    return imagesURL;
  };
  const uploadVideo = async () => {
    let videoURL = [];
    if (!!capturedVideo) {
      await uploadVideoAsync(capturedVideo)
        .then((res) => {
          console.log("res", res);
          videoURL.push(res);
        })
        .catch((e) => {
          console.log(e);
          return [];
        });
      console.log("video added");
    }
    return videoURL;
  };
  async function sendDbToFirebase() {
    const urlArr = await uploadImages();
    const videoUrll = await uploadVideo();
    console.log(urlArr, "UrlArr");
    console.log(videoUrll, "videoUrll");
    const res = await sendDataToFirebase({
      name,
      email,
      phone,
      images: urlArr,
      video: videoUrll[0] ?? " ",
    }).then(() => {
      resetForm();
    });
    alert("Data Sent");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> Form </Text>
      <View>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />
        <TouchableOpacity
          disabled={!name || !email || !phone || !multipleCapturedImage.length}
          onPress={sendDbToFirebase}
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: "#14274e",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Send Data
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  //Check project repo for styles
});

export default Form;
