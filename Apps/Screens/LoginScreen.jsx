import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser.tsx";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signaIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image
        className="w-full h-[60%] object-cover"
        source={require("../../assets/LogoLogin.webp")}
      />
      <View className="p-8 bg-white rounded-t-3xl mt-[-20px]">
        <Text className="text-[25px] font-bold text-center">
          Cộng đồng mua bán
        </Text>
        <Text className="text-[14px] text-center text-slate-500">
          Khám phá thế giới của sự tiện lợi
        </Text>
        <View>
          <TouchableOpacity
            onPress={onPress}
            className="bg-pink-500 p-4 mt-12 rounded-full"
          >
            <Text className="text-center font-bold text-[16px]">Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
