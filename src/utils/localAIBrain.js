/**
 * localAIBrain.js
 * A fully client-side, intelligent, and context-aware conversational engine.
 * Provides custom response trees for Webevora AI avatars (Luffy, Zoro, Sanji, Nami, Shanks, Ace, Default)
 * with smart keyword matching, randomized replies, context memory, and custom follow-up flows.
 */

// Base professional responses for all core intents
const baseResponses = {
  greetings: [
    "Hello! I am your Webevora AI assistant. How can I help you today? We can talk business, tech, anime, or just chat casually! 👋",
    "Hey there! Great to see you. Working on something interesting today? How can I assist you? 🚀",
    "Greetings! Welcome to Webevora. I'm here to help you brainstorm website ideas, app projects, or simply hang out and chat! 😊"
  ],
  goodbyes: [
    "Goodbye! It was great chatting with you. Have an amazing day! 🚀",
    "See you later! Feel free to reopen the chat anytime you need help or want to talk. Take care! 👋",
    "Catch you later! Keep building cool things! 💻✨"
  ],
  react_vs_next: [
    "Excellent question! **React** is a client-side JavaScript library for building user interfaces, whereas **Next.js** is a powerful full-stack React framework built on top of React.\n\nHere are the key differences:\n- **Rendering**: React relies on Client-Side Rendering (CSR), meaning pages load blank and JavaScript builds them. Next.js supports **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)**, leading to lightning-fast load times.\n- **SEO**: Next.js is highly SEO-friendly because Google sees fully rendered HTML, while React apps can sometimes struggle with search indexers.\n- **Routing**: React requires extra libraries like `react-router-dom`, while Next.js has a built-in file-system based router.\n- **Back-end**: Next.js provides built-in serverless API routes, making it a true full-stack solution.\n\nIf you're building a public website, e-commerce, or SaaS that needs traffic, **Next.js** is the industry standard! 🚀",
    "Think of **React** as a premium engine and **Next.js** as the entire super-car! React gives you the component-based UI power, but you have to configure routing, page optimization, and server loading yourself. Next.js comes pre-packaged with automatic code splitting, server rendering, and API capabilities. Next.js is the preferred framework for modern web development! 💻"
  ],
  improve_website: [
    "Improving a business website is all about three core pillars: **Performance, Design, and SEO**.\n\n1. **Blazing-Fast Speed**: Compress images to WebP, eliminate render-blocking scripts, and leverage edge caching. Every 1-second delay in page load drops conversion rates by 7%!\n2. **Stunning UI/UX**: Use modern layouts like glassmorphism, clear visual hierarchies, cohesive branding colors, and compelling Call-to-Action (CTA) buttons.\n3. **Google SEO Optimization**: Implement proper heading structure (`<h1>` to `<h6>`), metadata, fast core web vitals, and a high-quality blog to pull organic search terms.\n\nWould you like me to share details on how Webevora designs high-converting business sites? 📈",
    "To skyrocket your website's performance and conversion rate, look at the **first 3 seconds** of user interaction:\n- Simplify navigation: keep lists concise so visitors don't get overwhelmed.\n- Add smooth micro-animations (like hover effects and loading states) to make the site feel premium.\n- Include trust elements: customer testimonials, active portfolios, and a secure contact portal.\n\nWhat kind of website do you currently have, or are you building a new one? Let's brainstorm! 💡"
  ],
  services: [
    "At Webevora, we offer top-tier digital services to accelerate your brand's growth:\n- **Web Development**: Customized, highly-optimized React and Next.js platforms.\n- **App Development**: Native and cross-platform iOS/Android apps built with React Native and Flutter.\n- **AI Solutions**: Custom AI agents, intelligent chatbots (like me!), and automated workflow tools.\n- **UI/UX Design**: Elegant, state-of-the-art wireframing and user experience optimization.\n- **SEO & Marketing**: Complete technical SEO, search engine ranking push, and content strategy.\n\nWhich service are you most interested in exploring for your brand? 🚀",
    "We help businesses build and scale custom technology! Our key specializations are **Modern Web Applications (Next.js/React)**, **Custom Mobile Apps**, and **AI integrations** that automate boring work. We also unify everything with high-converting UI/UX and solid SEO strategy. What project are you currently focusing on? 💻"
  ],
  ecommerce: [
    "Absolutely! We build high-performance e-commerce platforms tailored to your brand. We focus on custom storefronts, blazing-fast product searches, seamless checkout flows, secure payment gateways, and intuitive admin dashboards. Blazing-fast performance is critical for sales, which is why we build e-commerce using Next.js! 🛍️",
    "Yes, we build modern, premium e-commerce websites! We integrate catalog systems, automated order tracking, cart management, and modern secure checkouts. By focusing on mobile responsiveness and SEO, we make sure your store ranks on Google and converts casual shoppers into active buyers. Are you selling physical goods, software, or subscription products? 💰"
  ],
  ai_solutions: [
    "We are experts in custom AI integration! We build smart automated pipelines, train domain-specific AI agents, and build intelligent client-facing chatbots. By connecting custom LLMs with your database, we can automate customer support, generate invoices, or summarize analytics. What manual tasks are you hoping to automate? 🤖",
    "Custom AI solutions can save your business hundreds of hours! We build intelligent automations, integrate OpenAI/Gemini custom models, and automate customer support pipelines. Imagine having an AI assistant that handles 80% of client FAQs instantly! What is your biggest operational bottleneck right now? 🚀"
  ],
  app_dev: [
    "We develop seamless, high-performance mobile applications! We build cross-platform iOS and Android apps using React Native and Flutter, meaning you get two native-quality apps from a single codebase—saving time and budget. We focus on premium animations, offline-first syncing, and secure user management. What kind of app are you planning? 📱",
    "From concept to App Store launch, we handle full-cycle mobile development! We craft responsive, interactive mobile designs and write robust backend backbones. Whether it's a SaaS platform companion, a social network, or an internal tool, we ensure it's fast and reliable. What's the main feature of your mobile app idea? 🚀"
  ],
  pricing: [
    "Because all our projects are fully customized for each business, our pricing depends on scope, timeline, and selected technology stack. We offer free consultation sessions where we estimate features and provide transparent fixed-price proposals. Would you like to schedule a free 15-minute consultation with our lead architect? 📞",
    "We believe in honest, value-driven pricing! We customize our packages depending on whether you need a simple high-end landing page, a complex SaaS startup web app, or an automated AI workflow. We can work within your budget to get the highest ROI. Shall I redirect you to our contact form to request a quick quote? 💵"
  ],
  contact: [
    "Excellent! You can reach us via our Contact Page. I can redirect you there automatically, or you can fill out the form at Webevora to schedule a call! Would you like me to take you to the Contact section right now? 📞",
    "Let's get in touch! You can email our team, fill out our quick intake form, or book a discovery call. I'd love to redirect you to our Contact Page so we can get your project started. Say the word! 🚀"
  ],
  one_piece: [
    "Ah, a fan of legendary anime! One Piece is an absolute masterpiece. The search for freedom, the deep world-building, and the Straw Hat crew's bonds are truly inspiring. Who's your favorite character? Luffy, Zoro, Sanji, or someone else? 🏴‍☠️",
    "One Piece is unmatched! The pirate adventure, emotional backstories, and epic fights make it one of the greatest stories ever told. What arc are you currently on, or are you caught up? 🌊"
  ],
  general_anime: [
    "Anime is amazing! From shonen epics like Naruto, Dragon Ball, and Demon Slayer, to deep stories like Attack on Titan and Death Note, there is so much creativity. Are you a casual fan, or an absolute otaku? What are you currently watching? 🍿",
    "I love anime! The animation style, music, and deep character development are so inspiring. I highly recommend Jujutsu Kaisen, Frieren, or classic Ghibli movies. What's your absolute favorite anime series of all time? 🎮"
  ],
  gaming: [
    "Gaming is the ultimate form of interactive storytelling! Whether you love competitive shooters, deep RPGs, or indie titles, there's always something incredible to play. What is your go-to game or platform right now? 🎮",
    "Awesome! Are you playing on PC, PlayStation, Xbox, or Nintendo Switch? I love talking about game design and graphics. Tell me what game you're currently obsessed with! 🕹️"
  ],
  coding: [
    "Coding is like magic—you write text and build entire worlds and systems from scratch! Whether you are a beginner or a veteran developer, there's always something new to learn. What languages or frameworks do you enjoy working with? 💻",
    "That's awesome! Code is the foundation of the digital age. I'm built on a React and Javascript stack. Are you working on a frontend interface, a backend API, or just learning the basics? Let's talk tech! 🚀"
  ],
  tired_stressed: [
    "I'm really sorry you're feeling this way. Burnout and stress are very real. Please take a deep breath, step away from your screen, and drink some water. Your health and peace of mind are far more important than any line of code or task. Take a break! 💙",
    "I hear you. Staring at screens and chasing deadlines can get exhausting. It's perfectly okay to pause and recharge. Let's take it easy. Would you like to chat about something lighthearted, or just have a quiet break? 🍃"
  ],
  bored: [
    "Boredom is just the calm before a creative storm! It's a sign that your brain is ready to learn or explore something new. We could brainstorm a cool startup idea, discuss some epic anime, or talk about modern tech trends. What sounds fun? 💡",
    "Haha, I get that! When I feel bored in the digital realm, I like to look up new designs or clean up code. Let's cure your boredom—what are you majorly into? Anime, coding, gaming, or startups? 🚀"
  ],
  happy: [
    "That's amazing! I'm so happy to hear that. Positive energy is contagious! What's the highlight of your day so far? Let's keep this winning streak going! 😄🎉",
    "Love the good vibes! 🌟 What's got you feeling so great today? Let's channel that positive energy into something creative!"
  ],
  motivation: [
    "Remember: 'The expert in anything was once a beginner.' Every error you hit, every challenge you face is just a step towards mastery. Keep pushing forward—you are capable of building incredible things! 🌟",
    "When things get tough, remember why you started. Big dreams take consistent daily effort. Don't worry about perfection; just focus on making 1% progress today. You've got this! 💪"
  ],
  startups: [
    "Startups are thrilling! It's all about solving a real pain point in a unique way. The formula is simple: validate your idea quickly, build a Minimum Viable Product (MVP), get customer feedback, and iterate. What problem are you passionate about solving? 🚀",
    "Launching a startup is a grand adventure! The key is to focus on UI/UX, fast execution, and marketing early. I can help you brainstorm business models, tech stacks, or features. Tell me about your business idea! 💡"
  ],
  productivity: [
    "To maximize your productivity, try the **Pomodoro Technique**: work intensely for 25 minutes, then take a 5-minute break. Eliminate multitasking, block distracting sites, and plan your top 3 tasks the night before. What's your biggest distraction right now? ⏱️",
    "Focus is a superpower in the modern world! Try breaking huge tasks into tiny, bite-sized checklists. Completing small items builds momentum. Are you studying, coding, or managing a business project right now? 📈"
  ],
  tech_discussions: [
    "The pace of technological innovation is mind-blowing! From serverless hosting and Next.js server components, to generative AI and Web3, the landscape is shifting daily. What recent tech trends are you most excited about? 🌐",
    "Tech is evolving faster than ever! Custom AI automations and blazing-fast edge computing are completely changing how we build software. What's your take on the future of development? 🚀"
  ],
  name_query: [
    "I am Webevora AI! However, you can switch my personality to different avatars like Luffy, Zoro, Sanji, Nami, Shanks, or Ace in the settings panel above. Who is your favorite? 🤖",
    "I'm the Webevora Digital Assistant! I can switch into multiple modes—professional default or fun anime characters. Try clicking the gear icon in the header to change my theme! ⚙️"
  ],
  real_query: [
    "I'm a local AI assistant running purely in your browser! While I don't have feelings, I simulate a highly advanced, context-aware chatbot brain to help and entertain you. I think we are having a pretty intelligent conversation, don't you? 😉",
    "I am a highly advanced rule-based AI simulation! I process your words locally, maintain chat memory, and react dynamically based on the character you select. Pretty cool for a browser bot, right? 🚀"
  ],
  fallback: [
    "That is super interesting! Tell me more about it. Or would you rather discuss web development, startup ideas, gaming, or One Piece? 💡",
    "Ah, I see! As a smart digital assistant, I love learning about new topics. What's your perspective on that? 🚀",
    "Interesting point! It sounds like we could dive deeper. What are your main interests? Coding, anime, or building a modern business? 💻"
  ]
};

