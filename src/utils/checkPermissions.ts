import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export const checkPermissions = async (type: "camera" | "library") => {
  if (type === "camera") {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraStatus.status !== "granted") {
      Toast.show({
        type: "info",
        text1: "Permissions not granted",
        text2: "Sorry, we need these permissions to make this work!",
      });
    }
  } else {
    const libraryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (libraryStatus.status !== "granted") {
      Toast.show({
        type: "info",
        text1: "Permissions not granted",
        text2: "Sorry, we need these permissions to make this work!",
      });
    }
  }
};
