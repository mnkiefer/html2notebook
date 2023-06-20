import { defineConfig } from 'vitepress'

const siteHostName = process.env.SITE_HOSTNAME || 'http://localhost:3000'
const sitemapLinks = []

export default defineConfig({
  title: "html2notebook",
  description: "html2notebook Home",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: 'about' },
      { text: 'Setup', link: 'setup' },
      { text: 'Examples', link: '/examples' },
      { text: 'API', link: '/api' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Simple example', link: '/examples-simple' },
          { text: 'Advanced example', link: '/examples-advanced' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mnkiefer/html2notebook' }
    ]
  },
  buildEnd: async ({ outDir, site }) => {
    await redirects.generate(outDir, site.base, redirectLinks)
    await sitemap.generate(outDir, site.base, siteHostName, sitemapLinks)
  }
})
