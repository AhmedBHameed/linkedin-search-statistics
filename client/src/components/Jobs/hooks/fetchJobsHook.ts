import {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import environment from '../../../config/environment';
import {callTryCatch} from '../../../util/callTryCatch';
import {httpClient} from '../../../util/httpClient';
import useToastMessage from '../../ToastMessage/hooks/toastMessageHook';
import {JobsWithTotalCountModel} from '../models/JobsWithTotalCountModel';

const useFetchJobs = () => {
  const {notifyError} = useToastMessage();
  const [data, setData] = useState<JobsWithTotalCountModel>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(
    async (searchParam: {
      year: string;
      location: string;
      perPage: number;
      page: number;
      query: string;
    }) => {
      setLoading(true);
      setError(undefined);

      const [fetchError, response] = await callTryCatch(async () =>
        httpClient.get<any, AxiosResponse<JobsWithTotalCountModel>>(
          `${environment.domainApi}/jobs-scrap/api/v1/jobs?perPage=${searchParam.perPage}&page=${searchParam.page}` +
            `&year=${searchParam.year}&location=${searchParam.location}&query=${searchParam.query}`
        )
      );

      setLoading(false);

      const jobStatistics = (
        response as AxiosResponse<JobsWithTotalCountModel> | undefined
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
    fetchJobs,
  };
};

export default useFetchJobs;
