export function getFooterData(language: string) {
  return [
    {
      title: 'About',
      links: [
        { target: '_self', label: 'Features', link: `${language === 'es' ? '/about/features' : '/en/about/features'}` },
        { target: '_self', label: 'Pricing', link: `${language === 'es' ? '/about/pricing' : '/en/about/pricing'}` },
        { target: '_self', label: 'Support', link: `${language === 'es' ? '/about/support' : '/en/about/support'}` },
        // { label: 'Forums', link: '#' },
      ],
    },
    {
      title: 'Project',
      links: [
        // { label: 'Contribute', link: `${language === 'es' ? '/project/contribute' : '/en/project/contribute'}` },
        // { label: 'Media assets', link: '#' },
        { target: '_self', label: 'Changelog', link: `${language === 'es' ? '/project/changelog' : '/en/project/changelog'}` },
        // { label: 'Releases', link: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { target: '_blank', label: 'Join Discord', link: 'https://discord.gg/mF3vV2zj' },
        { target: '_blank', label: 'Follow on Instagram', link: 'https://www.instagram.com/contia.io/?hl=en' },
        // { target: '_blank', label: 'GitHub discussions', link: 'https://github.com/your-repo/discussions' },
      ],
    },
  ]
}