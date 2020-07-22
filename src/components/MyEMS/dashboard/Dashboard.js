import React, { Fragment, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import CardSummary from '../../dashboard/CardSummary';
import LineChart from '../common/LineChart';
import { toast } from 'react-toastify';

import loadable from '@loadable/component';
const ChildSpacesTable = loadable(() => import('./ChildSpacesTable'));


const Dashboard = () => {
  // State

  const spaceLineChartLabels = [
    '2020-07-01',
    '2020-07-02',
    '2020-07-03',
    '2020-07-04',
    '2020-07-05',
    '2020-07-06',
    '2020-07-07',
    '2020-07-08',
    '2020-07-09',
    '2020-07-10',
    '2020-07-11',
    '2020-07-12'
  ];
  
  const spaceLineChartData = {
    a: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };

  
  const spaceLineChartOptions = [
    { value: 'a', label: '电'},
    { value: 'b', label: '自来水'},
    { value: 'c', label: '天然气'},
    { value: 'd', label: '二氧化碳排放'}];

  const parameterLineChartLabels = [
    '2020-07-01',
    '2020-07-02',
    '2020-07-03',
    '2020-07-04',
    '2020-07-05',
    '2020-07-06',
    '2020-07-07',
    '2020-07-08',
    '2020-07-09',
    '2020-07-10',
    '2020-07-11',
    '2020-07-12'
  ];
    
  const parameterLineChartData = {
    a: [40, 31, 36, 32, 27, 32, 34, 26, 25, 24, 25, 30],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    e: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };
  
  const parameterLineChartOptions = [
    { value: 'a', label: '室外温度'},
    { value: 'b', label: '相对湿度'},
    { value: 'c', label: '电费率'},
    { value: 'd', label: '自来水费率'},
    { value: 'e', label: '天然气费率'}];
  
  useEffect(() => {
    toast(
      <Fragment>
        Welcome to <strong>MyEMS</strong>!<br />
        the Leading Free and Open Source Energy Management System
      </Fragment>
    );
  }, []);

  return (
    <Fragment>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="本年总电量 (kWh)" color="success" linkText="详情" to="#" >
          <CountUp end={5890863} duration={2} prefix="" separator="," decimal="." decimals={2}  />
        </CardSummary>
        <CardSummary rate="0.0%" title="本年总自来水量 (M3)" color="info" linkText="详情" to="#">
          <CountUp end={29878} duration={2} prefix="" separator="," decimal="." decimals={2}  />
        </CardSummary>
        <CardSummary rate="0.0%" title="本年总天然气量 (M3)" color="info" linkText="详情" to="#">
        <CountUp end={9887} duration={2} prefix="" separator="," decimal="." decimals={2}  />
        </CardSummary>
        <CardSummary rate="+9.54%" title="本年总吨标准煤量 (TCE)" color="warning" linkText="详情" to="#">
          <CountUp end={5890863/8135.56+9887/751.8} duration={2} prefix="" separator="," decimal="." decimals={2}  />
        </CardSummary>
        <CardSummary rate="+9.54%" title="本年总CO2排放量 (T)" color="warning" linkText="详情" to="#">
          <CountUp end={(5890863/8135.56+9887/751.8)*0.67} duration={2} prefix="" separator="," decimal="." decimals={2} />
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="本年总电费 (RMB)" color="success" linkText="详情" to="#">
          <CountUp end={5890863} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="本年总自来水费 (RMB)" color="info" linkText="详情" to="#">
          <CountUp end={29878} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
        <CardSummary rate="+9.54%" title="本年总天然气费 (RMB)" color="warning" linkText="详情" to="#">
          <CountUp end={43594} duration={2} prefix="" separator="," decimal="." />
        </CardSummary>
      </div>
      <LineChart reportingTitle='本月总电量 764.39 (kWh)' 
        baselineTitle='' 
        labels={spaceLineChartLabels} 
        data={spaceLineChartData}
        options={spaceLineChartOptions}>
      </LineChart>

      <LineChart reportingTitle='相关参数' 
        baselineTitle='' 
        labels={parameterLineChartLabels} 
        data={parameterLineChartData}
        options={parameterLineChartOptions}>
      </LineChart>
      <ChildSpacesTable />
      
    </Fragment>
  );
};

export default Dashboard;
