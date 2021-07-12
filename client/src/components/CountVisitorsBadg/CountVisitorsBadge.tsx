import {Badge} from 'antd';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import BoldLabel from '../shared/BoldLabel';
import useFetchCountVisitors from './hooks/fetchCountVisitorsHook';

const StyledBadge = styled(Badge)`
  margin-right: 0.5rem;
  .ant-scroll-number-only {
    font-weight: bold;
  }
`;

const CountVisitorsBadge: React.FC = () => {
  const {data, fetchCountVisitors} = useFetchCountVisitors();

  useEffect(() => {
    fetchCountVisitors();
  }, [fetchCountVisitors]);

  return data ? (
    <>
      <StyledBadge
        count={data.totalVisits}
        overflowCount={9999999999999999999}
      />
      <BoldLabel>Visits</BoldLabel>
    </>
  ) : (
    <></>
  );
};

export default CountVisitorsBadge;
