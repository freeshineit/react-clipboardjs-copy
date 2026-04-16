import generateConfig from "@config/rollup";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

export default generateConfig({
  ...pkg,
  port: 3002,
});
