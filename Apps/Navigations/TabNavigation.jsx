import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./../Screens/HomeScreen.jsx";
import ExploreScreen from "./../Screens/ExploreScreen.jsx";
import AddPostScreen from "./../Screens/AddPostScreen.jsx";
import ProfileScreen from "../Screens/ProfileScreen.jsx";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import HomeScreenStackNav from "./HomeScreenStackNav.jsx";
import ExploreScreenStackNav from "./ExploreScreenStackNav";
import ProfileScreenStackNav from "./ProfileScreenStackNav.jsx";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        //Thuộc tín thay đổi màu active
        //tabBarActiveTintColor: "#000"
      }}
    >
      <Tab.Screen
        name="home-nav"
        component={HomeScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
              Trang chủ
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
              Khám phá
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wpexplorer" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="addpost"
        component={AddPostScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
              Thêm
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>
              Thông tin cá nhân
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
