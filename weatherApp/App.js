import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import SearchInput from './components/searchInput';
import getImageForWeather from './helpers/getImageForWeather';
import {fetchLocationId, fetchWeather} from './helpers/api'

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading : false,
      error : false,
      temperature : 0,
      weather : '',
      location : ''
    }
  }

  componentDidMount(){
    this.handleUpdateLocation('São Paulo')
  }

  handleUpdateLocation = city =>{
    if(!city) return;

    this.setState(
      {loading : true},
        async () => {
          try{
            const locationId = await fetchLocationId(city);
            const {location, weather, temperature} = await fetchWeather(locationId);

            this.setState({
              loading : false,
              error : false,
              temperature,
              weather,
              location
            })
          }catch(error){
          this.setState({
            loading : false,
            error : true
          });
        }
      });
    

    this.setState({location : city})
  }

  renderInfo(error){
    if(!error){
      const {
      location,
      weather,
      temperature,
      } = this.state;
      return (
        <>
        <Image style={styles.image} 
            source={getImageForWeather(weather)}
          />
          <Text style={[styles.largeText, styles.textStyle]}>
            {location}
          </Text>
          <Text style={[styles.smallText, styles.textStyle]}>
            {weather}
            </Text>
          <Text style={[styles.largeText, styles.textStyle]}>
            { Math.round(temperature) }&deg;
            </Text>  
            </>
      );
    }else{
      return(
        <>
        <Image style={styles.image}
          source={getImageForWeather('Error')}
        />
      <Text style={[styles.smallText, styles.textStyle]}>
        Não foi possível carregar a cidade pesquisada
      </Text>
      </>
      )
    }
  }

  render() {
    const {
      loading,
      error
    } = this.state;
    return (
        <View style={styles.container}>
          <StatusBar barStyle='dark-content'/>
          <ActivityIndicator
            animating = {loading}
            color={'white'} 
            size={'large'}/>
          {!loading && this.renderInfo(error)}
           <SearchInput 
           placeholder='Procure a cidade desejada'
           onSubmit={this.handleUpdateLocation}
           />
        </View>
      
    );
  }

};
const styles = StyleSheet.create({
  container : {
    backgroundColor : '#2b2b2b',
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  }, 
  textStyle : {
    textAlign : 'center',
    fontFamily : 'Roboto',
    color:'white',
  },
  largeText : {
    fontSize : 40 
  },
  smallText : {
    fontSize : 18
  },
  image : {
    width : 128,
    height : 128,
    marginBottom : 20,
    resizeMode : 'contain'
  }
});

export default App;
