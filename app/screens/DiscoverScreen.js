import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, StatusBar, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { X_RapidAPI_Key, GOOGLE_PLACES_API_KEY } from '../api_keys';

const getData = async (location, type) => {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          ...location,
          limit: '30',
        },
        headers: {
          'X-RapidAPI-Key': X_RapidAPI_Key,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const DiscoverScreen = () => {
  const [location, setLocation] = useState(null);
  const [type, setType] = useState('restaurants');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getData(location, type).then(data => {
      setData(data);
      setIsLoading(false);
    });
  }, [type]);

  const handlePress = (type) => {
    setType((prevType) => {
      if (prevType === type) {
        setIsLoading(true);
        getData(location, type).then(data => {
          setData(data);
          setIsLoading(false);
        });
      }
      return type;
    });
  };

  const handleSelectedPlace = (data, details = null) => {
    setLocation({
      bl_latitude: details?.geometry?.viewport?.southwest?.lat,
      bl_longitude: details?.geometry?.viewport?.southwest?.lng,
      tr_latitude: details?.geometry?.viewport?.northeast?.lat,
      tr_longitude: details?.geometry?.viewport?.northeast?.lng,
    });
    setIsLoading(true);
    getData(location, type).then(data => {
      setData(data);
      setIsLoading(false);
    });
  };

  return (
    <View className='flex-1 bg-gray-50 p-6' style={styles.androidSafeArea}>
      <View className='flex-row justify-between my-6'>
        <View>
          <Text className='text-4xl font-semibold text-gotravel-primary-700'>
            Discover
          </Text>
          <Text className='text-3xl'>
            the beauty today
          </Text>
        </View>
        <View>
          <Image className='w-12 h-12 rounded' source={require('E:/Career/Mobile\ Development/React\ Native/GoTravel/app/assets/avatar.png')} />
        </View>
      </View>
      <View className='flex-row items-center rounded border bg-white border-gotravel-black-100 pt-[6] px-2 shadow-lg mb-4'>
        <GooglePlacesAutocomplete
          placeholder='Search'
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          fetchDetails={true}
          onPress={handleSelectedPlace}
          onFail={error => console.error(error)}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
        />
      </View>
      <View className='mb-6 flex-row justify-evenly'>
        <TouchableOpacity onPress={() => { handlePress('hotels'); }}>
          <View>
            <View className={`${type === 'hotels' && 'bg-gray-200'} w-16 h-16 rounded-full justify-center items-center`}>
              <Image className='w-12 h-12' source={require('E:/Career/Mobile\ Development/React\ Native/GoTravel/app/assets/hotel.png')} />
            </View>
            <Text className='font-semibold text-center mt-2 text-gotravel-primary-600'>
              Hotels
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { handlePress('restaurants'); }}>
          <View>
            <View className={`${type === 'restaurants' && 'bg-gray-200'} w-16 h-16 rounded-full justify-center items-center`}>
              <Image className='w-12 h-12' source={require('E:/Career/Mobile\ Development/React\ Native/GoTravel/app/assets/restaurants.png')} />
            </View>
            <Text className='font-semibold text-center mt-2 text-gotravel-primary-600'>
              Restaurants
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { handlePress('attractions'); }}>
          <View>
            <View className={`${type === 'attractions' && 'bg-gray-200'} w-16 h-16 rounded-full justify-center items-center`}>
              <Image className='w-12 h-12' source={require('E:/Career/Mobile\ Development/React\ Native/GoTravel/app/assets/attraction.png')} />
            </View>
            <Text className='font-semibold text-center mt-2 text-gotravel-primary-600'>
              Attractions
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        location ?
          isLoading
            ?
            <View className='flex-1 justify-center items-center'>
              < ActivityIndicator size="large" color="#00bcc9" />
            </View>
            : <ScrollView>
              <View className='flex-row justify-between mb-6'>
                <Text className='text-2xl font-semibold text-gotravel-primary-700'>
                  {`Top ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </Text>
                <TouchableOpacity className='flex-row items-center'>
                  <Text className='text-2xl font-semibold text-[#a0c4c7] mr-2'>
                    Explore
                  </Text>
                  <FontAwesome name="long-arrow-right" size={24} color='#a0c4c7' />
                </TouchableOpacity>
              </View>
              <View className='flex-row flex-wrap justify-evenly'>
                {data?.length ?
                  data?.map((item, index) =>
                    <TouchableOpacity key={index} onPress={() => {
                      navigation.navigate('Details', {
                        param: item
                      });
                    }}>
                      <View className='m-2 p-3 bg-white rounded-xl'>
                        <Image className='rounded mb-2 w-24 h-24' src={`${item?.photo?.images?.medium?.url}`} />
                        <Text className='font-semibold text-md mb-1 text-gotravel-primary-700'>{item?.name?.length > 15 ? `${item?.name.slice(0, 15)}...` : item?.name}</Text>
                        <View className='flex-row items-center'>
                          <EvilIcons name="location" size={20} color='#7f8093' />
                          <Text className='text-gotravel-black-300'>{item?.location_string?.length > 12 ? `${item?.location_string.slice(0, 12)}...` : item?.location_string}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                  :
                  <View className='flex-1 justify-center items-center'>
                    <Image className='mb-4 object-cover w-32 h-32' source={require('E:/Career/Mobile\ Development/React\ Native/GoTravel/app/assets/NotFound.png')} />
                    <Text className='text-2xl font-semibold text-gray-600'>Opps... No Data Found</Text>
                  </View>
                }
              </View>
            </ScrollView>
          :
          <View className='flex-1 justify-center items-center'>
            <Image className='mb-4 object-cover w-40 h-40' source={require('E:/Career/Mobile\ Development/React\ Native/GoTravel/app/assets/smile.png')} />
            <Text className='text-2xl font-semibold text-gray-600'>Please, Enter Your Destination.</Text>
          </View>
      }
    </View >
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});

export default DiscoverScreen;