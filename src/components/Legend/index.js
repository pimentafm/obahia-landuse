import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import api from '../../services/api';

import { LegendContainer } from './styles';

class Legend extends Component {
    state = {
        legendURL: `http://localhost/cgi-bin/mapserv?map=/var/www/landuseRegion.map&mode=legend&year=2018`,
        imghtml: [],
    };

    componentDidMount() {
        // blob arraybuffer text document
        api.get(this.state.legendURL, {
            responseType: 'text',
        },
        ).then(res => {
            let html = res.data;

            html = ReactHtmlParser(html)
            
            //console.log(html[0].props.children[0].props.src);
            
            
            this.setState({imghtml: html});
        });
    }


  render() {
    return (
        <LegendContainer>
            {this.state.imghtml}
        </LegendContainer>
    )}
}

export default Legend;