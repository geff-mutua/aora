import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {

    if (!form.email || !form.password) {
      Alert.alert("Sign In Failed.", "Please fill all the details")
      return;
    }

    setIsSubmitting(true)

    try {
      const results = await signIn(form.email, form.password)
      router.push("/home")
    } catch (error) {
      Alert.alert("Error", "Something went wrong, try again later")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[95vh]  justify-center px-4 h-full">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"

          />
          <Text className="text-white font-psemibold mt-10 text-2xl">Login to Aora</Text>

          <FormField
            title="Email"
            value={form.email}
            otherStyles="mt-7"
            handleTextChange={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder={'Enter your email address'}
          />
          <FormField
            title="Password"
            value={form.password}
            otherStyles="mt-7"
            handleTextChange={(e) => setForm({ ...form, password: e })}
            placeholder={'Enter your password'}


          />

          <CustomButton
            title={'Sign In'}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don`t have an account?</Text>
            <Link className='text-lg font-psemibold text-secondary-100' href={'/sign-up'}>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn