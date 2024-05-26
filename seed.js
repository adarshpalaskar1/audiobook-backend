const mongoose = require('mongoose');
const Audiobook = require('./models/Audiobook');
require('dotenv').config();

const audiobooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: '/public/images/the_great_gatsby.jpg',
    genre: 'Fiction',
    averageRating: 4.5,
    description: 'A novel of the Jazz Age, The Great Gatsby tells the story of the mysterious millionaire Jay Gatsby, his decadent parties, and his love for the beautiful Daisy Buchanan. Set in the 1920s, it explores themes of wealth, excess, and the American Dream.',
    reviews: [
      { user: 'User 1', rating: 5, comment: 'A timeless classic that captures the essence of the Roaring Twenties.' },
      { user: 'User 2', rating: 4, comment: 'Beautifully written with intriguing characters.' }
    ]
  },
  {
    title: '1984',
    author: 'George Orwell',
    coverImage: '/public/images/1984.jpg',
    genre: 'Science Fiction',
    averageRating: 4.5,
    description: 'George Orwell\'s dystopian novel 1984 presents a chilling vision of a totalitarian society under constant surveillance. The story follows Winston Smith, a low-ranking member of the ruling Party, as he navigates a world where independent thought is suppressed and truth is manipulated.',
    reviews: [
      { user: 'User 3', rating: 5, comment: 'A haunting and thought-provoking novel that remains relevant.' },
      { user: 'User 4', rating: 4, comment: 'Very thought-provoking.' }
    ]
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: '/public/images/tkam.jpg',
    genre: 'Fiction',
    averageRating: 4.5,
    description: 'Set in the American South during the 1930s, To Kill a Mockingbird follows young Scout Finch and her brother Jem as they navigate the complexities of race and justice in their small town. Through their father, Atticus Finch, they learn valuable lessons about empathy, morality, and human dignity.',
    reviews: [
      { user: 'User 5', rating: 5, comment: 'Incredible book.' },
      { user: 'User 6', rating: 4, comment: 'Loved the characters.' }
    ]
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: '/public/images/pap.jpg',
    genre: 'Romance',
    averageRating: 4.5,
    description: 'Pride and Prejudice follows the spirited Elizabeth Bennet as she navigates love, society, and family dynamics in early 19th-century England. Her interactions with the proud Mr. Darcy lead to misunderstandings, revelations, and ultimately, a deep and abiding love.',
    reviews: [
      { user: 'User 7', rating: 5, comment: 'A timeless romance with sharp wit and memorable characters.' },
      { user: 'User 8', rating: 4, comment: 'Great audiobook.' }
    ]
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: '/public/images/the_hobbit.jpg',
    genre: 'Fantasy',
    averageRating: 4.5,
    description: 'The Hobbit follows the journey of Bilbo Baggins, a hobbit who is reluctantly thrust into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. It is a tale of adventure, courage, and friendship that serves as a prelude to The Lord of the Rings.',
    reviews: [
      { user: 'User 9', rating: 5, comment: 'A beautifully crafted tale of adventure and heroism.' },
      { user: 'User 10', rating: 4, comment: 'Very enjoyable.' }
    ]
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverImage: '/public/images/the_catcher.jpg',
    genre: 'Fiction',
    averageRating: 4.0,
    description: 'The Catcher in the Rye is a novel about teenage rebellion and angst, narrated by the disaffected and cynical Holden Caulfield. Set in 1950s New York, it explores themes of identity, belonging, and the challenges of growing up.',
    reviews: [
      { user: 'User 11', rating: 4, comment: 'A compelling read that captures the essence of teenage angst.' },
      { user: 'User 12', rating: 4, comment: 'Well-written.' }
    ]
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    coverImage: '/public/images/the_da_vinci.jpg',
    genre: 'Thriller',
    averageRating: 4.0,
    description: 'The Da Vinci Code is a fast-paced thriller that follows symbologist Robert Langdon as he uncovers secrets hidden within the works of Leonardo da Vinci. The novel delves into historical and religious mysteries, keeping readers on the edge of their seats with its twists and turns.',
    reviews: [
      { user: 'User 13', rating: 4, comment: 'Gripping.' },
      { user: 'User 14', rating: 4, comment: 'Couldn\'t put it down.' }
    ]
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: '/public/images/the_alchemist.jpg',
    genre: 'Adventure',
    averageRating: 4.5,
    description: 'The Alchemist is a philosophical novel that tells the story of Santiago, a young shepherd who embarks on a journey to find a hidden treasure. Along the way, he learns profound lessons about following his dreams, listening to his heart, and discovering his true purpose in life.',
    reviews: [
      { user: 'User 15', rating: 5, comment: 'A beautifully written tale with deep, meaningful insights.' },
      { user: 'User 16', rating: 4, comment: 'Uplifting.' }
    ]
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    coverImage: '/public/images/moby.jpg',
    genre: 'Adventure',
    averageRating: 3.5,
    description: 'The novel follows the journey of Ishmael, a sailor, who joins the whaling ship Pequod commanded by the obsessive Captain Ahab. Ahab is on a relentless quest for revenge against the giant white sperm whale, Moby Dick, who had previously bitten off his leg at the knee during a previous encounter.',
    reviews: [
      { user: 'User 17', rating: 4, comment: 'A bit long, but worth it.' },
      { user: 'User 18', rating: 3, comment: 'Challenging read.' }
    ]
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverImage: '/public/images/brave_new_world.jpg',
    genre: 'Science Fiction',
    averageRating: 4.5,
    description: 'Brave New World is a dystopian novel that explores a future society driven by technological advancement and social engineering. The story delves into the consequences of a world where individuality is suppressed, and happiness is artificially maintained.',
    reviews: [
      { user: 'User 19', rating: 5, comment: 'A thought-provoking and chilling vision of the future.' },
      { user: 'User 20', rating: 4, comment: 'Interesting concepts.' }
    ]
  },
  {
    title: 'The Book Thief',
    author: 'Markus Zusak',
    coverImage: '/public/images/the_book_thief.jpg',
    genre: 'Historical Fiction',
    averageRating: 4.5,
    description: 'A story set in Nazi Germany. The novel explores themes of humanity, resilience, and the power of words in the face of tyranny. Liesel\'s relationships with her foster family, her best friend Rudy, and Max Vandenburg, a Jewish refugee hiding in their basement, form the heart of the story.',
    reviews: [
      { user: 'User 21', rating: 5, comment: 'Heartbreaking and beautiful.' },
      { user: 'User 22', rating: 4, comment: 'Very emotional.' }
    ]
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    coverImage: '/public/images/th_hunger_games.jpg',
    genre: 'Science Fiction',
    averageRating: 4.5,
    description: 'The Hunger Games is a dystopian novel that follows Katniss Everdeen as she participates in a deadly televised competition in which children fight to the death. The story explores themes of survival, sacrifice, and the impact of a totalitarian regime.',
    reviews: [
      { user: 'User 23', rating: 5, comment: 'Exciting and thrilling.' },
      { user: 'User 24', rating: 4, comment: 'A gripping and emotional story of bravery and resilience.' }
    ]
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    coverImage: '/public/images/gone_girl.jpg',
    genre: 'Thriller',
    averageRating: 4.5,
    description: 'Gone Girl is a psychological thriller that follows the mysterious disappearance of Amy Dunne and the subsequent media frenzy that engulfs her husband, Nick. The novel explores themes of marriage, deception, and the darker aspects of human nature.',
    reviews: [
      { user: 'User 25', rating: 5, comment: 'Mind-bending.' },
      { user: 'User 26', rating: 4, comment: 'Very suspenseful.' }
    ]
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: '/public/images/dune.jpg',
    genre: 'Science Fiction',
    averageRating: 4.5,
    description: 'A science fiction saga.Set in a distant future where noble houses rule the universe under the influence of a powerful spice called "melange," the story follows Paul Atreides, the young scion of House Atreides, as he navigates the treacherous politics of the desert planet Arrakis, also known as Dune.',
    reviews: [
      { user: 'User 29', rating: 5, comment: 'Epic and immersive.' },
      { user: 'User 30', rating: 4, comment: 'Great world-building.' }
    ]
  },
  {
    title: 'The Shining',
    author: 'Stephen King',
    coverImage: '/public/images/the_shining.jpg',
    genre: 'Horror',
    averageRating: 4.5,
    description: 'The Shining is a horror novel that follows Jack Torrance and his family as they move into the isolated Overlook Hotel. As Jack descends into madness, his young son Danny, who has psychic abilities, must uncover the hotel\'s dark secrets to save his family.',
    reviews: [
      { user: 'User 31', rating: 5, comment: 'A chilling and gripping story that keeps you on edge. A great listen.' },
      { user: 'User 32', rating: 4, comment: 'Very scary.' }
    ]
  },
  {
    title: 'The Fault in Our Stars',
    author: 'John Green',
    coverImage: '/public/images/the_fault_in.jpg',
    genre: 'Romance',
    averageRating: 4.5,
    description: 'The Fault in Our Stars is a poignant love story between two teenagers, Hazel and Gus, who meet at a cancer support group. The novel explores themes of love, loss, and the beauty of life, even in the face of terminal illness.',
    reviews: [
      { user: 'User 33', rating: 5, comment: 'Very touching.' },
      { user: 'User 34', rating: 4, comment: 'Emotional.' }
    ]
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    coverImage: '/public/images/the_road.jpg',
    genre: 'Post-Apocalyptic',
    averageRating: 4,
    description: 'The Road is a haunting post-apocalyptic novel that follows a father and his young son as they journey through a desolate landscape. The story explores themes of survival, love, and the enduring human spirit in the face of unimaginable hardship.',
    reviews: [
      { user: 'User 37', rating: 4, comment: 'Very moving.' },
      { user: 'User 38', rating: 4, comment: 'Dark and haunting.' }
    ]
  },
  {
    title: 'Life of Pi',
    author: 'Yann Martel',
    coverImage: '/public/images/life_of_pie.jpg',
    genre: 'Adventure',
    averageRating: 4.5,
    description: 'Life of Pi tells the story of Pi Patel, a young boy who survives a shipwreck and is stranded on a lifeboat with a Bengal tiger named Richard Parker. The novel explores themes of faith, survival, and the power of storytelling as Pi navigates his incredible journey.',
    reviews: [
      { user: 'User 39', rating: 5, comment: 'A beautifully written and imaginative tale of survival and faith.' },
      { user: 'User 40', rating: 4, comment: 'Beautifully written.' }
    ]
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    coverImage: '/public/images/the_girl_with.jpg',
    genre: 'Thriller',
    averageRating: 4.5,
    description: 'The Girl with the Dragon Tattoo is a thrilling mystery that follows journalist Mikael Blomkvist and hacker Lisbeth Salander as they investigate the disappearance of a wealthy industrialist\'s niece. The novel is a gripping tale of intrigue, corruption, and redemption.',
    reviews: [
      { user: 'User 27', rating: 5, comment: 'A compelling and intense mystery with unforgettable characters.' },
      { user: 'User 28', rating: 4, comment: 'Well-written.' }
    ]
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    coverImage: '/public/images/harry_potter.jpg',
    genre: 'Fantasy',
    averageRating: 5.0,
    description: 'The first book in the Harry Potter series introduces us to the young wizard Harry Potter as he begins his magical education at Hogwarts School of Witchcraft and Wizardry. Along the way, he makes new friends, uncovers hidden secrets, and begins to understand his own unique destiny.',
    reviews: [
      { user: 'User 35', rating: 5, comment: 'Magical and amazing.' },
      { user: 'User 36', rating: 5, comment: 'Loved it.' }
    ]
  }
];

const mongoUri = process.env.MONGODB_URI;

const seedDB = async () => {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await Audiobook.deleteMany({});
  await Audiobook.insertMany(audiobooks);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB().catch(err => console.error(err));
