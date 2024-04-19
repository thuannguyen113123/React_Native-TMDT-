import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "@firebase/firestore";
import { app } from "../../fireBaseConfig";
import LastestItemList from "../Component/HomeScreen/LastestItemList";

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  //Lấy tất cả sản phẩm
  const getAllProduct = async () => {
    setListProduct([]);
    const q = query(collection(db, "UserPost"), orderBy("createAt", "desc"));

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setListProduct((listProduct) => [...listProduct, doc.data()]);
    });
  };
  return (
    <ScrollView className="p-5 py-8">
      <Text className="font-bold text-[30px]">Tìm hiểu thêm</Text>
      <LastestItemList lastestItemList={listProduct} />
    </ScrollView>
  );
}
