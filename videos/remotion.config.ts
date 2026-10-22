import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// El 3000 lo usa `next dev` del portafolio.
Config.setStudioPort(3100);
Config.setRendererPort(3101);
