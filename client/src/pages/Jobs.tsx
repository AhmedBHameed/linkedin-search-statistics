import {joiResolver} from '@hookform/resolvers/joi';
import {Card, Col, DatePicker, Row, Typography} from 'antd';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import styled from 'styled-components';
import BaseButton from '../components/Buttons/BaseButton';
import {Form, FormControl, SelectOptionField} from '../components/Forms/Form';
import useFetchJobs from '../components/Jobs/hooks/fetchJobsHook';
import jobSearchSchema from '../components/Jobs/jobSearchSchema';
import JobsTable from '../components/Jobs/JobsTable';
import {JobSearchInput} from '../components/Jobs/models/JobSearchInput';
import useFetchJobSearchLocations from '../components/JobStatistics/hooks/fetchJobSearchLocationsHook';
import useFetchSearchSettings from '../components/JobStatistics/hooks/fetchSearchSettingsHook';
import BoldLabel from '../components/shared/BoldLabel';
import PagesContainer from '../components/shared/PagesContainer';
import devices from '../styles/mediaQueries';

const StyledBaseButton = styled(BaseButton)`
  width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const Title = styled(Typography.Title)`
  && {
    font-size: 2.5rem;
    @media ${devices.mdMediaQuery} {
      font-size: 3rem;
    }
  }
`;

const Jobs: React.FC = () => {
  const {data, loading, fetchJobs} = useFetchJobs();
  const jobSearchLocations = useFetchJobSearchLocations();
  const searchSettingsQuery = useFetchSearchSettings();

  const locationsOptions = useMemo(
    () =>
      jobSearchLocations.data?.locations.map((choice) => ({
        label: choice,
        value: choice,
      })) || [],
    [jobSearchLocations]
  );

  const jobQueries = useMemo(
    () =>
      searchSettingsQuery.data?.map((setting) => ({
        label: setting.query,
        value: setting.query,
      })) || [],
    [searchSettingsQuery]
  );

  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues,
  } = useForm<JobSearchInput>({
    resolver: joiResolver(jobSearchSchema),
    defaultValues: {
      location: '',
      query: '',
      year: moment(new Date()).format('yyyy'),
      page: 1,
      perPage: 25,
    },
  });

  const submit = useCallback(
    (formData: JobSearchInput) => {
      fetchJobs(formData);
      //   fetchJobs({
      //     perPage: 25,
      //     page: 1,
      //     year: '2021',
      //     query: 'node.js',
      //     location: 'australia',
      //   });
    },
    [fetchJobs]
  );

  const handleOnPagination = useCallback(
    (page: number, perPage: number) => {
      const {location, query, year} = getValues();
      fetchJobs({
        location,
        query,
        year,
        page,
        perPage,
      });
    },
    [fetchJobs, getValues]
  );

  useEffect(() => {
    jobSearchLocations.fetchJobSearchLocations();
    searchSettingsQuery.fetchSearchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const locationError = errors.location?.message;
  const queryError = errors.query?.message;
  const yearError = errors.year?.message;

  return (
    <PagesContainer
      colLg={22}
      headTitle={
        <Row align="middle" gutter={[16, 16]}>
          <Col md={12} xs={17}>
            <Title>Jobs</Title>
          </Col>
        </Row>
      }
    >
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24}>
          <Card title={<BoldLabel>Search controls</BoldLabel>}>
            <Form onSubmit={handleSubmit(submit)}>
              <Row gutter={[16, 16]}>
                <Col xs={8}>
                  <FormControl label="Year">
                    <Controller
                      control={control}
                      name="year"
                      render={({field: {value, onChange}}) => (
                        <StyledDatePicker
                          onChange={(momentClass) =>
                            onChange(momentClass?.format('yyyy') || '')
                          }
                          picker="year"
                          size="large"
                          value={moment(value, 'yyyy')}
                        />
                      )}
                    />
                  </FormControl>
                </Col>

                <Col xs={8}>
                  <FormControl label="Location">
                    <Controller
                      control={control}
                      name="location"
                      render={({field: {value, onChange}}) => (
                        <SelectOptionField
                          ariaLabel="location query"
                          error={!!yearError}
                          onChange={(currentLocation) =>
                            onChange(currentLocation.value)
                          }
                          options={locationsOptions}
                          optionsTestId="questionnaire-multiple-select-options"
                          size="large"
                          testId="questionnaire-multiple-select-field"
                          value={locationsOptions.find(
                            (choice) => choice.value === value
                          )}
                        />
                      )}
                    />
                  </FormControl>
                </Col>

                <Col xs={8}>
                  <FormControl label="Job query">
                    <Controller
                      control={control}
                      name="query"
                      render={({field: {value, onChange}}) => (
                        <SelectOptionField
                          ariaLabel="job query"
                          error={!!queryError}
                          onChange={(currentLocation) =>
                            onChange(currentLocation.value)
                          }
                          options={jobQueries}
                          optionsTestId="job-query-select-options"
                          size="large"
                          testId="job-query-select-field"
                          value={jobQueries.find(
                            (choice) => choice.value === value
                          )}
                        />
                      )}
                    />
                  </FormControl>
                </Col>

                <Col xs={24}>
                  <StyledBaseButton htmlType="submit" type="primary">
                    Search
                  </StyledBaseButton>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>

        <Col xs={24}>
          <JobsTable
            jobs={data?.jobs}
            loading={loading}
            onPagination={handleOnPagination}
            totalCount={data?.count || 0}
          />
        </Col>
      </Row>
    </PagesContainer>
  );
};

export default Jobs;
