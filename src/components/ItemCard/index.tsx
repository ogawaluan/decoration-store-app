import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format, parseISO } from "date-fns";
import { Star } from "phosphor-react-native";
import { useMemo, useState } from "react";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { TRootStackParamList } from "../../navigation/Main";
import theme from "../../theme";
import DeleteModal from "./DeleteModal";
import * as S from "./styled";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  type: string;
  filename: string;
  height: number;
  width: number;
  price: number;
  rating: number;
  created_at: string;
}

interface IProductCardProps {
  product: IProduct;
}

type TEditCardPageProp = StackNavigationProp<
  TRootStackParamList,
  "edit-product"
>;

const ItemCard = ({ product }: IProductCardProps) => {
  const navigation = useNavigation<TEditCardPageProp>();
  const starArray = [1, 2, 3, 4, 5];
  const parsedDate = useMemo(() => {
    const parseIso = parseISO(product.created_at);
    return format(parseIso, "MM/d/yyyy");
  }, []);
  console.log(product.filename);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <S.Container>
      <S.CardImage
        source={{
          uri: `https://jswdwfquqcfwhhiyggqu.supabase.co/storage/v1/object/public/decoration-store-bucket/images/${product.filename}`,
        }}
      />
      <S.CardDescriptionContainer>
        <S.CardTitle>
          {product.title.length > 10
            ? `${product.title.substring(0, 20)}...`
            : product.title}{" "}
          <S.CardDate>{parsedDate}</S.CardDate>
        </S.CardTitle>
        <S.CardType>{product.type}</S.CardType>
        <S.RatingContainer>
          {starArray.map((index) => (
            <Star
              key={index}
              color="black"
              weight={product.rating >= index ? "fill" : undefined}
              size={18}
              style={{ marginRight: 5, marginTop: 10 }}
            />
          ))}
        </S.RatingContainer>
      </S.CardDescriptionContainer>
      <S.CardActionsContainer>
        <Menu
          style={{
            marginLeft: "auto",
          }}
        >
          <MenuTrigger
            text="..."
            customStyles={{
              triggerText: {
                color: theme.colors.mud,
                fontSize: 20,
                lineHeight: 12,
              },
              triggerWrapper: {
                padding: 2,
              },
            }}
          />

          <MenuOptions
            customStyles={{
              optionsContainer: { width: 80 },
            }}
          >
            <MenuOption
              text="Edit"
              customStyles={{
                optionText: {
                  textAlign: "center",
                  fontFamily: theme.font_family.bold,
                },
              }}
              onSelect={() => navigation.navigate("edit-product", { product })}
            />
            <MenuOption
              text="Delete"
              customStyles={{
                optionText: {
                  textAlign: "center",
                  fontFamily: theme.font_family.regular,
                  color: theme.colors.warning,
                },
              }}
              onSelect={() => setModalVisible(true)}
            />
          </MenuOptions>
        </Menu>
        <S.CardPrice>${product.price}</S.CardPrice>
      </S.CardActionsContainer>
      <DeleteModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        productId={product.id}
        productName={product.title}
        productImage={product.filename}
        onChangeModalVisible={(modalVisible) => setModalVisible(modalVisible)}
      />
    </S.Container>
  );
};

export default ItemCard;
