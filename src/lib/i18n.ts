export const translations = {
  en: {
    title: "Lakshmikanth | Portfolio",
    heading: "My Projects",
    subtitle: "A collection of websites and applications I've built",
    switchLang: "ಕನ್ನಡ",
    switchLangHref: "/ka",
    footer: "",
    heroGreeting: "Hi, I'm",
    heroName: "Lakshmikanth",
    heroTagline: "crafting the web, one site at a time.",
    heroSubTagline:
      "From college portals to digital invitations — I build fast, responsive, and meaningful web experiences that leave a lasting impression.",
    heroLocation: "Web developer from Karnataka, India",
    heroAbout:
      "I'm Lakshmikanth — a passionate web developer from Karnataka. From college portals to digital invitations, I build responsive and memorable web experiences that serve real people with real needs.",
    heroRole: "Web Developer & Invitation Designer",
    heroDesc: "I build modern, responsive websites and web applications.",
    viewProjects: "View Projects",
    contactBtn: "Contact Me",
    contactLabel: "Contact",
  },
  ka: {
    title: "ಲಕ್ಷ್ಮೀಕಾಂತ | ಪೋರ್ಟ್‌ಫೋಲಿಯೊ",
    heading: "ನನ್ನ ಯೋಜನೆಗಳು",
    subtitle: "ನಾನು ನಿರ್ಮಿಸಿದ ವೆಬ್‌ಸೈಟ್‌ಗಳು ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್‌ಗಳ ಸಂಗ್ರಹ",
    switchLang: "English",
    switchLangHref: "/en",
    footer: "",
    heroGreeting: "ನಮಸ್ಕಾರ, ನಾನು",
    heroName: "ಲಕ್ಷ್ಮೀಕಾಂತ",
    heroTagline: "ಒಂದೊಂದೇ ಸೈಟ್, ವೆಬ್ ಕಟ್ಟುತ್ತೇನೆ.",
    heroSubTagline:
      "ಕಾಲೇಜ್ ಪೋರ್ಟಲ್‌ಗಳಿಂದ ಡಿಜಿಟಲ್ ಆಮಂತ್ರಣಗಳವರೆಗೆ — ನಾನು ನೆನಪಿನಲ್ಲಿ ಉಳಿಯುವ ಅನುಭವಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇನೆ.",
    heroLocation: "ಕರ್ನಾಟಕ, ಭಾರತದ ವೆಬ್ ಡೆವಲಪರ್",
    heroAbout:
      "ನಾನು ಲಕ್ಷ್ಮೀಕಾಂತ — ಕರ್ನಾಟಕದ ಉತ್ಸಾಹಿ ವೆಬ್ ಡೆವಲಪರ್. ಕಾಲೇಜ್ ಪೋರ್ಟಲ್‌ಗಳಿಂದ ಡಿಜಿಟಲ್ ಆಮಂತ್ರಣಗಳವರೆಗೆ, ನಾನು ನಿಜ ಜನರ ಅಗತ್ಯಗಳಿಗಾಗಿ ಪ್ರತಿಕ್ರಿಯಾಶೀಲ ಅನುಭವಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇನೆ.",
    heroRole: "ವೆಬ್ ಡೆವಲಪರ್ & ಆಮಂತ್ರಣ ವಿನ್ಯಾಸಕ",
    heroDesc: "ನಾನು ಆಧುನಿಕ, ಪ್ರತಿಕ್ರಿಯಾಶೀಲ ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇನೆ.",
    viewProjects: "ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    contactBtn: "ಸಂಪರ್ಕಿಸಿ",
    contactLabel: "ಸಂಪರ್ಕ",
  },
} as const;

export type Locale = keyof typeof translations;
