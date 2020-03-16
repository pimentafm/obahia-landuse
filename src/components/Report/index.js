import React, {useState, useEffect } from 'react';

import { PDFViewer, Page, View, Text, Document, Image, StyleSheet } from '@react-pdf/renderer';

import { ReportContainer } from './styles';

const Report = props => {
  const [params, setParams] = useState(props.params);

  useEffect(() => {
    setParams(props.params);
  }, [props.params]);

  const styles = StyleSheet.create({
    body: {
      paddingTop: 65,
      paddingBottom: 10,
      paddingHorizontal: 50,
    },
    title: {
      paddingTop: 10,
      paddingBottom: 5,
      fontSize: 14,
      fontFamily: 'Times-Bold',
      textAlign: 'left'
    },
    header: {
      backgroundColor: '#1f5582',
      paddingBottom: 5,
    },
    imageHeader: {
      width: 100,
      marginVertical: 2,
      verticalAlign: 'middle'
    },
    image: {
      marginVertical: 10,
      marginHorizontal: 100
    },
    row: {
      border: 0,
    },
    text: {
      fontSize: 12,
      textAlign: 'justify',
      textIndent: 25,
      fontFamily: 'Times-Roman'
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    }
  });

  let cat_text = null;

  switch (params.defaultCategory) {
    case 'Região':
      cat_text = `Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região Região `;
      break;
    case 'Bacia hidrográfica':
      cat_text = `Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text Bacia hidrográfica text `;
      break;
    case 'Área de drenagem':
      cat_text = `Área de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem textÁrea de drenagem text`;
      break;
    case 'Municípios':
      cat_text = `Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text Municípios text `;
      break;
    default:
      cat_text = null;
  }

  let watershed_text = null;

  switch (params.defaultWatershed) {
    case 'grande':
      watershed_text = `grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande grande `;
      break;
    case 'corrente':
      watershed_text = `corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente corrente `;
      break;
    case 'carinhanha':
      watershed_text = `carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha carinhanha `;
      break;
    default:
      watershed_text = null;
  }

  let codename_text = null;

  if (params.defaultCodeName) {
    codename_text = `codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text codename text `;
  }

  return(
    <ReportContainer className="class-report">
      <PDFViewer className="pdf-viewer">
        <Document>
          <Page size="A4" style={styles.body}>
            <View style={styles.header} fixed>
              <Image style={styles.imageHeader} src="/obahia-webmap/src/assets/images/logo.png"/>
            </View>
            <Text style={styles.title}>{"Mudanças do uso e cobertura do solo - 1990-2018"}</Text>
            <Text style={styles.text} >{cat_text}</Text>
            <Image style={styles.image} src={params.stackImage}/>
            
            <Text style={styles.title}>{params.defaultCategory +" - "+ params.defaultYear}</Text>
            <Text style={styles.text} >{watershed_text}</Text>
            <Image style={styles.image} src={params.barImage}/>

            { params.defaultCodeName && <Text style={styles.title}>{params.defaultCodeName.name}</Text> }
            { params.defaultCodeName && <Text style={styles.text} >{codename_text}</Text> }

            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
          </Page>
        </Document>
      </PDFViewer>
    </ReportContainer>
  );
};

export default Report;
//ReactDOM.render(<Report />, document.getElementById('root'));

