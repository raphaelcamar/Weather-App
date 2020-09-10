import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class SearchInput extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            text : ''
        }
    }

    handleChangeText = text =>{
      this.setState({text : text});
      
    }

    handleSubmitEditing = ()=>{
        const {onSubmit} = this.props;
        const {text} = this.state;

        if(!text) return;

        onSubmit(text);
        this.setState({text : ''})
    }
      
    render() {
        const placeholder = this.props.placeholder;
        const text = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    placeholder={placeholder}
                    placeholderTextColor='white'
                    style={styles.textInput}
                    value={text}
                    onChangeText = {this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : 'rgba(102, 102, 102, .1)',
        height : 40,
        width : 300,
        marginHorizontal : 20,
        paddingHorizontal : 15,
        marginTop : 30,
        borderRadius : 5
    },
    textInput : {
      color : 'white',
      alignSelf : 'center',
      flex : 1
    }
});