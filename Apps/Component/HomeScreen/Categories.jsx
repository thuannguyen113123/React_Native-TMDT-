import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const Categories = ({ categoryList }) => {
  const navigation = useNavigation();
  return (
    <View className="mt-2">
      <Text className="font-bold text-[16px]">Danh mục</Text>
      <FlatList
        data={categoryList}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            className="flex-1 items-center justify-center border-[1px] p-2 border-gray-400 m-1 rounded-lg"
            onPress={() => {
              navigation.navigate("itemList", {
                category: item.name,
              });
            }}
          >
            <Image source={{ uri: item?.icon }} className="w-[40px] h-[40px]" />
            <Text className="text-[14px] font-bold">{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
