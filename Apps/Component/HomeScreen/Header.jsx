import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { EvilIcons } from "@expo/vector-icons";

const Header = () => {
  const { user } = useUser();
  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="text-[14px]">Chào mừng</Text>
          <Text className="text-[16px] font-bold">{user?.fullName}</Text>
        </View>
      </View>
      {/* Thanh tìm kiếm */}
      <View
        className="p-3 px-5 rounded-full flex flex-row mt-2 items-center"
        style={{ borderWidth: 1, borderColor: "blue" }}
      >
        <EvilIcons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Nhập để tìm kiếm"
          className="ml-2 text-[16px]"
          onChangeText={(value) => {
            console.log(value);
          }}
        />
      </View>
    </View>
  );
};

export default Header;
