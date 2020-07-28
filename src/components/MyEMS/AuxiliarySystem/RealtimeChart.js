import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import range from 'lodash/range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, CardBody, CustomInput, ListGroup, ListGroupItem, CardFooter } from 'reactstrap';
import { rgbaColor, isIterableArray} from '../../../helpers/utils';

const energyTrendLog = [
  11183,
  12116,
  13176,
  14172,
  15166,
  16161,
  17164,
  18159,
  19172,
  20173,
  21184,
  22163,
  23099,
  24173,
  25183,
  26167,
  27160,
  28183,
  29163,
  30176,
  31172,
  32166,
  33173,
  34188,
  35175
];
const dividerBorder = '1px solid rgba(255, 255, 255, 0.15)';
const listItemBorderColor = 'rgba(255, 255, 255, 0.05)';

const chartOptions = {
  legend: { display: false },
  scales: {
    yAxes: [
      {
        display: true,
        stacked: false
      }
    ],
    xAxes: [
      {
        stacked: false,
        ticks: { display: false },
        categoryPercentage: 1.0,
        gridLines: {
          color: rgbaColor('#fff', 0.1),
          display: true
        }
      }
    ]
  }
};

class RealtimeChart extends Component {
  _isMounted = false;
  refreshInterval;
  refreshTimeout;
  state = {
    energyTrendLog,
    currentEnergyValue: energyTrendLog[energyTrendLog.length - 1],
    chartData: {
      labels: range(1, 26),
      datasets: [
        {
          label: 'Users',
          backgroundColor: rgbaColor('#fff', 0.3),
          data: []
        }
      ]
    }
  };

  simulate = () => {
    this.refreshInterval = setInterval(() => {
      const currentEnergyValue = this.state.currentEnergyValue + Math.floor(Math.random() * (120 - 60) + 60);
      const energyTrendLog = [...this.state.energyTrendLog];
      energyTrendLog.shift();
      if (this._isMounted) {
        this.setState({ energyTrendLog }, () => {
          this.refreshTimeout = setTimeout(() => {
            const energyTrendLog = [...this.state.energyTrendLog];
            energyTrendLog.push(currentEnergyValue);
            if (this._isMounted) {
              this.setState({ energyTrendLog, currentEnergyValue });
            }
          }, 500);
        });
      }
    }, 2000);
  };

  componentDidMount() {
    this._isMounted = true;
    this.simulate();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.refreshInterval);
    clearTimeout(this.refreshTimeout);
  }

  render() {
    const chartData = {
      ...this.state.chartData,
      datasets: [
        {
          ...this.state.chartData.datasets[0],
          data: this.state.energyTrendLog
        }
      ]
    };

    return (
      <Card className="h-100 bg-gradient">
        <CardHeader className="bg-transparent">
          <CustomInput type="select" id="exampleCustomSelect" bsSize="sm">
          {isIterableArray(this.props.options) &&
                this.props.options.map(({ value, label }) => (
                  <option value={value}>{label}</option>
                ))}
            
          </CustomInput>
          <h5 className="text-white">{this.props.title}</h5>
          
          <div className="real-time-user display-1 font-weight-normal text-white">{this.state.currentEnergyValue}</div>
          
        </CardHeader>
        <CardBody className="text-white fs--1">
          <p className="pb-2" style={{ borderBottom: dividerBorder }}>
          能耗值点实时值 (kWh)
          </p>
          <Line data={chartData} options={chartOptions} width={10} height={4} />
          <ListGroup flush className="mt-4">
            <ListGroupItem
              className="bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0"
              style={{ borderColor: listItemBorderColor }}
            >
              <p className="mb-0">相关参数</p>
              <p className="mb-0">实时值</p>
            </ListGroupItem>
            <ListGroupItem
              className="bg-transparent d-flex justify-content-between px-0 py-1"
              style={{ borderColor: listItemBorderColor }}
            >
              <p className="mb-0">电流a (A)</p>
              <p className="mb-0">18.098</p>
            </ListGroupItem>
            <ListGroupItem
              className="bg-transparent d-flex justify-content-between px-0 py-1"
              style={{ borderColor: listItemBorderColor }}
            >
              <p className="mb-0">电流b (A)</p>
              <p className="mb-0">15.001</p>
            </ListGroupItem>
            <ListGroupItem
              className="bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none"
              style={{ borderColor: listItemBorderColor }}
            >
              <p className="mb-0">电流c (A)</p>
              <p className="mb-0">16.257</p>
            </ListGroupItem>
            <ListGroupItem
              className="bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none"
              style={{ borderColor: listItemBorderColor }}
            >
              <p className="mb-0">有功瞬时功率 a (kW)</p>
              <p className="mb-0">25.98</p>
            </ListGroupItem>
            <ListGroupItem
              className="bg-transparent d-flex justify-content-between px-0 py-1"
              style={{ borderColor: listItemBorderColor }}
            >
              <p className="mb-0">有功瞬时功率 b (kW)</p>
              <p className="mb-0">21.76</p>
            </ListGroupItem>
            <ListGroupItem
              className="bg-transparent d-flex justify-content-between px-0 py-1"
              style={{ borderColor: listItemBorderColor }}
            >
              <p className="mb-0">有功瞬时功率 c (kW)</p>
              <p className="mb-0">29.12</p>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default RealtimeChart;
