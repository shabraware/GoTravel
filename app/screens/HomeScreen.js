import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <View className='flex-1 bg-white px-6' style={styles.androidSafeArea}>
      <View className='flex-row mt-6 mb-6 items-center'>
        <View className='w-16 h-16 bg-black rounded-full mr-4 items-center justify-center'>
          <Text className='text-3xl font-semibold text-gotravel-primary-500'>Go</Text>
        </View>
        <Text className='text-3xl font-semibold text-gotravel-black-500'>
          Travel
        </Text>
      </View>
      <View>
        <Text className='font-semibold text-4xl text-gotravel-black-500'>
          Enjoy the trip with
        </Text>
        <Text className='mb-4 font-bold text-4xl text-gotravel-primary-500'>
          Good Moments
        </Text>
        <Text className='text-gotravel-black-400 text-base'>
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        </Text>
      </View>
      <View className='flex-1'>
        <View className='w-80 h-80 rounded-full bg-gotravel-primary-500 absolute -right-40 bottom-16' />
        <View className='w-72 h-72 rounded-full bg-gotravel-secondary-500 absolute -bottom-20 -left-20' />
        <Image source={require('E:/Career/Mobile\ Development/React\ Native/GoTravel/app/assets/hero.png')} className='w-full h-full' />
        <View className='absolute top-0 left-0 right-0 bottom-0 flex-col-reverse mb-16 items-center'>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Discover');
          }}>
            <Animatable.View animation='pulse' easing='ease-in-out' iterationCount='infinite' className='w-20 h-20 rounded-full items-center justify-center border-x-2 border-t-4 border-gotravel-primary-500'>
              <View className='bg-gotravel-primary-500 w-[90%] h-[90%] rounded-full items-center justify-center'>
                <Text className='text-3xl font-semibold text-white'>Go</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});

export default HomeScreen;