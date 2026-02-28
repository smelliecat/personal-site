import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence workspace-root detection warning in monorepos / worktrees
  outputFileTracingRoot: path.join(new URL(import.meta.url).pathname, '..'),
  images: {
    remotePatterns: [],
  },
  // Analytics: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env.local to enable
  // See src/app/layout.tsx for the analytics hook placeholder
}

export default nextConfig
