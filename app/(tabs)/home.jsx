import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from "../../constants"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {

  const { data: posts, refetch }=useAppwrite(getAllPosts);
  const { data: latestPosts }=useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  console.log(posts)

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard 
          video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-x-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100 mb-2">Welcome Back</Text>
                <Text className="text-3xl font-psemibold text-white">Geoffrey Mutua</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  className="w-9 h-10"

                />
              </View>
            </View>

            <SearchInput
              placeholder={"Search for a video topic"}
            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 mb-3 font-pregular text-lg">Latest Videos</Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video."
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <StatusBar style='light' backgroundColor='#1a0113' />
    </SafeAreaView>
  )
}

export default Home