import 'module-alias/register'

import helmet from 'helmet';
import {connect, set} from 'mongoose'
import {StartProjectInit} from "@tsclean/core";

import {AppContainer} from "@/application/app";
import {MONGODB_URI, PORT} from "@/application/config/environment";

async function managerConnectionMongo (): Promise<void> {
  set('strictQuery', true)
  await connect(MONGODB_URI)
}

async function init(): Promise<void> {
  await managerConnectionMongo().then(() =>
    console.log("Connection successfully to database of Mongo: " + MONGODB_URI)
  )
  const app = await StartProjectInit.create(AppContainer);
  app.use(helmet());
  await app.listen(PORT, () => console.log('Running on port: ' + PORT))
}

void init().catch((err) => console.log(err));
