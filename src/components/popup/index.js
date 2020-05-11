import React from 'react';
import { Icon } from "antd";

import { PopupContainer } from './styles';

const Popup = () => {
  const closePopup = () => {
    const element = document.getElementById('popup-class');
    element.style.display = "none";
  };

  return (
    <PopupContainer>
      <tbody id="popup-class" className="popup-class" style={{
        boxShadow: `0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)`,
        }}>
          <tr>
            <th colSpan="2" style={{textAlign: "right", background: "#1f5582"}}>
              <Icon
                id="close-popup"
                type="close"
                style={{ fontSize: "20px", color: "#fff", padding: "2px", right: "2px" }}
                onClick={() => closePopup()}
              />
            </th>
          </tr>
        <tr style={{padding: "2px", background: "#fff"}}>
            <td style={{padding: "2px"}}>Classe</td>
            <td id="popup-lulc" style={{padding: "2px"}}></td>
        </tr>
        <tr style={{padding: "2px", background: "#fff"}}>
            <td style={{padding: "2px"}}>Valor</td>
            <td id="popup-value" style={{padding: "2px"}}></td>
        </tr>
        <tr style={{padding: "2px", background: "#fff"}}>
            <td style={{padding: "2px"}}>Coordenadas</td>
            <td id="popup-coords" style={{padding: "2px"}}></td>
        </tr>
      </tbody>
    </PopupContainer>
  );
}

export default Popup;