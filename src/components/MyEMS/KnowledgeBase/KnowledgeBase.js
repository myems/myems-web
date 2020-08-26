import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Card, CardBody, Col, CustomInput, Form, Row } from 'reactstrap';
import Summary from './Summary';
import Loader from '../../common/Loader';
import FalconCardHeader from '../../common/FalconCardHeader';
import useFakeFetch from '../../../hooks/useFakeFetch';
import uuid from 'uuid/v1';
import createMarkup from '../../../helpers/createMarkup';
import { isIterableArray } from '../../../helpers/utils'
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';



const KnowledgeBase = ({ setRedirect, setRedirectUrl, t }) => {
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
  const rawFiles = [
    {
      id: uuid(),
      calendar: { month: 'Mar', day: '26' },
      title: "工业节能管理办法",
      uploader: 'Administrator',
      additional: t('Upload Datetime') + ': 2020-03-26 11:00AM<br/>' + t('File Format') + ': PDF <br/>' + t('File Size') + ': 689 KB',
      to: '#'
    },
    {
      id: uuid(),
      calendar: { month: 'Feb', day: '26' },
      title: '用能单位能源计量评价技术规范DB11T 858-2012',
      uploader: 'Administrator',
      additional: t('Upload Datetime') + ': 2020-02-26 11:00AM<br/>' + t('File Format') + ': PDF <br/>' + t('File Size') + ': 1.3 MB',
      to: '#',
    },
    {
      id: uuid(),
      calendar: { month: 'Feb', day: '21' },
      title: '综合能耗计算通则GB-T-2589-2008',
      uploader: 'Administrator',
      additional: t('Upload Datetime') + ': 2020-02-21 11:00AM<br/>' + t('File Format') + ': PDF <br/>' + t('File Size') + ': 2.5 MB',
      to: '#',
      badge: {
        text: 'New',
        color: 'soft-success',
        pill: true
      }
    },
    {
      id: uuid(),
      calendar: { month: 'Dec', day: '31' },
      title: '能源管理体系-要求GB-T-23331-2012',
      uploader: 'Administrator',
      additional: t('Upload Datetime') + ': 2019-12-31 11:00AM<br/>' + t('File Format') + ': PDF <br/>' + t('File Size') + ': 3.6 MB',
      to: '#'
    },
    {
      id: uuid(),
      calendar: { month: 'Dec', day: '16' },
      title: '能源管理体系-实施指南GB-T-29456-2012',
      uploader: 'Administrator',
      additional: t('Upload Datetime') + ': 2019-12-16 11:00AM<br/>' + t('File Format') + ': PDF <br/>' + t('File Size') + ': 8.9 MB',
      to: '#'
    }
  ];
  const { loading, data: files } = useFakeFetch(rawFiles);
  return (
    <Card>
      <FalconCardHeader title={t('Knowledge Base')}>
      </FalconCardHeader>
      <CardBody className="fs--1">
        {loading ? (
          <Loader />
        ) : isIterableArray(files) ? (
          <Row>
            {files.map(({ additional, ...rest }, index) => (
              <Col md={6} className="h-100" key={index}>
                <Summary divider={files.length !== index + 1} {...rest}>
                  <p className="text-1000 mb-0" dangerouslySetInnerHTML={createMarkup(additional)} />
                </Summary>
              </Col>
            ))}
          </Row>
        ) : (
              <Alert color="info" className="mb-0">
                No files found!
              </Alert>
            )}
      </CardBody>
    </Card>
  );
};

export default withTranslation()(withRedirect(KnowledgeBase));
