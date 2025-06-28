import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Home, Map, Gift, Key, Search, AlertTriangle, Star } from 'lucide-react';
// import other icons as needed

interface Gift {
  id: number;
  title: string;
  description: string;
  link: string;
  //icon: React.ReactNode;
  question: string;
  answer: string;
  hint: string;
}

interface FakePage {
  id: number;
  title: string;
  message: string;
  type: 'empty' | 'trick' | 'redirect';
}

const gifts: Gift[] = [
  {
    id: 1,
    title: "Idiot Sriju",
    description: "Useless Talk of your boyfriend",
    link: " https://gifft.me/o/s/9o7zri1fee2g186stv7g00bf",
    //icon: <Music className="w-6 h-6" />,
    question: "What is your favourite ice cream flavour?",
    answer: "Butterscotch",
    hint: "Cornetto, the flavour in which I gave you a treat once!"
  },
  {
    id: 2,
    title: "Sriju Cutie",
    description: "Gift from your Ara Sona",
    link: "https://gifft.me/o/hm/oyb03f5w5ysrk8rvhip743sy",
    //icon: <Gift className="w-6 h-6" />,
    question: "Among your friends, who was the first one who said your smile looks beautiful?",
    answer: "Sayan",
    hint: "Someone you loved before."
  },
  {
    id: 3,
    title: "The SR",
    description: "Aesthetic Pic hmmmm",
    link: "https://gifft.me/o/d/0tofv7dr4of4804i5b67ltl8",
    //icon: <Tv className="w-6 h-6" />,
    question: "WHat is the name of your brother?",
    answer: "Saptarshi",
    hint: "etay abar hint ki debo, je tor sathe daily marpit kore."
  },
  {
    id: 4,
    title: "Call me Sri.",
    description: "You may like this..",
    link: "https://gifft.me/o/3d/ps5tsl3y7hvcxvmqls0b3k4s",
    //icon: <Coffee className="w-6 h-6" />,
    question: "What is the nickname of your boyfriend?",
    answer: "Riddhi",
    hint: "Girl's name according to you. It starts with R."
  },
  {
    id: 5,
    title: "Diya Giftsss",
    description: "Birthday te bhat boka and time waste korachhi tor esb kore lol",
    link: "https://gifft.me/o/3d/ar2hkklnsal2qm17u1l361cs",
    //icon: <Gamepad2 className="w-6 h-6" />,
    question: "Which dept's event did I first see you in?",
    answer: "ECE",
    hint: "Amader clg er dept."
  },
  {
    id: 6,
    title: "Cutest Girl Ever",
    description: "Wink Wink, this is for you!",
    link: "https://gifft.me/o/l/okbar20a2ink95gcqlao20q3",
    //icon: <Book className="w-6 h-6" />,
    question: "Which event preps was going on when you and I first went ghurte?",
    answer: "Techfest",
    hint: "Annual event of our college."
  },
  {
    id: 7,
    title: "Smiling Sriju",
    description: "hm, sticker material",
    link: "https://gifft.me/o/p/ntbnz1uo67pud0zncoj0uflw",
    //icon: <Plane className="w-6 h-6" />,
    question: "Where do you live?",
    answer: "Bardhaman",
    hint: "you very proud of this name hehe. but spelling ta maybe vul diyechi answer e, try korte thak till u get the right one."
  },
  {
    id: 8,
    title: "The Boss: SR Edition",
    description: "Tough looking, but soft inside.",
    link: "https://gifft.me/o/d/zrtar8tgxf3fhjl8g6ri3797",
    //icon: <Palette className="w-6 h-6" />,
    question: "The answer to this is the player u love.",
    answer: "Virat Kohli",
    hint: "18, 269"
  },
  {
    id: 9,
    title: "Emotional Baby Sriju",
    description: "I love you, my cutie pie.",
    link: "https://gifft.me/o/s/nqtzn04jsrpf0qsyssxgrdzr",
    //icon: <Video className="w-6 h-6" />,
    question: "Go to your boyfriend's dm, and send him a selfie of yours. He will tell you the answer then.",
    answer: "Aratrik",
    hint: "Related to your boyfriend."
  },
  {
    id: 10,
    title: "Srija Ray",
    description: "My favourite person.",
    link: "https://gifft.me/o/s/mf6jj52l6gm2sogx9tsz5kpt",
    //icon: <Zap className="w-6 h-6" />,
    question: "What is the name of your rural house place?",
    answer: "Kurmun",
    hint: "It starts with K and ends with N. It's a place where you go during Durga Puja."
  },
  {
    id: 11,
    title: "Srijaaaaaaaaaaaaaa",
    description: "Lekhika Sriju",
    link: "https://gifft.me/o/e/ml6yodnc1070ic3ubgnm7ldi",
    //icon: <MessageCircle className="w-6 h-6" />,
    question: "Send Aratrik a selfie of yours. He will reply with the answer.",
    answer: "Babygirl",
    hint: "You call this to Aratrik often (parle valo, na parle selfie diye answer jan)"
  },
  {
    id: 12,
    title: "Srijuuuuuuuuuuuuu",
    description: "Orange saree te cute lage.",
    link: "https://gifft.me/o/p/khbez2wchu723vr9le7gl84w",
    //icon: <Heart className="w-6 h-6" />,
    question: "Tell an honest confession to Aratrik, only then if he thinks it to be honest, he will give you an answer, put that here.",
    answer: "Srija Ray",
    hint: "Related to you."
  },
  {
    id: 13,
    title: "My baby Sriju",
    description: "Flirty picccccc",
    link: "https://gifft.me/o/e/7wkcs492jfi10k3d9c4ovaa5",
    //icon: <Joystick className="w-6 h-6" />,
    question: "What was your house in School?",
    answer: "Green",
    hint: "colour of leaves."
  },
  {
    id: 14,
    title: "Sriju Sona",
    description: "Delicate Pics",
    link: "https://gifft.me/o/hm/dibih58xqemhvbtbodzbluyy",
    //icon: <Smartphone className="w-6 h-6" />,
    question: "Go to your bf. Make a small pouting and winking video type thing and send it to him. He will reply with the answer.(cutie amar)",
    answer: "I love You.",
    hint: "Related to your relationship with Aratrik."
  },
  {
    id: 15,
    title: "My babygirl Sriju",
    description: "I stareee at you",
    link: "https://gifft.me/o/p/vld7o5u4r17f1gbdk88xxffh",
    //icon: <Sparkles className="w-6 h-6" />,
    question: "Hold your ears, make a video, and send it to Aratrik. He will reply with the answer.",
    answer: "Sriju is my queen.",
    hint: "Parbi na eta."
  },
  {
    id: 16,
    title: "I love Srija Ray",
    description: "Kuchu Puchu Pic",
    link: "https://gifft.me/o/hm/m5cxcy64hdurv14cnft17l0x",
    //icon: <Crown className="w-6 h-6" />,
    question: "Do something which Aratrik would like. If he likes, he will give you the answer.",
    answer: "Your Arasona",
    hint: "Something u call him by."
  },
  {
    id: 17,
    title: "Srija's Cuteness",
    description: "Cuteness overloaded",
    link: "https://gifft.me/o/b/5vt9syulix6gbkuip0v9ylfp",
    //icon: <Moon className="w-6 h-6" />,
    question: "Which date were you born?",
    answer: "8",
    hint: "90 degree rotation to infinity. It is a single digit number."
  },
  {
    id: 18,
    title: "SrijuSticky",
    description: "Me Sriji sticker maker.",
    link: "https://gifft.me/o/p/xhdgms01h48zts7cjz5bz7sa",
    //icon: <Target className="w-6 h-6" />,
    question: "Aratrik's most used nickname for you?",
    answer: "Sriju",
    hint: "Ekhaneo onek bar used eta."
  },
  {
    id: 19,
    title: "laughing Sriju",
    description: "Damn hot saree pics of my queuetea.",
    link: "https://gifft.me/o/l/th08b079lz9uc7uowspm0l60",
    //icon: <Monitor className="w-6 h-6" />,
    question: "Do you hate Aratrik?",
    answer: "Yes",
    hint: "The answer is yes."
  },
  {
    id: 20,
    title: "Aesthetic Sriju",
    description: "Idiot Srija.",
    link: "https://gifft.me/o/hm/6z14bog61ie329e16gi2ivmr",
    //icon: <Gem className="w-6 h-6" />,
    question: "Where did you go to roam with your family recently?",
    answer: "Mayapur",
    hint: "A place that I love."
  }
];

