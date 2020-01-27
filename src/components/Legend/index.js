import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import oba from '../../services/api';

import { LegendContainer } from './styles';

const Legend = props => {
    const [legendHTML, setlegendHTML] = useState([]);

    useEffect(() => {
        oba.get(`cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseRegion.map&mode=legend&year=2018`, {
            responseType: 'text',
        },
        ).then(res => {
            let html = res.data;

            html = ReactHtmlParser(html)
            
            setlegendHTML(html)
        });
    }, []);

    return (
        <LegendContainer>
            {legendHTML}
        </LegendContainer>
    )
}

export default Legend;
