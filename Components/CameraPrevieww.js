import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function CameraPreview({ photo, retakePicture, savePhoto }) {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      />
      <TouchableOpacity
        onPress={retakePicture}
        style={{
          position: "absolute",
          left: "5%",
          top: "10%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Retake
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={savePhoto}
        style={{
          position: "absolute",
          left: "5%",
          top: "20%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Add Photo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