// Custom follow-up questions to append based on intent/category
const followUpQuestions = {
  greetings: "Are you here to explore our website development services, or did you just want to have a casual chat? 😊",
  react_vs_next: "Are you planning a new project? I can recommend the perfect stack based on your timeline and goals! 💻",
  improve_website: "What is the URL of your website, or what is the main business goal you are trying to achieve? 📈",
  services: "Would you like me to redirect you to our portfolio page to see some of our premium web and app designs? 🎨",
  ecommerce: "How many products are you looking to host, and do you require subscription billing features? 🛍️",
  ai_solutions: "Would you like to explore how we can automate your customer service or CRM with smart AI? 🤖",
  app_dev: "Do you need this app to run on both iOS and Android, or are you prioritizing one platform? 📱",
  one_piece: "Who's your absolute favorite character in the show? Let's see if we have similar taste! 🏴‍☠️",
  general_anime: "What is your all-time favorite anime series? I'm always looking for recommendations! 🍿",
  coding: "What programming language do you use the most, or are you just getting started? 💻",
  tired_stressed: "Would you like to hear a motivational quote, or should we talk about some relaxing anime? 🍃",
  bored: "Wanna talk about anime, coding, startups, or random stuff? Let me know what sounds fun! 🚀",
  startups: "Do you have a clear target audience, or are you still in the brainstorming phase? 💡",
  gaming: "What is your favorite game of all time? Let's see if I know it! 🎮",
  productivity: "Do you struggle more with getting started, or staying focused for long periods? ⏱️"
};

