import { View, ScrollView, Text, Platform, StatusBar, StyleSheet, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const DetailsScreen = ({ route }) => {
  const item = route?.params?.param;
  console.log(item);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);
  return (
    <ScrollView className='flex-1 bg-white p-6' style={styles.androidSafeArea}>
      <View className='my-4'>
        <Image className='rounded-xl w-full h-72' src={`${item?.photo?.images?.large?.url}`} />
        <View className='absolute right-0 left-0 flex-row justify-between p-4'>
          <TouchableOpacity onPress={() => { navigation.navigate('Discover'); }} className='bg-white p-1 rounded w-8 h-8 items-center justify-center'>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="#00bcc9" />
          </TouchableOpacity>
          <TouchableOpacity className='bg-gotravel-primary-500 p-1 rounded w-8 h-8 items-center justify-center'>
            <AntDesign name="heart" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className='absolute right-0 left-0 bottom-0 flex-row justify-between p-4'>
          <View className='flex-row items-center'>
            <Text className='text-white mr-2'>{item?.price_level}</Text>
            <Text className='text-white text-xl font-bold'>{item?.price}</Text>
          </View>
          <View className='bg-gotravel-primary-200 rounded py-1 px-2 justify-center'>
            <Text>{item.open_now_text}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text className='font-bold text-2xl text-gotravel-primary-700'>{item?.name}</Text>
        <View className='flex-row items-center -ml-1 mb-2'>
          <EvilIcons name="location" size={26} color='#7f8093' />
          <Text className='text-gotravel-black-300 text-lg'>{item?.location_string}</Text>
        </View>
      </View>
      <View className='flex-row justify-between'>
        <View className='flex-row'>
          <View className='justify-center items-center rounded-xl mr-2 w-11 h-11 bg-gotravel-secondary-100'>
            <AntDesign name="star" size={24} color="#ba7551" />
          </View>
          <View className='justify-center'>
            <Text className='text-gotravel-black-300'>
              {item?.rating}
            </Text>
            <Text className='text-gotravel-black-300'>
              Rating
            </Text>
          </View>
        </View>
        <View className='flex-row'>
          <View className='justify-center items-center rounded-xl mr-2 w-11 h-11 bg-gotravel-secondary-100'>
            <FontAwesome name="dollar" size={24} color="#ba7551" />
          </View>
          <View className='justify-center'>
            <Text className='text-gotravel-black-300'>
              {item?.price_level}
            </Text>
            <Text className='text-gotravel-black-300'>
              Price Level
            </Text>
          </View>
        </View>
        <View className='flex-row'>
          <View className='justify-center items-center rounded-xl mr-2 w-11 h-11 bg-gotravel-secondary-100'>
            <Ionicons name="fast-food" size={24} color="#ba7551" />
          </View>
          <View className='justify-center'>
            <Text className='text-gotravel-black-300'>
              {item?.bearing}
            </Text>
            <Text className='text-gotravel-black-300'>
              Bearing
            </Text>
          </View>
        </View>
      </View>
      <Text className='my-3 text-gotravel-black-300'>
        {item?.description}
      </Text>
      <View className='flex-row flex-wrap'>
        {item?.cuisine.map(item => (
          <TouchableOpacity key={item.key} className='bg-green-200 p-1 m-1 rounded'>
            <Text>
              {item.name}
            </Text>
          </TouchableOpacity>
        )
        )}
      </View>
      <View className='my-3 p-3 rounded-lg bg-gray-100'>
        {item?.phone && <View className='flex-row items-center mb-2'>
          <View className='mr-2'>
            <AntDesign name="star" size={24} color="black" />
          </View>
          <Text>{item?.phone}</Text>
        </View>}
        {item?.email && <View className='flex-row items-center mb-2'>
          <View className='mr-2'>
            <AntDesign name="star" size={24} color="black" />
          </View>
          <Text>{item?.email}</Text>
        </View>}
        {item?.address && <View className='flex-row items-center mb-2'>
          <View className='mr-2'>
            <AntDesign name="star" size={24} color="black" />
          </View>
          <Text>{item?.address}</Text>
        </View>}
        <TouchableOpacity className='mt-4 p-4 bg-gotravel-primary-400 rounded-lg  mb-10 items-center justify-center'>
          <Text className='text-3xl font-semibold uppercase text-gray-100 tracking-wider'>
            book now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});

export default DetailsScreen;