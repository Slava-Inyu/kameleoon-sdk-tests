import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import {
  CredentialsType,
  Environment,
  KameleoonClient,
  SDKConfigurationType,
} from "@kameleoon/nodejs-sdk";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// --- Setup Variables---
const siteCode = "";
const featureKey = "";

const environment = Environment.Production;
const credentials: CredentialsType = {
  clientId: "",
  clientSecret: "",
};
const updateInterval = 30;
const cleanupInterval = 60;

// --- Setup Kameleoon Client ---
const configuration: SDKConfigurationType = {
  updateInterval,
  environment,
  targetingDataCleanupInterval: cleanupInterval,
};

const client = new KameleoonClient({ siteCode, configuration, credentials });

app.get("/", async (req: Request, res: Response) => {
  await client.initialize();

  const visitorCode = client.getVisitorCode({ request: req, response: res });
  const variationKey = client.getFeatureFlagVariationKey(
    visitorCode,
    featureKey
  );

  console.log(`My variation key is ${variationKey}`);

  res.send("Express - TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
