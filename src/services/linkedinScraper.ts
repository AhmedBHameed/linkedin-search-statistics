// @ts-nocheck
import {LinkedinScraper, events} from 'linkedin-jobs-scraper';
import {IQuery, IQueryOptions} from 'linkedin-jobs-scraper/build/scraper/query';
import upsertScrapperConfig, {JobScrapData} from '../use-cases/ScrapperConfig/upsertScrapperConfig.usecase';
import {logger} from './Logger';

let isScraperFinished = true;

const runLinkedInScraper = async (searchData: IQuery[], options?: IQueryOptions): Promise<void> => {
  try {
    const scraperInstance = new LinkedinScraper({
      headless: true,
      slowMo: 500,
      args: ['--lang=en-GB'],
    });

    // Each scraper instance is associated with one browser.
    // Concurrent queries will run on different pages within the same browser instance.

    // Add listeners for scraper events
    scraperInstance.on(events.scraper.data, async (data: JobScrapData) => {
      await upsertScrapperConfig(data);
    });

    scraperInstance.on(events.scraper.error, err => {
      logger.error(err);
    });

    scraperInstance.on(events.scraper.end, () => {
      isScraperFinished = true;
    });

    // Add listeners for puppeteer browser events
    scraperInstance.on(events.puppeteer.browser.targetcreated, () => {
      isScraperFinished = false;
    });
    //   scraper.on(events.puppeteer.browser.targetchanged, () => {});
    //   scraper.on(events.puppeteer.browser.targetdestroyed, () => {});
    //   scraper.on(events.puppeteer.browser.disconnected, () => {});

    // Custom function executed on browser side to extract job description
    const descriptionFn = () =>
      document
        .querySelector('.description__text')
        .innerText.replace(/[\s\n\r]+/g, ' ')
        .trim();

    // Run queries concurrently
    await Promise.all([
      // Run queries serially
      scraperInstance.run(searchData, {
        ...options,
        descriptionFn,
      }),
    ]);

    // Close browser
    await scraperInstance.close();
  } catch (catchError) {
    logger.error('', catchError);
    await scraperInstance.close();
    isScraperFinished = true;
  }
};

export {isScraperFinished, runLinkedInScraper};
