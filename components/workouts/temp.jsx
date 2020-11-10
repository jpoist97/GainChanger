import React from 'react';
import { Text, View,} from 'react-native';
import AlphabetList from "react-native-section-alphabet-list";

const renderItem = (props) => {
   console.log(props);
   return (<View>
      <Text>item</Text>
   </View>)
}

const renderSectionHeader = (props) => {
   // console.log(props);
   return (<View>
      <Text>header</Text>
   </View>)
}

export default (props) => {
   return (
      <AlphabetList 
         data={[
       { value: 'Albania', key: 'AL' },
       { value: 'Canada', key: 'CA' },
       { value: 'Benin', key: 'BJ' },
       { value: 'Guinea', key: 'GN' },
       { value: 'Ethiopia', key: 'ET' },
       { value: 'Azerbaijan', key: 'AZ' },
       { value: 'Bermuda', key: 'BM' },
       { value: 'Greece', key: 'GR' },
       { value: 'Hong Kong', key: 'HK' },
       { value: 'Hungary', key: 'HU' },
       { value: 'India', key: 'IN' },
       { value: 'Ireland', key: 'IE' },
       { value: 'Dominica', key: 'DM' },
       { value: 'Jamaica', key: 'JM' },
       { value: 'Mexico', key: 'MX' },
       { value: 'Lithuania', key: 'LT' },
       { value: 'Luxembourg', key: 'LU' },
       { value: 'New Zealand', key: 'NZ' },
       { value: 'Portugal', key: 'PT' },
       { value: 'Japan', key: 'JP' },
       { value: 'France', key: 'FR' },
       { value: 'Egypt', key: 'EG' },
       { value: 'Finland', key: 'FI' },
       { value: 'China', key: 'CN' },
       { value: 'Denmark', key: 'DK' }
     ]}
         renderItem={renderItem}
         renderSectionHeader={renderSectionHeader}
         getItemHeight={() => 50}
         sectionHeaderHeight={50}
         indexLetterColor="#ff0"
         />
   );
};