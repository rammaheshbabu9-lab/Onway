import { LanguageConfig, NewsItem } from '../types';

export const LANGUAGE_CONFIGS: LanguageConfig[] = [
  {
    code: 'te',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    brandName: 'ఆన్ వే న్యూస్ (OnWay Telugu)',
    tagline: 'తెలంగాణ & ఆంధ్రప్రదేశ్ వేగవంతమైన స్థానిక వార్తలు',
    primaryRegion: 'Telangana & Andhra Pradesh',
    activeUsers: '14.2M MAU',
    flagIcon: '🇮🇳 AP/TS'
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिंदी',
    brandName: 'ऑनवे न्यूज़ (OnWay Hindi)',
    tagline: 'देश और आपके जिले की सबसे तेज़ और सटीक खबरें',
    primaryRegion: 'North & Central India',
    activeUsers: '28.6M MAU',
    flagIcon: '🇮🇳 IN'
  },
  {
    code: 'ta',
    label: 'Tamil',
    nativeLabel: 'தமிழ்',
    brandName: 'ஆன்வே நியூஸ் (OnWay Tamil)',
    tagline: 'உங்கள் வட்டாரத்தின் உடனுக்குடன் நிகழ்வுகள்',
    primaryRegion: 'Tamil Nadu & Puducherry',
    activeUsers: '9.8M MAU',
    flagIcon: '🇮🇳 TN'
  },
  {
    code: 'kn',
    label: 'Kannada',
    nativeLabel: 'ಕನ್ನಡ',
    brandName: 'ಆನ್‌ವೇ ನ್ಯೂಸ್ (OnWay Kannada)',
    tagline: 'ನಿಮ್ಮ ಊರಿನ ಸಮಗ್ರ ಕ್ಷಣ ಕ್ಷಣದ ವರದಿಗಳು',
    primaryRegion: 'Karnataka',
    activeUsers: '8.4M MAU',
    flagIcon: '🇮🇳 KA'
  },
  {
    code: 'ml',
    label: 'Malayalam',
    nativeLabel: 'മലയാളം',
    brandName: 'ഓൺവേ ന്യൂസ് (OnWay Malayalam)',
    tagline: 'നാട്ടുവാർത്തകളും സമകാലിക സംഭവങ്ങളും വിരൽത്തുമ്പിൽ',
    primaryRegion: 'Kerala',
    activeUsers: '6.1M MAU',
    flagIcon: '🇮🇳 KL'
  },
  {
    code: 'mr',
    label: 'Marathi',
    nativeLabel: 'मराठी',
    brandName: 'ऑनवे न्यूज (OnWay Marathi)',
    tagline: 'महाराष्ट्रातील खेड्यापाड्यातील घडामोडी तत्काळ',
    primaryRegion: 'Maharashtra',
    activeUsers: '11.5M MAU',
    flagIcon: '🇮🇳 MH'
  },
  {
    code: 'gu',
    label: 'Gujarati',
    nativeLabel: 'ગુજરાતી',
    brandName: 'ઓનવે ન્યૂઝ (OnWay Gujarati)',
    tagline: 'ગુજરાતના ખૂણે ખૂણેથી ઝળહળતા સમાચાર',
    primaryRegion: 'Gujarat',
    activeUsers: '7.2M MAU',
    flagIcon: '🇮🇳 GJ'
  },
  {
    code: 'bn',
    label: 'Bengali',
    nativeLabel: 'বাংলা',
    brandName: 'অনওয়ে নিউজ (OnWay Bengali)',
    tagline: 'বাংলার প্রতিটি জেলা ও মহকুমার তাজা খবর',
    primaryRegion: 'West Bengal & Tripura',
    activeUsers: '8.9M MAU',
    flagIcon: '🇮🇳 WB'
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    brandName: 'OnWay News National',
    tagline: 'Hyperlocal India in 60 words: Fast, Verified & Local',
    primaryRegion: 'Pan-India',
    activeUsers: '12.1M MAU',
    flagIcon: '🇮🇳 ALL'
  }
];

