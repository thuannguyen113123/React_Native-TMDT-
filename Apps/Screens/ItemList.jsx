import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { getDocs, getFirestore, query, where } from "@firebase/firestore";
import { collection } from "firebase/firestore";
import { app } from "../../fireBaseConfig";
import LastestItemList from "../Component/HomeScreen/LastestItemList";

const ItemList = () => {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    try {
      setItemList([]);
      setLoading(true);
      const q = query(
        collection(db, "UserPost"),
        where("category", "==", params.category)
      );

      const snapshot = await getDocs(q);
      setLoading(false);
      snapshot.forEach((doc) => {
        console.log(doc.data());
        setItemList((itemList) => [...itemList, doc.data()]);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View className="p-2">
      {loading ? (
        <ActivityIndicator color="#3b82f6" size={"large"} />
      ) : itemList?.length > 0 ? (
        <LastestItemList
          lastestItemList={itemList}
          headingTitle={"Sản phẩm theo danh mục"}
        />
      ) : (
        <Text className="text-center text-[18px] text-gray-500 mt-[30px]">
          Không tìm thấy sản phẩm
        </Text>
      )}
    </View>
  );
};

export default ItemList;
