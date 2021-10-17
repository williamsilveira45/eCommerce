import React, {Component} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }

  removeAccentuation(string) {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');
  }

  search(search) {
    if (search.length < 1) {
      this.props.resultOutput(this.props.dataInput);
      return;
    }

    const all = this.props.dataInput;
    const filter = this.props.fields
      .map((field) => {
        return all.filter((item) => {
          const itemSearch = this.removeAccentuation(item[field]);
          const searchInput = this.removeAccentuation(search);
          return itemSearch.indexOf(searchInput) > -1;
        });
      })
      .filter((result) => result.length > 0);

    this.props.resultOutput(filter[0]);
  }

  render() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <View style={{flex: 0.1, alignItems: 'center'}}>
            <Ionicons name="ios-search" size={20} color="#8E8D92" />
          </View>
          <View style={{flex: 0.8}}>
            <TextInput
              style={styles.searchInput}
              placeholder={'Pesquisar'}
              onChangeText={(search) => this.search(search)}
              autoFocus
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.toggleSearch()}
            style={{flex: 0.1, alignItems: 'center'}}>
            <Ionicons name="close" size={20} color="#8E8D92" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: '5%',
    marginHorizontal: '6%',
    flex: 0.04,
    paddingTop: '3%',
    paddingBottom: '3%',
    justifyContent: 'center',
  },
  searchInputContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 10,
  },
  searchInput: {
    paddingVertical: 0,
    fontSize: 18,
    height: 42,
    color: '#8E8D92',
    padding: '3%',
  },
});
