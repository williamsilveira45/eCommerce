import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import TopHeader from '../../components/TopHeader';
import Pdf from 'react-native-pdf';
import colors from '../../assets/colors';

class PDFViewer extends React.Component {
  render() {
    const pdf = this.props.route.params.pdf;
    const source = {
      uri: pdf.path,
    };

    return (
      <View style={styles.container}>
        <TopHeader
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text
                style={{
                  color: colors.primaryColor,
                  fontSize: 16,
                  textTransform: 'capitalize',
                }}>
                Voltar
              </Text>
            </TouchableOpacity>
          }
          title={pdf.name}
        />
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});

export default PDFViewer;
