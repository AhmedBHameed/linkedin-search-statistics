import {JobScrapModel} from './JobScrapModel';

export interface JobsWithTotalCountModel {
  jobs: JobScrapModel[];
  count: number;
}
