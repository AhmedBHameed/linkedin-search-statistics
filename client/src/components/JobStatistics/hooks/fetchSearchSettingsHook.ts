import {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import environment from '../../../config/environment';
import {callTryCatch} from '../../../util/callTryCatch';
import {httpClient} from '../../../util/httpClient';
import useToastMessage from '../../ToastMessage/hooks/toastMessageHook';
import {SearchSettingModel} from '../models/searchSettingModel';

const useFetchSearchSettings = () => {
  const {notifyError} = useToastMessage();
  const [data, setData] = useState<SearchSettingModel[]>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchSearchSettings = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    const [fetchError, response] = await callTryCatch(async () =>
      httpClient.get<any, AxiosResponse<SearchSettingModel[]>>(
        `${environment.domainApi}/job-scraper/api/v1/settings`
      )
    );

    setLoading(false);

    const jobStatistics = (
      response as AxiosResponse<SearchSettingModel[]> | undefined
    )?.data;

    if (fetchError) {
      // eslint-disable-next-line no-console
      console.error('<FetchSearchSettingsHook>', fetchError);
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
    fetchSearchSettings,
  };
};

export default useFetchSearchSettings;
