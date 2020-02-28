import React from 'react';
import { useLocation } from "react-router";
import Report from '~/components/Report';

const ReportPage = props => {
  const location = useLocation()
  return (
    <Report id="report" params={location.state}/>
  );
}

export default ReportPage;