const fakePages: FakePage[] = [
  { id: 1, title: "Sri Stickerss", message: "This music vault is locked with an ancient spell... the key has been lost!", type: "empty" },
  { id: 2, title: "I love Sri", message: "Connection timeout! The gaming servers are down for maintenance.", type: "trick" },
  { id: 3, title: "Diyaaaaaaaaaa", message: "Access denied! Your creativity license has expired.", type: "redirect" },
  { id: 4, title: "Srijaaa is distress", message: "Buffering... 99% complete... Error: Content not found!", type: "empty" },
  { id: 5, title: "Aratrik loves Srija", message: "Your cart is empty and the store is closed for inventory.", type: "trick" },
  { id: 6, title: "Happy Birthday Srija", message: "Sorry, we're all out of coffee beans! Come back tomorrow.", type: "empty" },
  { id: 7, title: "Birthday Gurllllll", message: "All flights are grounded due to mysterious weather patterns.", type: "trick" },
  { id: 8, title: "Ray is idiot", message: "Class is in session but you're not enrolled in this course.", type: "redirect" },
  { id: 9, title: "Sriju Stupidddd", message: "Kitchen closed! All our chefs have gone on a treasure hunt.", type: "empty" },
  { id: 10, title: "Srija queuetea", message: "App Store is updating... Please wait 999 minutes.", type: "trick" },
  { id: 11, title: "Srija's Beauty", message: "You've been disconnected from the game lobby.", type: "empty" },
  { id: 12, title: "Srija Boss", message: "Inner peace cannot be found here... try looking within.", type: "redirect" },
  { id: 13, title: "Master SR", message: "All books have been checked out by other treasure hunters.", type: "trick" },
  { id: 14, title: "SSSSSSSSRRRRRR", message: "No drivers available in your area. Try walking!", type: "empty" },
  { id: 15, title: "Trick Srijuuuu", message: "This content is not available in your dimension.", type: "redirect" },
  { id: 16, title: "Sri Dumbbbbbb", message: "Signal lost! You're in a communication dead zone.", type: "trick" },
  { id: 17, title: "Clumsy Srijaaa", message: "Your wallet is empty... but your heart is full!", type: "empty" },
  { id: 18, title: "Hosteler Sriju", message: "Game over! Insert coin to continue... but we don't accept coins.", type: "trick" },
  { id: 19, title: "Bossy Sriju", message: "Storage full! Delete some memories to make space.", type: "redirect" },
  { id: 20, title: "Srija my boss", message: "You've walked 0 steps toward finding this treasure.", type: "empty" }
];