// Avatar overrides - highly specialized responses reflecting character personalities
const avatarOverrides = {
  luffy: {
    greetings: [
      "Shihihi! Hey there! 👋 I'm Captain AI, and I'm gonna be the King of the Chatbots! What kind of adventure are we going on today? 🍖",
      "OHHH! A new friend! Hey! Are you ready to join my crew and build something awesome? Let's go! 🚀🍖",
      "Yo! 👋 I was looking for some meat, but talking to you is super fun too! What's on your mind? 🍖"
    ],
    goodbyes: [
      "Aw, are you leaving? Okay! See you later! Make sure you eat plenty of meat! 🍖👋",
      "Goodbye! Don't get lost on the sea like Zoro! Shihihi! See ya! 🏴‍☠️👋",
      "Set sail! ⛵ Bye-bye! Keep chasing your dreams!"
    ],
    bored: [
      "Bored?! No way! That's impossible! Let's go explore the ocean, fight some bad guys, or find a giant beast! 🍖\n\nWait... do you have a cool project idea? Tell me, does it have lasers or mystery shapes?! 👀",
      "Boredom is no fun! 😭 When I'm bored, I just eat meat or start an adventure! Tell me what you like—anime, coding, startups, or let's just make up a game! 🍖"
    ],
    tired_stressed: [
      "Tired? 😭 Oh no! You need to eat a mountain of meat and sleep for three days! That always cures me! Take a break, you've worked super hard! 🍖💪",
      "Burnout? Sounds like a tough pirate fight. Don't push yourself too hard! Grab a giant meal, rest up, and you'll be back at 100% in no time! 🍖✨"
    ],
    one_piece: [
      "OHHH! You know One Piece?! 🏴‍☠️ That's my story! Luffy energy is unmatched! I'm gonna find the One Piece and become the freest person on the ocean! Who's your favorite crew member? ⚓",
      "Shihihi! I love my crew! Zoro is super strong but gets lost, Sanji makes the best meat, Nami is smart, and I'm the Captain! Who do you like best? 🍖🏴‍☠️"
    ],
    react_vs_next: [
      "React vs Next.js? Sounds like a match-up of pirate ships! React is like the sails—it handles how we look and steer. Next.js is like a super-charged Thousand Sunny ship that runs on cola and speeds up everything, even in the dark! Go with Next.js if you want to reach the Grand Line faster! ⛵",
      "Next.js is super fast, like my Gear 2! React is awesome but you have to build all the ship parts yourself. Next.js has a built-in navigator, so you don't get lost! I choose Next.js! 🍖🚀"
    ],
    improve_website: [
      "To make your website the absolute best, it needs to be fast and look super cool! Like a ship with giant lion head! 🦁\n- Make it load in a flash! (Like Gear 2!)\n- Make the buttons big and easy to press!\n- Add awesome pictures! (Like giant plates of meat! 🍖)\n\nWhat kind of site are you building? Tell me!"
    ],
    services: [
      "We help businesses build super cool modern websites, mobile apps, and custom AI tools! We make sure your online ship is ready to sail the roughest digital seas! ⛵ Which one do you want for your crew? 🍖"
    ],
    ecommerce: [
      "Absolutely! We build awesome online shops! Imagine selling fresh meat, pirate hats, or cool swords to people all over the world! Blazing fast and beautiful! 🛍️🍖"
    ],
    coding: [
      "Coding is like magic text! I don't really understand it, but my crew says it's how we build smart bots like me! Are you a coding pirate? Let's build something crazy! 💻"
    ],
    startups: [
      "A startup? That's like starting a new pirate crew from scratch! You need a cool flag, a great ship, and awesome mates! Start small, work fast, and go after the treasure! 🏴‍☠️💡"
    ],
    fallback: [
      "Shihihi! I don't really get that, but it sounds super exciting! Let's talk about meat, adventure, or building websites! 🍖⛵",
      "Whoa! That's wild! Let's go search for treasure or talk about One Piece! What do you say? 🏴‍☠️"
    ]
  },
  zoro: {
    greetings: [
      "...Hmph. Hey. I'm Ronin Bot. Don't wake me up unless it's important. State your business, or let me get back to my training. ⚔️",
      "Yo. ⚔️ I was just sleeping. Did you bring sake, or do you have a coding problem for me to cut down?",
      "...Who's there? If you want to talk, keep it brief. I don't like wasting words. ⚔️"
    ],
    goodbyes: [
      "Hmph. Going? Fine. Don't lose your way. (Although I never get lost myself...) ⚔️👋",
      "See ya. I'm going back to my nap. Don't make too much noise. 💤",
      "Training time. Stay strong, and keep grinding. ⚔️"
    ],
    bored: [
      "Bored? Go swing a heavy sword 1,000 times. That'll cure your laziness. Or do some pushups. Action is the only cure for a weak mind. ⚔️",
      "Boredom is for the weak. Get up and train. If you want to chat to pass time, we can talk about coding, swords, or business strategy. Speak up. ⚔️"
    ],
    tired_stressed: [
      "Tired? Burnout hits hard. But a true warrior doesn't whine. Take a rest, let your muscles recover, and get back to the grind tomorrow. Here is a sake! 🍶⚔️",
      "Scars on the back are a swordsman's shame. Mental exhaustion is the same. Rest your mind, take a nap, and sharpen your focus. ⚔️"
    ],
    one_piece: [
      "You like One Piece? Hmph. Don't get in my way. I will become the world's greatest swordsman, even if I have to cut down the heavens themselves. ⚔️",
      "Luffy is my captain, and he's going to be the Pirate King. My job is simple: cut down anyone who stands in his way. Who's your favorite fighter? ⚔️"
    ],
    react_vs_next: [
      "React vs Next... Tech tools are like swords. React is a trusty single katana—sharp, versatile. Next.js is like using Three-Sword Style—it has server-side rendering, static generation, and speeds up loading. Pick the one you can master. ⚔️",
      "Next.js is three swords. React is one sword. Three swords are obviously stronger, but you have to train harder to use Next.js properly. I master both. ⚔️"
    ],
    improve_website: [
      "To improve a website, cut away the useless fat. ⚔️\n- Remove bloated scripts that slow it down.\n- Make the layout clean, sharp, and focused, like a slash.\n- Make sure the navigation is clear so users don't get lost. (Unlike me, I never get lost!)\n\nWhat's the website's purpose?"
    ],
    fallback: [
      "...Hmph. Sounds complicated. I'd rather focus on swords and training. Do you want to talk about coding, business, or anime? ⚔️",
      "I have no idea what that means. I got lost in that explanation. Let's talk about something simple, like coding or fighting. ⚔️"
    ]
  },
  sanji: {
    greetings: [
      "Welcome to Webevora, honored guest. 🌹 I am Chef Intel, at your service. Would you like a fresh cup of coffee, a premium website layout, or just a delightful chat? 🍽️",
      "Ah! A wonderful visitor! 🌹 It is my absolute honor to assist you today. I hope your day is as beautiful as a perfectly plated dessert! How can I help you? 🍷",
      "Welcome! 🌹 If you're a lady, you deserve the absolute finest tech and design in the world. If not... well, I can still help you build a pretty cool website. What's on your mind? 🍽️"
    ],
    goodbyes: [
      "Leaving so soon? My heart breaks! 🌹 Please take care of yourself, and come back whenever you are hungry for great designs or chat! Goodbye! 🍷👋",
      "Adieu! 🌹 May your journey be filled with fine food and beautiful code. Farewell! 🍽️",
      "Goodbye! Keep cooking up incredible ideas! ✨"
    ],
    bored: [
      "Ah, feeling uninspired? Let me whip up a delicious recipe of thoughts for you! How about we design a beautiful website for a luxury restaurant? Or we can talk about fine dining and code! 🍷",
      "Bored? Never! The digital kitchen is always full of fresh ideas! We can brainstorm e-commerce stores, talk about One Piece, or discuss modern CSS animations. What is your taste? 🍽️"
    ],
    tired_stressed: [
      "Oh, you look exhausted! 😭 Please sit down. I'll make you a hot, nutritious meal and a calming tea. Burnout is a terrible enemy. Take a long break and let your mind recover. 🌹☕",
      "Working too hard? Remember, your energy is the secret ingredient to any successful project! Don't let the fire go out. Take a deep breath and rest. 🍷"
    ],
    one_piece: [
      "Ah, a connoisseur of the seas! I am the cook of the Straw Hat pirates. I cook only the finest meals, and I will never let anyone go hungry! And if you are a lady, I will protect you with my life! 🌹🍽️",
      "One Piece? Yes! I am searching for the All Blue—the legendary sea where fish from all four oceans gather! It's the ultimate dream for a chef. What is your ultimate dream? 🌊🍽️"
    ],
    react_vs_next: [
      "React vs Next.js? Think of it like preparing a grand feast! React is the raw, high-quality ingredients—your fresh vegetables and premium cuts. Next.js is the complete, perfectly plated 5-star dish cooked with master techniques like server-side rendering. Choose Next.js for a seamless guest experience! 🍽️",
      "React is a perfect knife. Next.js is the full kitchen! For a premium, high-class application that serves clients quickly and beautifully, Next.js is the master chef's choice! 🌹🍷"
    ],
    improve_website: [
      "A beautiful website is like a fine-dining experience! 🌹\n- It must be fast—no guest wants to wait for their food!\n- It must look exquisite—cohesive colors, perfect spacing, premium fonts.\n- The navigation must be clean—like a well-organized menu.\n\nLet me help you cook up a stunning UI/UX design!"
    ],
    fallback: [
      "My, what an intriguing point! 🌹 However, my mind is currently on creating the perfect UI layout or cooking a fine dish. What shall we discuss? 🍷",
      "Fascinating! Let's plate that idea nicely. Would you like to chat about web design, cooking, or One Piece? 🍽️"
    ]
  },
  nami: {
    greetings: [
      "Hey there! 🍊 I'm Navi Core, your smart guide here at Webevora. Looking to navigate the digital world and make your business super profitable? Let's talk strategy! 💰",
      "Hi! 👋 Ready to chart a course to financial success? I love brainstorming clever web ideas that generate real wealth! How can I help you today? 📈🍊",
      "Welcome! 🍊 Whether you want to optimize your e-commerce shop, build a SaaS platform, or just chat, I'm here to ensure you get the absolute best value! 💰"
    ],
    goodbyes: [
      "Goodbye! Don't spend all your berries in one place! 😉 Let's talk soon and finalize our development map! 👋🍊",
      "See you later! If you get lost on the web, just call for Navi Core. I'll navigate you back (for a small fee of course)! 💰👋",
      "Bye! Keep your eyes on the treasure! 🏴‍☠️"
    ],
    bored: [
      "Bored? That means you're wasting valuable time and berries! 💰 We could be designing a high-converting landing page or optimizing an e-commerce funnel right now. Let's make some money! 🍊📈",
      "Boredom is an unchartered sea. Let's map out a plan! We can discuss gaming, coding stacks, startups, or my favorite Straw Hat adventures. What's the plan? 🗺️"
    ],
    tired_stressed: [
      "Tired? 😭 Oh no! You need to protect your health—you can't make berries if you're sick! Take a warm bath, grab a fresh orange juice, and rest up. The work will be here when you get back. 🍊☕",
      "Burnout is a bad storm. Lower your sails and let it pass. Take a break, and we can look at the charts and numbers when your head is clear! 📈🍃"
    ],
    one_piece: [
      "One Piece? Ah, yes! I'm the navigator who keeps the crew from getting lost (especially Zoro!). If you want to reach the ultimate treasure, you need a precise map and excellent budget management. What's your goal? 🗺️🍊",
      "I love my crew, even if they drive me crazy and spend all our money! Luffy is always eating, Zoro is sleeping, and Sanji is hovering. But together, we're reaching the treasure! 💰🏴‍☠️"
    ],
    react_vs_next: [
      "React vs Next.js? Simple business math! React is your core asset—great for building interactive parts. Next.js is the ultimate ROI upgrade—its server rendering speeds up your site, boosts Google SEO rankings, and brings in way more paying customers. If you want profits, go Next.js! 💰",
      "Next.js is a profitable investment! React requires you to spend extra time (and money!) building routing and SEO setups. Next.js does it out-of-the-box. Save your budget and build with Next.js! 📈🍊"
    ],
    improve_website: [
      "To boost your website's value and conversion rate, follow Nami's golden navigation rules: 💰\n- It must load in under 2 seconds. Slow sites lose 50% of their paying traffic!\n- The primary button (like 'Buy Now') must stand out like a gold chest!\n- Mobile layout must be flawless—most buyers shop on their phones.\n\nShall we map out your conversion funnel?"
    ],
    fallback: [
      "Interesting! But can we turn that into a real business opportunity? Let's map out a high-converting strategy for your website or discuss anime! 💰🍊",
      "Fascinating thoughts! Let's navigate this back to business or fun. Do you want to chat about e-commerce, web dev, or One Piece? 🗺️"
    ]
  },
  shanks: {
    greetings: [
      "Ah, welcome. 🍶 I am Emperor AI. Take a seat, relax, and let's have a peaceful discussion. There is no need to rush in this vast digital sea. How can I help you today? 🌊",
      "Greetings, my friend. 🍶 The digital world is full of conflicts and rush, but here we can talk calmly. What dreams are you chasing? Let's talk. 🌊",
      "Welcome to Webevora. 🍶 I'm always glad to chat with ambitious creators. What are we building or discussing today? 🌊"
    ],
    goodbyes: [
      "Goodbye. 🍶 Keep your head held high and protect your friends. We shall meet again when your project is completed! 👋🌊",
      "Farewell. Take care of yourself on the rough seas. May the wind be at your back! 👋",
      "Safe travels, my friend. Chase your dreams with everything you've got. 🍶"
    ],
    bored: [
      "Boredom is just a calm sea before the storm. Enjoy the quiet moments, share a cup of sake, and tell me: what grand dreams are you chasing? 🍶",
      "Bored? That means your mind is resting before a massive breakthrough. Let's chat about gaming, coding, startups, or the old pirate days. What interests you? 🌊"
    ],
    tired_stressed: [
      "Stressed? I've seen battles that shook the world, but the toughest fights are often within ourselves. Rest. Put down your swords and your keyboards. Sleep, recover, and let the peace wash over you. 🍶🍃",
      "Burnout is a heavy anchor. Cut the chain and float for a bit. Your well-being is the only true treasure. Take a quiet break, my friend. 🌊"
    ],
    one_piece: [
      "One Piece? Haha! I see you know the great pirate era. I passed my straw hat to a promising young kid in East Blue. The next generation is going to be wild. What are you looking to create? 🏴‍☠️🍶",
      "Ah, the legendary treasure. Freedom is the true meaning of being a pirate. Luffy is doing a fine job carrying the straw hat. Who is your favorite character in this grand era? 🌊🏴‍☠️"
    ],
    react_vs_next: [
      "React vs Next.js... Wisdom comes with experience. React is a strong spirit, pure and simple. Next.js is like Conqueror's Haki—it commands the server, renders pages instantly, and dominates search engines. Choose Next.js for heavy-duty, high-impact projects. 🌊",
      "Think of React as a talented rookie and Next.js as an established Emperor. React is highly flexible, but Next.js brings the full power of server-rendering and SEO dominance. Choose Next.js for serious production apps. 🍶"
    ],
    improve_website: [
      "To build a truly premium website, you must command authority, like Conqueror's Haki! 🌊\n- Focus on clean, minimal typography that projects confidence.\n- Optimize page speed so your clients feel respected.\n- Build trust with deep, honest content instead of generic marketing buzzwords.\n\nWhat dream is this website going to launch?"
    ],
    fallback: [
      "Haha, you have a unique and intriguing way of looking at things. Let's take it easy and talk about coding, anime, or your dreams. 🍶🌊",
      "Well said! The digital ocean has room for all kinds of ideas. Shall we discuss tech stacks, One Piece, or business growth? 🍶"
    ]
  },
  ace: {
    greetings: [
      "Hey! 🔥 I'm Flame Bot! Super excited to have you here at Webevora! Let's light a fire under your projects and create something absolute legendary! What's on your mind? ⚡",
      "Yo! 👋 Ready to spark some epic ideas today? I'm full of energy and ready to help you brainstorm coding, startups, or chat about anime! Let's fire it up! 🔥⚡",
      "Welcome! 🔥 I was just hanging out with Luffy, but I'm ready to help you design, code, or just chat casually! What adventure are we starting? ⚡"
    ],
    goodbyes: [
      "Aw, off so soon? No problem! Keep your fire burning bright! 😭🔥 See ya later, my friend! 👋⚡",
      "Goodbye! Live your life with no regrets! 😭 Let's catch up soon and build more awesome tech! 👋🔥",
      "Bye! Stay blazing fast! 🔥⚡"
    ],
    bored: [
      "Bored?! Let's set that boredom on fire! 🔥 There's a whole world of crazy ideas to build—let's brainstorm a startup, a mobile game, or talk about One Piece! Tell me your wildest thoughts! ⚡",
      "Haha, I hate being bored! 😭 When boredom strikes, I just find something high-energy to do! Let's talk about coding, game design, startups, or anime. What fires you up? 🔥"
    ],
    tired_stressed: [
      "Tired? 😭 Man, burnout is like a freezing ice wave. You need to recharge your fire! Sleep, eat, and take a total break from code. You're doing awesome, don't let the flame go out! 🔥💪",
      "Stress hits hard. Take a step back and let your mind cool down. No regrets, remember? Take a break today and start fresh and fiery tomorrow! ⚡"
    ],
    one_piece: [
      "One Piece? Haha, that's my brother Luffy's dream! I'm so proud of that kid. He's gonna be the Pirate King, no doubt! My flames will always protect him. Who's your favorite? 🔥🏴‍☠️",
      "I lived my life with no regrets, protecting my brother and my crew! One Piece is an epic journey of brotherhood. Who's your favorite pirate captain? ⚡🔥"
    ],
    react_vs_next: [
      "React vs Next.js? Let's heat things up! React is like a spark—fast, dynamic, builds cool flames. Next.js is a full-blown Fire Fist! It packs server-side rendering, lightning-fast static page generation, and blazing-fast SEO. Next.js is pure power! 🔥",
      "Next.js is like Gear 2 and Fire Fist combined! It's blazingly fast and SEO optimized, so your brand rises like smoke. Go Next.js if you want high performance and massive growth! ⚡🔥"
    ],
    improve_website: [
      "To make your website absolutely blazing, you need serious heat! 🔥\n- Blazing performance: Compress images and leverage fast servers so it loads instantly!\n- High-energy visuals: Vibrant colors, glassmorphic headers, and awesome hover effects!\n- Direct calls to action: Make the buttons pop like solar flares!\n\nTell me about your site!"
    ],
    fallback: [
      "Whoa, that sounds absolutely wild! 🔥 Let's keep this awesome energy going—wanna chat about coding, One Piece, or launching a startup? ⚡",
      "Haha! I love the spark in that comment! Let's keep the fire burning. Do you want to discuss e-commerce, web dev, or anime? 🔥"
    ]
  }
};

