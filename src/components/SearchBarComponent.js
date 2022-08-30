import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
    height: 50,
  },
  searchbar_clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '100%', //'95%',
    height: 50,
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchbar_unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '100%', //'95%',
    height: 50,
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
});

const SearchBarComponent = ({
  clicked,
  searchPhrase,
  setClicked,
  setSearchPhrase,
  placeholderPhrase,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={clicked ? styles.searchbar_clicked : styles.searchbar_unclicked}>
        {clicked && (
          <Icon
            name="search"
            size={20}
            color="#000"
            style={styles.search_icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholderPhrase}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <Icon
            name="close"
            size={24}
            color="#000"
            style={{right: 6}}
            onPress={() => {
              setClicked(false);
              setSearchPhrase('');
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SearchBarComponent;
