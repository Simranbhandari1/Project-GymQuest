export async function GET() {
  const quotes = [
    {
      quote: "The only bad workout is the one that didn't happen.",
      author: 'Joe Cirulli',
    },
    {
      quote:
        'Success usually comes to those who are too busy to be looking for it.',
      author: 'Henry David Thoreau',
    },
    {
      quote: 'The pain you feel today will be the strength you feel tomorrow.',
      author: 'Arnold Schwarzenegger',
    },
    {
      quote: 'Action is the foundational key to all success.',
      author: 'Pablo Picasso',
    },
    {
      quote:
        'The clock is ticking. Are you becoming the person you want to be?',
      author: 'Greg Plitt',
    },
    {
      quote: 'You must expect great things of yourself before you can do them.',
      author: 'Michael Jordan',
    },
    {
      quote:
        'Strength does not come from winning. Your struggles develop your strengths.',
      author: 'Arnold Schwarzenegger',
    },
    {
      quote: "Take care of your body. It's the only place you have to live.",
      author: 'Jim Rohn',
    },
    {
      quote:
        'The successful warrior is the average person with laser-like focus.',
      author: 'Bruce Lee',
    },
    {
      quote:
        'Motivation is what gets you started. Habit is what keeps you going.',
      author: 'Jim Ryun',
    },
    {
      quote: "Whether you think you can, or you think you can't, you're right.",
      author: 'Henry Ford',
    },
    {
      quote: 'Champions keep playing until they get it right.',
      author: 'Billie Jean King',
    },
    {
      quote: "A champion is someone who gets up when they can't.",
      author: 'Jack Dempsey',
    },
    {
      quote: "You miss 100% of the shots you don't take.",
      author: 'Wayne Gretzky',
    },
    {
      quote: 'Discipline is the bridge between goals and accomplishment.',
      author: 'Jim Rohn',
    },
    {
      quote:
        "The harder you work for something, the greater you'll feel when you achieve it.",
      author: 'Les Brown',
    },
    {
      quote:
        "Your body can stand almost anything. It's your mind that you have to convince.",
      author: 'Andrew Murphy',
    },
    {
      quote:
        'The difference between the impossible and the possible lies in determination.',
      author: 'Tommy Lasorda',
    },
    {
      quote: 'Persistence can change failure into extraordinary achievement.',
      author: 'Matt Biondi',
    },
    {
      quote: 'Energy and persistence conquer all things.',
      author: 'Benjamin Franklin',
    },
  ];

  return new Response(JSON.stringify(quotes), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
