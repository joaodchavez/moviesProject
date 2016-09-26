import React, { Component } from 'react';
import {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight, 
  ScrollView
} from 'react-native';

const api = require('../Utils/api');
const Separator = require('./Helpers/Separator');
const Web_View = require('./Helpers/WebView');

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
   } 
});

class Dashboard extends React.Component{
  getRowTitle(movie, item){
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
  openPage(movieID){
    var url = `https://www.imdb.com/title/${movieID}`
    this.props.navigator.push({
      title: 'Web View',
      component: Web_View,
      passProps: {url}
    });
  }

  render(){
	var movieInfo = this.props.movieInfo;
	var topicArr = ['Title', 'Year', 'Released', 'Runtime', 'Genre', 'Actors', 'Plot'];
	var list = topicArr.map((item, index) => {
      if(!movieInfo[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>{this.getRowTitle(movieInfo, item)}</Text>
              <Text style={styles.rowContent}> {movieInfo[item]} </Text>
            </View>
            <Separator/>
          </View>
        )
      }
    });
    var buttonWeb = <TouchableHighlight
              onPress={this.openPage.bind(this, movieInfo["imdbID"])}
              underlayColor='transparent'>
              <Text style={styles.name}> access idmb </Text>
      </TouchableHighlight>;

    return(
      <ScrollView style={styles.container}>
        {list}
        {buttonWeb}
      </ScrollView>
    )
  }
};

Dashboard.propTypes = {
  movieInfo: React.PropTypes.object.isRequired
}

module.exports = Dashboard;