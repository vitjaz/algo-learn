import type { NextConfig } from "next";
import createNextIntlSplitPlugin from "next-intl-split/plugin";

const withNextIntlSplit = createNextIntlSplitPlugin(
  "./src/i18n/dictionaries",
  "./src/i18n/request.ts",
);

const nextConfig: NextConfig = {
  output: "standalone",
};

export default withNextIntlSplit(nextConfig);
