export enum TimeEnum {
  ANY = '',
  DAY = 'r86400',
  WEEK = 'r604800',
  MONTH = 'r2592000',
}

export enum TypeEnum {
  FULL_TIME = 'F',
  PART_TIME = 'P',
  TEMPORARY = 'T',
  CONTRACT = 'C',
  INTERNSHIP = 'I',
  VOLUNTEER = 'V',
  OTHER = 'O',
}

export enum ExperienceLevelEnum {
  INTERNSHIP = '1',
  ENTRY_LEVEL = '2',
  ASSOCIATE = '3',
  MID_SENIOR = '4',
  DIRECTOR = '5',
  EXECUTIVE = '6',
}

export interface ScraperSearchInput {
  query: string;
  locations: string[]; // This will be merged with the global options => ["United States", "Europe"]
  filterTime: TimeEnum;
  filterType: TypeEnum[];
  filterExperience: ExperienceLevelEnum[];
  searchLimit: number;
}
