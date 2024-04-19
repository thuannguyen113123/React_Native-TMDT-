import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity } from "react-native-gesture-handler";

import noteBook from "../../assets/images/notebook.jpg";
import explore from "../../assets/images/explore.jpg";
import link from "../../assets/images/link.png";
import logout from "../../assets/images/logout.jpg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();

  const { isLoaded, signOut } = useAuth();
  //console.log(user);
  const menuList = [
    {
      id: 1,
      name: "Sản phẩm của tôi",
      icon: noteBook,
      path: "myProduct",
    },
    {
      id: 2,
      name: "Khám phá",
      icon: explore,
      path: "explore",
    },
    {
      id: 3,
      name: "Nguyễn Minh Thuận",
      icon: link,
      URL: "",
    },
    {
      id: 4,
      name: "Đăng xuất",
      icon: logout,
    },
  ];

  const onMenuPress = (item) => {
    if (item?.name == "Đăng xuất") {
      signOut();
      return;
    }

    item?.path ? navigation.navigate(item.path) : null;
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-5 bg-white flex-1">
        <View className="mt-14  items-center">
          <Image
            source={{ uri: user?.imageUrl }}
            className="h-[100px] w-[100px] rounded-full"
          />

          <Text className="text-[18px] font-bold text-center">
            {user?.fullName}
          </Text>
          <Text className="font-bold text-[14px] text-center text-gray-500">
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
        <FlatList
          data={menuList}
          //numColumns={3}
          className="flex flex-coloum"
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => onMenuPress(item)}
              className="flex-1 p-2 border-[1px] m-2 border-blue-400 rounded-lg items-center bg-blue-50"
            >
              {item?.icon && (
                <Image source={item.icon} className="w-[50px] h-[50px]" />
              )}
              <Text className="text-[14px] mt-2 text-blue-700">
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}
