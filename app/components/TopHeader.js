import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import colors from '../assets/colors';

class TopHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header
          leftContainerStyle={[
            styles.leftContainer,
            this.props.withoutCenter ? {flex: 0.5} : null,
            this.props.leftContainerStyle,
          ]}
          centerContainerStyle={[
            styles.centerContainer,
            this.props.withoutCenter ? {flex: 0} : null,
            this.props.centerContainerStyle,
          ]}
          rightContainerStyle={[
            styles.rightContainer,
            this.props.withoutCenter ? {flex: 0.5} : null,
            this.props.rightContainerStyle,
          ]}
          rightComponent={this.props.rightComponent}
          containerStyle={styles.container}
          leftComponent={this.props.leftComponent}
          centerComponent={this.props.centerComponent}
          statusBarProps={{backgroundColor: colors.white, translucent: true}}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    padding: 0,
  },
  centerContainer: {
    flex: 0.6,
  },
  leftContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
});

export default TopHeader;
