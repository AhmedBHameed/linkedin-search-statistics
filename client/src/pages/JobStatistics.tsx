import {Card, Col, DatePicker, Row} from 'antd';
import {LabeledValue} from 'antd/lib/select';
import moment, {Moment} from 'moment';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import AsyncResult from '../components/AsyncResult/AsyncResult';
import {FormControl, SelectOptionField} from '../components/Forms/Form';
import JobStatisticChart from '../components/JobStatisticChart/JobStatisticChart';
import useFetchJobSearchLocations from '../components/JobStatistics/hooks/fetchJobSearchLocationsHook';
import useFetchJobStatistics from '../components/JobStatistics/hooks/fetchJobsStatisticsHook';
import useFetchSearchSettings from '../components/JobStatistics/hooks/fetchSearchSettingsHook';
import ContentLoading from '../components/Loading/ContentLoading';
import NAVIGATION_ROUTES from '../config/NavigationRoutes';

const StyledRow = styled(Row)`
  min-height: 100%;
  margin-top: 5rem;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

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
    <StyledRow align="top" gutter={[16, 16]} justify="center">
      <Col md={22} xs={23}>
        <Card title="Statistic controls">
          <Row gutter={[16, 16]}>
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
        </Card>
      </Col>

      {location && year && (
        <Col md={22} xs={23}>
          <Card title="Job statistics">
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
        </Col>
      )}
    </StyledRow>
  );
};

export default JobStatistics;
