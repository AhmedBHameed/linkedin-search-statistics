export interface SearchSettingModel {
  chartConfig: {
    backgroundColor: string;
    borderColor: string;
  };
  locations: string[];
  filterType: string[];
  filterExperience: string[];
  query: string;
  createdAt: Date;
  filterTime: string;
  id: string;
  updatedAt: string;
}
