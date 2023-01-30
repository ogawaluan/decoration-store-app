import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { House } from "phosphor-react-native";
import { IProduct } from "../components/ItemCard";
import EditProduct from "../screens/EditProduct";
import Home from "../screens/Home";

export type TRootStackParamList = {
  home: undefined;
  "home-tab": undefined;
  "edit-product": { product: IProduct } | undefined;
};

const MainStack = createStackNavigator<TRootStackParamList>();
const Tab = createBottomTabNavigator<TRootStackParamList>();

const defaultOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const HomeTab = () => {
  return (
    <Tab.Navigator screenOptions={defaultOptions}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const Main = () => {
  return (
    <MainStack.Navigator screenOptions={defaultOptions}>
      <MainStack.Screen name="home-tab" component={HomeTab} />
      <MainStack.Screen
        name="edit-product"
        component={EditProduct as React.FC}
      />
    </MainStack.Navigator>
  );
};
