import {
  Environment,
  KameleoonClient,
  SDKConfigurationType,
} from "@kameleoon/javascript-sdk";

// --- Setup Variables---
const siteCode = "";
const featureKey = "";

const environment = Environment.Production;
const updateInterval = 30;
const cleanupInterval = 60;

// --- Setup Kameleoon Client ---
const configuration: SDKConfigurationType = {
  updateInterval,
  environment,
  targetingDataCleanupInterval: cleanupInterval,
};

const client = new KameleoonClient({ siteCode, configuration });

async function main() {
  await client.initialize();

  const visitorCode = client.getVisitorCode({});
  const variationKey = client.getFeatureFlagVariationKey(
    visitorCode,
    featureKey
  );

  console.log(`My variation key is ${variationKey}`);
}

main();
