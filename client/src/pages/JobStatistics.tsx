import {Alert, Card, Col, DatePicker, Row, Typography} from 'antd';
import {LabeledValue} from 'antd/lib/select';
import moment, {Moment} from 'moment';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import AsyncResult from '../components/AsyncResult/AsyncResult';
import CountVisitorsBadge from '../components/CountVisitorsBadg/CountVisitorsBadge';
import {FormControl, SelectOptionField} from '../components/Forms/Form';
import JobStatisticChart from '../components/JobStatisticChart/JobStatisticChart';
import useFetchJobSearchLocations from '../components/JobStatistics/hooks/fetchJobSearchLocationsHook';
import useFetchJobStatistics from '../components/JobStatistics/hooks/fetchJobsStatisticsHook';
import useFetchSearchSettings from '../components/JobStatistics/hooks/fetchSearchSettingsHook';
import ContentLoading from '../components/Loading/ContentLoading';
import BoldLabel from '../components/shared/BoldLabel';
import PagesContainer from '../components/shared/PagesContainer';
import WorldVectorMap from '../components/WorldVectorMap/WorldVectorMap';
import NAVIGATION_ROUTES from '../config/NavigationRoutes';
import devices from '../styles/mediaQueries';

const Title = styled(Typography.Title)`
  && {
    font-size: 2.5rem;
    @media ${devices.mdMediaQuery} {
      font-size: 3rem;
    }
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const scrollDown = () =>
  window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});

const JobStatistics: React.FC = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const location = query.get('location');
  const year = query.get('year') || moment(new Date()).format('yyyy');

  const jobStatisticQuery = useFetchJobStatistics();
  const searchSettingsQuery = useFetchSearchSettings();
  const jobSearchLocations = useFetchJobSearchLocations();

  const locationsOptions = useMemo(
    () =>
      jobSearchLocations.data?.locations.map((choice) => ({
        label: choice,
        value: choice,
      })) || [],
    [jobSearchLocations]
  );

  const handleOnYearChange = useCallback(
    (value: Moment | null) => {
      history.push(
        `${
          NAVIGATION_ROUTES.statistics.path
        }?location=${location}&year=${value?.format('yyyy')}`
      );
    },
    [location, history]
  );

  const handleOnSelectChange = useCallback(
    (selectedLocation: LabeledValue) => {
      history.push(
        `${NAVIGATION_ROUTES.statistics.path}?location=${selectedLocation.value}&year=${year}`
      );
      scrollDown();
    },
    [history, year]
  );

  const handleOnAreaClick = useCallback(
    (countryName: string) => {
      history.push(
        `${NAVIGATION_ROUTES.statistics.path}?location=${countryName}&year=${year}`
      );
      scrollDown();
    },
    [history, year]
  );

  useEffect(() => {
    if (location && year) {
      jobStatisticQuery.fetchJobStatistics({year, location});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, year]);

  useEffect(() => {
    searchSettingsQuery.fetchSearchSettings();
    jobSearchLocations.fetchJobSearchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (jobStatisticQuery.error || searchSettingsQuery.error)
    return (
      <AsyncResult
        onActionButtonClick={() => {
          if (location && year) {
            jobStatisticQuery.fetchJobStatistics({year, location});
            searchSettingsQuery.fetchSearchSettings();
          }
        }}
        status={500}
      />
    );

  return (
    <PagesContainer
      headTitle={
        <Row align="middle" gutter={[16, 16]}>
          <Col md={12} xs={17}>
            <Title>Jobs scrap statistic</Title>
          </Col>

          <Col md={12} xs={7}>
            <Row justify="end">
              <CountVisitorsBadge />
            </Row>
          </Col>
        </Row>
      }
    >
      <Row align="middle" gutter={[16, 16]}>
        <Col xs={24}>
          <Card title={<BoldLabel>Statistic controls</BoldLabel>}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Alert
                  closable
                  description={
                    <>
                      <BoldLabel>Location</BoldLabel> can be selected from
                      dropdown list bellow 👇 or directly by clicking on the{' '}
                      <BoldLabel>blue</BoldLabel> area on map. Statistics are
                      interactive.
                      <br />
                      Hover on bars to check more precise information for each
                      category. You can also toggle bars by clicking on the
                      category rectangle (top of the statistics)
                    </>
                  }
                  message="How to use"
                  showIcon
                  type="info"
                />
              </Col>
              <Col xs={12}>
                <FormControl label="Year">
                  <StyledDatePicker
                    onChange={handleOnYearChange}
                    picker="year"
                    size="large"
                    value={moment(year, 'yyyy')}
                  />
                </FormControl>
              </Col>

              <Col xs={12}>
                <FormControl label="Location">
                  <SelectOptionField
                    ariaLabel="search queries"
                    error={!location}
                    onChange={(currentLocation) =>
                      handleOnSelectChange(currentLocation)
                    }
                    options={locationsOptions}
                    optionsTestId="questionnaire-multiple-select-options"
                    size="large"
                    testId="questionnaire-multiple-select-field"
                    value={locationsOptions.find(
                      (choice) => choice.value === location
                    )}
                  />
                </FormControl>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify="center">
              <Col md={18} xl={13} xs={24}>
                <WorldVectorMap
                  locations={jobSearchLocations.data?.locations}
                  onAreaClick={handleOnAreaClick}
                  selectedCountryName={location}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24}>
          {location && year && (
            <Card title={<BoldLabel>Job statistics</BoldLabel>}>
              {jobStatisticQuery.loading || searchSettingsQuery.loading ? (
                <ContentLoading />
              ) : (
                jobStatisticQuery.data &&
                searchSettingsQuery.data && (
                  <JobStatisticChart
                    jobStatisticData={jobStatisticQuery.data}
                    searchSettingsData={searchSettingsQuery.data}
                  />
                )
              )}
            </Card>
          )}
        </Col>
      </Row>
    </PagesContainer>
  );
};

export default JobStatistics;
