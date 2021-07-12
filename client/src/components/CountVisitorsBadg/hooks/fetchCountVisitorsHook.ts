import {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import environment from '../../../config/environment';
import {callTryCatch} from '../../../util/callTryCatch';
import {httpClient} from '../../../util/httpClient';
import useToastMessage from '../../ToastMessage/hooks/toastMessageHook';

interface CountVisitorsModel {
  totalVisits: number;
}

const useFetchCountVisitors = () => {
  const {notifyError} = useToastMessage();
  const [data, setData] = useState<CountVisitorsModel>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchCountVisitors = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    const [fetchError, response] = await callTryCatch(async () =>
      httpClient.get<any, AxiosResponse<CountVisitorsModel>>(
        `${environment.domainApi}/jobs-scrap/api/v1/total-visits`
      )
    );

    setLoading(false);

    const countVisitors = (
      response as AxiosResponse<CountVisitorsModel> | undefined
    )?.data;

    if (fetchError) {
      // eslint-disable-next-line no-console
      console.error('<FetchCountVisitorsHook>', fetchError);
      setError(fetchError as Error);
      notifyError({
        message: 'Fetching error',
        description: 'Oops! Something went wrong while fetching count visitors',
      });

      return null;
    }

    setData(countVisitors);
    return countVisitors;
  }, [setLoading, notifyError]);

  return {
    loading,
    data,
    error,
    fetchCountVisitors,
  };
};

export default useFetchCountVisitors;
