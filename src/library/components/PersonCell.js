import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import R from "res/R";
const { width } = Dimensions.get('window');

const PersonCell = (props) => {
    
  return (<TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View style={[styles.container, { flexDirection: "row" }]}>
              <View  style={[styles.infoContainer, { flexDirection: "row" }]}>
                <View><Image source={ { uri: props.image } } onError={ error => alert(error) } style={styles.profileImageSmallRound} /></View>
                <View style={{justifyContent: "center", marginLeft: 10}}>
                  <View style={ styles.nameContainer }>
                    <Text style={styles.name}>{props.name}{props.id}</Text>
                  </View>
                  <View style={ styles.nameContainer }>
                    <Text style={styles.email}>{props.email}</Text>
                  </View>
                  <View style={ styles.nameContainer }>
                    <Text style={styles.phone}>{props.phone}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>);
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
    color: R.colors.text,
    fontWeight: "bold",
    fontSize: 15
  },
  email: {
    color: "#dddddd",
    fontSize: 12
  },
  phone: {
    color: "#dddddd",
    fontSize: 12
  },

  infoContainer: {
    flex: 1,
    // height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  timeContainer: {
    flexDirection: "row", 
    justifyContent: "center",
    flex: 1,
  },
  nameContainer: {
    color: R.colors.text,
    fontWeight: "bold",
  },
  timeLabel: {
  },
  timeIcon: {
    paddingTop: 4,
  },
  timeContent: {
    fontWeight: "300",
    marginLeft: 5,
    marginTop: 2
  },
  imageRound: {
    borderRadius: 70,
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