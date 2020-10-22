import React, { createRef, Fragment, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import uuid from 'uuid/v1';
import Cascader from 'rc-cascader';
import loadable from '@loadable/component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Flex from '../../common/Flex';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { APIBaseURL } from '../../../config';


const EquipmentTracking = ({ setRedirect, setRedirectUrl, t }) => {
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
  const DetailedDataTable = loadable(() => import('../common/DetailedDataTable'));
  // State
  // Query Parameters
  const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
  const [selectedSpaceID, setSelectedSpaceID] = useState(undefined);
  const [cascaderOptions, setCascaderOptions] = useState(undefined);
  //Results
  const [detailedDataTableData, setDetailedDataTableData] = useState([]);
  const [detailedDataTableColumns, setDetailedDataTableColumns] = useState([{
    dataField: 'name',
    headerClasses: 'border-0',
    text: t('Name'),
    classes: 'border-0 py-2 align-middle',
    formatter: nameFormatter,
    sort: true
  }]);


  useEffect(() => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/spaces/tree', {
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
      console.log(json)
      if (isResponseOK) {
        // rename keys 
        json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
        setCascaderOptions(json);
        setSelectedSpaceName([json[0]].map(o => o.label));
        setSelectedSpaceID([json[0]].map(o => o.value));
      } else {
        toast.error(json.description);
      }
    }).catch(err => {
      console.log(err);
    });

  }, []);
  const nameFormatter = (dataField, { name }) => (
    <Link to="#">
      <Media tag={Flex} align="center">
        <Media body className="ml-2">
          <h5 className="mb-0 fs--1">{name}</h5>
        </Media>
      </Media>
    </Link>
  );

  const actionFormatter = (dataField, { id }) => (
    // Control your row with this id
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => console.log('Edit: ', id)}>Edit</DropdownItem>
        <DropdownItem onClick={() => console.log('Delete: ', id)} className="text-danger">Delete</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  let onSpaceCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
    setSelectedSpaceID(value[value.length - 1]);
  }

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    console.log(selectedSpaceID);
    
    let isResponseOK = false;
    fetch(APIBaseURL + '/reports/equipmenttracking?' +
      'spaceid=' + selectedSpaceID, {
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
      return response.json();
    }).then(json => {
      if (isResponseOK) {
        console.log(json)

        setDetailedDataTableColumns([
          {
            dataField: 'name',
            headerClasses: 'border-0',
            text: t('Name'),
            classes: 'border-0 py-2 align-middle',
            formatter: nameFormatter,
            sort: true
          },
          {
            dataField: 'costcenter',
            headerClasses: 'border-0',
            text: t('Cost Center'),
            classes: 'border-0 py-2 align-middle',
            sort: true
          },
          {
            dataField: 'space',
            headerClasses: 'border-0',
            text: t('Space'),
            classes: 'border-0 py-2 align-middle',
            sort: true
          },
          {
            dataField: 'description',
            headerClasses: 'border-0',
            text: t('Description'),
            classes: 'border-0 py-2 align-middle',
            sort: true
          },
          {
            dataField: '',
            headerClasses: 'border-0',
            text: '',
            classes: 'border-0 py-2 align-middle',
            formatter: actionFormatter,
            align: 'right'
          }
        ]);
      
        setDetailedDataTableData([
          {
            id: uuid(),
            name: '锅炉#1',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/锅炉房',
            description: '2392 Main Avenue',
          },
          {
            id: uuid(),
            name: '锅炉#2',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/锅炉房',
            description: '2289 5th Avenue',
          },
          {
            id: uuid(),
            name: '锅炉#3',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/锅炉房',
            description: '112 Bostwick Avenue',
          },
          {
            id: uuid(),
            name: '锅炉#4',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/锅炉房',
            description: '3448 Ile De France St #242',
          },
          {
            id: uuid(),
            name: '锅炉#5',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/锅炉房',
            description: '659 Hannah Street',
          },
          {
            id: uuid(),
            name: '高压制冷机CH-ZL-01',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/空调水',
            description: '2298 Locust Court',
          },
          {
            id: uuid(),
            name: '高压制冷机CH-ZL-02',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/空调水',
            description: '4678 Maud Street',
          },
          {
            id: uuid(),
            name: '高压制冷机CH-ZL-03',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/空调水',
            description: '3412 Crestview Manor',
          },
          {
            id: uuid(),
            name: '高压制冷机CH-ZL-04',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/空调水',
            description: '4895 Farnum Road',
          },
          {
            id: uuid(),
            name: '高压制冷机CH-ZL-05',
            costcenter: '成本中心1',
            space: '成都项目/公区商场/空调水',
            description: '3291 Hillside Street',
          },
          {
            id: uuid(),
            name: '空压机#1',
            costcenter: '成本中心1',
            space: '成都项目/动力中心/空压站',
            description: '162 Hillhaven Drive',
          },
          {
            id: uuid(),
            name: '空压机#2',
            costcenter: '成本中心1',
            space: '成都项目/动力中心/空压站',
            description: '2551 Ocala Street',
          },
          {
            id: uuid(),
            name: '空压机#3',
            costcenter: '成本中心1',
            space: '成都项目/动力中心/空压站',
            description: '13572 Kurt Mews South Merritt'
          },
          {
            id: uuid(),
            name: '空压机#4',
            costcenter: '成本中心1',
            space: '成都项目/动力中心/空压站',
            description: '91979 Kohler Place Waelchiborough'
          },
          {
            id: uuid(),
            name: '空压机#5',
            costcenter: '成本中心1',
            space: '成都项目/动力中心/空压站',
            description: '6757 Giuseppe Meadows Geraldinemouth'
          },
          {
            id: uuid(),
            name: '注塑机#1',
            costcenter: '成本中心1',
            space: '成都项目/二期厂/空压站',
            description: '2327 Kaylee Mill East Citlalli'
          },
          {
            id: uuid(),
            name: '注塑机#2',
            costcenter: '成本中心1',
            space: '成都项目/二期厂/空压站',
            description: '25156 Isaac Crossing Apt.'
          },
          {
            id: uuid(),
            name: '注塑机#3',
            costcenter: '成本中心1',
            space: '成都项目/二期厂/空压站',
            description: '71603 Wolff Plains Apt'
          },
          {
            id: uuid(),
            name: '注塑机#4',
            costcenter: '成本中心1',
            space: '成都项目/二期厂/空压站',
            description: '431 Steuber Mews'
          },
          {
            id: uuid(),
            name: '注塑机#5',
            costcenter: '成本中心1',
            space: '成都项目/二期厂/空压站',
            description: '4167 Laverna Manor Marysemouth'
          },
          {
            id: uuid(),
            name: '清洗机#1',
            costcenter: '成本中心1',
            space: '成都项目/发动机厂',
            description: '829 Lavonne Valley'
          },
          {
            id: uuid(),
            name: '清洗机#2',
            costcenter: '成本中心1',
            space: '成都项目/发动机厂',
            description: '53150 Thad Squares'
          },
          {
            id: uuid(),
            name: '清洗机#3',
            costcenter: '成本中心1',
            space: '成都项目/发动机厂',
            description: "9198 O'Kon Harbors"
          },
          {
            id: uuid(),
            name: "清洗机#4",
            costcenter: '成本中心1',
            space: '成都项目/发动机厂',
            description: '1478 Kaitlin Haven'
          },
          {
            id: uuid(),
            name: '清洗机#5',
            costcenter: '成本中心1',
            space: '成都项目/发动机厂',
            description: 'Garry Brainstrow'
          }
        ]);
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
          <BreadcrumbItem>{t('Equipment Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Equipment Tracking')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col xs="auto">
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {t('Space')}
                  </Label>
                  <br />
                  <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col>

              <Col xs="auto">
                <FormGroup>
                  <br></br>
                  <ButtonGroup id="submit">
                    <Button color="success" >{t('Submit')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <DetailedDataTable data={detailedDataTableData} title={t('Equipment List')} columns={detailedDataTableColumns} pagesize={10} >
      </DetailedDataTable>

    </Fragment>
  );
};

export default withTranslation()(withRedirect(EquipmentTracking));
