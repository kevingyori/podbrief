type Testimonial = {
  quote: string,
  name: string,
  title: string,
  imgUrl: string,
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "As a startup founder, I hardly have time for long podcasts. My Personal Podcaster has been a game-changer. It's like having my own curator!",
    name: "Alex",
    title: "Startup Founder",
    imgUrl: 'alex.jpg'
  },
  {
    quote: "Every week, I look forward to my tailored summaries. It's perfect for my commute to university.",
    name: "Sara",
    title: "Grad Student",
    imgUrl: 'sara.jpg'
  },
  {
    quote: "I can finally keep up with my favorite podcasts without feeling overwhelmed. This is pure gold for busy professionals.",
    name: "Michael",
    title: "Marketing Manager",
    imgUrl: 'mika.jpg'
  },
  {
    quote: "I always felt left out when my friends discussed the latest podcast episodes. Not anymore!",
    name: "Priya",
    title: "Aspiring Entrepreneur",
    imgUrl: 'pam.jpg'
  },
  {
    quote: "Being informed has never been this efficient. A 3-minute read replaces an hour-long episode? Sign me up!",
    name: "David",
    title: "Financial Analyst",
    imgUrl: 'david.jpg'
  },
]

const EXAMPLE_SUMMARIES = [
  {
    title: "The Tim Ferriss Show",
    episode: "How to Say No",
    summary: "In this episode, Tim Ferriss talks about the importance of saying no. He shares his personal experiences and provides actionable advice on how to say no effectively. He also discusses the benefits of saying no and how it can help you achieve your goals.",
  },
  {
    title: "The Joe Rogan Experience",
    episode: "The Power of Now",
    summary: "In this episode, Joe Rogan talks about the power of now. He shares his personal experiences and provides actionable advice on how to live in the present moment. He also discusses the benefits of living in the present moment and how it can help you achieve your goals.",
  },
  {
    title: "The Jordan B. Peterson Podcast",
    episode: "How to Be a Better Person",
    summary: "In this episode, Jordan Peterson talks about how to be a better person. He shares his personal experiences and provides actionable advice on how to be a better person. He also discusses the benefits of being a better person and how it can help you achieve your goals.",
  }
]

export { TESTIMONIALS, EXAMPLE_SUMMARIES }
