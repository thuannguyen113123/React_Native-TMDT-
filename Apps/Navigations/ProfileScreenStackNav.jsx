import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/ProfileScreen";
import MyProducts from "../Screens/MyProducts";
import ProductDetail from "../Screens/ProductDetail";

const Stack = createStackNavigator();
const ProfileScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profileTab"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="myProduct"
        component={MyProducts}
        options={{
          headerStyle: { backgroundColor: "#4169E1" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Sản phẩm của tôi ",
        }}
      />

      <Stack.Screen
        name="productDetail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: "#4169E1",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Chi tiết sản phẩm",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreenStackNav;
