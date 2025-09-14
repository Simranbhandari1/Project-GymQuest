export async function GET() {
  const quotes = [
    { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { quote: "The body achieves what the mind believes.", author: "Napoleon Hill" },
    { quote: "Don’t stop when you’re tired. Stop when you’re done.", author: "Unknown" },
    { quote: "Train insane or remain the same.", author: "Jillian Michaels" },
    { quote: "Strength does not come from the physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
    { quote: "Sweat is just fat crying.", author: "Unknown" },
    { quote: "Your only limit is you.", author: "Unknown" },
    { quote: "Fall in love with taking care of yourself.", author: "Unknown" },
    { quote: "Fitness is not about being better than someone else, it’s about being better than you used to be.", author: "Khloé Kardashian" },
    { quote: "Success starts with self-discipline.", author: "Unknown" },
    { quote: "Work hard in silence, let success make the noise.", author: "Frank Ocean" },
    { quote: "A one-hour workout is 4% of your day. No excuses.", author: "Unknown" },
    { quote: "It never gets easier, you just get stronger.", author: "Greg LeMond" },
    { quote: "Good things come to those who sweat.", author: "Unknown" },
    { quote: "If it doesn’t challenge you, it won’t change you.", author: "Fred DeVito" },
    { quote: "Excuses don’t burn calories.", author: "Unknown" },
    { quote: "What seems impossible today will one day become your warm-up.", author: "Unknown" },
    { quote: "Pain is temporary, pride is forever.", author: "Lance Armstrong" },
    { quote: "You don’t have to be extreme, just consistent.", author: "Unknown" },
    { quote: "A little progress each day adds up to big results.", author: "Satya Nani" },
    { quote: "When you feel like quitting, think about why you started.", author: "Unknown" },
    { quote: "Your health is an investment, not an expense.", author: "Unknown" },
    { quote: "Strive for progress, not perfection.", author: "David Perlmutter" },
    { quote: "Champions keep playing until they get it right.", author: "Billie Jean King" },
    { quote: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  ];

  return new Response(JSON.stringify(quotes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
