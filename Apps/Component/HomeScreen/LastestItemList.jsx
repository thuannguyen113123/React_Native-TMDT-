import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import PostItem from "./PostItem";

const LastestItemList = ({ lastestItemList, headingTitle }) => {
  return (
    <View className="mt-2">
      <Text className="font-bold text-[16px]">{headingTitle}</Text>
      <FlatList
        data={lastestItemList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
          >
            <PostItem item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default LastestItemList;
