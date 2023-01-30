import "react-native-gesture-handler";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";
import { Main } from "./src/navigation/Main";
import Loading from "./src/components/Loading";
import theme from "./src/theme/index";
import { QueryKeyProvider } from "./src/context/QueryKeyContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
  });

  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={"light-content"} translucent />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {fontsLoaded ? (
            <MenuProvider>
              <QueryKeyProvider>
                <Main />
              </QueryKeyProvider>
              <Toast />
            </MenuProvider>
          ) : (
            <Loading />
          )}
        </QueryClientProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
