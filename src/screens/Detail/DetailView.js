/**
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  Button,
  NativeModules,
  TouchableOpacity,
  Platform
} from "react-native";

import { connect } from "react-redux";
import { getDetails } from "../../redux/actions/getDetails";

import R from "res/R";
const { width } = Dimensions.get('window');
class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      limit: 3,
      page: 0,
      nextPageAvailable: false,
      person: {},
      details: {}
    }
    this.placeCall = this.placeCall.bind(this);
  }

  componentDidMount() {
    this.setState(prev => {
      return {
        ...prev,
        person: this.props.selectedPerson
      }
    });
    /**
     * Let's fetch both activities and deals
     */
    this.props.onFetchDetails(this.props.selectedPerson, this.state.page, this.state.limit);
  }

  componentWillUnmount() {
  }
  
  /** 
   * Using NativeModule, let's expose a method in our native platform (ios)
   * to place a call by triggering link to dialer
   **/
  placeCall = (phone) => {
    if (Platform.OS === "ios") {
      NativeModules.CallBridge.makeCall("123");
    }
  }

  renderDeals = (deals) => {
    let dealView = []
    if(deals) {  
      deals.map((deal) => {
        dealView.push(
          <View key={deal.id} style={{flexDirection: "row"}}>
            <View style={{justifyContent: "center", flex: 2}}>
              <Text style={styles.sectionDescription}>{deal.title}</Text>
              <Text style={styles.status}>{deal.formatted_value}</Text>
            </View>
            <View style={{justifyContent: "center", flex: 1}}>
              <Text style={styles.infoHeading}>Expires in</Text>
              <Text style={styles.infoDate}>{deal.expected_close_date}</Text>
            </View>
          </View>
        )
      });  
    } else {
      dealView.push(
        <View style={{flexDirection: "row", flex: 1}}>
          <Text style={styles.sectionDescription}>This person has no deals yet</Text>
        </View>
      );
    }
    return dealView;
  }

  renderActivities = (activities) => {
    let activityView = []
    if(activities) {  
      activities.map((activity) => {
        activityView.push(
          <View key={activity.id} style={{flexDirection: "row"}}>
            <View style={{justifyContent: "center", flex: 2}}>
              <Text style={styles.sectionDescription}>{activity.subject}</Text>
              <Text style={{textAlign: "left"}}>{ activity.active_flag ? "active" : "inactive" }</Text>
            </View>
            <View style={{justifyContent: "center", flex: 1}}>
              <Text style={styles.infoHeading}>Activity type</Text>
              <Text style={styles.infoDate}>{activity.type}</Text>
            </View>
          </View>
        )
      });  
    } else {
      activityView.push(
        <View style={{flexDirection: "row", flex: 1}}>
          <Text style={styles.sectionDescription}>This person has no activity yet</Text>
        </View>
      );
    }
    return activityView;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          > 
            <View style={{flexDirection: "row" }}>
              <View><Image source={ { uri: this.state.person.image } } onError={ error => alert(error) } style={styles.profileImage} /></View>
              <View style={{justifyContent: "center", marginTop: 10}}>
                <View><Text style={styles.sectionTitle}>{this.state.person.name}</Text></View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.sectionContainer, [{marginTop: 10, marginLeft: 10}]}>
                <Text style={styles.sectionTitle}>Contact Details</Text>
              </View>
              <View style={styles.sectionContainer}>
                <View><Text style={styles.sectionDescription}>{this.state.person.email}</Text></View>
                <View style={{flexDirection: "row" }}><Text style={styles.sectionDescription}>{this.state.person.phone}</Text>
                  <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => this.placeCall(this.state.person.phone)}
                  underlayColor='#fff'>
                    <Text style={styles.callText}>Call</Text>
                  </TouchableOpacity>                
                </View>
                <View><Text style={styles.sectionDescription}>{this.state.person.company_name}</Text></View>
                <View><Text style={styles.sectionDescription}>{this.state.person.address}</Text></View>
              </View>
              <View style={styles.sectionContainer, [{marginTop: 10, marginLeft: 10}]}>
                <Text style={styles.sectionTitle}>Deals</Text>
              </View>
              <View style={styles.sectionContainer}>
                { this.renderDeals(this.props.details.deals) }
              </View>
              <View style={styles.sectionContainer, [{marginTop: 10, marginLeft: 10}]}>
                <Text style={styles.sectionTitle}>Activities</Text>
              </View>
              <View style={styles.sectionContainer}>
                { this.renderActivities(this.props.details.activities) }
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.details.details,
    page_available: state.details.details.next_page_available,
    page_start: state.details.details.next_page_start
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDetails: (person, page, limit) => dispatch(getDetails(person, page, limit))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    backgroundColor: "#ffffff"
  },
  body: {
    backgroundColor: "#ffffff"
  },
  sectionContainer: {
    marginTop: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    marginLeft: 10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: R.colors.title
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: R.colors.title
  },
  status: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "300",
    color: R.colors.title,
  },
  infoHeading: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "300",
    color: R.colors.title,
    fontStyle: "italic",
    textAlign: "right"
  },
  infoDate: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "400",
    color: R.colors.title,
    textAlign: "right"
  },

  profileImage: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: (width / 10) * 2.0,
    height: (width / 10) * 2.0,
    borderRadius: ((width / 10) * 2.0) / 2,
    borderColor: R.colors.white,
    borderWidth: 1,
  },
  callButton:{
    backgroundColor: "#1E6738",
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    marginLeft: 10,
    borderColor: "#ffffff"
  },
  callText:{
      color: "#fff",
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 5,
      textAlign: "center",
  }  
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);