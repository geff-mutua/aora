import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
  const [form, setForm] = useState({
    username:'',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)


  const submit = () => {

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[95vh] justify-center px-4 h-full">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"

          />
          <Text className="text-white font-psemibold mt-10 text-2xl">Sign Up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            otherStyles="mt-7"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            placeholder={'Enter your username'}
          />
           
          <FormField
            title="Email"
            value={form.email}
            otherStyles="mt-7"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder={'Enter your email address'}
          />
          <FormField
            title="Password"
            value={form.password}
            otherStyles="mt-7"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder={'Enter your password'}


          />

          <CustomButton
            title={'Sign In'}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link className='text-lg font-psemibold text-secondary-100' href={'/sign-in'}>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp