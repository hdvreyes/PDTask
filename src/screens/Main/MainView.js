/**
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text
} from "react-native";

import { connect } from "react-redux";
import { getPeople } from "../../redux/actions/getPeople";
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
   this.props.onFetchPeople(this.state.page, this.state.limit)
  }

  componentWillUnmount() {

  }

  static getDerivedStateFromProps(props, state) {
    props.people.map((person) => {
      state.people.push(person)
    })
    state.nextPageAvailable = props.page_available
    if (props.page_available) {
      state.page = props.page_start
    }
    if(state.people.length > 0) {
      state.loading = false
    }
    return state;
  }


  onPressPerson = (person) => {
    this.props.person = [];
    Navigation.push(this.props.componentId, {
      component: {
        name: "com.screen.DetailView",
        options: {
          topBar: {
            animate: false,
            drawBehind: false,
            borderHeight: 0,
            elevation: 0, // TopBar elevation in dp                        
            title: {
              text: person.name
            }
          },
        },
        passProps: {
          selectedPerson: {
            ...person
          }
        }    
      }
    });
  }

  renderIndicator = () => {
    if (this.state.loading) {
      return <View style={styles.loading}>
              <ActivityIndicator size="large" color="#666666" />
             </View>
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList 
              style={[styles.listContainer]}
              data={this.state.people}
              keyExtractor={ item => item.id.toString() }
              renderItem={ ({item}) => 
                <PersonCell 
                {...item} key={ item.id } 
                onPress={ () => this.onPressPerson(item) } 
                /> 
              }
              onEndReached={() => {
                if(this.state.nextPageAvailable) {
                  this.props.onFetchPeople(this.state.page, this.state.limit)
                }
              }}
              onEndReachedThreshold={0.1}
              ListHeaderComponent={() => (!this.state.people.length? 
                <View style={styles.emptyPersonsContainer}>
                  <Text style={styles.emptyPersonsText}>No available persons!</Text>
                </View>
                : null)
              }     
              />
        </SafeAreaView>
        {
          this.renderIndicator()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.white,
  },
  listContainer: {
    width: "100%"
  },
  scrollView: {
    backgroundColor: R.colors.white
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyPersonsContainer: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    flexDirection: "row",

  },
  emptyPersonsText: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    textAlign: "center"
  }
});

const mapStateToProps = (state) => {
  return {
    people: state.people.people,
    page_available: state.people.next_page_available,
    page_start: state.people.next_page_start
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPeople: (page, limit) => dispatch(getPeople(page, limit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);