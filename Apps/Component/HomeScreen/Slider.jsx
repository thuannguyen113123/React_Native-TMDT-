import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const Slider = ({ sliderList }) => {
  return (
    <View className="mt-4">
      <FlatList
        data={sliderList}
        horizontal={true}
        //Ẩn thanh cuộn ngang
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{ uri: item?.Image }}
              className="w-[350px] h-[200px] mr-4 object-contain rounded-lg"
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
