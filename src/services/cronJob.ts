import {CronJob} from 'cron';
import {remoteFilter} from 'linkedin-jobs-scraper';
import {IJobSearchLocationModel} from 'src/database/JobSearchLocationModel';
import getJobSearchLocations from 'src/use-cases/getJobLocations.ts/getJobLocations.usecase';
import {IJobSearchSetting} from '../database/JobSearchSettingModel';
import getJobSearchSettings from '../use-cases/jobSearchSetting/getJobSearchSettings.usecase';
import {callTryCatch} from '../util/callTryCatch';
import {runLinkedInScraper, isScraperFinished} from './linkedinScraper';
import {logger} from './Logger';

class ScheduleTask {
  public async run() {
    new CronJob(
      '00 00 */8 * * *',
      async () => {
        if (isScraperFinished) {
          const [searchLocationsError, searchLocationResults] = await callTryCatch(
            async () => await getJobSearchLocations()
          );
          if (searchLocationsError) {
            logger.error('', searchLocationsError);
            return;
          }

          const [error, data] = await callTryCatch(async () => await getJobSearchSettings());
          const scrapSettings = data as IJobSearchSetting[];
          if (!error && scrapSettings.length) {
            runLinkedInScraper(
              scrapSettings.map(setting => ({
                query: setting.query,
                options: {
                  locations: (searchLocationResults as IJobSearchLocationModel)?.locations || [],
                  filters: {
                    time: setting.filterTime,
                    type: setting.filterType,
                    experience: setting.filterExperience,
                    remote: remoteFilter.REMOTE,
                  },
                },
              })),
              {
                // Global options for this run, will be merged individually with each query options (if any)
                // locations: ['New Brunswick'],
                optimize: true,
                limit: 100,
              }
            );
          }
        }
      },
      null,
      true
    );
  }
}

const cronJob = new ScheduleTask();
export default cronJob;
