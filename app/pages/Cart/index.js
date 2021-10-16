import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import TopHeader from '../../components/TopHeader';
import colors from '../../assets/colors';
import {connect} from 'react-redux';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingAll: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
});

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
