export interface EmotionCategory {
  id: string;
  name: string;
  keywords: string[];
  emoji: string;
}

export const emotions: EmotionCategory[] = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    keywords: ['happy', 'joy', 'excited', 'smile', 'laugh', 'cheerful']
  },
  {
    id: 'love',
    name: 'Love',
    emoji: '❤️',
    keywords: ['love', 'heart', 'romantic', 'adorable', 'cute']
  },
  {
    id: 'surprise',
    name: 'Surprised',
    emoji: '😲',
    keywords: ['surprised', 'shocked', 'wow', 'omg', 'mindblown']
  },
  {
    id: 'funny',
    name: 'Funny',
    emoji: '😂',
    keywords: ['funny', 'lol', 'hilarious', 'lmao', 'rofl', 'haha']
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    keywords: ['sad', 'crying', 'tears', 'depressed', 'heartbroken']
  },
  {
    id: 'angry',
    name: 'Angry',
    emoji: '😠',
    keywords: ['angry', 'mad', 'rage', 'furious', 'annoyed']
  },
  {
    id: 'cool',
    name: 'Cool',
    emoji: '😎',
    keywords: ['cool', 'awesome', 'swag', 'dope', 'amazing']
  },
  {
    id: 'confused',
    name: 'Confused',
    emoji: '🤔',
    keywords: ['confused', 'thinking', 'what', 'why', 'unsure']
  },
  {
    id: 'sarcastic',
    name: 'Sarcastic',
    emoji: '😏',
    keywords: ['sarcastic', 'smirk', 'eyeroll', 'whatever', 'jk']
  },
  {
    id: 'embarrassed',
    name: 'Embarrassed',
    emoji: '😳',
    keywords: ['embarrassed', 'awkward', 'blush', 'oops', 'cringe']
  },
  {
    id: 'celebration',
    name: 'Celebration',
    emoji: '🎉',
    keywords: ['celebration', 'party', 'congrats', 'cheers', 'woohoo']
  },
  {
    id: 'thankful',
    name: 'Thankful',
    emoji: '🙏',
    keywords: ['thank you', 'thanks', 'grateful', 'appreciate', 'blessed']
  },
  {
    id: 'clapping',
    name: 'Clapping',
    emoji: '👏',
    keywords: ['clap', 'applause', 'bravo', 'congrats', 'well done']
  },
  {
    id: 'good-luck',
    name: 'Good Luck',
    emoji: '🍀',
    keywords: ['good luck', 'fingers crossed', 'hope', 'fortune', 'lucky']
  }
];

export function findEmotionForGif(title: string): EmotionCategory | undefined {
  const lowerTitle = title.toLowerCase();
  return emotions.find(emotion => 
    emotion.keywords.some(keyword => lowerTitle.includes(keyword))
  );
}