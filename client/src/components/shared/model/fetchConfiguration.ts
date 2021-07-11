import {AxiosError} from 'axios';

export interface FetchConfiguration<T> {
  onComplete?: (data: T) => void;
  onError?: (error: AxiosError<T>) => void;
}
