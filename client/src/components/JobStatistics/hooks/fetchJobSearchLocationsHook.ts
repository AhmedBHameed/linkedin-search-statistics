import {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import environment from '../../../config/environment';
import {callTryCatch} from '../../../util/callTryCatch';
import {httpClient} from '../../../util/httpClient';
import useToastMessage from '../../ToastMessage/hooks/toastMessageHook';
import {JobSearchLocationsModel} from '../models/JobSearchLocationsModel';

const useFetchJobSearchLocations = () => {
  const {notifyError} = useToastMessage();
  const [data, setData] = useState<JobSearchLocationsModel>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchJobSearchLocations = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    const [fetchError, response] = await callTryCatch(async () =>
      httpClient.get<any, AxiosResponse<JobSearchLocationsModel>>(
        `${environment.domainApi}/job-scraper/api/v1/job/locations`
      )
    );

    setLoading(false);

    const jobStatistics = (
      response as AxiosResponse<JobSearchLocationsModel> | undefined
    )?.data;

    if (fetchError) {
      // eslint-disable-next-line no-console
      console.error('<FetchJobSearchLocationsHook>', fetchError);
      setError(fetchError as Error);
      notifyError({
        message: 'Fetching error',
        description:
          'Oops! Something went wrong while fetching search settings',
      });

      return null;
    }

    setData(jobStatistics);
    return jobStatistics;
  }, [setLoading, notifyError]);

  return {
    loading,
    data,
    error,
    fetchJobSearchLocations,
  };
};

export default useFetchJobSearchLocations;
