import React, { useState, useContext } from 'react';
import { Row, Col, Card, CardBody, CustomInput } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { rgbaColor, themeColors, isIterableArray } from '../../../helpers/utils';
import AppContext from '../../../context/Context';

const LineChart = ({
  reportingTitle,
  baseTitle,
  labels,
  data,
  options
}) => {
  const [option, setOption] = useState('a');
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
        labels: labels,
        datasets: [
          {
            borderWidth: 2,
            data: data[option],
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
          label: tooltipItem => `${labels[tooltipItem.index]} - ${tooltipItem.yLabel}`,
          title: () => null
        }
      },
      hover: { mode: 'label' },
      scales: {
        xAxes: [
          {
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
            <h4 className="text-white mb-0">{reportingTitle}</h4>
            <p className="fs--1 font-weight-semi-bold">
              {baseTitle}
            </p>
          </Col>
          <Col xs="auto" className="d-none d-sm-block">
            <CustomInput
              id="ddd"
              type="select"
              bsSize="sm"
              className="mb-3 shadow"
              value={option}
              onChange={({ target }) => setOption(target.value)}
            >
              {isIterableArray(options) &&
                options.map(({ value, label }) => (
                  <option value={value}>{label}</option>
                ))}
            </CustomInput>
          </Col>
        </Row>
        <Line data={config.data} options={config.options} width={1618} height={375} />
      </CardBody>
    </Card>
  );
};

export default LineChart;
