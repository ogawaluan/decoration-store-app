import "react-native-url-polyfill/auto";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2R3ZnF1cWNmd2hoaXlnZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NDIzNjcsImV4cCI6MTk5MDQxODM2N30.vmhd4R7Eo2v0ysnyQ9XT31_KNp_UuNQCSU7PBDM3WhM";

const supabase = axios.create({
  baseURL: "https://jswdwfquqcfwhhiyggqu.supabase.co/rest/v1",
  headers: {
    apiKey,
  },
});

export const supabaseClient = createClient(
  "https://jswdwfquqcfwhhiyggqu.supabase.co",
  apiKey
);

export const getProductsData = async () => {
  const { data } = await supabase.get("/Products");

  return data;
};

export const getProduct = async (productId: string) => {
  const { data } = await supabase.get(`/Products?select=${productId}`);

  return data;
};
