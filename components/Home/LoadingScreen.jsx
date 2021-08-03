import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import 'firebase/firestore';
import actions from '../../actions/index';

const LoadingScreen = ({ navigation }) => {
   const dispatch = useDispatch();
   const loadingStore = useSelector((state) => state.loading);
   const { workoutsLoaded, cyclesLoaded, exercisesLoaded } = loadingStore;

   // Begin loading data from Firebase on load
   useEffect(() => {
      dispatch(actions.initializeAppData());
   }, []);

   // If everything is loaded, navigate to Root
   if (workoutsLoaded && cyclesLoaded && exercisesLoaded) {
      // Timeout otherwise rerendering too many views at once and it shows a warning
      setTimeout(() => {
         navigation.navigate('Root');
      }, 100);
   }

   return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 255 }}>
         <Animatable.View animation="rotate" iterationCount="infinite">
            <Image
               // eslint-disable-next-line no-undef
               source={require('../../assets/logo.png')}
               style={{
                  width: 310,
                  height: 310,
               }}
            />
         </Animatable.View>
      </View>
   );
};

export default LoadingScreen;
