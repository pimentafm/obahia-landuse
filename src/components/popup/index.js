import React from 'react';

import { PopupContainer } from './styles';

const Popup = () => {
  return (
    <PopupContainer>
      <tbody id="popup-class">
        <tr>
            <td>Class</td>
            <td id="popup-lulc"></td>
        </tr>
        <tr>
            <td>Valor</td>
            <td id="popup-value"></td>
        </tr>
        <tr>
            <td>Coordenadas</td>
            <td id="popup-coords"></td>
        </tr>
      </tbody>
    </PopupContainer>
  );
}

export default Popup;