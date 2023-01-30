import { useCallback, useContext, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FormHandles, SubmitHandler } from "@unform/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Form } from "@unform/mobile";
import { Star } from "phosphor-react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { IProduct } from "../../components/ItemCard";
import { TRootStackParamList } from "../../navigation/Main";
import ImageModal from "./components/ImageModal";
import * as S from "./styled";
import { supabaseClient } from "../../services/supabase";
import { QueryKeyContext } from "../../context/QueryKeyContext";

type TEditCardNavigationProps = RouteProp<TRootStackParamList, "home">;

export type TEditCardProps = {
  route: TEditCardNavigationProps;
};

type TEditProductNavigationProp = StackNavigationProp<
  TRootStackParamList,
  "edit-product"
>;

Yup.setLocale({
  mixed: {
    default: "Must be a number",
  },
});

const EditProduct = ({ route }: TEditCardProps) => {
  const { product } = route.params || { product: {} as IProduct };
  const { handleUpdateQueryKey } = useContext(QueryKeyContext);
  const navigation = useNavigation<TEditProductNavigationProp>();
  const formRef = useRef<FormHandles>(null);
  const starArray = [1, 2, 3, 4, 5];

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(product.rating);
  const [imageName, setImageName] = useState<string>(product.filename);

  const handleRatingButton = useCallback(
    (index: number, isClearButton?: boolean) => {
      if (isClearButton) setRating(index);
      setRating(index);
    },
    []
  );

  const handleModal = useCallback((modalVisible: boolean, filename: string) => {
    setImageName(filename);
    setModalVisible(modalVisible);
  }, []);

  const handleSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      setIsLoading(true);
      const parsedData = Object.assign(data, {
        height: Number(data.height),
        width: Number(data.width),
        price: Number(data.price),
        rating,
      });

      const schema = Yup.object().shape({
        title: Yup.string()
          .typeError("Title must be a string")
          .required("Title is required"),
        description: Yup.string()
          .typeError("Description must be a string")
          .required("Description is required"),
        type: Yup.string()
          .typeError("Type must be a string")
          .required("Type is required"),
        height: Yup.number()
          .typeError("Height must be a number")
          .required("Height is required"),
        width: Yup.number()
          .typeError("Width must be a number")
          .required("Width is required"),
        price: Yup.number()
          .typeError("Price must be a number")
          .required("Price is required"),
        rating: Yup.number()
          .typeError("Rating must be a number")
          .required("Rating is required"),
      });

      await schema.validate(parsedData, {
        abortEarly: false,
      });

      await supabaseClient
        .from("Products")
        .update(parsedData)
        .eq("id", product.id);

      handleUpdateQueryKey(`${Date.now()}`);
      navigation.navigate("home");
      Toast.show({
        type: "success",
        text1: "Successfully updated product",
        text2: "You can now check your product",
        visibilityTime: 8000,
      });
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        Toast.show({
          type: "error",
          text1: "Error when trying to edit",
          text2: err.message,
          visibilityTime: 8000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <Header titleBold="Edit" title="item" hasBackButton />
      <S.ProductImageContainer>
        <S.ProductImage
          source={{
            uri: `https://jswdwfquqcfwhhiyggqu.supabase.co/storage/v1/object/public/decoration-store-bucket/images/${imageName}`,
          }}
        />
        <S.ImageAlertContainer>
          <S.Icon />
          <S.AlertText>
            By update image and saving, you don't need to press "save editions".
          </S.AlertText>
        </S.ImageAlertContainer>
        <S.ProductImageEditButton onPress={() => setModalVisible(true)}>
          <S.ProductImageEditButtonIcon />
        </S.ProductImageEditButton>
      </S.ProductImageContainer>
      <S.FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.Label>Product name</S.Label>
          <Input name="title" initialValue={product.title} />
          <S.Label>Product type</S.Label>
          <Input name="type" initialValue={product.type} />
          <S.Label>Product description</S.Label>
          <Input name="description" initialValue={product.description} />
          <S.Label>Product height</S.Label>
          <Input name="height" initialValue={String(product.height)} />
          <S.Label>Product width</S.Label>
          <Input name="width" initialValue={String(product.width)} />
          <S.Label>Product price</S.Label>
          <Input name="price" initialValue={String(product.price)} />
          <S.RatingLabelContainer>
            <S.Label>Product rating </S.Label>
            <TouchableOpacity onPress={() => handleRatingButton(0, true)}>
              <S.Label>Clear Rating</S.Label>
            </TouchableOpacity>
          </S.RatingLabelContainer>
          <S.RatingContainer>
            {starArray.map((index) => (
              <S.RatingButtonContainer
                key={index}
                onPress={() => handleRatingButton(index)}
              >
                <Star
                  color="black"
                  weight={index <= rating ? "fill" : undefined}
                  size={38}
                  style={{ marginRight: 5 }}
                />
              </S.RatingButtonContainer>
            ))}
          </S.RatingContainer>
        </Form>
      </S.FormContainer>
      <Button
        title="Save editions"
        loading={loading}
        disabled={loading}
        onPress={() => formRef.current?.submitForm()}
      />
      <ImageModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        productId={product.id}
        oldImageName={imageName}
        onChangeImage={(modalVisible, filename) =>
          handleModal(modalVisible, filename)
        }
      />
    </S.Container>
  );
};

export default EditProduct;
