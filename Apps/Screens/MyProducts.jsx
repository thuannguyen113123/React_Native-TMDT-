import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { app } from "../../fireBaseConfig";
import { useUser } from "@clerk/clerk-expo";
import LastestItemList from "../Component/HomeScreen/LastestItemList";
import { useNavigation } from "@react-navigation/core";

const MyProducts = () => {
  //Lấy bài viết mà mình đã đăng
  const db = getFirestore(app);
  const { user } = useUser();

  const [myPost, setMyPost] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    user && getMyPost();
  }, [user]);

  useEffect(() => {
    navigation.addListener("focus", (e) => {
      getMyPost();
    });
  }, [navigation]);

  const getMyPost = async () => {
    setMyPost([]);
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setMyPost((myPost) => [...myPost, doc.data()]);
    });
  };
  return (
    <View>
      <LastestItemList lastestItemList={myPost} />
    </View>
  );
};

export default MyProducts;
