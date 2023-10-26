import React from 'react';
import { useState } from "react";
import {FlatList, StyleSheet, Text, View, Button} from 'react-native';
import { useValues } from "./useValues.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'powderblue' 
  },
});

const FlatListBasics = () => {
  const [n, setN] = useState(9);
  // const [ numbers, setNumbers ] = useState([...Array(n).keys()].map((i) => i + 1));
  const [numbers, toggleUse] = useValues(9);
  const [numbers2, toggleUse2] = useValues(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={numbers}
        renderItem={({item}) => <Button 
            color='powderblue'
            onPress={() => {
                console.log('You tapped the button!');
                toggleUse(item);
                toggleUse2(item);
            }}
            title={`${item}`} />}
      />
      <FlatList
        data={numbers2}
        renderItem={({item}) => <Button 
            color='orange'
            onPress={() => {
                console.log('You tapped the button!');
                toggleUse(item);
                toggleUse2(item);
            }}
            title={`${item}`} />}
      />
    </View>
  );
};

export default FlatListBasics;