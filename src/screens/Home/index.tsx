import { FlatList } from "react-native";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import Loading from "../../components/Loading";
import useProducts from "../../hooks/useProducts";
import * as S from "./styled";

const Home = () => {
  const productsQuery = useProducts();

  const sortData = () => {
    return productsQuery.isSuccess
      ? productsQuery.data.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        )
      : [];
  };

  return (
    <S.Container>
      <Header titleBold="Item" title="list" />
      {productsQuery.isLoading ? (
        <Loading />
      ) : (
        productsQuery.isSuccess && (
          <FlatList
            data={sortData()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemCard product={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )
      )}
    </S.Container>
  );
};

export default Home;
