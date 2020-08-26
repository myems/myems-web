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
  FormGroup,
  Input,
  InputGroup,
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
import { cascaderOptions } from '../common/cascaderOptions';


const MeterTracking = ({ setRedirect, setRedirectUrl,  t }) => {
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
  let table = createRef();
  // State
  const [selectedSpace, setSelectedSpace] = useState(undefined);

  const DetailedDataTable = loadable(() => import('../common/DetailedDataTable'));

  const nameFormatter = (dataField, { name }) => (
    <Link to="/pages/customer-details">
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
  
  const columns = [
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
  ];
  
  const meters = [
    {
      id: uuid(),
      name: '锅炉#1',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/锅炉房',
      description: '2392 Main Avenue, Penasauka, New Jersey 02139',
    },
    {
      id: uuid(),
      name: '锅炉#2',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/锅炉房',
      description: '2289 5th Avenue, New York, New York, 10037',
      joined: '11/07/2017'
    },
    {
      id: uuid(),
      name: '锅炉#3',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/锅炉房',
      description: '112 Bostwick Avenue, Jersey City, New Jersey, 0730',
    },
    {
      id: uuid(),
      name: '锅炉#4',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/锅炉房',
      description: '3448 Ile De France St #242, Fort Wainwright, Alaska, 99703',
    },
    {
      id: uuid(),
      name: '锅炉#5',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/锅炉房',
      description: '659 Hannah Street, Charlotte, NC 28273',
    },
    {
      id: uuid(),
      name: '高压制冷机CH-ZL-01',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/空调水',
      description: '2298 Locust Court, Artesia, CA 90701',
    },
    {
      id: uuid(),
      name: '高压制冷机CH-ZL-02',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/空调水',
      description: '4678 Maud Street, Philadelphia, DE 19103',
    },
    {
      id: uuid(),
      name: '高压制冷机CH-ZL-03',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/空调水',
      description: '3412 Crestview Manor, Indianapolis, IN 46234',
    },
    {
      id: uuid(),
      name: '高压制冷机CH-ZL-04',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/空调水',
      description: '4895 Farnum Road, New York, NY 10004',
    },
    {
      id: uuid(),
      name: '高压制冷机CH-ZL-05',
      costcenter: '成本中心1',
      space: '成都项目/公区商场/空调水',
      description: '3291 Hillside Street, Mesa, AZ 85201',
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
      description: '13572 Kurt Mews South'
    },
    {
      id: uuid(),
      name: '空压机#4',
      costcenter: '成本中心1',
      space: '成都项目/动力中心/空压站',
      description: '91979 Kohler Place'
    },
    {
      id: uuid(),
      name: '空压机#5',
      costcenter: '成本中心1',
      space: '成都项目/动力中心/空压站',
      description: '6757 Giuseppe Meadows'
    },
    {
      id: uuid(),
      name: '注塑机#1',
      costcenter: '成本中心1',
      space: '成都项目/二期厂/空压站',
      description: '2327 Kaylee Mill'
    },
    {
      id: uuid(),
      name: '注塑机#2',
      costcenter: '成本中心1',
      space: '成都项目/二期厂/空压站',
      description: '25156 Isaac Crossing'
    },
    {
      id: uuid(),
      name: '注塑机#3',
      costcenter: '成本中心1',
      space: '成都项目/二期厂/空压站',
      description: '71603 Wolff Plains'
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
      description: '4167 Laverna Manor'
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
  ];
  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Meter Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Meter Tracking')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="space">
                  {t('Space')}
                </Label>
                <br />
                <Cascader options={cascaderOptions}
                  onChange={onCascaderChange}
                  changeOnSelect
                  expandTrigger="hover">
                  <Input
                    value={selectedSpace}
                  />
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
        </CardBody>
      </Card>
      <DetailedDataTable data={meters} title={t('Meter List')} columns={columns} pagesize={10} >
      </DetailedDataTable>
      
    </Fragment>
  );
};

export default withTranslation()(withRedirect(MeterTracking));