export const MOCK_NEWS_DATA: NewsItem[] = [
  // TELUGU - Hyperlocal & State
  {
    id: 'nw-te-1',
    language: 'te',
    category: 'hyperlocal',
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Hanamkonda',
    village: 'Subedari',
    title: 'వరంగల్: కాకతీయ కాలువ ఆధునికీకరణకు రూ. 450 కోట్లు మంజూరు!',
    summary: 'వరంగల్, హనుమకొండ జిల్లాల్లోని సుమారు 85 వేల ఎకరాలకు సాగునీరు అందించే కాకతీయ మెయిన్ కెనాల్ మరమ్మతులు, లైనింగ్ పనులకు రాష్ట్ర ప్రభుత్వం నిధులు విడుదల చేసింది. వచ్చే నెలలోనే టెండర్ ప్రక్రియ ప్రారంభం కానుంది.',
    fullBody: 'వరంగల్ అర్బన్ పరిధిలోని కాకతీయ కెనాల్ ఆధునికీకరణ ప్రాజెక్టుకు రూ.450 కోట్ల పరిపాలనా అనుమతులు మంజూరయ్యాయి. ఈ పనుల వల్ల కాలువ చివరి ఆయకట్టు రైతులకు సాగునీటి కొరత తీరనుంది. రైతుల సంక్షేమానికి మొదటి ప్రాధాన్యత ఇస్తున్నామని స్థానిక ప్రజాప్రతినిధులు పేర్కొన్నారు.',
    timestamp: '12 నిమిషాల క్రితం',
    readCount: 38400,
    likesCount: 2940,
    sharesCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'రమేష్ బాబు వర్మ',
      role: 'డిస్ట్రిక్ట్ ఇన్వెస్టిగేటివ్ రిపోర్టర్',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Warangal Bureau',
    tags: ['వరంగల్', 'సాగునీరు', 'కాకతీయ కాల్వ', 'రైతు వార్తలు'],
    isBreaking: true,
    isTrending: true
  },
  {
    id: 'nw-te-2',
    language: 'te',
    category: 'hyperlocal',
    state: 'Telangana',
    district: 'Hyderabad',
    mandal: 'Madhapur',
    title: 'హైదరాబాద్ మెట్రో ఫేజ్-2: శంషాబాద్ ఎయిర్‌పోర్ట్ లైన్ సర్వే వేగవంతం',
    summary: 'రాయదుర్గం నుండి శంషాబాద్ విమానాశ్రయం వరకు 32 కిలోమీటర్ల మేర నిర్మించనున్న కొత్త మెట్రో మార్గం సాయిల్ టెస్టింగ్ దాదాపు పూర్తయింది. ఈ ఏడాది చివరికల్లా సివిల్ పనులు ప్రారంభించేలా హెచ్ఎంఆర్ఎల్ ప్రణాళిక సిద్ధం చేసింది.',
    timestamp: '28 నిమిషాల క్రితం',
    readCount: 52100,
    likesCount: 4890,
    sharesCount: 2310,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'శ్రీవిద్య ఆర్.',
      role: 'సిటీ ట్రాన్స్‌పోర్ట్ కరస్పాండెంట్',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Hyderabad Desk',
    tags: ['హైదరాబాద్ మెట్రో', 'శంషాబాద్', 'ఐటీ కారిడార్'],
    isTrending: true
  },
  {
    id: 'nw-te-3',
    language: 'te',
    category: 'hyperlocal',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    mandal: 'Bheemunipatnam',
    title: 'వైజాగ్ బీచ్ రోడ్డులో అంతర్జాతీయ క్రూయిజ్ టెర్మినల్ ప్రారంభం!',
    summary: 'విశాఖపట్నం పోర్ట్ ఆధ్వర్యంలో నిర్మించిన అత్యాధునిక ఇంటర్నేషనల్ క్రూయిజ్ టెర్మినల్ కార్యకలాపాలు లాంఛనంగా ప్రారంభమయ్యాయి. వారానికి రెండు భారీ టూరిజం నౌకలు విశాఖ తీరానికి రానున్నట్లు అధికారులు తెలిపారు.',
    timestamp: '45 నిమిషాల క్రితం',
    readCount: 41200,
    likesCount: 3600,
    sharesCount: 1890,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'ప్రసాద్ రావు',
      role: 'కోస్టల్ బ్యూరో హెడ్',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Coastal Andhra Desk',
    tags: ['వైజాగ్', 'క్రూయిజ్ టెర్మినల్', 'పర్యాటకం'],
    isTrending: false
  },
  {
    id: 'nw-te-4',
    language: 'te',
    category: 'status_memes',
    state: 'Telangana',
    district: 'Hyderabad',
    title: 'వైరల్ వాట్సాప్ స్టేటస్ & మీమ్: వర్షం పడగానే హైదరాబాద్ బిర్యానీ లవర్స్ మూడ్!',
    summary: 'నగరంలో ఒక్కసారిగా చల్లబడిన వాతావరణం.. సోషల్ మీడియాలో బిర్యానీ, చాయ్ మీమ్స్ వెల్లువెత్తాయి. నేటి టాప్ ట్రెండింగ్ వాట్సాప్ వీడియో స్టేటస్ ఉచితంగా డౌన్‌లోడ్ చేసుకోండి!',
    timestamp: '1 గంట క్రితం',
    readCount: 68900,
    likesCount: 9430,
    sharesCount: 6810,
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'meme',
    author: {
      name: 'ట్రెండింగ్ బజ్ టీమ్',
      role: 'సోషల్ బజ్ క్యూరేటర్',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Buzz Desk',
    tags: ['వాట్సాప్ స్టేటస్', 'మీమ్స్', 'హైదరాబాద్ బిర్యానీ'],
    whatsappDownloadUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80'
  },

  // HINDI - Hyperlocal & National
  {
    id: 'nw-hi-1',
    language: 'hi',
    category: 'hyperlocal',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    mandal: 'Varanasi Sadar',
    title: 'वाराणसी: गंगा घाटों पर विश्वस्तरीय लाइट एंड साउंड शो का नया चरण शुरू',
    summary: 'दशाश्वमेध और अस्सी घाट के मध्य अब 84 घाटों की ऐतिहासिक गाथा लेजर प्रोजेक्शन और भक्ति संगीत के साथ प्रदर्शित की जाएगी। पर्यटन विभाग ने पर्यटकों के लिए विशेष बोट परिक्रमा का समय तय किया है।',
    timestamp: '18 मिनट पहले',
    readCount: 44300,
    likesCount: 3910,
    sharesCount: 1980,
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'आलोक कुमार त्रिपाठी',
      role: 'वरिष्ठ जिला संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Varanasi Bureau',
    tags: ['वाराणसी', 'काशी', 'गंगा घाट', 'पर्यटन'],
    isBreaking: true,
    isTrending: true
  },
  {
    id: 'nw-hi-2',
    language: 'hi',
    category: 'national',
    state: 'Delhi',
    district: 'New Delhi',
    title: 'चंद्रमा मिशन के बाद इसरो का नया सूर्य और मौसम सैटेलाइट प्रक्षेपण सफल!',
    summary: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने श्रीहरिकोटा से उन्नत मौसम पूर्वानुमान उपग्रह को उसकी सटीक कक्षा में स्थापित किया। इससे मानसून और तूफानों की 48 घंटे पहले सटीक जानकारी मिल सकेगी।',
    timestamp: '40 मिनट पहले',
    readCount: 89200,
    likesCount: 11400,
    sharesCount: 5240,
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-5b3b4b45f912?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'प्रीति सिंह',
      role: 'साइंस एंड टेक एडिटर',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Space Desk',
    tags: ['इसरो', 'स्पेस', 'भारत', 'मौसम उपग्रह'],
    isBreaking: true
  },
  {
    id: 'nw-hi-3',
    language: 'hi',
    category: 'entertainment',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    mandal: 'Bandra',
    title: 'बॉलीवुड बॉक्स ऑफिस: नई एक्शन थ्रिलर ने पहले दिन कमाए ₹65 करोड़',
    summary: 'सिनेमाघरों में दर्शकों का जबरदस्त उत्साह। पहले दिन ही 90% से अधिक शो हाउसफुल रहे। टिकट खिड़की पर एडवांस बुकिंग के सारे रिकॉर्ड ध्वस्त होने की उम्मीद है।',
    timestamp: '1 घंटा पहले',
    readCount: 62400,
    likesCount: 5120,
    sharesCount: 2890,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'रोहित वर्मा',
      role: 'सिनेमा समीक्षक',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Bollywood Beat',
    tags: ['बॉलीवुड', 'बॉक्स ऑफिस', 'फिल्म'],
    isTrending: true
  },

  // TAMIL - Hyperlocal & Culture
  {
    id: 'nw-ta-1',
    language: 'ta',
    category: 'hyperlocal',
    state: 'Tamil Nadu',
    district: 'Madurai',
    mandal: 'Madurai North',
    title: 'மதுரை: மீனாட்சி அம்மன் கோவில் சித்திரை திருவிழா முன்னேற்பாடுகள் தீவிரம்!',
    summary: 'புகழ்பெற்ற மதுரை சித்திரை திருவிழாவுக்கான பந்தல்கால் நடும் வைபவம் விமரிசையாக நடைபெற்றது. லட்சக்கணக்கான பக்தர்கள் வருகை தர உள்ளதால் குடிநீர், போக்குவரத்து மற்றும் பாதுகாப்பு ஏற்பாடுகள் தயார் நிலையில் உள்ளன.',
    timestamp: '15 நிமிடங்களுக்கு முன்',
    readCount: 36700,
    likesCount: 3410,
    sharesCount: 1670,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'செல்வ கணபதி',
      role: 'தென்மண்டல செய்தியாளர்',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Madurai Bureau',
    tags: ['மதுரை', 'மீனாட்சி அம்மன்', 'சித்திரை திருவிழா'],
    isBreaking: false,
    isTrending: true
  },
  {
    id: 'nw-ta-2',
    language: 'ta',
    category: 'hyperlocal',
    state: 'Tamil Nadu',
    district: 'Chennai',
    mandal: 'Guindy',
    title: 'சென்னை கிண்டியில் நவீன ஃபின்டெக் சிட்டி வளாகம்: 30,000 பேருக்கு புதிய வேலைவாய்ப்பு',
    summary: 'சென்னையை சர்வதேச நிதிநுட்ப நகரமாக மாற்றும் நோக்கில் அமையவுள்ள ஃபின்டெக் சிட்டி கட்டிட பணிகள் 80% நிறைவடைந்தன. இதில் சர்வதேச வங்கிகள் மற்றும் மென்பொருள் நிறுவனங்கள் அலுவலகங்களை அமைக்கின்றன.',
    timestamp: '35 நிமிடங்களுக்கு முன்',
    readCount: 49800,
    likesCount: 4210,
    sharesCount: 2780,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'கார்த்திக் நாராயணன்',
      role: 'வணிகப் பிரிவு ஆசிரியர்',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Chennai Desk',
    tags: ['சென்னை', 'வேலைவாய்ப்பு', 'கிண்டி', 'தொழில்நுட்பம்'],
    isTrending: true
  },

  // KANNADA - Hyperlocal
  {
    id: 'nw-kn-1',
    language: 'kn',
    category: 'hyperlocal',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    mandal: 'Yelahanka',
    title: 'ಬೆಂಗಳೂರು: ಏರ್ ಶೋ ಮಾದರಿಯಲ್ಲಿ ನೂತನ ಏರೋಸ್ಪೇಸ್ ಪಾರ್ಕ್ ನಿರ್ಮಾಣಕ್ಕೆ ಚಾಲನೆ!',
    summary: 'ದೇವನಹಳ್ಳಿ ಸಮೀಪ 500 ಎಕರೆ ಪ್ರದೇಶದಲ್ಲಿ ಭಾರತದ ಅತಿ ದೊಡ್ಡ ಡ್ರೋನ್ ಮತ್ತು ಏರೋಸ್ಪೇಸ್ ಉತ್ಪಾದನಾ ಪಾರ್ಕ್‌ಗೆ ಶಂಕುಸ್ಥಾಪನೆ ನೆರವೇರಿಸಲಾಯಿತು. ಇದರಿಂದ ರಾಜ್ಯದ ಯುವ ಇಂಜಿನಿಯರ್‌ಗಳಿಗೆ ಬೃಹತ್ ಉದ್ಯೋಗಾವಕಾಶ ಲಭಿಸಲಿದೆ.',
    timestamp: '22 ನಿಮಿಷಗಳ ಹಿಂದೆ',
    readCount: 31200,
    likesCount: 2840,
    sharesCount: 1390,
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'ಮಂಜುನಾಥ್ ಕೆ.',
      role: 'ಸಿಟಿ ವರದಿಗಾರ',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Bengaluru Bureau',
    tags: ['ಬೆಂಗಳೂರು', 'ಉದ್ಯೋಗ', 'ಏರೋಸ್ಪೇಸ್'],
    isTrending: true
  },

  // MALAYALAM - Hyperlocal & Coastal
  {
    id: 'nw-ml-1',
    language: 'ml',
    category: 'hyperlocal',
    state: 'Kerala',
    district: 'Ernakulam (Kochi)',
    mandal: 'Kochi',
    title: 'കൊച്ചി വാട്ടർ മെട്രോ: പുതിയ റൂട്ടുകളിൽ സർവീസ് ആരംഭിച്ച് ജനപ്രിയ മുന്നേറ്റം',
    summary: 'വൈപ്പിൻ, മട്ടാഞ്ചേരി തീരങ്ങളെ ബന്ധിപ്പിക്കുന്ന ഹൈబ്രിഡ് ഇലക്ട്രിക് ബോട്ടുകൾ യാത്രക്കാരുടെ വലിയ പ്രശംസ നേടുന്നു. പരിസ്ഥിതി സൗഹൃദ ഗതാഗത സംവിധാനത്തിൽ കൊച്ചി രാജ്യത്തിന് മാതൃകയായി മാറിയിരിക്കുകയാണ്.',
    timestamp: '30 മിനിറ്റ് മുമ്പ്',
    readCount: 28900,
    likesCount: 3110,
    sharesCount: 1540,
    imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'അനൂപ് മേനോൻ',
      role: 'കൊച്ചി ബ്യൂറോ ചീഫ്',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Kochi Bureau',
    tags: ['കൊച്ചി', 'വാട്ടർ മെട്രോ', 'കേരളം'],
    isTrending: true
  },

  // MARATHI - Hyperlocal
  {
    id: 'nw-mr-1',
    language: 'mr',
    category: 'hyperlocal',
    state: 'Maharashtra',
    district: 'Pune',
    mandal: 'Haveli',
    title: 'पुणे: रिंग रोड प्रकल्पासाठी भूसंपादन वेगाने पूर्ण, वाहतूक कोंडीतून मुक्ती मिळणार',
    summary: 'पुणे शहर व पिंपरी चिंचवड परिसरातील जड वाहतूक बाहेरून वळवण्यासाठी आखण्यात आलेल्या रिंग रोडच्या पश्चिम टप्प्याला गती मिळाली आहे. पुढील दोन वर्षांत हा महामार्ग खुला करण्याचे उद्दिष्ट आहे.',
    timestamp: '25 मिनिटांपूर्वी',
    readCount: 34500,
    likesCount: 2790,
    sharesCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'संजय गायकवाड',
      role: 'विभागीय प्रतिनिधी',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Pune Bureau',
    tags: ['पुणे', 'रिंग रोड', 'विकास कामे'],
    isTrending: true
  },

  // GUJARATI - Hyperlocal
  {
    id: 'nw-gu-1',
    language: 'gu',
    category: 'hyperlocal',
    state: 'Gujarat',
    district: 'Surat',
    mandal: 'Surat City',
    title: 'સુરત: ડાયમંડ બુર્સમાં વૈશ્વિક વેપારની નવી ઉડાન, 50 નવી આંતરરાષ્ટ્રીય કંપનીઓ જોડાઈ',
    summary: 'વિશ્વના સૌથી મોટા ઓફિસ સંકુલ સુરત ડાયમંડ બુર્સમાં વિદેશી રત્ન કલાકારો અને જ્વેલરી બ્રાન્ડ્સના કેન્દ્રો શરૂ થયા છે. જેનાથી હજારો કારીગરોને આધુનિક રોજગારીની તકો મળશે.',
    timestamp: '35 મિનિટ પહેલા',
    readCount: 27600,
    likesCount: 2450,
    sharesCount: 1210,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'હરેશ પટેલ',
      role: 'વેપાર સંપાદક',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Surat Bureau',
    tags: ['સુરત', 'ડાયમંડ બુર્સ', 'રોજગાર'],
    isTrending: true
  },

  // BENGALI - Hyperlocal
  {
    id: 'nw-bn-1',
    language: 'bn',
    category: 'hyperlocal',
    state: 'West Bengal',
    district: 'Kolkata',
    mandal: 'Salt Lake',
    title: 'কলকাতা: গঙ্গার তলদেশ দিয়ে আন্ডারওয়াটার মেট্রো সফলভাবে চালু, উচ্ছ্বসিত যাত্রীরা!',
    summary: 'হাওড়া থেকে এসপ্ল্যানেড পর্যন্ত নদীর তলদেশ দিয়ে চলা দেশের প্রথম আন্ডারওয়াটার মেট্রোয় ঐতিহাসিক ভিড়। মাত্র ৪ মিনিটে নদী পারাপার সম্পন্ন হওয়ায় শহরের ট্রাফিক সমস্যা অনেকটাই লাঘব হয়েছে।',
    timestamp: '20 মিনিট আগে',
    readCount: 42100,
    likesCount: 3870,
    sharesCount: 2190,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'সৌরভ বন্দ্যোপাধ্যায়',
      role: 'বিশেষ সংবাদদাতা',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Kolkata Bureau',
    tags: ['কলকাতা', 'আন্ডারওয়াটার মেট্রো', 'হাওড়া'],
    isBreaking: true,
    isTrending: true
  },

  // ENGLISH / PAN-INDIA - Tech & National
  {
    id: 'nw-en-1',
    language: 'en',
    category: 'national',
    state: 'All India',
    district: 'National Wire',
    title: 'India UPI Crosses 18 Billion Monthly Transactions Milestone',
    summary: 'Unified Payments Interface sets a historic global record, processing peer-to-peer and merchant volumes worth over ₹24 Lakh Crore in a single month, reinforcing India\'s digital public infrastructure lead.',
    timestamp: '10 mins ago',
    readCount: 92400,
    likesCount: 8490,
    sharesCount: 4320,
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'Aditya Sen',
      role: 'Fintech & Policy Bureau',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Tech Desk',
    tags: ['Digital India', 'Fintech', 'UPI', 'Economy'],
    isBreaking: true,
    isTrending: true
  },
  {
    id: 'nw-en-2',
    language: 'en',
    category: 'sports',
    state: 'All India',
    district: 'Sports Arena',
    title: 'ICC T20 Championship: Thrilling Last-Over Finish Stuns Fans',
    summary: 'India seals an exhilarating victory in the death overs with back-to-back yorkers. The stadium erupted as the pace unit defended 11 runs in the final over under extreme pressure.',
    timestamp: '55 mins ago',
    readCount: 78500,
    likesCount: 9140,
    sharesCount: 4890,
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'Vikram Malhotra',
      role: 'Chief Sports Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Sports Arena',
    tags: ['Cricket', 'T20', 'Match Thriller', 'Team India'],
    isTrending: true
  },
  {
    id: 'nw-en-3',
    language: 'en',
    category: 'hyperlocal',
    state: 'Telangana',
    district: 'Hyderabad',
    mandal: 'Gachibowli',
    title: 'Hyderabad: Global Tech Hub Inaugurates 40,000-Seat AI Campus',
    summary: 'The massive technology and innovation campus was unveiled today in the Financial District. Over 25 multinational AI development teams are set to commence operations this quarter.',
    timestamp: '18 mins ago',
    readCount: 45200,
    likesCount: 5120,
    sharesCount: 2310,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'Sneha Rao',
      role: 'Tech & Economy Editor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Hyderabad English Desk',
    tags: ['Hyderabad', 'AI Campus', 'Tech News', 'Jobs'],
    isTrending: true
  },
  {
    id: 'nw-en-4',
    language: 'en',
    category: 'entertainment',
    state: 'Maharashtra',
    district: 'Mumbai',
    mandal: 'Bandra',
    title: 'Indian Cinema Sets New Global Box Office Record of $1.5 Billion in 2026',
    summary: 'Pan-Indian cinematic spectacles spanning South and Hindi film industries have catapulted the entertainment ecosystem into international acclaim, topping charts across North America and Europe.',
    timestamp: '42 mins ago',
    readCount: 68900,
    likesCount: 7820,
    sharesCount: 3940,
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'Priya Sharma',
      role: 'Cinema Bureau Chief',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    source: 'OnWay Cinema English',
    tags: ['Cinema', 'Box Office', 'Entertainment', 'Indian Films'],
    isTrending: true
  },

  // USER PUBLISHED NEWS ITEMS (Author: Ram Mahesh Babu - eligible for Delete)
  {
    id: 'nw-user-1',
    language: 'te',
    category: 'hyperlocal',
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Hanamkonda',
    village: 'Nakkalagutta',
    title: 'హనుమకొండ: నక్కలగుట్ట ప్రధాన కూడలిలో కొత్త ట్రాఫిక్ సిగ్నల్స్ & రోడ్డు వెడల్పు పనులు ప్రారంభం',
    summary: 'నక్కలగుట్ట జంక్షన్‌లో నిత్యం ఎదురవుతున్న ట్రాఫిక్ రద్దీని నియంత్రించేందుకు మున్సిపల్ అధికారులు ఆధునిక ఏఐ సిగ్నలింగ్ వ్యవస్థను ఏర్పాటు చేస్తున్నారు. వాహనదారుల సౌకర్యార్థం పనులను వారం రోజుల్లో పూర్తి చేయనున్నారు.',
    fullBody: 'గ్రేటర్ వరంగల్ మున్సిపల్ కార్పొరేషన్ పరిధిలో ప్రధాన రద్దీ కేంద్రమైన నక్కలగుట్టలో విస్తరణ పనులు వేగవంతం చేశారు. స్థానిక ప్రజలు ఈ నిర్ణయాన్ని స్వాగతించారు.',
    timestamp: '25 నిమిషాల క్రితం',
    readCount: 14200,
    likesCount: 1840,
    sharesCount: 890,
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'Ram Mahesh Babu',
      role: 'ధ్రువీకరించిన రిపోర్టర్ (Verified Reporter)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      verified: true
    },
    source: 'సిటిజన్ రిపోర్టర్ (Ram Mahesh Babu)',
    tags: ['హనుమకొండ', 'ట్రాఫిక్', 'వరంగల్', 'స్థానిక అభివృద్ధి'],
    isTrending: true,
    isUserUploaded: true
  },
  {
    id: 'nw-user-2',
    language: 'te',
    category: 'hyperlocal',
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Kazipet',
    village: 'Diesel Colony',
    title: 'కాజీపేట: రైల్వే కోచ్ ఫ్యాక్టరీలో నూతన యూనిట్ నిర్మాణానికి పరిశీలన',
    summary: 'కాజీపేట రైల్వే మాన్యుఫ్యాక్చరింగ్ యూనిట్ పనులను ఉన్నతాధికారులు నేడు క్షేత్రస్థాయిలో పరిశీలించారు. స్థానిక నిరుద్యోగ యువతకు సాంకేతిక నైపుణ్య శిక్షణ అందించి ఉద్యోగాలు కల్పించనున్నట్లు వెల్లడించారు.',
    timestamp: '1 గంట క్రితం',
    readCount: 18900,
    likesCount: 2410,
    sharesCount: 1120,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    author: {
      name: 'Ram Mahesh Babu',
      role: 'ధ్రువీకరించిన రిపోర్టర్ (Verified Reporter)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      verified: true
    },
    source: 'సిటిజన్ రిపోర్టర్ (Ram Mahesh Babu)',
    tags: ['కాజీపేట', 'రైల్వే ఫ్యాక్టరీ', 'ఉద్యోగాలు', 'వరంగల్'],
    isBreaking: true,
    isUserUploaded: true
  }
];
