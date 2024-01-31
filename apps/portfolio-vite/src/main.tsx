import { initFederation } from "@softarc/native-federation";

(async () => {
  await initFederation({
    remote: "https://sketchbook.setsun.xyz/remoteEntry.json",
  });

  await import("./render");
})();
