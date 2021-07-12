import {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import environment from '../../../config/environment';
import {callTryCatch} from '../../../util/callTryCatch';
import {httpClient} from '../../../util/httpClient';
import useToastMessage from '../../ToastMessage/hooks/toastMessageHook';
import {JobStatisticsModel} from '../models/JobStatisticsModel';

const useFetchJobStatistics = () => {
  const {notifyError} = useToastMessage();
  const [data, setData] = useState<JobStatisticsModel>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchJobStatistics = useCallback(
    async (searchParam: {year: string; location: string}) => {
      setLoading(true);
      setError(undefined);

      const [fetchError, response] = await callTryCatch(async () =>
        httpClient.get<any, AxiosResponse<JobStatisticsModel>>(
          `${environment.domainApi}/jobs-scrap/api/v1/statistics?year=${searchParam.year}&location=${searchParam.location}`
        )
      );

      setLoading(false);

      const jobStatistics = (
        response as AxiosResponse<JobStatisticsModel> | undefined
      )?.data;

      if (fetchError) {
        // eslint-disable-next-line no-console
        console.error('<FetchJobStatisticsHook>', fetchError);
        setError(fetchError as Error);
        notifyError({
          message: 'Fetching error',
          description:
            'Oops! Something went wrong while fetching job statistics',
        });

        return null;
      }

      setData(jobStatistics);
      return jobStatistics;
    },
    [setLoading, notifyError]
  );

  return {
    loading,
    data,
    error,
    fetchJobStatistics,
  };
};

export default useFetchJobStatistics;
