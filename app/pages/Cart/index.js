import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopHeader from '../../components/TopHeader';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import {clearCart, removeProduct} from '../../redux/cart';
import {currencyFormat} from '../../assets/functions';
import Separator from '../../components/Separator';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  checkout() {
    if (this.state.loading) {
      return;
    }


    const date = moment().format('DD/MM/YYYY HH:mm:ss');

    let htmlContent = '<html><head></head><body style="margin:0;padding:0;">';
    htmlContent += `<h3>eCommerce - Pedido em ${date}</h3>`;
  }

  getTotalValue() {
    const total = this.props.cart.reduce(
      (n, {totalPrice}) => n + totalPrice,
      0,
    );
    return currencyFormat(total);
  }

  renderItem(product) {
    const {item, index} = product;
    return (
      <View style={styles.itemContainer} key={item.id.toString()}>
        <View style={{flex: 0.3}}>
          <Image source={{uri: item.image}} style={styles.imageProduct} />
        </View>
        <View style={{flex: 0.3}}>
          <Text>{item.name}</Text>
          <Text>
            {item.qty.toFixed(2)}
            {item.unit === 'kg' ? ' KG' : 'x'}
          </Text>
        </View>
        <View style={{flex: 0.3}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: colors.greenColor,
            }}>
            {currencyFormat(item.totalPrice)}
          </Text>
        </View>
        <View style={{flex: 0.1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.removeItem(index)}>
            <MaterialCommunityIcons
              name="cart-remove"
              size={25}
              color={colors.redColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  removeItem(id) {
    Alert.alert(
      'Remover do Carrinho',
      'Você tem certeza que deseja remover este item do carrinho?',
      [
        {
          text: 'Remover',
          onPress: () => {
            this.props.removeProduct(id);
          },
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <>
        <TopHeader
          leftContainerStyle={{flex: 0.4}}
          rightContainerStyle={{flex: 0.4}}
          centerContainerStyle={{flex: 0.2}}
          leftComponent={
            <TouchableOpacity onPress={() => this.props.clearCart()}>
              <Text style={{fontSize: 14, color: colors.primaryColor}}>
                Limpar
              </Text>
            </TouchableOpacity>
          }
          centerComponent={<Text style={{fontSize: 18}}>Carrinho</Text>}
          rightComponent={
            <TouchableOpacity
              disabled={this.loading}
              onPress={() => this.checkout()}>
              {this.state.loading ? (
                <ActivityIndicator size="small" color={colors.greenColor} />
              ) : (
                <Text
                  style={{
                    color: colors.greenColor,
                  }}>
                  Finalizar
                  {'  '}
                  <FontAwesome5Icon
                    name="check"
                    size={15}
                    color={colors.greenColor}
                  />
                </Text>
              )}
            </TouchableOpacity>
          }
        />
        <View style={styles.container}>
          <View style={styles.valueContainer}>
            <Text style={{fontSize: 16, marginBottom: '1%', marginTop: '3%'}}>
              Total
            </Text>
            <Text style={styles.totalValue}>{this.getTotalValue()}</Text>
          </View>
          {this.props.cart.length > 0 ? (
            <FlatList
              data={this.props.cart}
              style={{flex: 0.9}}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.id.toString()}
              ListHeaderComponent={() => (
                <View
                  style={{
                    ...styles.paddingHorizontal,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.lightGray,
                    paddingVertical: '3%',
                  }}>
                  <Text>Lista</Text>
                </View>
              )}
              ItemSeparatorComponent={() => (
                <Separator width={'100%'} height={0.5} />
              )}
            />
          ) : (
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="cart-remove"
                size={60}
                color={colors.primaryColor}
              />
              <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: '3%'}}>
                Seu carrinho está vazio
              </Text>
            </View>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  valueContainer: {
    flex: 0.1,
    marginVertical: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.greenColor,
  },
  paddingHorizontal: {
    paddingHorizontal: '4%',
  },
  itemContainer: {
    flexDirection: 'row',
    height: 75,
    backgroundColor: colors.white,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  imageProduct: {
    width: '80%',
    height: '80%',
    borderRadius: 4,
  },
});

const mapStateToProps = state => {
  return {
    cart: state.Cart.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearCart()),
    removeProduct: id => dispatch(removeProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
