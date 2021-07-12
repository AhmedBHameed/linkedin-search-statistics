import {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import environment from '../../../config/environment';
import {callTryCatch} from '../../../util/callTryCatch';
import {httpClient} from '../../../util/httpClient';

interface ProfileData {
  id: string;
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
  };
}

interface ProfileQuery {
  errors?: any[];
  data?: {
    profile: ProfileData;
  };
}

const useFetchProfile = () => {
  const [data, setData] = useState<ProfileData | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);

    const [error, response] = await callTryCatch(async () =>
      httpClient.post<any, AxiosResponse<ProfileQuery>>(
        `${environment.authDomainApi}/nodeys/v1/graphql`,
        {
          query: `
            query Profile {
                profile {
                    id
                    email
                    gender
                    name {
                        first
                        last
                    }
                }
            }
        `,
        }
      )
    );

    setLoading(false);

    const profileQuery = (response as AxiosResponse<ProfileQuery>)?.data;

    if (error || profileQuery.errors) {
      return null;
    }
    setData(profileQuery.data?.profile);
    return profileQuery;
  }, [setLoading]);

  return {
    loading,
    data,
    fetchProfile,
  };
};

export default useFetchProfile;