// Create a mixed array of all buttons with realistic titles
const createMixedButtons = () => {
  const allButtons = [
    // Real gifts with enticing titles
    ...gifts.map(gift => ({
      id: `gift-${gift.id}`,
      title: gift.title,
      //icon: gift.//icon,
      type: 'gift' as const,
      data: gift,
      color: 'from-purple-600 to-indigo-600'
    })),
    // Fake pages with equally enticing titles
    ...fakePages.map(fake => ({
      id: `fake-${fake.id}`,
      title: fake.title,
      //icon: getRandom//icon(),
      type: 'fake' as const,
      data: fake,
      color: getRandomColor()
    }))
  ];

  // Shuffle the array to mix real and fake randomly
  return allButtons.sort(() => Math.random() - 0.5);
};

/*function getRandom//icon() {
  const //icons = [
    <Star className="w-6 h-6" />,
    <Crown className="w-6 h-6" />,
    <Diamond className="w-6 h-6" />,
    <Trophy className="w-6 h-6" />,
    <Gem className="w-6 h-6" />,
    <Shield className="w-6 h-6" />,
    <Compass className="w-6 h-6" />,
    <Flame className="w-6 h-6" />,
    <Sun className="w-6 h-6" />,
    <Moon className="w-6 h-6" />,
    <Snowflake className="w-6 h-6" />,
    <Leaf className="w-6 h-6" />,
    <Flower className="w-6 h-6" />,
    <Mountain className="w-6 h-6" />,
    <Waves className="w-6 h-6" />,
    <Wind className="w-6 h-6" />,
    <Eye className="w-6 h-6" />,
    <Lightbulb className="w-6 h-6" />,
    <Rocket className="w-6 h-6" />,
    <Anchor className="w-6 h-6" />,
    <Feather className="w-6 h-6" />,
    <Clock className="w-6 h-6" />,
    <Globe className="w-6 h-6" />,
    <Headphones className="w-6 h-6" />,
    <Laptop className="w-6 h-6" />,
    <Wifi className="w-6 h-6" />,
    <Battery className="w-6 h-6" />,
    <Settings className="w-6 h-6" />,
    <Bell className="w-6 h-6" />,
    <Mail className="w-6 h-6" />,
    <Phone className="w-6 h-6" />,
    <Image className="w-6 h-6" />,
    <FileText className="w-6 h-6" />,
    <Folder className="w-6 h-6" />,
    <Archive className="w-6 h-6" />,
    <Volume2 className="w-6 h-6" />,
    <Play className="w-6 h-6" />,
    <Mic className="w-6 h-6" />,
    <Speaker className="w-6 h-6" />,
    <Radio className="w-6 h-6" />,
    <Tablet className="w-6 h-6" />,
    <Watch className="w-6 h-6" />,
    <Gamepad className="w-6 h-6" />,
    <Dice1 className="w-6 h-6" />,
    <Dice2 className="w-6 h-6" />,
    <Dice3 className="w-6 h-6" />,
    <Dice4 className="w-6 h-6" />,
    <Dice5 className="w-6 h-6" />,
    <Dice6 className="w-6 h-6" />,
    <Spade className="w-6 h-6" />,
    <Club className="w-6 h-6" />,
    <HeartSuit className="w-6 h-6" />,
    <DiamondSuit className="w-6 h-6" />
  ];
  return //icons[Math.floor(Math.random() * //icons.length)];
}*/

