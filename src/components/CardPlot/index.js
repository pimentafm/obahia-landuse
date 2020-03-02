import React, { useState } from "react";

import { Icon } from "antd";

import { CardContainer } from "./styles";

import "antd/dist/antd.css";

const Cardplot = props => {
    const [areHidden, setHidden] = useState(props.plotsAreHidden)
    const handlePlots = () => {
        if (areHidden === false) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    };

  return (
    <CardContainer id="card-plot-container" areHidden={areHidden}>
        <Icon
            className="showhide-plots"
            type="menu"
            title="Show/Hide"
            style={{ fontSize: "20px" }}
            onClick={() => handlePlots()}
          />

          {props.stackplot}
          {props.barplot}
    </CardContainer>
  );
};

export default Cardplot;
