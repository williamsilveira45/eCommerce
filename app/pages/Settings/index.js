import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TopHeader from '../../components/TopHeader';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import {authLogout} from '../../redux/auth';
import Separator from '../../components/Separator';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          id: 1,
          name: <Text style={{color: colors.redColor}}>Logout</Text>,
          action: () => this.logout(),
        },
      ],
    };
  }

  logout() {
    this.props.logout();
    this.props.navigation.navigate('Login');
  }

  renderOption(option) {
    const {item} = option;
    return (
      <TouchableOpacity
        onPress={() => item.action()}
        style={styles.itemContainer}>
        {item.name}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <>
        <TopHeader
          centerComponent={<Text style={{fontSize: 18}}>Configurações</Text>}
        />
        <View style={styles.container}>
          <FlatList
            style={{flex: 0.9, flexGrow: 0.9}}
            data={this.state.options}
            renderItem={item => this.renderOption(item)}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => (
              <Separator width={'100%'} height={0.5} />
            )}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: colors.white,
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
