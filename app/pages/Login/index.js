import React from 'react';
import {
  ActivityIndicator, Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import {validEmail} from '../../assets/functions';
import LoginService from '../../services/LoginService';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  autoLogin() {
    // normalmente recebemos um token JWT com expire time, e com isso fazemos uma renovação ao invés de simplesmente testar e deixar passar
    if (this.props.token) {
      this.props.navigation.navigate('AppNavigation');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.autoLogin();
    }, 500);
  }

  validInputs() {
    if (!validEmail(this.state.email)) {
      Alert.alert('O email está inválido');
      return false;
    }

    if (this.password.length < 1) {
      Alert.alert('Você precisa digitar uma senha');
      return false;
    }

    return true;
  }

  async login() {
    if (!this.validInputs()) {
      return;
    }

    this.setState({loading: true});
    const loginService = new LoginService(
      this.state.email,
      this.state.password,
    );
    const auth = await loginService.auth();
    if (auth) {
      this.props.navigation.navigate('AppNavigation');
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <>
        <ScrollView style={[styles.container, styles.paddingAll]}>
          <View style={{alignItems: 'center', marginTop: '20%'}}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{width: 180, height: 180, marginBottom: '3%'}}
            />
            <Text
              style={{
                color: colors.primaryColor,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              eCommerce
            </Text>
          </View>
          <View style={styles.paddingAll}>
            <View style={{marginBottom: 10}}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize={'none'}
                placeholderTextColor={colors.primaryColor}
                ref={r => {
                  this.email = r;
                }}
                onChangeText={text => {
                  this.setState({email: text});
                }}
                onSubmitEditing={() => this.password.focus()}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={colors.primaryColor}
                autoCapitalize={'none'}
                ref={r => {
                  this.password = r;
                }}
                secureTextEntry
                onChangeText={text => {
                  this.setState({password: text});
                }}
                onSubmitEditing={() => this.login()}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.login()}
                style={styles.btnLogin}
                disabled={this.state.loading}>
                {this.state.loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.btnLoginText}>Entrar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
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
  input: {
    color: colors.primaryColor,
    borderRadius: 15,
    backgroundColor: '#EAEAEA',
    padding: 15,
  },
  btnLogin: {
    backgroundColor: colors.primaryColor,
    padding: 15,
    borderRadius: 15,
    marginTop: '4%',
  },
  btnLoginText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    token: state.Auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
