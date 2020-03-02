import React, { useState, useEffect } from "react";

import { ReportContainer } from "./styles";

import "antd/dist/antd.css";

const CardReport = props => {
  const [isHidden, setHidden] = useState(props.reportIsHidden)

  useEffect(() => {
    setHidden(props.reportIsHidden)
  }, [props.reportIsHidden]);

  return (
    <ReportContainer isHidden={isHidden}>
        {props.report}
    </ReportContainer>
  );
};

export default CardReport;
