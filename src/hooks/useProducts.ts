import { useContext } from "react";
import { useQuery } from "react-query";
import { IProduct } from "../components/ItemCard";
import { QueryKeyContext } from "../context/QueryKeyContext";
import { getProductsData } from "../services/supabase";

const useProducts = () => {
  const { queryKey } = useContext(QueryKeyContext);

  return useQuery<IProduct[]>(["products", queryKey], getProductsData);
};

export default useProducts;
