import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import obahia from '~/services/legend';

import { LegendContainer } from './styles';

const Legend = props => {
    const [legendHTML, setlegendHTML] = useState([]);

    useEffect(() => {
        obahia.get(`cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/`+props.name+`Region.map&mode=legend&year=2018`, {
            responseType: 'text',
        },
        ).then(res => {
            let html = res.data;

            html = ReactHtmlParser(html)
            
            setlegendHTML(html)
        });
    }, [props.name]);

    return (
        <LegendContainer>
            {legendHTML}
        </LegendContainer>
    )
}

export default Legend;
