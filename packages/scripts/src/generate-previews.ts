import puppeteer from "puppeteer";
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";

// todo: add more pages
const PAGE_NUMBERS = ["3"] as const;

const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const VIDEO_DURATION = 3000;

async function generatePreviews() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const recorder = new PuppeteerScreenRecorder(page, {
    followNewTab: true,
    fps: 60,
    videoFrame: {
      width: 1600,
      height: 900,
    },
    videoCrf: 24,
    videoCodec: "libx264",
    videoPreset: "ultrafast",
    videoBitrate: 1000,
    autopad: {
      color: "black",
    },
    aspectRatio: "16:9",
  });

  // Set screen size
  await page.setViewport({ width: 1200, height: 700 });

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  for (let pageNumber of PAGE_NUMBERS) {
    await page.goto(`https://setsun.xyz/visualizers/${pageNumber}`, {
      waitUntil: "networkidle0",
    });

    // Start recording
    const path = `./public/visualizers/${pageNumber}.mp4`;
    await recorder.start(path);

    await waitFor(VIDEO_DURATION);

    await recorder.stop();
  }

  await browser.close();
}

// run logic
(async () => {
  await generatePreviews();
})();