import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import R from "res/R";
const { width } = Dimensions.get('window');

const PersonCell = (props) => {    
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <View style={styles.container}>
        <View  style={styles.infoContainer}>
          <View><Image source={ { uri: props.image } } onError={ error => console.log(error) } style={styles.profileImageSmallRound} /></View>
          <View style={{justifyContent: "center", marginLeft: 10}}>
            <View>
              <Text style={styles.name}>{props.name}</Text>
            </View>
            <View>
              <Text style={styles.email}>{props.email}</Text>
            </View>
            <View>
              <Text style={styles.phone}>{props.phone}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    marginBottom: 1,
    backgroundColor: R.colors.white,    
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: R.colors.border_light_gray,
    shadowColor:R.colors.title
  },
  name: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: R.colors.title
  },
  email: {
    color: "#666666",
    fontSize: 15,
    fontWeight: "300",
  },
  phone: {
    color: "#555555",
    fontSize: 14,
    fontWeight: "500",
  },
  infoContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: "row"
  },
  profileImageSmallRound: {
    marginTop: 10,
    marginRight: 5,
    width: (width / 15) * 2.0,
    height: (width / 15) * 2.0,
    borderRadius: ((width / 15) * 2.0) / 2,
    borderColor: R.colors.white,
    borderWidth: 1,
  }
});
export default PersonCell;