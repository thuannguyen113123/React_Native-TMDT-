import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const PostItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push("productDetail", {
          product: item,
        })
      }
    >
      <Image
        source={{ uri: item?.image }}
        className="w-full h-[140px] rounded"
      />
      <Text className=" font-bold mt-2 text-[14px] ">{item?.title}</Text>
      <Text className="font-bold text-blue-500 text-[16px]">
        {item?.price}đ
      </Text>
      <Text className="text-blue-500 bg-blue-200 rounded-full p-1 text-[12px] px-2 mt-2 text-center w-[100px]">
        {item?.category}
      </Text>
    </TouchableOpacity>
  );
};

export default PostItem;