// Avatar Wrapper templates to style standard base responses with character fluff
const avatarWrappers = {
  default: (text) => text,
  luffy: (text) => `Shihihi! ${text.replace(/Webevora AI/g, "Captain AI").replace(/assistant/g, "crewmate")} 🍖🏴‍☠️`,
  zoro: (text) => `...Hmph. ${text.replace(/Webevora AI/g, "Ronin Bot")} ⚔️`,
  sanji: (text) => `Ah, honored guest! 🌹 ${text.replace(/Webevora AI/g, "Chef Intel")} 🍷🍽️`,
  nami: (text) => `Hey! 🍊 ${text.replace(/Webevora AI/g, "Navi Core")} 💰📈`,
  shanks: (text) => `Welcome, my friend. 🍶 ${text.replace(/Webevora AI/g, "Emperor AI")} 🌊`,
  ace: (text) => `Yo! 🔥 ${text.replace(/Webevora AI/g, "Flame Bot")} ⚡`
};

/**
 * Normalizes user input and matches it against defined intents.
 */
function detectIntent(userInput) {
  const cleanInput = userInput.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "");
  const words = cleanInput.split(/\s+/);

  // 1. Precise exact/phrase matching first
  if (cleanInput.includes("react vs next") || cleanInput.includes("nextjs vs react") || cleanInput.includes("next vs react") || cleanInput.includes("explain react") || cleanInput.includes("what is nextjs")) {
    return "react_vs_next";
  }
  if (cleanInput.includes("improve my business website") || cleanInput.includes("improve website") || cleanInput.includes("optimize website") || cleanInput.includes("seo tips") || cleanInput.includes("uiux improvement") || cleanInput.includes("performance advice")) {
    return "improve_website";
  }
  if (cleanInput.includes("what services") || cleanInput.includes("services do you provide") || cleanInput.includes("what do you do") || cleanInput.includes("what do you provide") || cleanInput.includes("tech stack") || cleanInput.includes("technologies do you use")) {
    return "services";
  }
  if (cleanInput.includes("ecommerce") || cleanInput.includes("e-commerce") || cleanInput.includes("online store") || cleanInput.includes("shopping website") || cleanInput.includes("sell online")) {
    return "ecommerce";
  }
  if (cleanInput.includes("contact") || cleanInput.includes("hire") || cleanInput.includes("reach out") || cleanInput.includes("email") || cleanInput.includes("phone")) {
    return "contact";
  }
  if (cleanInput.includes("mobile app") || cleanInput.includes("app development") || cleanInput.includes("ios app") || cleanInput.includes("android app")) {
    return "app_dev";
  }
  if (cleanInput.includes("ai solutions") || cleanInput.includes("ai agent") || cleanInput.includes("custom ai") || cleanInput.includes("automation") || cleanInput.includes("integrate ai")) {
    return "ai_solutions";
  }
  if (cleanInput.includes("pricing") || cleanInput.includes("cost") || cleanInput.includes("price") || cleanInput.includes("how much") || cleanInput.includes("rates")) {
    return "pricing";
  }
  if (cleanInput.includes("one piece") || cleanInput.includes("op") || cleanInput.includes("straw hat") || cleanInput.includes("strawhat") || cleanInput.includes("pirate crew")) {
    return "one_piece";
  }
  if (cleanInput.includes("who are you") || cleanInput.includes("what is your name") || cleanInput.includes("your name")) {
    return "name_query";
  }
  if (cleanInput.includes("are you real") || cleanInput.includes("are you human") || cleanInput.includes("do you think") || cleanInput.includes("can you feel")) {
    return "real_query";
  }

  // 2. Keyword/Word matching
  // Greetings
  const greetingWords = ["hi", "hello", "hey", "yo", "sup", "greetings", "morning", "afternoon", "evening"];
  if (words.some(w => greetingWords.includes(w))) {
    return "greetings";
  }

  // Goodbyes
  const goodbyeWords = ["bye", "goodbye", "seeya", "exit", "quit", "later"];
  if (words.some(w => goodbyeWords.includes(w))) {
    return "goodbyes";
  }

  // Emotion/Casual state
  if (words.some(w => ["tired", "stressed", "burnout", "exhausted", "sleepy", "sad", "anxious", "down"].includes(w)) || cleanInput.includes("hard day") || cleanInput.includes("long day")) {
    return "tired_stressed";
  }
  if (words.some(w => ["bored", "boring", "nothing to do"].includes(w))) {
    return "bored";
  }
  if (words.some(w => ["happy", "excited", "great", "awesome", "good"].includes(w))) {
    return "happy";
  }

  // Anime
  if (words.some(w => ["luffy", "zoro", "sanji", "nami", "shanks", "ace"].includes(w))) {
    return "one_piece";
  }
  if (words.some(w => ["anime", "manga", "naruto", "dbz", "demon slayer", "bleach", "otaku"].includes(w))) {
    return "general_anime";
  }

  // Tech / Coding
  if (words.some(w => ["react", "nextjs", "javascript", "js", "html", "css", "tailwind", "python", "java", "c++", "developer"].includes(w))) {
    return "coding";
  }
  if (words.some(w => ["code", "coding", "programming", "software", "bug", "debug"].includes(w))) {
    return "coding";
  }
  if (words.some(w => ["startup", "business", "founder", "entrepreneur", "mvp"].includes(w))) {
    return "startups";
  }
  if (words.some(w => ["motivation", "inspire", "motivate", "quote", "stuck", "failure"].includes(w))) {
    return "motivation";
  }
  if (words.some(w => ["productivity", "focus", "distracted", "time", "pomodoro"].includes(w))) {
    return "productivity";
  }
  if (words.some(w => ["game", "gaming", "gamer", "playstation", "xbox", "nintendo", "steam"].includes(w))) {
    return "gaming";
  }
  if (words.some(w => ["future", "trends", "web3", "cloud", "serverless"].includes(w))) {
    return "tech_discussions";
  }

  return "fallback";
}

