import {Col, Row} from 'antd';
import React from 'react';
// import {useTranslation} from 'react-i18next';
// import styled from 'styled-components';
// import AsyncResult from '../components/AsyncResult/AsyncResult';
// import BaseButton from '../components/Buttons/BaseButton';

// import NotificationList from '../components/Dashboard/NotificationList';
// import OverlayLoading from '../components/Loading/OverlayLoading';
// import useNavigateToOrderAnalysis from '../components/OrderAnalysis/hooks/navigateToOrderAnalysisHook';
// import useNavigateToPatients from '../components/Patients/hooks/navigateToPatientsHook';
// import useFetchProfileAccount from '../components/ProfileAccount/hooks/fetchProfileAccountHook';
// import BoldLabel from '../components/shared/BoldLabel';
import PagesContainer from '../components/shared/PagesContainer';
// import devices from '../styles/mediaQueries';

const Dashboard: React.FC = () => (
  // const {loading, data, errorState, refetchProfileAccount} =
  //   useFetchProfileAccount();
  // const {goToOrderAnalysis} = useNavigateToOrderAnalysis();
  // const {goToPatients} = useNavigateToPatients();

  // if (loading) return <OverlayLoading />;

  // if (errorState)
  //   return (
  //     <AsyncResult
  //       onActionButtonClick={refetchProfileAccount}
  //       status={errorState}
  //     />
  //   );

  <PagesContainer>
    <Row gutter={[16, 16]} justify="center">
      <Col lg={16} md={20} xl={14} xs={23}>
        Dashboard page
      </Col>
    </Row>
  </PagesContainer>
);
export default Dashboard;
