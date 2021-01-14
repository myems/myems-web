import React, { createRef, Fragment, useState, useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import Cascader from 'rc-cascader';
import RealtimeChart from './RealtimeChart';
import LightBoxGallery from '../../common/LightBoxGallery';
import img1 from './distribution.svg';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { APIBaseURL } from '../../../config';


const DistributionSystem = ({ setRedirect, setRedirectUrl, t }) => {

  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_display_name = getCookieValue('user_display_name');
    let user_uuid = getCookieValue('user_uuid');
    let token = getCookieValue('token');
    if (is_logged_in === null || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, 1000 * 60 * 60 * 8);
      createCookie('user_name', user_name, 1000 * 60 * 60 * 8);
      createCookie('user_display_name', user_display_name, 1000 * 60 * 60 * 8);
      createCookie('user_uuid', user_uuid, 1000 * 60 * 60 * 8);
      createCookie('token', token, 1000 * 60 * 60 * 8);
    }
  });
  let table = createRef();
  // State
  // Query Parameters
  const [distributionSystemList, setDistributionSystemList] = useState([]);
  const [selectedDistributionSystem, setSelectedDistributionSystem] = useState(undefined);
  
  // button
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [spinnerHidden, setSpinnerHidden] = useState(true);
  
  //Results
  const [realtimeChartOptions, setRealtimeChartOptions] = useState([]);
  const [realtimeChartData, setRealtimeChartData] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/distributionsystems', {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      console.log(response);
      if (response.ok) {
        isResponseOK = true;
      }
      return response.json();
    }).then(json => {
      console.log(json);
      if (isResponseOK) {
        // rename keys 
        json = JSON.parse(JSON.stringify(json).split('"id":').join('"value":').split('"name":').join('"label":'));
        console.log(json);
        setDistributionSystemList(json);
        setSelectedDistributionSystem([json[0]].map(o => o.value));
        // enable submit button
        setSubmitButtonDisabled(false);
      } else {
        toast.error(json.description);
      }
    }).catch(err => {
      console.log(err);
    });

  }, []);

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  


  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    console.log(selectedDistributionSystem);

    // disable submit button
    setSubmitButtonDisabled(true);
    // show spinner
    setSpinnerHidden(false);

    let isResponseOK = false;
    fetch(APIBaseURL + '/reports/auxiliarysystemdistributionsystem?' +
      'distributionsystemid=' + selectedDistributionSystem, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      if (response.ok) {
        isResponseOK = true;
      }

      // enable submit button
      setSubmitButtonDisabled(false);
      // hide spinner
      setSpinnerHidden(true);
      
      return response.json();
    }).then(json => {
      if (isResponseOK) {
        console.log(json)
        
        setRealtimeChartOptions([
          { value: 'a', label: '主进线' },
          { value: 'b', label: '地源热泵空调总表' },
          { value: 'c', label: '消防栓机械泵2路' },
          { value: 'd', label: '一层南' },
          { value: 'e', label: '一层北' }
        ]);

        setRealtimeChartData([]);

        setImages([img1]);
        
      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Auxiliary System')}</BreadcrumbItem><BreadcrumbItem active>{t('Distribution System')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="distributionSystemSelect">
                    {t('Distribution System')}
                  </Label>
                  <CustomInput type="select" id="distributionSystemSelect" name="distributionSystemSelect"
                    value={selectedDistributionSystem} onChange={({ target }) => setSelectedDistributionSystem(target.value)}
                  >
                    {distributionSystemList.map((distributionSystem, index) => (
                      <option value={distributionSystem.value} key={index}>
                        {distributionSystem.label}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br></br>
                  <ButtonGroup id="submit">
                    <Button color="success" disabled={submitButtonDisabled} >{t('Submit')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br></br>
                  <Spinner color="primary" hidden={spinnerHidden}  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <Row noGutters>
        <Col lg="3" className="pr-lg-2">
          <RealtimeChart options={realtimeChartOptions} />
        </Col>
        <Col lg="9" className="pr-lg-2">
          <LightBoxGallery images={images}>
            {openImgIndex => (
              <img
                className="rounded w-100 cursor-pointer"
                src={images[0]}
                alt=""
                onClick={() => {
                  openImgIndex(0);
                }}
              />
            )}
          </LightBoxGallery>
        </Col>

      </Row>
    </Fragment>
  );
};

export default withTranslation()(withRedirect(DistributionSystem));
