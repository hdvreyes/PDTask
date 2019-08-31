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
  FlatList
} from "react-native";

import { connect } from "react-redux";
import { getPeople } from "../../redux/actions/getPeople";
import { startLoading, stopLoading } from "../../redux/actions/activityIndicator";
import PersonCell from "library/components/PersonCell";
import { Navigation } from "react-native-navigation";
import R from "res/R";

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      limit: 20,
      page: 0,
      nextPageAvailable: false,
      people: []
    }
  }

  componentDidMount() {
    //https://testtask-10d9c6.pipedrive.com/deals/user/10197983
   //https://testtask-10d9c6.pipedrive.com/v1/persons?start=0&limit=20&api_token=0b72f188500da77ba56b50bb8557c1dc7cbc8db6
   this.props.onFetchPeople(this.state.page, this.state.limit)
  }

  componentWillUnmount() {

  }

  static getDerivedStateFromProps(props, state) {
    console.log("+++++++++++")
    console.log('getDerivedStateFromProps');
    props.people.map((person) => {
      state.people.push(person)
    })
    state.nextPageAvailable = props.page_available
    if (props.page_available) {
      state.page = props.page_start
    }
    return state;
  }


  onPressPerson = (id) => {
    Navigation.push(this.props.componentId, {
      component: {
          name: "com.screen.LoginView",
          options: {
              topBar: {
                  animate: false,
                  drawBehind: false,
                  borderHeight: 0,
                  elevation: 0, // TopBar elevation in dp                        
                  title: {
                      text: "User"
                  }
              },                    
          }
      }
    });    
    // let employee = this.props.employees.filter(employee => employee.id === id)
    // this.setState(prev => {
    //     return {
    //       ...prev,
    //       selectedEmployee: employee
    //     }
    // })
    
    // let icons = [{
    //       id: 'usrIconBtn',
    //       text: '1',
    //       icon: getIcon("user")
    //     },
    //     {
    //       id: 'calIconBtn',
    //       text: '2',
    //       icon: getIcon("calendar-alt")
    //     }]
    // pushTo(routes.employeeProfile, this.props, employee[0], icons)
  }
  render() {
    // console.log(this.props.page_available);
    // console.log(this.props.page_start);

    // console.log(this.props.people);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList 
              style={[styles.listContainer]}
              data={this.state.people}
              keyExtractor={ item => item.id.toString() }
              renderItem={ ({item}) => 
                <PersonCell {...item} key={ item.id.toString() } onPress={ () => this.onPressPerson(item.id) } /> 
              }
              onEndReached={() => {
                if(this.state.nextPageAvailable) {
                  this.props.onFetchPeople(this.state.page, this.state.limit)
                }
                console.log("fired"); // keeps firing
              }}
              onEndReachedThreshold={0.1}              
              />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    width: "100%"
  },
  scrollView: {
    backgroundColor: "#ffffff"
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: "#ffffff"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
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
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: R.colors.title,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  }
});

const mapStateToProps = (state) => {
  
  return {
    details: state.people.details,
    people: state.people.people,
    page_available: state.people.next_page_available,
    page_start: state.people.next_page_start
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPeople: (page, limit) => dispatch(getPeople(page, limit)),
    onActivityStart: () => dispatch(startLoading()),
    onActivityStop: () => dispatch(stopLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);