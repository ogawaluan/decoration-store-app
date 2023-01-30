import { useContext, useState } from "react";
import { ModalProps, View } from "react-native";
import { decode } from "base64-arraybuffer";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

import { checkPermissions } from "../../../../utils/checkPermissions";
import { styles } from "../../../../utils/constants";
import { supabaseClient } from "../../../../services/supabase";
import { QueryKeyContext } from "../../../../context/QueryKeyContext";
import * as S from "./styled";

export interface IImageModalProps extends ModalProps {
  productId: string;
  oldImageName: string;
  onChangeImage: (modalVisible: boolean, filename: string) => void;
}

const ImageModal = ({
  productId,
  oldImageName,
  onChangeImage,
  ...rest
}: IImageModalProps) => {
  const { handleUpdateQueryKey } = useContext(QueryKeyContext);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>(
    {} as ImagePicker.ImagePickerAsset
  );
  const filename = `${Date.now()}`;

  const [hasImage, setHasImage] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);

  const handlePickImage = async (type: "camera" | "library") => {
    await checkPermissions(type);
    let result: ImagePicker.ImagePickerResult;

    if (type === "camera") {
      result = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
      });
    }

    if (!result.canceled) {
      setImage(result.assets[0]);
      setHasImage(true);
    }
  };

  const handleSaveImage = async () => {
    try {
      setIsLoading(true);
      const extension = image.uri.split(".").pop();
      const path = `images/${filename}.${extension}`;

      if (!image.base64) {
        return;
      }

      await supabaseClient.storage
        .from("decoration-store-bucket")
        .upload(path, decode(image.base64), {
          contentType: `image/${extension}`,
        });

      await supabaseClient
        .from("Products")
        .update({ filename: `${filename}.${extension}` })
        .eq("id", productId);

      await supabaseClient.storage
        .from("decoration-store-bucket")
        .remove([`images/${oldImageName}`]);

      onChangeImage(false, `${filename}.${extension}`);
      handleUpdateQueryKey(filename);
      Toast.show({
        type: "success",
        text1: "Successfully updated the image",
        text2: "You can now check your  new image",
        visibilityTime: 8000,
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Contact the development team",
        visibilityTime: 8000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Modal {...rest}>
      <S.Container>
        <View style={styles.modalContainerStyle}>
          {hasImage && <S.Image source={{ uri: image.uri }} />}
          <S.CustomButton
            type="primary"
            title={hasImage ? "Save image" : "Pick an Image"}
            onPress={() =>
              hasImage ? handleSaveImage() : handlePickImage("library")
            }
            loading={loading}
            disabled={loading}
          />
          <S.CustomButton
            type={hasImage ? "warning" : "primary"}
            title={hasImage ? "Cancel" : "Take a Photo"}
            onPress={() =>
              hasImage
                ? onChangeImage(false, oldImageName)
                : handlePickImage("camera")
            }
          />
          {!hasImage && (
            <S.CustomButton
              type={"warning"}
              title={"Cancel"}
              onPress={() => onChangeImage(false, oldImageName)}
            />
          )}
        </View>
      </S.Container>
    </S.Modal>
  );
};

export default ImageModal;
