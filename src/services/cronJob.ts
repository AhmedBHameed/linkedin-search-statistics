import {CronJob} from 'cron';
import {remoteFilter} from 'linkedin-jobs-scraper';
import {IJobSearchSetting} from '../database/JobSearchSettingModel';
import getJobSearchSettings from '../use-cases/jobSearchSetting/getJobSearchSettings.usecase';
import {callTryCatch} from '../util/callTryCatch';
import {runLinkedInScraper, isScraperFinished} from './linkedinScraper';

class ScheduleTask {
  public async run() {
    new CronJob(
      '00 00 */8 * * *',
      async () => {
        console.log('==>> isScraperFinished: ', isScraperFinished, new Date());
        if (isScraperFinished) {
          const [error, data] = await callTryCatch(async () => await getJobSearchSettings());
          const scrapSettings = data as IJobSearchSetting[];
          if (!error && scrapSettings.length) {
            runLinkedInScraper(
              scrapSettings.map(setting => ({
                query: setting.query,
                options: {
                  locations: setting.locations, // This will be merged with the global options => ["United States", "Europe"]
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
