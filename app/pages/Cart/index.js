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
import RNHTMLtoPDF from 'react-native-html-to-pdf';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  async checkout() {
    if (this.state.loading) {
      return;
    }

    this.setState({loading: true});
    try {
      const date = moment().format('DD/MM/YYYY HH:mm:ss');
      let total = 0;
      let htmlContent = '<html><head></head><body style="margin:5px;padding:15px;">';
      htmlContent += `<h3>eCommerce - Pedido em ${date}</h3>`;
      htmlContent += '<hr />';
      htmlContent += '<table width="100%" border="0" cellpadding="1" cellspacing="1">';
      htmlContent += '  <thead>';
      htmlContent += '    <tr>';
      htmlContent += '      <th align="left">Produto</th>';
      htmlContent += '      <th align="left">Unidade</th>';
      htmlContent += '      <th align="left">Peso / Qtd</th>';
      htmlContent += '      <th align="left">Preço Unit.</th>';
      htmlContent += '      <th align="right">Total</th>';
      htmlContent += '    </tr>';
      htmlContent += '  </thead>';
      htmlContent += '  <tbody>';
      this.props.cart.forEach(prod => {
        htmlContent += '    <tr>';
        htmlContent += `      <td>${prod.name}</td>`;
        htmlContent += `      <td>${prod.unit === 'kg' ? 'KG' : 'Unidade'}</td>`;
        htmlContent += `      <td>${prod.unit === 'kg' ? prod.qty.toFixed(2) + 'KG' : prod.qty}</td>`;
        htmlContent += `      <td>${currencyFormat(prod.price)}</td>`;
        htmlContent += `      <td align="right">${currencyFormat(prod.totalPrice)}</td>`;
        htmlContent += '    </tr>';
        total += prod.totalPrice;
      });
      htmlContent += '    <tr>';
      htmlContent += `      <td align="right" colspan="5"><b>${currencyFormat(total)}</b></td>`;
      htmlContent += '    </tr>';
      htmlContent += '  </tbody>';
      htmlContent += '</table>';
      htmlContent += `</body></html>`;

      const options = {
        html: htmlContent,
        fileName: 'pdfCheckout',
      };
      const htmlToPdf = await RNHTMLtoPDF.convert(options);
      console.log(htmlToPdf);
      if (htmlToPdf?.filePath) {
        this.props.navigation.navigate('PDFViewer', {
          pdf: {
            name: options.fileName,
            path: htmlToPdf.filePath,
          },
        });
        this.props.clearCart();
      }
    } catch (e) {
      Alert.alert(e.message);
    }
    this.setState({loading: false});
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

  renderRightButton() {
    if (this.props.cart.length < 1) {
      return;
    }

    return (
      <TouchableOpacity disabled={this.loading} onPress={() => this.checkout()}>
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
          rightComponent={() => this.renderRightButton()}
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
