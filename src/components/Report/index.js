import React, {useState, useEffect } from 'react';

import { PDFViewer, Page, Text, Document, Image, StyleSheet } from '@react-pdf/renderer';

import { ReportContainer } from './styles';

const Report = props => {
  const [params, setParams] = useState(props.params);

  useEffect(() => {
    setParams(props.params)
  }, [props.params]);

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });

  let region_text = "OK";

  if(params.defaultCategory) {
    // eslint-disable-next-line no-multi-str
    region_text = 'Hechas, pues, estas prevenciones, no quiso aguardar más tiempo \
    a poner en efeto su pensamiento, apretándole a ello la falta que él pensaba que \
    hacía en el mundo su tardanza, según eran los agravios que pensaba deshacer, \
    tuertos que enderezar, sinrazones que emendar y abusos que mejorar y deudas que \
    satisfacer. Y así, sin dar parte a persona alguna de su intención y sin que nadie \
    le viese, una mañana, antes del día, que era uno de los calurosos del mes de Julio, \
    se armó de todas sus armas, subió sobre Rocinante, puesta su mal compuesta celada, \
    embrazó su adarga, tomó su lanza y por la puerta falsa de un corral salió al campo';
  } else {
    region_text = `OK`;
  }

  return(
    <ReportContainer className="class-report">
      <PDFViewer className="pdf-viewer">
        <Document>
          <Page size="A4" style={styles.body}>
            <Image style={styles.image} src="/obahia-webmap/src/assets/images/logo.png"/>
            <Text style={styles.title}>{params.defaultCategory}</Text>
            <Text style={styles.subtitle}>{params.defaultYear}</Text>
            <Text style={styles.subtitle}>Capítulo I</Text>
            <Text style={styles.text} >{region_text}</Text>
          </Page>
        </Document>
      </PDFViewer>
    </ReportContainer>
  );
};

export default Report;

//ReactDOM.render(<Report />, document.getElementById('root'));
