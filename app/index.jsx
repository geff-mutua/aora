import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants'
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const {isLoading,isLoggedIn}=useGlobalContext();

  if(!isLoading && isLoggedIn ) return <Redirect href={'/home'} />

  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingBottom:20
      }}>
        <View className=" w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="w-full h-[300px] max-w-[380px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">Discover Endless Posibilities with
              {' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 text-center text-sm font-pregular mt-7">Where creativity meets innovation: embark on a journey of limitless exploration with aora</Text>

          <CustomButton
            title={'Continue with Email'}
            handlePress={() => { router.push('/sign-in')}}
            containerStyles="w-full mt-7"
            textStyles=""

          />
          
        </View>

      </ScrollView>

      <StatusBar backgroundColor="#1a0113" style="light" />
    </SafeAreaView>
  );
}
