import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import CameraPreview from "./CameraPrevieww";
import Form from "./Form";

export default function PictureButton() {
  let camera;
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [multipleCapturedImage, setMultipleCapturedImage] = React.useState([]);
  const [recording, setRecording] = React.useState(false);
  const [capturedVideo, setCapturedVideo] = React.useState("");

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const statuss = await Camera.requestMicrophonePermissionsAsync();
    if (status === "granted" && statuss.status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };
  const __recordVideo = async () => {
    let video;
    if (!recording) {
      setRecording(true);
      video = await camera.recordAsync();
      setCapturedVideo(video.uri);
    } else {
      setRecording(false);
      camera.stopRecording();
    }
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __savePhoto = () => {
    multipleCapturedImage.push(capturedImage.uri);
    setMultipleCapturedImage(multipleCapturedImage);

    setPreviewVisible(false);
    __startCamera();
  };
  const __backScreen = () => {
    setStartCamera(false);
  };

  return startCamera ? (
    previewVisible && capturedImage ? (
      <CameraPreview
        photo={capturedImage}
        savePhoto={__savePhoto}
        retakePicture={__retakePicture}
      />
    ) : (
      <Camera
        style={{ flex: 1, width: "100%" }}
        ref={(r) => {
          camera = r;
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              {!capturedVideo && (
                <TouchableOpacity
                  onPress={__recordVideo}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "black",
                  }}
                />
              )}
              {!recording && (
                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
              )}
              {!recording && (
                <TouchableOpacity
                  onPress={__backScreen}
                  style={{
                    bottom: 0,
                    backgroundColor: "#fff",
                    position: "absolute",
                    left: "5%",
                    top: "50%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    Back
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Camera>
    )
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        multipleCapturedImage={multipleCapturedImage}
        setMultipleCapturedImage={setMultipleCapturedImage}
        capturedVideo={capturedVideo}
        setCapturedVideo={setCapturedVideo}
      />
      <TouchableOpacity
        onPress={__startCamera}
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
          Take picture/video
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
