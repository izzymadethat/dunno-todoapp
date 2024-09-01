const quotes = [
    "Nothing to do today, eh?",
    "What's next on your list?",
    "ToDo, or not ToDo is the question...",
    "What's happening for you today?",
    "Today feels like a great day to get some things done!",
    "Do it today, not tomorrow.",
    "Do what you have to do, to do what you want to do. — Denzel Washington",
    "Don't put off for tomorrow what you should do today.",
    "Procrastination is the thief of time.",
    "Eat the frog - well, just do the hard parts first.",
    "Never leave that till tomorrow which you can do today. — Benjamin Franklin",
    "So little done, so much to do. — Cecil Rhodes"
]

export default function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length)

    return quotes[randomIndex]
}