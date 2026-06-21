import type { NextConfig } from "next";

const ngrokDevOrigin = process.env.NGROK_DEV_ORIGIN
  ? new URL(process.env.NGROK_DEV_ORIGIN).hostname
  : undefined;

const nextConfig: NextConfig = {
  allowedDevOrigins: ngrokDevOrigin ? [ngrokDevOrigin] : [],
};

export default nextConfig;
