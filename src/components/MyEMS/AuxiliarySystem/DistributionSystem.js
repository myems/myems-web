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
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Cascader from 'rc-cascader';
import RealtimeChart from './RealtimeChart';
import LightBoxGallery from '../../common/LightBoxGallery';
import img1 from './distribution.svg';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';


const DistributionSystem = ({ setRedirect, setRedirectUrl, t }) => {

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
      createCookie('is_logged_in', true, 1000 * 60 * 60 * 8);
      createCookie('user_name', user_name, 1000 * 60 * 60 * 8);
      createCookie('user_uuid', user_uuid, 1000 * 60 * 60 * 8);
      createCookie('user_token', user_token, 1000 * 60 * 60 * 8);
    }
  }, []); 
  let table = createRef();
  // State
  const [selectedSpace, setSelectedSpace] = useState(undefined);
  const [distributionsystem, setDistributionSystem] = useState(undefined);

  const cascaderOptions = [{
    label: '成都项目',
    value: 1,
    children: [{
      label: '租区',
      value: 2,
      children: [{
        label: '大租户',
        value: 9,
      }, {
        label: '餐饮租户',
        value: 10,
      }, {
        label: '零售租户',
        value: 11,
      }],
    }, {
      label: '公区商场',
      value: 3,
      children: [{
        label: '给排水',
        value: 12,
      }, {
        label: '扶梯直梯',
        value: 13,
      }, {
        label: '照明及插座',
        value: 14,
      }, {
        label: '空调水',
        value: 15,
      }, {
        label: '空调风',
        value: 16,
      }, {
        label: '特殊功能房间',
        value: 17,
      }, {
        label: '其他用电设备',
        value: 18,
      }]
    }, {
      label: '公区车库',
      value: 4,
      children: [{
        label: '车库通风',
        value: 5,
      }, {
        label: '车库照明',
        value: 6,
        children: [{
          label: '应急照明',
          value: 7,
        }, {
          label: '普通照明',
          value: 8,
        }
        ]
      }]
    }],
  }];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }

  const images = [img1];

  const distributionSystemList = [
    { value: 1, label: '10kV变电所配电图' },
    { value: 2, label: '71AL6-1' },
    { value: 3, label: 'CH-CCHWS' },
    { value: 4, label: '1#冷冻泵' }];

  const realtimeChartOptions = [
    { value: 'a', label: '主进线' },
    { value: 'b', label: '地源热泵空调总表' },
    { value: 'c', label: '消防栓机械泵2路' },
    { value: 'd', label: '一层南' },
    { value: 'e', label: '一层北' }];

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Auxiliary System')}</BreadcrumbItem><BreadcrumbItem active>{t('Distribution System')}</BreadcrumbItem>
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
                <Label className={labelClasses} for="distributionsystem">
                  {t('Distribution System')}
                </Label>
                <CustomInput type="select" id="配电系统" name="distributionsystem" value={distributionsystem} onChange={({ target }) => setDistributionSystem(target.value)}
                >
                  {distributionSystemList.map((distributionsystem, index) => (
                    <option value={distributionsystem.value} key={distributionsystem.value}>
                      {distributionsystem.label}
                    </option>
                  ))}
                </CustomInput>
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