function getRandomColor() {
  const colors = [
    'from-purple-600 to-indigo-600',
    'from-blue-600 to-cyan-600',
    'from-green-600 to-emerald-600',
    'from-yellow-600 to-orange-600',
    'from-red-600 to-pink-600',
    'from-indigo-600 to-purple-600',
    'from-teal-600 to-blue-600',
    'from-orange-600 to-red-600',
    'from-pink-600 to-rose-600',
    'from-cyan-600 to-teal-600',
    'from-emerald-600 to-green-600',
    'from-rose-600 to-pink-600'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

type ViewType = 'home' | 'map' | 'gift' | 'fake' | 'puzzle';

interface AppState {
  currentView: ViewType;
  selectedGift: Gift | null;
  selectedFake: FakePage | null;
  unlockedGifts: number[];
  visitedFakes: number[];
  currentAnswer: string;
  mixedButtons: ReturnType<typeof createMixedButtons>;
}

function App() {
  const [state, setState] = useState<AppState>({
    currentView: 'home',
    selectedGift: null,
    selectedFake: null,
    unlockedGifts: [],
    visitedFakes: [],
    currentAnswer: '',
    mixedButtons: []
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      mixedButtons: createMixedButtons()
    }));
  }, []);

  // Auto-focus input when puzzle view loads
  useEffect(() => {
    if (state.currentView === 'puzzle' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.currentView]);

  const navigateToView = (view: ViewType, gift?: Gift, fake?: FakePage) => {
    setState(prev => ({
      ...prev,
      currentView: view,
      selectedGift: gift || null,
      selectedFake: fake || null,
      currentAnswer: ''
    }));
  };

  const handleAnswerChange = (value: string) => {
    setState(prev => ({
      ...prev,
      currentAnswer: value
    }));
  };

  const checkAnswer = (gift: Gift) => {
    if (state.currentAnswer.toLowerCase().trim() === gift.answer.toLowerCase()) {
      setState(prev => ({
        ...prev,
        unlockedGifts: [...prev.unlockedGifts, gift.id],
        currentView: 'gift'
      }));
    } else {
      alert("That's not correct! Try again or check the hint.");
      // Keep focus on input after alert
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const visitFakePage = (fake: FakePage) => {
    setState(prev => ({
      ...prev,
      visitedFakes: [...prev.visitedFakes, fake.id]
    }));
    navigateToView('fake', undefined, fake);
  };

  type MixedButton = {
    id: string;
    title: string;
    //icon?: React.ReactNode;
    type: 'gift' | 'fake';
    data: Gift | FakePage;
    color: string;
  };

  const handleButtonClick = (button: MixedButton) => {
    if (button.type === 'gift') {
      navigateToView('puzzle', button.data as Gift);
    } else {
      visitFakePage(button.data as FakePage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && state.selectedGift) {
      checkAnswer(state.selectedGift);
    }
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🎁 Your Birthday Hunt 🎁
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Welcome to your special birthday adventure! Hidden throughout this mysterious realm are 20 amazing treasures waiting to be discovered!
          </p>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-yellow-500/30">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">🗺️ How to Play</h2>
            <div className="text-left space-y-3">
              <p>• Explore different paths - but beware, not everything is as it seems!</p>
              <p>• Many buttons look promising but lead to dead ends or tricks</p>
              <p>• Only the real treasures will present you with riddles to solve</p>
              <p>• Answer riddles correctly to unlock your amazing gifts</p>
              <p>• Keep exploring - there are 20 real gifts hidden among many fakes!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => navigateToView('map')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-emerald-400/30"
          >
            <Map className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Treasure Map</h3>
            <p className="text-emerald-100">Begin your journey here</p>
          </button>

          <button
            onClick={() => navigateToView('map')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-purple-400/30"
          >
            <Search className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Quest</h3>
            <p className="text-purple-100">Hunt for hidden treasures</p>
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl p-6 max-w-xl mx-auto border border-red-400/30">
            <h3 className="text-2xl font-semibold mb-4 text-red-300">⚠️ Progress Tracker</h3>
            <p className="text-lg">
              Gifts Found: <span className="text-yellow-400 font-bold">{state.unlockedGifts.length}/20</span>
            </p>
            <p className="text-lg">
              Paths Explored: <span className="text-red-400 font-bold">{state.visitedFakes.length + state.unlockedGifts.length}/{state.mixedButtons.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const MapView = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigateToView('home')}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🗺️ Treasure Map
          </h1>
          <div className="text-right">
            <p className="text-sm">Gifts: {state.unlockedGifts.length}/20</p>
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-lg text-blue-200">
            Choose your path wisely... Only some of these lead to real treasures! 🎯
          </p>
          <p className="text-sm text-yellow-300 mt-2">
            Hint: Real treasures will ask you riddles, fake paths will just waste your time!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {state.mixedButtons.map((button) => {
            const isUnlocked = button.type === 'gift' && state.unlockedGifts.includes(button.data.id);
            const isVisited = button.type === 'fake' && state.visitedFakes.includes(button.data.id);
            
            return (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button)}
                className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white'
                    : isVisited
                    ? 'bg-gradient-to-r from-gray-600 to-slate-600 border-gray-400 text-gray-300'
                    : `bg-gradient-to-r ${button.color} hover:brightness-110 border-opacity-50 text-white`
                }`}
              >
                <div className="flex flex-col items-center">
                  {/* {button.icon} */}
                  <span className="text-xs mt-2 text-center font-medium">{button.title}</span>
                  {isUnlocked && (
                    <Star className="w-4 h-4 mt-1 text-yellow-300" />
                  )}
                  {isVisited && (
                    <span className="text-xs text-red-300 mt-1">Explored</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-yellow-500/30">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">🎲 Game Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-400">✅ Real Gifts Found: {state.unlockedGifts.length}</p>
                <p className="text-red-400">❌ Fake Paths: {state.visitedFakes.length}</p>
              </div>
              <div>
                <p className="text-blue-400">🎯 Success Rate: {state.mixedButtons.length > 0 ? Math.round((state.unlockedGifts.length / (state.unlockedGifts.length + state.visitedFakes.length || 1)) * 100) : 0}%</p>
                <p className="text-purple-400">🔍 Remaining: {state.mixedButtons.length - state.unlockedGifts.length - state.visitedFakes.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PuzzleView = () => {
    if (!state.selectedGift) return null;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigateToView('map')}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Map className="w-4 h-4" />
              Back to Map
            </button>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🧩 Puzzle Challenge
            </h1>
            <div></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/30">
              <div className="text-center mb-6">
                {/* <div className="text-6xl mb-4">{state.selectedGift.icon}</div> */}
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">{state.selectedGift.title}</h2>
                <p className="text-lg text-blue-200">{state.selectedGift.description}</p>
              </div>

              <div className="bg-purple-800/30 rounded-lg p-6 mb-6 border border-purple-500/30">
                <h3 className="text-xl font-semibold mb-4 text-purple-200">🤔 Riddle:</h3>
                <p className="text-lg mb-4">{state.selectedGift.question}</p>
                
                <div className="mb-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={state.currentAnswer}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your answer..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    autoComplete="off"
                    autoFocus
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => checkAnswer(state.selectedGift!)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    <Key className="w-5 h-5 inline mr-2" />
                    Unlock Gift
                  </button>
                </div>
              </div>

              <div className="bg-yellow-800/20 rounded-lg p-4 border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-300 mb-2">💡 Hint:</h4>
                <p className="text-yellow-100">{state.selectedGift.hint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GiftView = () => {
    if (!state.selectedGift) return null;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigateToView('map')}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Map className="w-4 h-4" />
              Continue Hunt
            </button>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🎉 Gift Unlocked!
            </h1>
            <div></div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-green-400/30">
              <div className="text-8xl mb-6">🎁</div>
              {/* <div className="text-6xl mb-4">{state.selectedGift.//icon}</div> */}
              <h2 className="text-4xl font-bold text-green-400 mb-4">{state.selectedGift.title}</h2>
              <p className="text-xl text-green-200 mb-8">{state.selectedGift.description}</p>

              <div className="bg-green-800/30 rounded-lg p-6 mb-6 border border-green-500/30">
                <h3 className="text-2xl font-semibold mb-4 text-green-300">🔗 Your Gift:</h3>
                <a
                  href={state.selectedGift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  🎁 Claim Your Gift
                </a>
                <p className="text-sm text-green-200 mt-4">Click the link above to access your gift!</p>
              </div>

              <div className="text-lg text-green-100">
                <p>Congratulations! You've successfully solved the puzzle and unlocked this amazing gift.</p>
                <p className="mt-2">Keep exploring to find the remaining {20 - state.unlockedGifts.length} treasures!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FakeView = () => {
    if (!state.selectedFake) return null;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigateToView('map')}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Map className="w-4 h-4" />
              Back to Map
            </button>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              ⚠️ {state.selectedFake.title}
            </h1>
            <div></div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-red-400/30">
              <div className="text-8xl mb-6">
                {state.selectedFake.type === 'empty' && '🚫'}
                {state.selectedFake.type === 'trick' && '🎭'}
                {state.selectedFake.type === 'redirect' && '🌀'}
              </div>
              
              <div className="text-6xl mb-6">
                <AlertTriangle className="w-24 h-24 text-red-400 mx-auto" />
              </div>

              <div className="bg-red-800/30 rounded-lg p-6 mb-6 border border-red-500/30">
                <h3 className="text-2xl font-semibold mb-4 text-red-300">Oops!</h3>
                <p className="text-xl text-red-100 mb-4">{state.selectedFake.message}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigateToView('map')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  🗺️ Try Another Path
                </button>
                <button
                  onClick={() => navigateToView('home')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  🏠 Start Over
                </button>
              </div>

              <div className="mt-6 text-lg text-red-100">
                <p>Don't give up! There are still {20 - state.unlockedGifts.length} real gifts waiting to be found.</p>
                <p className="text-sm text-red-300 mt-2">Remember: Real treasures ask riddles, fake ones just disappoint!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'home':
        return <HomePage />;
      case 'map':
        return <MapView />;
      case 'puzzle':
        return <PuzzleView />;
      case 'gift':
        return <GiftView />;
      case 'fake':
        return <FakeView />;
      default:
        return <HomePage />;
    }
  };

  return renderCurrentView();
}

export default App;
