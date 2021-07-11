export interface JobStatisticsModel {
  query: {
    year: string;
    location: string;
    searchValues: string[];
  };
  statistics: Array<{
    jobDateAsYearMonth: string;
    query: string;
    count: number;
  }>[];
}
