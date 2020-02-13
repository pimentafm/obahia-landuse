import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ucayali from '../../services/local';

import { LegendContainer } from './styles';

const Legend = props => {
    const [legendHTML, setlegendHTML] = useState([]);

    useEffect(() => {
        ucayali.get(`cgi-bin/mapserv?map=/var/www/obahia-webmap/mapfiles/landuseRegion.map&mode=legend&year=2018`, {
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
