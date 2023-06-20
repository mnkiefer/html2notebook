import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "html2notebook",
  description: "html2notebook Home",
  
  base: '/html2notebook/',

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
  }
})
