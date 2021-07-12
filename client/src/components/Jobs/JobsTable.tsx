import {InfoCircleOutlined} from '@ant-design/icons';
import {Col, Popover, Row, Table, Typography} from 'antd';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import BoldLabel from '../shared/BoldLabel';
import useViewport from '../WindowViewport/hooks/windowViewportHook';
import {JobScrapModel} from './models/JobScrapModel';

const {Link} = Typography;

const StyledRow = styled(Row)`
  margin: 1rem 0;
`;

const StyledInfoCircleOutlined = styled(InfoCircleOutlined)`
  font-size: 2rem;
`;

interface JobsTableProps {
  jobs?: JobScrapModel[];
  totalCount: number;
  loading?: boolean;
  onPagination: (page: number, perPage: number) => void;
}

const JobsTable: React.FC<JobsTableProps> = ({
  loading,
  jobs,
  totalCount,
  onPagination,
}) => {
  const {isTabletOrLarger} = useViewport();
  const [paginationConf, setPaginationConf] = useState({
    pageSize: 25,
    current: 1,
    total: totalCount,
  });

  const columns = useMemo(() => {
    if (isTabletOrLarger) {
      return [
        {
          title: <BoldLabel>Company</BoldLabel>,
          dataIndex: 'company',
          key: 'company',
          render: (_: string, row: JobScrapModel) => (
            <Popover content={row.description} title="Description">
              <Link href={row.link} target="_blank">
                {row.company}
              </Link>
            </Popover>
          ),
        },
        {
          title: <BoldLabel>Industries</BoldLabel>,
          dataIndex: 'industries',
          key: 'industries',
        },
        {
          title: <BoldLabel>Title</BoldLabel>,
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: <BoldLabel>Level</BoldLabel>,
          dataIndex: 'senorityLevel',
          key: 'senorityLevel',
        },
        {
          title: <BoldLabel>Employment Type</BoldLabel>,
          dataIndex: 'employmentType',
          key: 'employmentType',
        },
        {
          title: <BoldLabel>Job date</BoldLabel>,
          dataIndex: 'jobDate',
          key: 'jobDate',
          render: (date: Date) => moment(date).format('MMM-yyyy'),
        },
      ];
    }

    return [
      {
        title: <BoldLabel>Job</BoldLabel>,
        dataIndex: 'job',
        key: 'job',
        render: (_: string, row: JobScrapModel) => (
          <Row>
            <Col sm={10} xs={12}>
              <BoldLabel>Company:</BoldLabel>
            </Col>
            <Col sm={14} xs={12}>
              <Link href={row.link} target="_blank">
                {row.company}
              </Link>
            </Col>

            <Col sm={10} xs={12}>
              <BoldLabel>Industries:</BoldLabel>
            </Col>
            <Col sm={14} xs={12}>
              {row.industries}
            </Col>

            <Col sm={10} xs={12}>
              <BoldLabel>Level:</BoldLabel>
            </Col>
            <Col sm={14} xs={12}>
              {row.senorityLevel}
            </Col>

            <Col sm={10} xs={12}>
              <BoldLabel>Employment Type:</BoldLabel>
            </Col>
            <Col sm={14} xs={12}>
              {row.employmentType}
            </Col>

            <Col sm={10} xs={12}>
              <BoldLabel>Job date:</BoldLabel>
            </Col>
            <Col sm={14} xs={12}>
              {moment(row.jobDate).format('MMM-yyyy')}
            </Col>

            <Col xs={24}>
              <StyledRow>
                <Col sm={10} xs={12}>
                  <BoldLabel>Description:</BoldLabel>
                </Col>
                <Col sm={14} xs={12}>
                  <Popover content={row.description} title="Description">
                    <StyledInfoCircleOutlined />
                  </Popover>
                </Col>
              </StyledRow>
            </Col>
          </Row>
        ),
      },
    ];
  }, [isTabletOrLarger]);

  const handleOnPageChange = useCallback(
    (page: number) => {
      setPaginationConf((oldSate) => ({
        ...oldSate,
        current: page,
        total: totalCount,
      }));
      onPagination(page, paginationConf.pageSize);
    },
    [paginationConf, totalCount, onPagination, setPaginationConf]
  );

  useEffect(() => {
    if (totalCount) {
      setPaginationConf((oldSate) => ({
        ...oldSate,
        total: totalCount,
      }));
    }
  }, [totalCount]);

  return (
    <Table
      columns={columns}
      dataSource={jobs}
      loading={loading}
      pagination={{
        ...paginationConf,
        onChange: handleOnPageChange,
        position: ['bottomCenter'],
      }}
      rowKey="id"
    />
  );
};

export default JobsTable;
