import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Component/HomeScreen/Header.jsx";
import Slider from "../Component/HomeScreen/Slider.jsx";
import { app } from "../../fireBaseConfig.jsx";
import { getFirestore, orderBy } from "@firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Categories from "../Component/HomeScreen/Categories.jsx";
import LastestItemList from "../Component/HomeScreen/LastestItemList.jsx";

export default function HomeScreen() {
  //Lấy dữ liệu
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [lastestItemList, setLastestItemList] = useState([]);

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLastestItemList();
  }, []);

  //Lấy dữ liệu hiện lên slider
  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };
  //Lấy danh mục
  const getCategoryList = async () => {
    try {
      setCategoryList([]); // Xóa danh sách danh mục cũ
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        setCategoryList((prevCategoryList) => [
          ...prevCategoryList,
          doc.data(),
        ]);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
  //Lấy sản phẩm mới nhật
  const getLastestItemList = async () => {
    try {
      setLastestItemList([]); // Xóa danh sách danh mục cũ
      const querySnapshot = await getDocs(
        collection(db, "UserPost"),
        orderBy("createAt", "desc")
      );
      querySnapshot.forEach((doc) => {
        setLastestItemList((lastestItemList) => [
          ...lastestItemList,
          doc.data(),
        ]);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  return (
    <ScrollView className="px-6 py-8 flex-1 bg-white">
      <Header />
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* Danh mục */}
      <Categories categoryList={categoryList} />
      {/* Sản phẩm mới nhất */}
      <LastestItemList
        lastestItemList={lastestItemList}
        headingTitle={"Sản phẩm mới nhất"}
      />
    </ScrollView>
  );
}
