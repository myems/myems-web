import React, { useState, useContext } from 'react';
import { Row, Col, Card, CardBody, CustomInput } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { rgbaColor, themeColors } from '../../helpers/utils';
import AppContext from '../../context/Context';

const days = [
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

const energyDataByCategory = {
  electricity: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10].map(d => (d * 3.14).toFixed(2)),
  water: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8].map(d => (d * 3.14).toFixed(2)),
  naturalgas: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2].map(d => (d * 3.14).toFixed(2))
};

const EnergyLineChart = () => {
  const [energyCategory, setEnergyCategory] = useState('electricity');
  const { isDark } = useContext(AppContext);

  const config = {
    data(canvas) {
      const ctx = canvas.getContext('2d');
      const gradientFill = isDark
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, 0, 250);
      gradientFill.addColorStop(0, isDark ? 'rgba(44,123,229, 0.5)' : 'rgba(255, 255, 255, 0.3)');
      gradientFill.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');

      return {
        labels: days,
        datasets: [
          {
            borderWidth: 2,
            data: energyDataByCategory[energyCategory].map(d => (d * 3.14).toFixed(2)),
            borderColor: rgbaColor(isDark ? themeColors.primary : '#fff', 0.8),
            backgroundColor: gradientFill
          }
        ]
      };
    },
    options: {
      legend: { display: false },
      tooltips: {
        mode: 'x-axis',
        xPadding: 20,
        yPadding: 10,
        displayColors: false,
        callbacks: {
          label: tooltipItem => `${days[tooltipItem.index]} - ${tooltipItem.yLabel}`,
          title: () => null
        }
      },
      hover: { mode: 'label' },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              show: true,
              labelString: 'Month'
            },
            ticks: {
              fontColor: rgbaColor('#fff', 0.7),
              fontStyle: 600
            },
            gridLines: {
              color: rgbaColor('#fff', 0.1),
              zeroLineColor: rgbaColor('#fff', 0.1),
              lineWidth: 1
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: rgbaColor('#fff', 0.1)
            }
          }
        ]
      }
    }
  };

  return (
    <Card className="mb-3">
      <CardBody className="rounded-soft bg-gradient">
        <Row className="text-white align-items-center no-gutters">
          <Col>
            <h4 className="text-white mb-0">报告期总电量 764.39 (kWh)</h4>
            <p className="fs--1 font-weight-semi-bold">
            基准期总电量 <span className="opacity-50">684.87 (kWh)</span>
            </p>
          </Col>
          <Col xs="auto" className="d-none d-sm-block">
            <CustomInput
              id="ddd"
              type="select"
              bsSize="sm"
              className="mb-3 shadow"
              value={energyCategory}
              onChange={({ target }) => setEnergyCategory(target.value)}
            >
              <option value="electricity">电</option>
              <option value="water">自来水</option>
              <option value="naturalgas">天然气</option>
            </CustomInput>
          </Col>
        </Row>
        <Line data={config.data} options={config.options} width={1618} height={375} />
      </CardBody>
    </Card>
  );
};

export default EnergyLineChart;
