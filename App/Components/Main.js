import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS, 
  Animated
} from 'react-native';

const api = require('../Utils/api');
const Dashboard = require('./Dashboard');

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      movieName: '',
      isLoading: false,
      error: false, 
      bounceValue: new Animated.Value(0),
      
    }
  }
  handleChange(e){
    this.setState({
      movieName: e.nativeEvent.text
    })
  }
  handleResponse(res){
    if(res.message === 'Not Found'){
      this.setState({
        error: 'Movie not found',
        isLoading: false
      })
    } else {
      this.props.navigator.push({
        title: res.Title || 'Movie Selected',
        component: Dashboard,
        passProps: {movieInfo:res}
      });
      this.setState({
        isLoading: false,
        error: false,
        movieName: ''
      });
    }
  }
  handleSubmit(){
    this.setState({
      isLoading: true,
    });
    api.getMovie(this.state.movieName)
      .then((jsonRes) => {console.log(jsonRes), this.handleResponse(jsonRes)})
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: `There was an error: ${err}`
        })
      })
  }

	componentDidMount() {
	    this.state.bounceValue.setValue(1.2);    
	    Animated.spring(                          
	      this.state.bounceValue,                 
	      {
	        toValue: 0.8,                         
	        friction: 1,                          
	      }
	    ).start();	                              
	  }  

  render() {
    var showErr = (
      this.state.error ? <Text>{this.state.error}</Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>
          Search for a Movie
        </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.movieName}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large">
         </ActivityIndicatorIOS>
        {showErr}
	      <Animated.Image                         
	        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
	        style={{
	          width: 350, 
	          height: 350,	
	          left: this.bounceValue, 	         
	          transform: [                        
	            {scale: this.state.bounceValue},
	          ]
	        }}
	      />    
      </View>
    );
  }
};

module.exports = Main;

