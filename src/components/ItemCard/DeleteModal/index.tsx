import { useContext, useState } from "react";
import { ModalProps, View } from "react-native";
import Toast from "react-native-toast-message";
import { QueryKeyContext } from "../../../context/QueryKeyContext";
import { supabaseClient } from "../../../services/supabase";
import { styles } from "../../../utils/constants";

import * as S from "./styled";

export interface IDeleteModalProps extends ModalProps {
  productId: string;
  productName: string;
  productImage: string;
  onChangeModalVisible: (modalVisibility: boolean) => void;
}

const DeleteModal = ({
  productId,
  productName,
  productImage,
  onChangeModalVisible,
  ...rest
}: IDeleteModalProps) => {
  const { handleUpdateQueryKey } = useContext(QueryKeyContext);

  const [loading, setIsLoading] = useState<boolean>(false);

  const handleDeleteItem = async () => {
    try {
      setIsLoading(true);
      await supabaseClient.from("Products").delete().eq("id", productId);

      await supabaseClient.storage
        .from("decoration-store-bucket")
        .remove([`images/${productImage}`]);

      handleUpdateQueryKey(`${Date.now()}`);
      onChangeModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Successfully deleted product",
        text2: "Your product has been deleted",
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
          <S.Title>
            Do you want to delete the item{" "}
            <S.TitleBold>{productName}</S.TitleBold>
          </S.Title>
          <S.CustomButton
            type="primary"
            title={"No, cancel"}
            onPress={() => onChangeModalVisible(false)}
          />
          <S.CustomButton
            type="warning"
            title={"Yes, delete"}
            loading={loading}
            disabled={loading}
            onPress={handleDeleteItem}
          />
        </View>
      </S.Container>
    </S.Modal>
  );
};

export default DeleteModal;
