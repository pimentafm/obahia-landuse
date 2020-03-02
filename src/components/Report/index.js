import React, {useState, useEffect } from 'react';

import { PDFViewer, Page, View, Text, Document, Image, StyleSheet } from '@react-pdf/renderer';

import { ReportContainer } from './styles';

const Report = props => {
  const [params, setParams] = useState(props.params);

  useEffect(() => {
    setParams(props.params)
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

  let region_text = "OK";

  if(params.defaultCategory) {
    // eslint-disable-next-line no-multi-str
    region_text = `Hechas, pues, estas prevenciones, no quiso aguardar más tiempo\
 a poner en efeto su pensamiento, apretándole a ello la falta que él pensaba que hacía\
 en el mundo su tardanza, según eran los agravios que pensaba deshacer, tuertos que enderezar,\
 sinrazones que emendar y abusos que mejorar y deudas que satisfacer. Y así, sin dar parte\
 a persona alguna de su intención y sin que nadie le viese, una mañana, antes del día,\
 que era uno de los calurosos del mes de Julio, se armó de todas sus armas, subió sobre Rocinante,\
 puesta su mal compuesta celada, embrazó su adarga, tomó su lanza y por la puerta falsa de un corral salió al campo.`;
  } else {
    region_text = `OK`;
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
            <Text style={styles.text} >{region_text}</Text>
            <Image style={styles.image} src={params.stackImage}/>
            
            <Text style={styles.title}>{params.defaultCategory +" - "+ params.defaultYear}</Text>
            <Text style={styles.text} >{region_text}</Text>
            <Image style={styles.image} src={params.barImage}/>

            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
          </Page>
        </Document>
      </PDFViewer>
    </ReportContainer>
  );
};

export default Report;
//ReactDOM.render(<Report />, document.getElementById('root'));

