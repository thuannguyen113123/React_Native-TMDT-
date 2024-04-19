import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { app } from "../../fireBaseConfig.jsx";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddPostScreen() {
  const db = getFirestore(app);
  // Create a root reference
  const storage = getStorage();

  const [categoryList, setCategoryList] = useState([]);
  // Sử dụng hook useOAuth để bắt đầu OAuth flow
  const { user } = useUser();

  //Tạo trạng thái loading
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  //Chọn ảnh từ thư viện ảnh của bạn
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

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

  const onSubmitMethod = async (value) => {
    setLoading(true);
    //Chuyển URI sang dạng blob(Nhị phân)
    const resp = await fetch(image);
    const blob = await resp.blob();

    //Tham chiếu đến thư mục cần lưu trữ trong firebase
    const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");

    try {
      // Upload ảnh lên storage
      const snapshot = await uploadBytes(storageRef, blob);
      console.log("Đã tải một  tệp tin nhị phân hoặc tệp!");

      // Lấy đường dẫn của ảnh từ storage
      const downloadURL = await getDownloadURL(storageRef);
      value.image = downloadURL;
      //Lấy người dùng đã đăng bài
      value.userName = user.fullName;
      value.userEmail = user.primaryEmailAddress.emailAddress;
      value.userImage = user.imageUrl;

      // Thêm dữ liệu vào collection UserPost
      const docRef = await addDoc(collection(db, "UserPost"), value);
      if (docRef.id) {
        setLoading(false);
        Alert.alert("Bài viết đã đăng thành công");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    //Dùng KeyboardAvoidingView có thể cuộng lên xuống khi màng hình hiện bàn phím
    <KeyboardAvoidingView>
      <ScrollView className="p-10">
        <Text className="font-bold text-[28px] text-center">Thêm sản phẩm</Text>
        <Text className="text-gray-500 text-[14px] text-center mb-6">
          Tạo sản phẩm và bắt đầu bán
        </Text>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            category: "",
            address: "",
            price: "",
            image: "",
            userName: "",
            userEmail: "",
            userImage: "",
            createAt: Date.now(),
          }}
          onSubmit={(value) => {
            onSubmitMethod(value);
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              console.log("Không có tiêu đề");
              ToastAndroid.show("Bạn phải nhập tiêu đề", ToastAndroid.SHORT);
              errors.title = "Bạn phải nhập tiêu đề";
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/placeholder.jpg")}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Tiêu đề"
                value={values?.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                style={styles.input}
                placeholder="Mô Tả"
                numberOfLines={2}
                value={values?.desc}
                onChangeText={handleChange("desc")}
              />

              <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={values?.address}
                onChangeText={handleChange("address")}
              />

              <TextInput
                style={styles.input}
                placeholder="Giá"
                value={values?.price}
                onChangeText={handleChange("price")}
                keyboardType="number-pad"
              />
              {/* Danh sách danh mục */}
              <View style={{ borderRadius: 10, borderWidth: 2, marginTop: 15 }}>
                <Picker
                  selectedValue={values?.category}
                  className="border-2"
                  onValueChange={(itemValue) =>
                    setFieldValue("category", itemValue)
                  }
                >
                  {categoryList.length > 0 &&
                    categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item?.name}
                        value={item?.name}
                      />
                    ))}
                </Picker>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-500 p-4 rounded-full mt-6"
                style={{
                  backgroundColor: loading ? "#ccc" : "#007BFF",
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-center font-bold text-[16px]">
                    Xác nhận
                  </Text>
                )}
              </TouchableOpacity>
              {/* <Button onPress={handleSubmit} title="Xác nhận" className="mt-7" /> */}
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    textAlignVertical: "top",
  },
});
