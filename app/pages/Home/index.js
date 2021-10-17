import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import {setProducts} from '../../redux/products';
import {currencyFormat} from '../../assets/functions';
import TopHeader from '../../components/TopHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchComponent from '../../components/SearchComponent';
import {addProduct, removeProduct} from '../../redux/cart';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      dataFilteredList: [],
      searchInput: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts() {
    // fake api load
    setTimeout(() => {
      const products = [
        {
          id: 1,
          name: 'Maçã',
          image: 'https://picsum.photos/200/300',
          price: 0.99,
          unit: 'kg',
          multiplier: 3,
        },
        {
          id: 2,
          name: 'Pêra',
          image: 'https://picsum.photos/200/300',
          price: 1.09,
          unit: 'kg',
          multiplier: 3,
        },
        {
          id: 3,
          name: 'Banana',
          image: 'https://picsum.photos/200/300',
          price: 1.15,
          unit: 'kg',
          multiplier: 3,
        },
        {
          id: 4,
          name: 'Acabaxi',
          image: 'https://picsum.photos/200/300',
          price: 2.55,
          unit: 'kg',
          multiplier: 3,
        },
        {
          id: 5,
          name: 'Manga',
          image: 'https://picsum.photos/200/300',
          price: 1.15,
          unit: 'kg',
          multiplier: 3,
        },
        {
          id: 6,
          name: 'Nescau',
          image: 'https://picsum.photos/200/300',
          price: 6.99,
          unit: 'unit',
          multiplier: 1,
        },
      ];

      this.props.loadProducts(products);
      this.setState({
        loading: false,
        dataList: products,
        dataFilteredList: products,
      });
    }, 1000);
  }

  toggleSearch() {
    this.setState({
      searchInput: !this.state.searchInput,
      dataFilteredList: this.state.dataList,
    });
  }

  searchOutput(result) {
    if (!result) {
      return;
    }

    this.setState({dataFilteredList: result});
  }

  getTotalValue() {
    const total = this.props.cart.reduce(
      (n, {totalPrice}) => n + totalPrice,
      0,
    );
    return currencyFormat(total);
  }

  renderItem(product) {
    return (
      <View style={styles.itemContainer} key={product.id.toString()}>
        <View style={styles.itemPicture}>
          <Image source={{uri: product.image}} style={styles.imageProduct} />
        </View>
        <View style={styles.itemLabel}>
          <View style={{flex: 0.4}}>
            <Text style={{color: colors.primaryColor}}>{product.name}</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{textAlign: 'right'}}>
              {currencyFormat(product.price)}{' '}
              {product.unit === 'kg' ? `/ ${product.unit.toUpperCase()}` : null}
            </Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => this.subProductCart(product)}
            disabled={!this.exists(product.id)}
            style={{
              ...styles.actionLeftButton,
              backgroundColor: this.exists(product.id)
                ? colors.redColor
                : colors.lightGray,
            }}>
            <FontAwesome5 name="minus" color={colors.white} />
          </TouchableOpacity>
          <View style={styles.itemQuantity}>
            <Text>{this.getItemQuantity(product.id)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.addToCard(product)}
            style={styles.actionRightButton}>
            <FontAwesome5 name="plus" color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  exists(productId) {
    const exists = this.props.cart.findIndex(prod => productId === prod.id)
    return exists > -1;
  }

  getItemQuantity(productId) {
    const productAtCart = this.props.cart.find(product => {
      return productId === product.id;
    });

    if (!productAtCart) {
      return 0;
    }

    if (productAtCart.unit === 'kg') {
      return `${productAtCart.qty.toFixed(2)} / KG`;
    }

    return productAtCart.qty;
  }

  addToCard(product) {
    //poderia reescrever toda a variavel no redux, mas preferi trabalhar item por item do array dos products
    // 0.05 = 50 gramas, multiplier é responsável por multiplicar pela fruta
    // ex: 1 manga tem 150 g então é multiplier 3
    let qty = product.unit === 'kg' ? 0.05 * product.multiplier : 1;

    const tempCartProducts = this.props.cart;
    const productFoundIndex = tempCartProducts.findIndex(productCart => {
      return product.id === productCart.id;
    });

    if (productFoundIndex > -1) {
      const selectedProduct = tempCartProducts[productFoundIndex];
      qty += selectedProduct.qty;
      tempCartProducts.splice(productFoundIndex, 1);
    }

    this.props.addToCard({
      id: product.id,
      name: product.name,
      qty: qty,
      price: product.price,
      totalPrice: product.price * qty,
      unit: product.unit,
    });
  }

  subProductCart(product) {
    let startQty = product.unit === 'kg' ? 0.05 * product.multiplier : 1;
    let qty = startQty;

    const tempCartProducts = this.props.cart;
    const indexProduct = tempCartProducts.findIndex(productCart => {
      return product.id === productCart.id;
    });

    qty = tempCartProducts[indexProduct].qty - qty;
    tempCartProducts.splice(indexProduct, 1);
    if (qty < startQty) {
      this.props.removeFromCard(indexProduct);
      return;
    }

    this.props.addToCard({
      id: product.id,
      name: product.name,
      qty: qty,
      price: product.price,
      totalPrice: product.price * qty,
      unit: product.unit,
    });
  }

  render() {
    return (
      <>
        <TopHeader
          leftComponent={
            <TouchableOpacity
              onPress={() => this.toggleSearch()}>
              <Text style={{fontSize: 14, color: colors.primaryColor}}>
                <FontAwesome5 name="search" color={colors.primaryColor} size={15} />
                {'   '}
                Buscar
              </Text>
            </TouchableOpacity>
          }
          centerComponent={<Text style={{fontSize: 18}}>Lista</Text>}
          rightComponent={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Cart')}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.greenColor}}>
                {this.getTotalValue()}
              </Text>
            </TouchableOpacity>
          }
        />
        {this.state.searchInput ? (
          <SearchComponent
            fields={['name']}
            dataInput={this.state.dataList}
            dataFilteredInput={this.state.dataFilteredList}
            resultOutput={this.searchOutput.bind(this)}
            toggleSearch={this.toggleSearch.bind(this)}
          />
        ) : null}
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.loadProducts()}
            />
          }>
          {this.state.dataFilteredList.map(product => this.renderItem(product))}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  itemContainer: {
    backgroundColor: colors.lightGray2,
    width: '45%',
    height: 150,
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
  },
  itemPicture: {
    flex: 0.6,
  },
  imageProduct: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemLabel: {
    marginTop: '2%',
    flex: 0.2,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  actionButtons: {
    marginTop: '2%',
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  actionLeftButton: {
    backgroundColor: colors.redColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 29,
    flex: 0.25,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  actionRightButton: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greenColor,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 29,
  },
  itemQuantity: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 29,
  },
});

const mapStateToProps = state => {
  return {
    products: state.Products.products,
    cart: state.Cart.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: products => dispatch(setProducts(products)),
    addToCard: product => dispatch(addProduct(product)),
    removeFromCard: productIndex => dispatch(removeProduct(productIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
