export type Difficulty = "Easy" | "Medium" | "Hard"

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number // Index of the correct option
  explanation: string
  difficulty: Difficulty
  hint: string
}

export const questionPool: Question[] = [
  {
    id: 1,
    question: "Who is the narrator of the 'One Thousand and One Nights'?",
    options: ["Aladdin", "Scheherazade", "Sinbad", "Ali Baba"],
    correctAnswer: 1,
    explanation:
      "Scheherazade tells stories to King Shahryar every night to delay her execution, eventually winning his heart.",
    difficulty: "Easy",
    hint: "She is the daughter of the vizier who volunteers to marry the king.",
  },
  {
    id: 2,
    question: "What phrase does Ali Baba use to open the cave of treasures?",
    options: ["Abracadabra", "Open Sesame", "Hocus Pocus", "Let me in"],
    correctAnswer: 1,
    explanation:
      "'Open Sesame' is the magical command used by Ali Baba to open the mouth of the cave where the forty thieves hid their loot.",
    difficulty: "Easy",
    hint: "It refers to a common seed used in Middle Eastern cuisine.",
  },
  {
    id: 3,
    question: "In the story of Aladdin, what is the name of the evil sorcerer?",
    options: ["Jafar", "Iago", "Maghreb", "Mustafa"],
    correctAnswer: 2,
    explanation:
      "While often named Jafar in adaptations, in the original tale he is simply known as the Maghrebian Sorcerer.",
    difficulty: "Medium",
    hint: "He hails from a region in North Africa.",
  },
  {
    id: 4,
    question: "How many voyages did Sinbad the Sailor undertake?",
    options: ["Three", "Seven", "Twelve", "One"],
    correctAnswer: 1,
    explanation: "Sinbad the Sailor went on seven fantastic voyages, encountering monsters and magic in each.",
    difficulty: "Easy",
    hint: "The same number as the days of the week.",
  },
  {
    id: 5,
    question: "What kind of creature is the Roc encountered by Sinbad?",
    options: ["A giant whale", "A massive bird", "A sea serpent", "A dragon"],
    correctAnswer: 1,
    explanation:
      "The Roc is a legendary bird of prey of enormous size, capable of carrying off elephants to feed its young.",
    difficulty: "Medium",
    hint: "It has wings and feathers.",
  },
  {
    id: 6,
    question: "What object does Aladdin use to summon the second, less powerful genie?",
    options: ["A Ring", "A Carpet", "A Flute", "A Coin"],
    correctAnswer: 0,
    explanation:
      "Aladdin summons a genie from a magic ring given to him by the sorcerer, separate from the genie of the lamp.",
    difficulty: "Hard",
    hint: "It is a piece of jewelry worn on the finger.",
  },
  {
    id: 7,
    question: "Who was the king that Scheherazade told her stories to?",
    options: ["King Solomon", "King Shahryar", "Sultan Aladdin", "Caliph Harun al-Rashid"],
    correctAnswer: 1,
    explanation:
      "King Shahryar was the Sassanid King who married a new virgin each day and beheaded her the next morning, until Scheherazade stopped him.",
    difficulty: "Medium",
    hint: "His name is similar to 'Shah' which means King.",
  },
  {
    id: 8,
    question: "In 'Ali Baba and the Forty Thieves', who kills the thief chief?",
    options: ["Ali Baba", "Cassim", "Morgiana", "The Captain of the Guard"],
    correctAnswer: 2,
    explanation:
      "Morgiana, Ali Baba's clever slave girl, saves his life multiple times and eventually kills the thief chief.",
    difficulty: "Medium",
    hint: "She is Ali Baba's loyal and clever slave girl.",
  },
  {
    id: 9,
    question: "What was the profession of Aladdin's father?",
    options: ["Merchant", "Tailor", "Soldier", "Vizier"],
    correctAnswer: 1,
    explanation: "Aladdin was the son of a poor tailor named Mustapha.",
    difficulty: "Hard",
    hint: "He worked with needle, thread, and cloth.",
  },
  {
    id: 10,
    question: "Which famous historical figure often appears in the Nights as a character?",
    options: ["Genghis Khan", "Harun al-Rashid", "Saladin", "Alexander the Great"],
    correctAnswer: 1,
    explanation:
      "Harun al-Rashid, the fifth Abbasid Caliph, frequently appears in the stories, often wandering Baghdad in disguise.",
    difficulty: "Medium",
    hint: "He was a famous Caliph of the Abbasid Caliphate.",
  },
  {
    id: 11,
    question: "What happens to Cassim, Ali Baba's brother, inside the cave?",
    options: ["He becomes rich", "He is trapped and killed", "He befriends the thieves", "He finds a magic lamp"],
    correctAnswer: 1,
    explanation:
      "Cassim forgets the words 'Open Sesame' to leave the cave and is discovered and killed by the forty thieves.",
    difficulty: "Medium",
    hint: "He forgot the password and the thieves found him.",
  },
  {
    id: 12,
    question: "In the story of the Fisherman and the Jinni, what was the Jinni trapped in?",
    options: ["A Lamp", "A Bottle/Jar", "A Chest", "A Ring"],
    correctAnswer: 1,
    explanation:
      "The fisherman pulls up a copper jar (or bottle) sealed with the seal of Solomon, containing the Jinni.",
    difficulty: "Easy",
    hint: "It is a vessel often made of copper or brass.",
  },
  {
    id: 13,
    question: "What is the name of the brother of King Shahryar?",
    options: ["Shah Zaman", "Shah Jahan", "Shah Rukh", "Shah Abbas"],
    correctAnswer: 0,
    explanation:
      "Shah Zaman is the younger brother who rules over Samarkand and reveals his own wife's infidelity to Shahryar.",
    difficulty: "Hard",
    hint: "He was the King of Samarkand.",
  },
  {
    id: 14,
    question: "What magical object does Prince Ahmed obtain?",
    options: ["A Flying Carpet", "An Ivory Tube", "A Magic Apple", "All of the above"],
    correctAnswer: 2,
    explanation: "Prince Ahmed buys a magic apple that cures any disease. His brothers buy the carpet and the tube.",
    difficulty: "Hard",
    hint: "It is a fruit that can cure any illness.",
  },
  {
    id: 15,
    question: "Who is the 'Old Man of the Sea'?",
    options: ["A wise sage", "A monster who rides victims", "A djinn king", "Sinbad's father"],
    correctAnswer: 1,
    explanation:
      "In Sinbad's fifth voyage, the Old Man of the Sea tricks Sinbad into letting him ride on his shoulders, then refuses to get off.",
    difficulty: "Medium",
    hint: "He refuses to get off Sinbad's shoulders.",
  },
  {
    id: 16,
    question: "What city is the primary setting for many of the tales?",
    options: ["Cairo", "Damascus", "Baghdad", "Istanbul"],
    correctAnswer: 2,
    explanation:
      "Baghdad, during the Islamic Golden Age, is the setting for many stories, including those featuring Harun al-Rashid.",
    difficulty: "Easy",
    hint: "It is the capital of modern-day Iraq.",
  },
  {
    id: 17,
    question: "What did the poor fisherman find in his net on the fourth cast?",
    options: ["A dead donkey", "A basket of sludge", "A copper jar", "A golden fish"],
    correctAnswer: 2,
    explanation:
      "After catching a dead donkey, a pitcher of sand, and potsherds, he finally catches the copper jar with the Jinni.",
    difficulty: "Hard",
    hint: "It contained a powerful supernatural being.",
  },
  {
    id: 18,
    question: "How does Morgiana kill the thieves hiding in the oil jars?",
    options: ["Stabs them", "Pours boiling oil on them", "Seals the jars", "Sets them on fire"],
    correctAnswer: 1,
    explanation:
      "She discovers the thieves hiding in the oil jars and pours boiling oil into each jar to kill them silently.",
    difficulty: "Medium",
    hint: "She used the very substance the jars were supposed to hold, but boiling hot.",
  },
  {
    id: 19,
    question: "What is the name of the princess Aladdin marries?",
    options: ["Jasmine", "Badroulbadour", "Scheherazade", "Dunyazad"],
    correctAnswer: 1,
    explanation: "In the original story, the princess is named Badroulbadour. Jasmine is a Disney creation.",
    difficulty: "Hard",
    hint: "Her name means 'Full Moon of Full Moons'.",
  },
  {
    id: 20,
    question: "What does the word 'Djinn' (Genie) literally mean?",
    options: ["Magic", "Hidden/Concealed", "Power", "Spirit"],
    correctAnswer: 1,
    explanation: "The Arabic root j-n-n implies something hidden, concealed, or invisible to the human eye.",
    difficulty: "Hard",
    hint: "It relates to their invisibility to humans.",
  },
  {
    id: 21,
    question: "Which tale is NOT originally part of the Arabic manuscripts of the Nights?",
    options: ["The Merchant and the Demon", "Aladdin", "The Fisherman and the Jinni", "The Three Apples"],
    correctAnswer: 1,
    explanation: "Aladdin (and Ali Baba) were added by French translator Antoine Galland in the 18th century.",
    difficulty: "Hard",
    hint: "It is one of the most famous stories, featuring a lamp.",
  },
  {
    id: 22,
    question: "What is the frame story of the Arabian Nights?",
    options: ["A contest of poets", "A journey to Mecca", "A king killing his wives", "A merchant's diary"],
    correctAnswer: 2,
    explanation:
      "The frame story involves King Shahryar killing his wives until Scheherazade saves herself by telling stories.",
    difficulty: "Easy",
    hint: "It explains why the stories are being told night after night.",
  },
  {
    id: 23,
    question: "In the story of the Three Apples, what is found inside the chest?",
    options: ["Gold coins", "A dead woman", "Rare spices", "A magic scroll"],
    correctAnswer: 1,
    explanation: "A chest fished from the Tigris river is found to contain the body of a young woman cut into pieces.",
    difficulty: "Hard",
    hint: "It was a gruesome discovery of a murder victim.",
  },
  {
    id: 24,
    question: "What bird helps Sinbad escape the Valley of Diamonds?",
    options: ["A Phoenix", "A Roc", "A Falcon", "An Eagle"],
    correctAnswer: 1,
    explanation: "Sinbad straps himself to a piece of meat, which a Roc picks up and carries out of the deep valley.",
    difficulty: "Medium",
    hint: "A legendary giant bird of prey.",
  },
  {
    id: 25,
    question: "What is the moral of the 'Fisherman and the Jinni'?",
    options: ["Greed leads to ruin", "Mercy is rewarded", "Strength beats wit", "Magic is dangerous"],
    correctAnswer: 1,
    explanation:
      "The story illustrates that those who show mercy will receive it, while those who are cruel will meet a cruel fate.",
    difficulty: "Medium",
    hint: "Do good, and good will come to you.",
  },
]
