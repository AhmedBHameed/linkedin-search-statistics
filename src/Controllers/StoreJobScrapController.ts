import express, {Request, Response} from 'express';
import environment from '../config/environment';
import {callTryCatch} from '../util/callTryCatch';
import upsertScrapperConfig, {JobScrapData} from 'src/use-cases/ScrapperConfig/upsertScrapperConfig.usecase';
import jobScrapHookModel, {IJobScrapHookModel} from '../database/JobScrapHookModel';
import {IJobScrapModel} from 'src/database/JobScrapModel';

const {rootPath, apiVersion} = environment;
const StoreJobScrapRouter = express.Router();

// jobScrapHookModel
//   .create({id: '01FAP8MCY5C5BM631NJ0J9QPFQ', apiHookKey: '01FAP88MA9BGH41ZMYE5G1JDTJ'})
//   .then(async t => console.log(await t.save()));

const StoreJobScrapController = async (req: Request, res: Response) => {
  const {apiHookKey, ...reset} = req.body as JobScrapData & {apiHookKey: string};

  const [jobScrapHookModelError, jobScrapHookModelData] = await callTryCatch(
    async () => await jobScrapHookModel.findOne()
  );

  if (jobScrapHookModelError) {
    res.status(400).send(jobScrapHookModelError);
    return;
  }

  if (!((jobScrapHookModelData as IJobScrapHookModel).apiHookKey === apiHookKey)) {
    res.status(400).send({message: 'Invalid api hook key.'});
    return;
  }
  const [upsertScrapperError, upsertScrapperData] = await callTryCatch(async () => await upsertScrapperConfig(reset));

  if (upsertScrapperError) {
    res.status(400).send(upsertScrapperError);
    return;
  }

  res.send({message: `Job with id ${(upsertScrapperData as IJobScrapModel).id} has been saved successfully.`});
};

StoreJobScrapRouter.post(`${rootPath}${apiVersion}/hook`, StoreJobScrapController);

export {StoreJobScrapRouter};