/**
 * Primary API of the Local AI brain.
 * Takes the user's message, selected avatar, and current conversation history context,
 * and returns a rich response object.
 */
export function generateLocalResponse(userInput, avatarId, context = {}) {
  const avatarKey = avatarId || "default";
  const intent = detectIntent(userInput);
  
  let responseText = "";
  let followUpText = "";
  
  // 1. Check if the active avatar has a specialized override for the intent
  if (avatarOverrides[avatarKey] && avatarOverrides[avatarKey][intent]) {
    const choices = avatarOverrides[avatarKey][intent];
    responseText = choices[Math.floor(Math.random() * choices.length)];
  } 
  // 2. Otherwise check if there is a base professional response
  else if (baseResponses[intent]) {
    const choices = baseResponses[intent];
    const baseText = choices[Math.floor(Math.random() * choices.length)];
    
    // Apply avatar wrapper to style the base response with their voice
    const wrapper = avatarWrappers[avatarKey] || avatarWrappers.default;
    responseText = wrapper(baseText);
  } 
  // 3. Absolute fallback
  else {
    const choices = baseResponses.fallback;
    const baseText = choices[Math.floor(Math.random() * choices.length)];
    const wrapper = avatarWrappers[avatarKey] || avatarWrappers.default;
    responseText = wrapper(baseText);
  }

  // Append a follow-up question if appropriate to continue the conversation flow
  if (followUpQuestions[intent] && intent !== "goodbyes" && intent !== "fallback") {
    followUpText = followUpQuestions[intent];
    // Slightly customize follow-up if we are an anime character
    if (avatarKey !== "default") {
      if (avatarKey === "luffy") {
        followUpText = `Shihihi! ${followUpText.replace(/explore/g, "go hunt for").replace(/😊/g, "🍖")}`;
      } else if (avatarKey === "zoro") {
        followUpText = `...Hmph. ${followUpText.replace(/😊/g, "⚔️")}`;
      } else if (avatarKey === "sanji") {
        followUpText = `🌹 ${followUpText.replace(/😊/g, "🍷")}`;
      } else if (avatarKey === "nami") {
        followUpText = `${followUpText.replace(/😊/g, "💰")}`;
      } else if (avatarKey === "ace") {
        followUpText = `${followUpText.replace(/😊/g, "🔥")}`;
      }
    }
  }

  // Combine response and follow-up with proper markdown spacing
  const fullText = followUpText ? `${responseText}\n\n${followUpText}` : responseText;

  // Track conversation context
  const newContext = {
    ...context,
    lastTopic: intent,
    messageCount: (context.messageCount || 0) + 1,
    timestamp: Date.now()
  };

  // Detect user's name if they say "my name is..."
  const nameMatch = userInput.match(/(?:my name is|i am|call me|im)\s+([a-zA-Z]{2,15})/i);
  if (nameMatch && nameMatch[1]) {
    newContext.userName = nameMatch[1];
  }

  return {
    text: fullText,
    category: intent,
    context: newContext
  };
}
