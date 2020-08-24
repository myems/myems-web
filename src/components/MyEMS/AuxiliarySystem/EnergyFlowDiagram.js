import React, { Fragment, useEffect, useContext, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  CustomInput
} from 'reactstrap';
import Datetime from 'react-datetime';
import ReactEchartsCore from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import AppContext from '../../../context/Context';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';


const EnergyFlowDiagram = ({ setRedirect, setRedirectUrl,  t }) => {
  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_uuid = getCookieValue('user_uuid');
    let user_token = getCookieValue('user_token');
    if (is_logged_in === null || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, 1000*60*60*8);
      createCookie('user_name', user_name, 1000*60*60*8);
      createCookie('user_uuid', user_uuid, 1000*60*60*8);
      createCookie('user_token', user_token, 1000*60*60*8);
    }
  }, []);
  // State
  const [selectedEnergyFlowDiagram, setSelectedEnergyFlowDiagram] = useState(undefined);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(new Date().toLocaleString());
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(new Date().toLocaleString());
  const { isDark } = useContext(AppContext);

  const energyFlowDiagramOptions = [
    { value: 1, label: '公区商场能流图' },
    { value: 2, label: '工厂能流图' },
    { value: 3, label: '租区能流图' },
    { value: 4, label: '门店能流图' }];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';
  const data = {
    "nodes": [
      { "name": "Agricultural 'waste'" },
      { "name": "Bio-conversion" },
      { "name": "Liquid" },
      { "name": "Losses" },
      { "name": "Solid" },
      { "name": "Gas" },
      { "name": "Biofuel imports" },
      { "name": "Biomass imports" },
      { "name": "Coal imports" },
      { "name": "Coal" },
      { "name": "Coal reserves" },
      { "name": "District heating" },
      { "name": "Industry" },
      { "name": "Heating and cooling - commercial" },
      { "name": "Heating and cooling - homes" },
      { "name": "Electricity grid" },
      { "name": "Over generation / exports" },
      { "name": "H2 conversion" },
      { "name": "Road transport" },
      { "name": "Agriculture" },
      { "name": "Rail transport" },
      { "name": "Lighting & appliances - commercial" },
      { "name": "Lighting & appliances - homes" },
      { "name": "Gas imports" },
      { "name": "Ngas" },
      { "name": "Gas reserves" },
      { "name": "Thermal generation" },
      { "name": "Geothermal" },
      { "name": "H2" },
      { "name": "Hydro" },
      { "name": "International shipping" },
      { "name": "Domestic aviation" },
      { "name": "International aviation" },
      { "name": "National navigation" },
      { "name": "Marine algae" },
      { "name": "Nuclear" },
      { "name": "Oil imports" },
      { "name": "Oil" },
      { "name": "Oil reserves" },
      { "name": "Other waste" },
      { "name": "Pumped heat" },
      { "name": "Solar PV" },
      { "name": "Solar Thermal" },
      { "name": "Solar" },
      { "name": "Tidal" },
      { "name": "UK land based bioenergy" },
      { "name": "Wave" },
      { "name": "Wind" }
    ],
    "links": [
      { "source": "Agricultural 'waste'", "target": "Bio-conversion", "value": 124.729 },
      { "source": "Bio-conversion", "target": "Liquid", "value": 0.597 },
      { "source": "Bio-conversion", "target": "Losses", "value": 26.862 },
      { "source": "Bio-conversion", "target": "Solid", "value": 280.322 },
      { "source": "Bio-conversion", "target": "Gas", "value": 81.144 },
      { "source": "Biofuel imports", "target": "Liquid", "value": 35 },
      { "source": "Biomass imports", "target": "Solid", "value": 35 },
      { "source": "Coal imports", "target": "Coal", "value": 11.606 },
      { "source": "Coal reserves", "target": "Coal", "value": 63.965 },
      { "source": "Coal", "target": "Solid", "value": 75.571 },
      { "source": "District heating", "target": "Industry", "value": 10.639 },
      { "source": "District heating", "target": "Heating and cooling - commercial", "value": 22.505 },
      { "source": "District heating", "target": "Heating and cooling - homes", "value": 46.184 },
      { "source": "Electricity grid", "target": "Over generation / exports", "value": 104.453 },
      { "source": "Electricity grid", "target": "Heating and cooling - homes", "value": 113.726 },
      { "source": "Electricity grid", "target": "H2 conversion", "value": 27.14 },
      { "source": "Electricity grid", "target": "Industry", "value": 342.165 },
      { "source": "Electricity grid", "target": "Road transport", "value": 37.797 },
      { "source": "Electricity grid", "target": "Agriculture", "value": 4.412 },
      { "source": "Electricity grid", "target": "Heating and cooling - commercial", "value": 40.858 },
      { "source": "Electricity grid", "target": "Losses", "value": 56.691 },
      { "source": "Electricity grid", "target": "Rail transport", "value": 7.863 },
      { "source": "Electricity grid", "target": "Lighting & appliances - commercial", "value": 90.008 },
      { "source": "Electricity grid", "target": "Lighting & appliances - homes", "value": 93.494 },
      { "source": "Gas imports", "target": "Ngas", "value": 40.719 },
      { "source": "Gas reserves", "target": "Ngas", "value": 82.233 },
      { "source": "Gas", "target": "Heating and cooling - commercial", "value": 0.129 },
      { "source": "Gas", "target": "Losses", "value": 1.401 },
      { "source": "Gas", "target": "Thermal generation", "value": 151.891 },
      { "source": "Gas", "target": "Agriculture", "value": 2.096 },
      { "source": "Gas", "target": "Industry", "value": 48.58 },
      { "source": "Geothermal", "target": "Electricity grid", "value": 7.013 },
      { "source": "H2 conversion", "target": "H2", "value": 20.897 },
      { "source": "H2 conversion", "target": "Losses", "value": 6.242 },
      { "source": "H2", "target": "Road transport", "value": 20.897 },
      { "source": "Hydro", "target": "Electricity grid", "value": 6.995 },
      { "source": "Liquid", "target": "Industry", "value": 121.066 },
      { "source": "Liquid", "target": "International shipping", "value": 128.69 },
      { "source": "Liquid", "target": "Road transport", "value": 135.835 },
      { "source": "Liquid", "target": "Domestic aviation", "value": 14.458 },
      { "source": "Liquid", "target": "International aviation", "value": 206.267 },
      { "source": "Liquid", "target": "Agriculture", "value": 3.64 },
      { "source": "Liquid", "target": "National navigation", "value": 33.218 },
      { "source": "Liquid", "target": "Rail transport", "value": 4.413 },
      { "source": "Marine algae", "target": "Bio-conversion", "value": 4.375 },
      { "source": "Ngas", "target": "Gas", "value": 122.952 },
      { "source": "Nuclear", "target": "Thermal generation", "value": 839.978 },
      { "source": "Oil imports", "target": "Oil", "value": 504.287 },
      { "source": "Oil reserves", "target": "Oil", "value": 107.703 },
      { "source": "Oil", "target": "Liquid", "value": 611.99 },
      { "source": "Other waste", "target": "Solid", "value": 56.587 },
      { "source": "Other waste", "target": "Bio-conversion", "value": 77.81 },
      { "source": "Pumped heat", "target": "Heating and cooling - homes", "value": 193.026 },
      { "source": "Pumped heat", "target": "Heating and cooling - commercial", "value": 70.672 },
      { "source": "Solar PV", "target": "Electricity grid", "value": 59.901 },
      { "source": "Solar Thermal", "target": "Heating and cooling - homes", "value": 19.263 },
      { "source": "Solar", "target": "Solar Thermal", "value": 19.263 },
      { "source": "Solar", "target": "Solar PV", "value": 59.901 },
      { "source": "Solid", "target": "Agriculture", "value": 0.882 },
      { "source": "Solid", "target": "Thermal generation", "value": 400.12 },
      { "source": "Solid", "target": "Industry", "value": 46.477 },
      { "source": "Thermal generation", "target": "Electricity grid", "value": 525.531 },
      { "source": "Thermal generation", "target": "Losses", "value": 787.129 },
      { "source": "Thermal generation", "target": "District heating", "value": 79.329 },
      { "source": "Tidal", "target": "Electricity grid", "value": 9.452 },
      { "source": "UK land based bioenergy", "target": "Bio-conversion", "value": 182.01 },
      { "source": "Wave", "target": "Electricity grid", "value": 19.013 },
      { "source": "Wind", "target": "Electricity grid", "value": 289.366 }
    ]
  };

  const getOption = () => {

    return {
      backgroundColor: "#FFFFFF",
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          name: 'sankey',
          type: 'sankey',
          data: data.nodes,
          links: data.links,
          focusNodeAdjacency: 'allEdges',
          itemStyle: {
            borderWidth: 1,
            borderColor: '#aaa'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.5
          }
        }
      ]
    };
  };

  useEffect(() => {

  }, []);


  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Auxiliary System')}</BreadcrumbItem><BreadcrumbItem active>{t('Energy Flow Diagram')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="selectedEnergyFlowDiagram">
                  {t('Energy Flow Diagram')}
                </Label>
                <CustomInput type="select" id="selectedEnergyFlowDiagram" name="selectedEnergyFlowDiagram" 
                value={selectedEnergyFlowDiagram} onChange={({ target }) => setSelectedEnergyFlowDiagram(target.value)}
                >
                  {energyFlowDiagramOptions.map((selectedEnergyFlowDiagram, index) => (
                    <option value={selectedEnergyFlowDiagram.value} key={index}>
                      {selectedEnergyFlowDiagram.label}
                    </option>
                  ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingPeriodBeginsDatetime">
                  {t('Reporting Period Begins')}
                </Label>
                <Datetime id='reportingPeriodBeginsDatetime' value={reportingPeriodBeginsDatetime} />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingPeriodEndsDatetime">
                  {t('Reporting Period Ends')}
                </Label>
                <Datetime id='reportingPeriodEndsDatetime' value={reportingPeriodEndsDatetime} />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup>
                <br></br>
                <ButtonGroup id="submit">
                  <Button color="success" >{t('Submit')}</Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mb-3 fs--1">
        <CardBody className="rounded-soft bg-gradient">
          <ReactEchartsCore
            echarts={echarts}
            option={getOption()}
            data={data}
            style={{ width: '100%', height: 600 }}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default withTranslation()(withRedirect(EnergyFlowDiagram));
