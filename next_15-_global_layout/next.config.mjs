/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  reactStrictMode: true,
  eslint: {
    // 빌드 시 ESLint 검사를 무시합니다.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 빌드 시 타입스크립트 에러가 있어도 무시하고 진행합니다.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
