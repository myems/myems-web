import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Card, CardBody, Col, CustomInput, Form, Row } from 'reactstrap';
import Summary from './Summary';
import Loader from '../../common/Loader';
import FalconCardHeader from '../../common/FalconCardHeader';
import useFakeFetch from '../../../hooks/useFakeFetch';
import uuid from 'uuid/v1';
import createMarkup from '../../../helpers/createMarkup';
import { isIterableArray } from '../../../helpers/utils';

const KnowledgeBase = () => {
  const knowledgeCategories = [
    '选择分类',
    '法律法规',
    '国家标准',
    '地方标准',
    '公司标准',
    '工作流程',
    '安全标准',
    '理论文献',
    '项目文件',
    '其它'
  ];
  const rawFiles = [
    {
      id: uuid(),
      calendar: { month: 'Mar', day: '26' },
      title: "工业节能管理办法",
      uploader: 'Administrator',
      additional: '上传时间: 2020-03-26 11:00AM<br/>文件类型: PDF <br/>文件大小: 689 KB',
      to: '#'
    },
    {
      id: uuid(),
      calendar: { month: 'Feb', day: '26' },
      title: '用能单位能源计量评价技术规范DB11T 858-2012',
      uploader: 'Administrator',
      additional: '上传时间: 2020-02-26 11:00AM<br/>文件类型: PDF <br/>文件大小: 1.3 MB',
      to: '#',
    },
    {
      id: uuid(),
      calendar: { month: 'Feb', day: '21' },
      title: '综合能耗计算通则GB-T-2589-2008',
      uploader: 'Administrator',
      additional: '上传时间: 2020-02-21 11:00AM<br/>文件类型: PDF <br/>文件大小: 2.5 MB',
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
      additional: '上传时间: 2019-12-31 11:00AM<br/>文件类型: PDF <br/>文件大小: 3.6 MB',
      to: '#'
    },
    {
      id: uuid(),
      calendar: { month: 'Dec', day: '16' },
      title: '能源管理体系-实施指南GB-T-29456-2012',
      uploader: 'Administrator',
      additional: '上传时间: 2019-12-16 11:00AM<br/>文件类型: PDF <br/>文件大小: 8.9 MB',
      to: '#'
    }
  ];
  const { loading, data: files } = useFakeFetch(rawFiles);
  return (
    <Card>
      <FalconCardHeader title="知识库">
        {isIterableArray(knowledgeCategories) && (
          <Form inline>
            <CustomInput type="select" id="customSelectCategory" name="customSelectCategory" bsSize="sm">
              {knowledgeCategories.map((option, index) => (
                <option value={index} key={index}>
                  {option}
                </option>
              ))}
            </CustomInput>
          </Form>
        )}
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

export default KnowledgeBase;
