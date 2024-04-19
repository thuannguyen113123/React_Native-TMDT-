import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  Share,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { app } from "../../fireBaseConfig";
import { async } from "@firebase/util";

const ProductDetail = ({ navigation }) => {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);

  const { user } = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();

  useEffect(() => {
    //console.log(params);
    params && setProduct(params.product);
    shareButton();
  }, [params, navigation]);

  const sendMessageEmail = () => {
    const subject = "Vê" + product?.title;
    const body =
      "Chào" + product.userEmail + "\n" + "Tôi quan tâm đến sản phẩm này";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject" + subject + "&body=" + body
    );
  };

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo
          name="share"
          size={24}
          color="white"
          style={{ marginRight: 15 }}
          onPress={() => {
            shareProduct();
          }}
        />
      ),
    });
  };
  const shareProduct = async () => {
    const content = {
      message: product?.title + "\n" + product?.desc,
    };
    Share.share(content).then(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const deleteMyPost = async () => {
    Alert.alert("Xóa bài viết", "Bạn chắc muốn xóa bài viết", [
      {
        text: "Đồng ý",
        onPress: () => {
          deleteFromFirestore();
        },
      },
      {
        text: "Hủy",
        onPress: () => {
          console.log("Hủy");
        },
      },
    ]);
  };
  const deleteFromFirestore = async () => {
    console.log("click me");
    const q = query(
      collection(db, "UserPost"),
      where("title", "==", product.title)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then((resp) => {
        console.log("Đã xóa");
        nav.goBack();
      });
    });
  };
  return (
    <ScrollView className="bg-white">
      <Image
        source={{ uri: product?.image }}
        className="w-full h-[280px] object-contain"
      />
      <View className="p-4">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="text-[18px] p-1 px-2 rounded-full mt-2 text-blue-400 bg-blue-200">
            {product?.category}
          </Text>
          <Text className="text-[20px] font-bold mt-3">Mô tả</Text>
          <Text className="text-[16px] text-gray-500">{product?.desc}</Text>
        </View>
      </View>

      {/* Thông tin người dùng */}
      <View className="p-4 flex flex-row gap-2 items-center bg-blue-100 border-gray-400">
        <Image
          source={{ uri: product?.userImage }}
          className="h-[40px] w-[40px] rounded-full"
        />
        <View>
          <Text className="font-bold text-[18px]">{product?.userName}</Text>
          <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>

      {/* Liện hệ người dùng */}
      {user?.primaryEmailAddress.emailAddress == product?.userEmail ? (
        <TouchableOpacity
          onPress={deleteMyPost}
          className="bg-red-500 m-2 p-4 z-40 rounded-full"
        >
          <Text className="text-center text-white ">Xóa bài viết</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={sendMessageEmail}
          className="bg-blue-500 m-2 p-4 z-40 rounded-full"
        >
          <Text className="text-center text-white ">Gữi tin nhắn</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ProductDetail;
