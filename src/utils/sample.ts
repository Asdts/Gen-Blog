export const sampleBlockSchema = {
    hero: {
      heading: 'Welcome to My Site',
      subheading: 'A great place to start',
      ctaText: 'Learn More',
      ctaUrl: '/contact'
    },
    paragraph: {
      paragraphs: [
        { heading: 'Our Mission', text: 'We want to educate the world.' }
      ]
    },
    testimonial: {
      testimonials: [
        { name: 'Alice', quote: 'Amazing!', title: 'CEO' }
      ]
    },
    feature: {
      features: [
        { icon: '⭐', title: 'Fast', description: 'Quick and reliable' }
      ]
    },
    form: {
      formTag: [
        {
          tagname: 'form',
          attributes: [
            { name: 'action', value: '/submit' },
            { name: 'method', value: 'post' }
          ],
          children: [
            {
              tagname: 'input',
              attributes: [
                { name: 'type', value: 'text' },
                { name: 'name', value: 'email' }
              ],
              children: []
            }
          ]
        }
      ]
    },
    content: {
      content: [
        { title: 'Home', url: '/home' },
        { title: 'About', url: '/about' }
      ]
    },
    table: {
      headers: [{ title: 'Plan' }],
      rows: [{ title: 'Free', url: '' }]
    },
    code: {
      code: '<h1>Hello</h1>',
      language: 'html',
      theme: 'light'
    },
    mediaBlock: {
      type: [
        {
          type: 'image',
          media: {
            url: 'https://example.com/image.jpg',
            alt: 'Example'
          },
          attributes: { height: 400, width: 600 }
        }
      ]
    },
    footer: {
      navigator: [
        { title: 'Privacy', url: '/privacy' }
      ]
    },
    header: {
      navigator: [
        { title: 'Home', url: '/home' },
        { title: 'Contact', url: '/contact' }
      ]
    }
  }
  