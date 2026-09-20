export interface IndianState {
  code: string;
  name: string;
  nameTe: string;
  districts: string[];
}

export const ALL_INDIAN_STATES: IndianState[] = [
  {
    code: 'TS',
    name: 'Telangana',
    nameTe: 'తెలంగాణ',
    districts: [
      'Warangal', 'Hanamkonda', 'Hyderabad', 'Karimnagar', 'Khammam', 
      'Nalgonda', 'Nizamabad', 'Mahabubnagar', 'Medak', 'Rangareddy', 
      'Siddipet', 'Bhadradri Kothagudem', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 
      'Jogulamba Gadwal', 'Kamareddy', 'Komaram Bheem Asifabad', 'Mahabubabad', 
      'Mancherial', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Narayanpet', 
      'Peddapalli', 'Rajanna Sircilla', 'Sangareddy', 'Suryapet', 'Vikarabad', 
      'Wanaparthy', 'Yadadri Bhuvanagiri'
    ]
  },
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    nameTe: 'ఆంధ్రప్రదేశ్',
    districts: [
      'Visakhapatnam', 'Vijayawada (NTR)', 'Guntur', 'Tirupati', 'Kurnool', 
      'Nellore (SPSR)', 'Anantapur', 'Kadapa (YSR)', 'Kakinada', 'Rajamahendravaram (East Godavari)', 
      'Eluru', 'West Godavari', 'Krishna', 'Bapatla', 'Palnadu', 'Prakasam', 
      'Nandyal', 'Sri Sathya Sai', 'Chittoor', 'Annamayya', 'Srikakulam', 
      'Vizianagaram', 'Parvathipuram Manyam', 'Alluri Sitharama Raju', 'Anakapalli', 'Dr. B.R. Ambedkar Konaseema'
    ]
  },
  {
    code: 'KA',
    name: 'Karnataka',
    nameTe: 'కర్ణాటక',
    districts: [
      'Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Belagavi', 'Ballari', 
      'Mangaluru (Dakshina Kannada)', 'Hubballi-Dharwad', 'Kalaburagi', 'Shivamogga', 
      'Tumakuru', 'Udupi', 'Vijayapura', 'Raichur', 'Bidar', 'Kolar'
    ]
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    nameTe: 'తమిళనాడు',
    districts: [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 
      'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Kanchipuram', 
      'Kanyakumari', 'Dindigul', 'Cuddalore', 'Tiruppur'
    ]
  },
  {
    code: 'KL',
    name: 'Kerala',
    nameTe: 'కేరళ',
    districts: [
      'Thiruvananthapuram', 'Kochi (Ernakulam)', 'Kozhikode', 'Thrissur', 
      'Kollam', 'Kannur', 'Alappuzha', 'Kottayam', 'Palakkad', 'Malappuram', 
      'Wayanad', 'Idukki', 'Kasaragod', 'Pathanamthitta'
    ]
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    nameTe: 'మహారాష్ట్ర',
    districts: [
      'Mumbai', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik', 
      'Aurangabad (Chhatrapati Sambhajinagar)', 'Solapur', 'Amravati', 'Kolhapur', 
      'Navi Mumbai', 'Nanded', 'Satara', 'Jalgaon'
    ]
  },
  {
    code: 'DL',
    name: 'Delhi (NCT)',
    nameTe: 'ఢిల్లీ',
    districts: [
      'New Delhi', 'Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 
      'West Delhi', 'North East Delhi', 'South West Delhi', 'North West Delhi', 
      'Shahdara', 'South East Delhi'
    ]
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    nameTe: 'గుజరాత్',
    districts: [
      'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 
      'Jamnagar', 'Gandhinagar', 'Junagadh', 'Kutch', 'Anand'
    ]
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    nameTe: 'రాజస్థాన్',
    districts: [
      'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 
      'Alwar', 'Bhilwara', 'Sikar', 'Bharatpur'
    ]
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    nameTe: 'ఉత్తరప్రదేశ్',
    districts: [
      'Lucknow', 'Kanpur', 'Varanasi', 'Noida (Gautam Buddha Nagar)', 'Agra', 
      'Prayagraj', 'Ghaziabad', 'Meerut', 'Gorakhpur', 'Bareilly', 'Aligarh', 'Mathura'
    ]
  },
  {
    code: 'BR',
    name: 'Bihar',
    nameTe: 'బీహార్',
    districts: [
      'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 
      'Purnia', 'Begusarai', 'Arrah', 'Samastipur'
    ]
  },
  {
    code: 'WB',
    name: 'West Bengal',
    nameTe: 'పశ్చిమ బెంగాల్',
    districts: [
      'Kolkata', 'Howrah', 'North 24 Parganas', 'South 24 Parganas', 'Hooghly', 
      'Darjeeling', 'Siliguri', 'Murshidabad', 'Nadia', 'Purba Medinipur'
    ]
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    nameTe: 'మధ్యప్రదేశ్',
    districts: [
      'Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 
      'Sagar', 'Rewa', 'Satna', 'Ratlam'
    ]
  },
  {
    code: 'PB',
    name: 'Punjab',
    nameTe: 'పంజాబ్',
    districts: [
      'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 
      'Mohali (SAS Nagar)', 'Hoshiarpur', 'Pathankot'
    ]
  },
  {
    code: 'HR',
    name: 'Haryana',
    nameTe: 'హర్యానా',
    districts: [
      'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 
      'Hisar', 'Rohtak', 'Panchkula', 'Sonipat'
    ]
  },
  {
    code: 'OR',
    name: 'Odisha',
    nameTe: 'ఒడిశా',
    districts: [
      'Bhubaneswar (Khurda)', 'Cuttack', 'Rourkela (Sundargarh)', 'Puri', 
      'Sambalpur', 'Balasore', 'Berhampur (Ganjam)'
    ]
  },
  {
    code: 'AS',
    name: 'Assam',
    nameTe: 'అస్సాం',
    districts: [
      'Guwahati (Kamrup Metro)', 'Dibrugarh', 'Silchar (Cachar)', 'Jorhat', 
      'Nagaon', 'Tezpur (Sonitpur)'
    ]
  },
  {
    code: 'GA',
    name: 'Goa',
    nameTe: 'గోవా',
    districts: ['North Goa', 'South Goa', 'Panaji', 'Margao']
  },
  {
    code: 'JK',
    name: 'Jammu & Kashmir',
    nameTe: 'జమ్మూ & కాశ్మీర్',
    districts: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Kathua']
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    nameTe: 'హిమాచల్ ప్రదేశ్',
    districts: ['Shimla', 'Dharamshala (Kangra)', 'Mandi', 'Solan', 'Kullu', 'Manali']
  },
  {
    code: 'UT',
    name: 'Uttarakhand',
    nameTe: 'ఉత్తరాఖండ్',
    districts: ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh', 'Haldwani', 'Roorkee']
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    nameTe: 'జార్ఖండ్',
    districts: ['Ranchi', 'Jamshedpur (East Singhbhum)', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh']
  },
  {
    code: 'CT',
    name: 'Chhattisgarh',
    nameTe: 'ఛత్తీస్‌గఢ్',
    districts: ['Raipur', 'Bhilai (Durg)', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Jagdalpur']
  },
  {
    code: 'TR',
    name: 'Tripura',
    nameTe: 'త్రిపుర',
    districts: ['Agartala (West Tripura)', 'North Tripura', 'South Tripura', 'Dhalai']
  },
  {
    code: 'ML',
    name: 'Meghalaya',
    nameTe: 'మేఘాలయ',
    districts: ['Shillong (East Khasi Hills)', 'West Garo Hills', 'Jaintia Hills', 'Ri-Bhoi']
  },
  {
    code: 'MN',
    name: 'Manipur',
    nameTe: 'మణిపూర్',
    districts: ['Imphal East', 'Imphal West', 'Churachandpur', 'Thoubal', 'Bishnupur']
  },
  {
    code: 'NL',
    name: 'Nagaland',
    nameTe: 'నాగాలాండ్',
    districts: ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Mon']
  },
  {
    code: 'MZ',
    name: 'Mizoram',
    nameTe: 'మిజోరం',
    districts: ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib']
  },
  {
    code: 'AR',
    name: 'Arunachal Pradesh',
    nameTe: 'అరుణాచల్ ప్రదేశ్',
    districts: ['Itanagar (Papum Pare)', 'Tawang', 'Pasighat (East Siang)', 'Ziro (Lower Subansiri)']
  },
  {
    code: 'SK',
    name: 'Sikkim',
    nameTe: 'సిక్కిం',
    districts: ['Gangtok (East Sikkim)', 'Namchi (South Sikkim)', 'Gyalshing (West Sikkim)', 'Mangan (North Sikkim)']
  },
  {
    code: 'PY',
    name: 'Puducherry',
    nameTe: 'పుదుచ్చేరి',
    districts: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam']
  },
  {
    code: 'CH',
    name: 'Chandigarh',
    nameTe: 'చండీగఢ్',
    districts: ['Chandigarh']
  },
  {
    code: 'LA',
    name: 'Ladakh',
    nameTe: 'లడఖ్',
    districts: ['Leh', 'Kargil']
  },
  {
    code: 'AN',
    name: 'Andaman & Nicobar Islands',
    nameTe: 'అండమాన్ & నికోబార్',
    districts: ['South Andaman (Port Blair)', 'North and Middle Andaman', 'Nicobar']
  },
  {
    code: 'DH',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    nameTe: 'దాద్రా నగర్ హవేలి & డామన్ డయ్యూ',
    districts: ['Daman', 'Diu', 'Silvassa']
  },
  {
    code: 'LD',
    name: 'Lakshadweep',
    nameTe: 'లక్షద్వీప్',
    districts: ['Kavaratti', 'Agatti', 'Andrott', 'Minicoy']
  }
];

export const MANDALS_BY_DISTRICT: Record<string, string[]> = {
  // TELANGANA - ALL 33 DISTRICTS
  'Warangal': [
    'Hanamkonda', 'Kazipet', 'Warangal Fort', 'Parkal', 'Narsampet', 'Wardhannapet', 
    'Geesugonda', 'Atmakur', 'Dharmasagar', 'Elkathurthy', 'Hasanparthy', 'Inavolu', 
    'Sangem', 'Chennaraopet', 'Duggondi', 'Khanapur', 'Nekkonda', 'Rayaparthy'
  ],
  'Hanamkonda': [
    'Hanamkonda', 'Kazipet', 'Hasanparthy', 'Inavolu', 'Velair', 'Dharmasagar', 
    'Elkathurthy', 'Bheemadevarpalle', 'Kamalapur', 'Parkal', 'Nadikkuda', 'Shayampet'
  ],
  'Hyderabad': [
    'Madhapur', 'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Kukatpally', 'Secunderabad', 
    'Charminar', 'Ameerpet', 'Dilsukhnagar', 'LB Nagar', 'Mehdipatnam', 'Khairatabad', 
    'Musheerabad', 'Amberpet', 'Malakpet', 'Begumpet', 'Kondapur', 'Hitec City', 'Sanathnagar', 
    'Nampally', 'Himayatnagar', 'Asif Nagar', 'Golconda', 'Bahadurpura', 'Chandrayangutta'
  ],
  'Karimnagar': [
    'Karimnagar Urban', 'Karimnagar Rural', 'Manakondur', 'Huzurabad', 'Choppadandi', 
    'Jammikunta', 'Gangadhara', 'Timmapur', 'Veenavanka', 'Saidapur', 'Chigurumamidi', 'Kothapalli'
  ],
  'Khammam': [
    'Khammam Urban', 'Khammam Rural', 'Madhira', 'Wyra', 'Sathupally', 'Kallur', 
    'Nelakondapalli', 'Kusumanchi', 'Tirumalayapalem', 'Chinthakani', 'Bonakal', 'Enkoor', 'Konijerla'
  ],
  'Nalgonda': [
    'Nalgonda', 'Miryalaguda', 'Devarakonda', 'Nakrekal', 'Narketpally', 'Munugode', 
    'Chandur', 'Kattangur', 'Thipparthi', 'Haliya (Anumula)', 'Damaracherla', 'Chityal'
  ],
  'Nizamabad': [
    'Nizamabad North', 'Nizamabad South', 'Nizamabad Rural', 'Armoor', 'Bodhan', 
    'Bheemgal', 'Dichpally', 'Varni', 'Kotagiri', 'Mupkal', 'Balkonda', 'Jakranpally', 'Makloor'
  ],
  'Rangareddy': [
    'Rajendranagar', 'Serilingampally', 'Shamshabad', 'Maheshwaram', 'Ibrahimpatnam', 
    'Chevella', 'Shadnagar', 'Hayathnagar', 'Saroornagar', 'Kandukur', 'Moinabad', 'Farooqnagar', 'Amangal'
  ],
  'Medchal-Malkajgiri': [
    'Malkajgiri', 'Uppal', 'Alwal', 'Quthbullapur', 'Kukatpally', 'Medchal', 
    'Ghatkesar', 'Keesara', 'Balanagar', 'Dundigal Gandimaisamma', 'Kapra', 'Shamirpet'
  ],
  'Siddipet': [
    'Siddipet Urban', 'Siddipet Rural', 'Gajwel', 'Dubbak', 'Husnabad', 
    'Komuravelli', 'Mulugu', 'Markook', 'Jagdevpur', 'Cherial', 'Bejjanki', 'Kondapak'
  ],
  'Bhadradri Kothagudem': [
    'Kothagudem', 'Bhadrachalam', 'Yellandu', 'Manuguru', 'Palwancha', 
    'Aswapuram', 'Burgampahad', 'Cherla', 'Dummagudem', 'Julurpad', 'Tekulapalli', 'Chandrugonda'
  ],
  'Mahabubnagar': [
    'Mahabubnagar Urban', 'Mahabubnagar Rural', 'Jadcherla', 'Bhoothpur', 
    'Devarkadra', 'Nawabpet', 'Koilkonda', 'Midjil', 'Hanwada', 'Moosapet'
  ],
  'Medak': [
    'Medak', 'Narsapur', 'Ramayampet', 'Chegunta', 'Shankarampet', 'Tupran', 'Papannapet', 'Kowdipally'
  ],
  'Jagtial': [
    'Jagtial', 'Korutla', 'Metpally', 'Dharmapuri', 'Raikal', 'Gollapally', 'Pegadapally', 'Medipalli', 'Mallial'
  ],
  'Suryapet': [
    'Suryapet', 'Kodad', 'Huzurnagar', 'Mothey', 'Chivvemla', 'Garidepally', 'Neredcherla', 'Maddirala'
  ],
  'Jangaon': [
    'Jangaon', 'Palakurthy', 'Station Ghanpur', 'Bachannapet', 'Devaruppula', 'Raghunathpalle', 'Tarigoppula'
  ],
  'Jayashankar Bhupalpally': [
    'Bhupalpally', 'Chityal', 'Ghanpur (Mulug)', 'Kataram', 'Mahadevpur', 'Maha Mutharam', 'Malhar Rao', 'Palimela'
  ],
  'Jogulamba Gadwal': [
    'Gadwal', 'Alampur', 'Ieeja', 'Itikyal', 'Manoor', 'Undavelli', 'Waddepalle', 'Rajoli'
  ],
  'Kamareddy': [
    'Kamareddy', 'Banswada', 'Yellareddy', 'Bhiknoor', 'Domakonda', 'Machareddy', 'Pitlam', 'Jukkal'
  ],
  'Komaram Bheem Asifabad': [
    'Asifabad', 'Kagaznagar', 'Sirpur (T)', 'Rebbena', 'Wankidi', 'Jainoor', 'Kerameri', 'Tiryani'
  ],
  'Mahabubabad': [
    'Mahabubabad', 'Dornakal', 'Maripeda', 'Kuravi', 'Kesamudram', 'Nellikudur', 'Gudur', 'Bayyaram'
  ],
  'Mancherial': [
    'Mancherial', 'Bellampalli', 'Mandamarri', 'Chennur', 'Luxettipet', 'Naspur', 'Jaipur', 'Jannaram'
  ],
  'Mulugu': [
    'Mulugu', 'Venkatapur', 'Govindaraopet', 'Tadvai', 'Eturnagaram', 'Mangapet', 'Kannaigudem', 'Venkatapuram'
  ],
  'Nagarkurnool': [
    'Nagarkurnool', 'Achampet', 'Kalwakurthy', 'Kollapur', 'Bijinapalle', 'Telkapalle', 'Amrabad', 'Lingal'
  ],
  'Narayanpet': [
    'Narayanpet', 'Makthal', 'Kosgi', 'Damaragidda', 'Maddur', 'Utkoor', 'Maganoor', 'Krishna'
  ],
  'Peddapalli': [
    'Peddapalli', 'Ramagundam', 'Godavarikhani', 'Sultanabad', 'Manthani', 'Julapalli', 'Eligaid', 'Kamanpur'
  ],
  'Rajanna Sircilla': [
    'Sircilla', 'Vemulawada', 'Boinpalli', 'Konaraopet', 'Mustabad', 'Yellareddypet', 'Gambhiraopet', 'Thangalapalli'
  ],
  'Sangareddy': [
    'Sangareddy', 'Patancheru', 'Zaheerabad', 'Ameenpur', 'RC Puram', 'Sadasivpet', 'Andole', 'Narayankhed'
  ],
  'Vikarabad': [
    'Vikarabad', 'Tandur', 'Pargi', 'Kodangal', 'Mominpet', 'Nawabpet', 'Dharur', 'Bantwaram'
  ],
  'Wanaparthy': [
    'Wanaparthy', 'Pebbair', 'Ghanpur', 'Gopalpeta', 'Pangal', 'Revally', 'Kothakota', 'Srirangapur'
  ],
  'Yadadri Bhuvanagiri': [
    'Bhongir', 'Yadagirigutta', 'Alair', 'Choutuppal', 'Pochampally', 'Mothkur', 'Bommalaramaram', 'Bibinagar'
  ],

  // ANDHRA PRADESH - ALL 26 DISTRICTS
  'Visakhapatnam': [
    'Bheemunipatnam', 'Visakhapatnam Urban', 'Visakhapatnam Rural', 'Gajuwaka', 
    'Pendurthi', 'Maharanipeta', 'Seethammadhara', 'Gopalapatnam', 'Padmanabham', 'Anandapuram', 'Rushikonda'
  ],
  'Vijayawada (NTR)': [
    'Vijayawada Urban', 'Vijayawada Rural', 'Vijayawada Central', 'Vijayawada North', 
    'Ibrahimpatnam', 'Jaggayyapeta', 'Nandigama', 'Tiruvuru', 'Mylavaram', 'G.Konduru', 'Kanchikacherla'
  ],
  'Guntur': [
    'Guntur East', 'Guntur West', 'Mangalagiri', 'Tenali', 'Tadikonda', 
    'Ponnur', 'Prathipadu', 'Medikonduru', 'Pedakakani', 'Chebrolu', 'Duggirala'
  ],
  'Tirupati': [
    'Tirupati Urban', 'Tirupati Rural', 'Chandragiri', 'Renigunta', 'Srikalahasti', 
    'Venkatagiri', 'Gudur', 'Sullurpeta', 'Naidupeta', 'Yerpedu', 'Pakala', 'Vadamalapeta'
  ],
  'Kurnool': [
    'Kurnool Urban', 'Kurnool Rural', 'Yemmiganur', 'Kodumur', 'Adoni', 
    'Alur', 'Mantralayam', 'Gudur', 'Kallur', 'Pattikonda', 'Holagunda'
  ],
  'Nellore (SPSR)': [
    'Nellore Urban', 'Nellore Rural', 'Kovur', 'Atmakur', 'Udayagiri', 
    'Kavali', 'Buchireddipalem', 'Indukurpet', 'Venkatachalam', 'Allur'
  ],
  'Anantapur': [
    'Anantapur Urban', 'Anantapur Rural', 'Guntakal', 'Tadipatri', 'Dharmavaram', 
    'Kalyandurg', 'Rayadurg', 'Pamidi', 'Gooty', 'Singanamala'
  ],
  'Kadapa (YSR)': [
    'Kadapa Urban', 'Kadapa Rural', 'Proddatur', 'Pulivendula', 'Jammalamadugu', 
    'Badvel', 'Mydukur', 'Kamalapuram', 'Rayachoty', 'Vontimitta'
  ],
  'Kakinada': [
    'Kakinada Urban', 'Kakinada Rural', 'Pithapuram', 'Samalkota', 'Peddapuram', 
    'Tuni', 'Karapa', 'Thallarevu', 'Kajuluru', 'Prathipadu'
  ],
  'Rajamahendravaram (East Godavari)': [
    'Rajahmundry Urban', 'Rajahmundry Rural', 'Kovvur', 'Nidadavole', 'Anaparthy', 
    'Kadiam', 'Rajanagaram', 'Korukonda', 'Devarapalle'
  ],
  'Eluru': [
    'Eluru Urban', 'Eluru Rural', 'Jangareddygudem', 'Denduluru', 'Pedavegi', 'Chintalapudi', 'Polavaram', 'Unguturu'
  ],
  'West Godavari': [
    'Bhimavaram', 'Narasapuram', 'Tanuku', 'Palakollu', 'Tadepalligudem', 'Achanta', 'Akividu', 'Mogalthur'
  ],
  'Krishna': [
    'Machilipatnam', 'Gudivada', 'Pamarru', 'Penamaluru', 'Gannavaram', 'Avanigadda', 'Kankipadu', 'Vuyyuru'
  ],
  'Bapatla': [
    'Bapatla', 'Chirala', 'Repalle', 'Vemuru', 'Addanki', 'Karamchedu', 'Pittalavanipalem', 'Karlapalem'
  ],
  'Palnadu': [
    'Narasaraopet', 'Sattenapalle', 'Gurazala', 'Vinukonda', 'Chilakaluripet', 'Macherla', 'Piduguralla', 'Dachepalle'
  ],
  'Prakasam': [
    'Ongole', 'Markapur', 'Giddalur', 'Kanigiri', 'Yerragondapalem', 'Darsi', 'Podili', 'Kandukur'
  ],
  'Nandyal': [
    'Nandyal', 'Allagadda', 'Banaganapalle', 'Dhone', 'Nandikotkur', 'Srisailam', 'Atmakur', 'Koilkuntla'
  ],
  'Sri Sathya Sai': [
    'Puttaparthi', 'Hindupur', 'Kadiri', 'Penukonda', 'Madakasira', 'Gorantla', 'Dharmavaram', 'Bukkapatnam'
  ],
  'Chittoor': [
    'Chittoor', 'Palamaner', 'Nagari', 'Kuppam', 'Punganur', 'GD Nellore', 'Bangarupalem', 'Penumuru'
  ],
  'Annamayya': [
    'Rayachoti', 'Madanapalle', 'Rajampet', 'Tamballapalle', 'Pileru', 'Railway Kodur', 'Valmikipuram'
  ],
  'Srikakulam': [
    'Srikakulam', 'Amadalavalasa', 'Narasannapeta', 'Ichchapuram', 'Palasa', 'Tekkali', 'Rajam', 'Etcherla'
  ],
  'Vizianagaram': [
    'Vizianagaram', 'Bobbili', 'Cheepurupalle', 'Gajapathinagaram', 'Nellimarla', 'Srungavarapukota', 'Bhogapuram'
  ],
  'Parvathipuram Manyam': [
    'Parvathipuram', 'Salur', 'Kurupam', 'Palakonda', 'Seethampeta', 'Gummalaxmipuram', 'Jiyyammavalasa'
  ],
  'Alluri Sitharama Raju': [
    'Paderu', 'Araku Valley', 'Ananthagiri', 'Chintapalle', 'Rampachodavaram', 'Maredumilli', 'Devipatnam'
  ],
  'Anakapalli': [
    'Anakapalli', 'Chodavaram', 'Madugula', 'Narsipatnam', 'Elamanchili', 'Payakaraopeta', 'Kasimkota', 'Atchutapuram'
  ],
  'Dr. B.R. Ambedkar Konaseema': [
    'Amalapuram', 'Razole', 'Kothapeta', 'Mandapeta', 'Ramachandrapuram', 'Mummidivaram', 'P.Gannavaram', 'Ainavilli'
  ],

  // OTHER MAJOR INDIAN CITIES & DISTRICTS
  'Bengaluru Urban': [
    'Bengaluru Central', 'Bengaluru South', 'Bengaluru North', 'Whitefield', 
    'Electronic City', 'Indiranagar', 'Koramangala', 'Jayanagar', 'Yelahanka', 'Mahadevapura', 'Bommanahalli'
  ],
  'Bengaluru Rural': [
    'Devanahalli', 'Doddaballapura', 'Hosakote', 'Nelamangala'
  ],
  'Mysuru': [
    'Mysuru Urban', 'Mysuru Rural', 'Nanjangud', 'Hunsur', 'T. Narasipura', 'Periyapatna', 'K.R. Nagar'
  ],
  'Mangaluru (Dakshina Kannada)': [
    'Mangaluru', 'Bantwal', 'Belthangady', 'Puttur', 'Sullia', 'Moodabidri'
  ],
  'Hubballi-Dharwad': [
    'Hubballi Urban', 'Hubballi Rural', 'Dharwad', 'Navalgund', 'Kundgol', 'Kalghatgi'
  ],
  'Belagavi': [
    'Belagavi Urban', 'Belagavi Rural', 'Gokak', 'Chikkodi', 'Athani', 'Bailhongal', 'Khanapur'
  ],
  'Mumbai City': [
    'South Mumbai', 'Colaba', 'Dadar', 'Worli', 'Fort', 'Marine Lines', 'Byculla', 'Malabar Hill'
  ],
  'Mumbai Suburban': [
    'Bandra', 'Andheri', 'Borivali', 'Kurla', 'Ghatkopar', 'Mulund', 'Juhu', 'Powai', 'Malad', 'Kandivali'
  ],
  'Pune': [
    'Pune City', 'Haveli', 'Shivajinagar', 'Kothrud', 'Pimpri-Chinchwad', 'Baramati', 'Maval', 'Shirur'
  ],
  'Thane': [
    'Thane', 'Kalyan', 'Dombivli', 'Ulhasnagar', 'Bhiwandi', 'Mira-Bhayandar', 'Murbad'
  ],
  'Nagpur': [
    'Nagpur Urban', 'Nagpur Rural', 'Hingna', 'Kamptee', 'Katol', 'Umred', 'Ramtek'
  ],
  'Nashik': [
    'Nashik Urban', 'Nashik Rural', 'Malegaon', 'Sinnar', 'Niphad', 'Yeola', 'Igatpuri'
  ],
  'Chennai': [
    'Chennai Central', 'T. Nagar', 'Adyar', 'Mylapore', 'Anna Nagar', 'Guindy', 
    'Velachery', 'Tambaram', 'Royapettah', 'Egmore', 'Perambur', 'Saidapet'
  ],
  'Coimbatore': [
    'Coimbatore North', 'Coimbatore South', 'Pollachi', 'Mettupalayam', 'Sulur', 'Annur'
  ],
  'Madurai': [
    'Madurai North', 'Madurai South', 'Melur', 'Thirumangalam', 'Usilampatti', 'Vadipatti'
  ],
  'New Delhi': [
    'Connaught Place', 'Chanakyapuri', 'Parliament Street', 'Delhi Cantt', 'Vasant Vihar', 'Karol Bagh'
  ],
  'Central Delhi': [
    'Daryaganj', 'Pahar Ganj', 'Civil Lines', 'Karol Bagh', 'Kotwali'
  ],
  'South Delhi': [
    'Hauz Khas', 'Saket', 'Mehrauli', 'Greater Kailash', 'Lajpat Nagar'
  ],
  'Kochi (Ernakulam)': [
    'Kochi', 'Ernakulam', 'Aluva', 'Kanayannur', 'Paravur', 'Kothamangalam', 'Muvattupuzha'
  ],
  'Thiruvananthapuram': [
    'Thiruvananthapuram', 'Neyyattinkara', 'Nedumangad', 'Chirayinkeezhu', 'Varkala', 'Kattakada'
  ],
  'Kolkata': [
    'Kolkata North', 'Kolkata South', 'Park Street', 'Salt Lake', 'New Town', 'Bhowanipore', 'Howrah Bridge'
  ],
  'Ahmedabad': [
    'Ahmedabad City', 'Daskroi', 'Sanand', 'Dholka', 'Viramgam', 'Bavla', 'Maninagar'
  ],
  'Surat': [
    'Surat City', 'Chorasi', 'Olpad', 'Kamrej', 'Bardoli', 'Mahuva', 'Mandvi'
  ],
  'Jaipur': [
    'Jaipur Urban', 'Sanganer', 'Amber', 'Chaksu', 'Bass', 'Jamwa Ramgarh', 'Kotputli'
  ],
  'Lucknow': [
    'Lucknow Central', 'Hazratganj', 'Gomti Nagar', 'Alambagh', 'Indira Nagar', 'Aliganj', 'Chowk'
  ],
  'Varanasi': [
    'Varanasi Sadar', 'Pindra', 'Rohania', 'Assi Ghat', 'Dashashwamedh', 'Kashi', 'Shivpur', 'Sarnath'
  ],
  'Patna': [
    'Patna Sadar', 'Danapur', 'Barh', 'Masaurhi', 'Paliganj', 'Bakhtiarpur', 'Bikram'
  ],
  'Bhopal': [
    'Bhopal Urban', 'Huzur', 'Berasia', 'Kolar', 'Govindpura', 'Arera Colony'
  ],
  'Indore': [
    'Indore Urban', 'Mhow', 'Depalpur', 'Sanwer', 'Hatod', 'Rau'
  ],
  'Bhubaneswar (Khurda)': [
    'Bhubaneswar Urban', 'Jatni', 'Khurda', 'Balianta', 'Balipatna', 'Begunia'
  ],
  'Guwahati (Kamrup Metro)': [
    'Guwahati', 'Dispur', 'Chandmari', 'Jalukbari', 'Sonapur', 'Azara'
  ],
  'Chandigarh': [
    'Sector 17', 'Sector 35', 'Sector 22', 'Manimajra', 'Industrial Area Phase 1', 'Zirakpur Area'
  ]
};

// ============================================================================
// 🌟 POPULAR REGIONAL CLUSTERS / SUGGESTIONS
// ============================================================================
export interface RegionalCluster {
  id: string;
  nameTe: string;
  nameEn: string;
  state: string;
  district: string;
  mandal: string;
  badge: string;
}

export const POPULAR_REGIONAL_SUGGESTIONS: RegionalCluster[] = [
  {
    id: 'all-india',
    nameTe: '🇮🇳 భారతదేశం మొత్తం (All India)',
    nameEn: 'All India',
    state: 'All India',
    district: 'All',
    mandal: 'All',
    badge: 'Pan-India'
  },
  {
    id: 'ts-all',
    nameTe: '🏛️ తెలంగాణ (అన్ని జిల్లాలు)',
    nameEn: 'Telangana State',
    state: 'Telangana',
    district: 'All',
    mandal: 'All',
    badge: 'TS All'
  },
  {
    id: 'ap-all',
    nameTe: '🌊 ఆంధ్రప్రదేశ్ (అన్ని జిల్లాలు)',
    nameEn: 'Andhra Pradesh State',
    state: 'Andhra Pradesh',
    district: 'All',
    mandal: 'All',
    badge: 'AP All'
  },
  {
    id: 'hyd-metro',
    nameTe: '🏙️ హైదరాబాద్ మెట్రో (Hyderabad Metro)',
    nameEn: 'Hyderabad Metro',
    state: 'Telangana',
    district: 'Hyderabad',
    mandal: 'Madhapur',
    badge: 'IT & Metro'
  },
  {
    id: 'warangal-tri',
    nameTe: '🏰 వరంగల్ - హనుమకొండ (Warangal Tri-Cities)',
    nameEn: 'Warangal & Hanamkonda',
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Hanamkonda',
    badge: 'Heritage Hub'
  },
  {
    id: 'amaravati-ntr',
    nameTe: '🏢 అమరావతి - విజయవాడ (Capital Region)',
    nameEn: 'Vijayawada Capital Region',
    state: 'Andhra Pradesh',
    district: 'Vijayawada (NTR)',
    mandal: 'Vijayawada Urban',
    badge: 'Capital Zone'
  },
  {
    id: 'vizag-smart',
    nameTe: '⚓ విశాఖపట్నం సిటీ (Vizag Coastal Smart City)',
    nameEn: 'Visakhapatnam Smart City',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    mandal: 'Visakhapatnam Urban',
    badge: 'Coastal Hub'
  },
  {
    id: 'tirupati-temple',
    nameTe: '🛕 తిరుపతి - ఆధ్యాత్మిక నగరి (Tirupati)',
    nameEn: 'Tirupati Devotional City',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    mandal: 'Tirupati Urban',
    badge: 'Spiritual Hub'
  },
  {
    id: 'bengaluru-tech',
    nameTe: '💻 బెంగళూరు అర్బన్ (Bengaluru Tech Corridor)',
    nameEn: 'Bengaluru Tech Corridor',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    mandal: 'Whitefield',
    badge: 'Silicon City'
  },
  {
    id: 'mumbai-mmr',
    nameTe: '🌆 ముంబై మెట్రోపాలిటన్ (Mumbai MMR)',
    nameEn: 'Mumbai Metropolitan',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    mandal: 'Bandra',
    badge: 'Financial Capital'
  },
  {
    id: 'delhi-ncr',
    nameTe: '🇮🇳 ఢిల్లీ రాజధాని ప్రాంతం (Delhi NCR)',
    nameEn: 'Delhi NCR',
    state: 'Delhi',
    district: 'New Delhi',
    mandal: 'Connaught Place',
    badge: 'National Capital'
  },
  {
    id: 'chennai-metro',
    nameTe: '🏙️ చెన్నై మెట్రో (Chennai Metro)',
    nameEn: 'Chennai Metro',
    state: 'Tamil Nadu',
    district: 'Chennai',
    mandal: 'Anna Nagar',
    badge: 'Automobile Hub'
  }
];

// ============================================================================
// 📰 NEWS HEADING SUGGESTIONS (శీర్షిక ఐడియాలు & టెంప్లేట్‌లు)
// ============================================================================
export const NEWS_HEADING_SUGGESTIONS: { category: string; icon: string; headings: string[] }[] = [
  {
    category: 'రైతులు & వ్యవసాయం (Agriculture)',
    icon: '🌾',
    headings: [
      'రైతులకు శుభవార్త: బ్యాంక్ ఖాతాల్లోకి నేరుగా నూతన సాయం నిధులు జమ!',
      'వ్యవసాయ మార్కెట్‌లో రికార్డు ధర పలికిన ధాన్యం, మిర్చి మరియు పత్తి!',
      'సాగునీటి కాలువల మరమ్మతులకు భారీ నిధులు మంజూరు: ఆయకట్టుకు పుష్కలంగా నీరు!',
      'రైతు సంక్షేమ పథకానికి సంబంధించి కీలక మార్గదర్శకాలు విడుదల చేసిన ప్రభుత్వం!'
    ]
  },
  {
    category: 'తాజా బ్రేకింగ్ (Breaking & Local)',
    icon: '🚨',
    headings: [
      'తాజా బ్రేకింగ్: జిల్లా పరిధిలో కీలక ప్రాజెక్టుకు శంకుస్థాపన చేసిన మంత్రులు!',
      'నగరంలో రోడ్ల విస్తరణ, డ్రైనేజీ పనులకు రూ. 200 కోట్ల నిధులు విడుదల!',
      'గ్రామంలో చిరకాల తాగునీటి సమస్యకు శాశ్వత పరిష్కారం: పైప్‌లైన్ ప్రారంభం!',
      'వర్షాల నేపథ్యంలో అధికార యంత్రాంగం హై అలర్ట్: 24/7 కంట్రోల్ రూమ్ ఏర్పాటు!'
    ]
  },
  {
    category: 'ఉద్యోగాలు & విద్య (Jobs & Education)',
    icon: '💼',
    headings: [
      'నిరుద్యోగులకు వరం: 5,000 ప్రభుత్వ ఉద్యోగాల భర్తీకి భారీ నోటిఫికేషన్!',
      'విద్యార్థులకు ఉచిత ల్యాప్‌టాప్‌లు, విద్యా దీవెన స్కాలర్‌షిప్‌ల విడుదల!',
      'డీఎస్సీ & పోలీస్ రిక్రూట్‌మెంట్ పరీక్షల షెడ్యూల్ విడుదల: పూర్తి వివరాలు ఇవే!',
      'స్థానిక పరిశ్రమల్లో నిరుద్యోగ యువతకు 3,000 కొలువులు: మెగా జాబ్ మేళా నేడు!'
    ]
  },
  {
    category: 'రాజకీయం & ప్రజా సమస్యలు (Politics)',
    icon: '🏛️',
    headings: [
      'ముఖ్యమంత్రి భారీ బహిరంగ సభ: నియోజకవర్గానికి వరాల జల్లు!',
      'ప్రజా సమస్యలపై అధికారులు తక్షణమే స్పందించాలి: కలెక్టర్ గడప గడపకూ సమీక్ష!',
      'నూతన పారిశ్రామిక విధానం ప్రకటన: లక్షల మంది యువతకు ఉపాధి లక్ష్యం!',
      'పంచాయతీ రాజ్ అభివృద్ధికి గ్రాంట్ విడుదల: గ్రామ స్వరాజ్యమే లక్ష్యం!'
    ]
  },
  {
    category: 'సినిమా & వినోదం (Cinema & Viral)',
    icon: '🎬',
    headings: [
      'బాక్సాఫీస్ వద్ద సరికొత్త రికార్డు సృష్టించిన భారీ బడ్జెట్ పాన్-ఇండియా చిత్రం!',
      'అభిమానుల కోలాహలం నడుమ విడుదలైన ట్రైలర్: యూట్యూబ్‌లో సెన్సేషన్!',
      'వచ్చే వారం ఓటీటీలో స్ట్రీమింగ్ కానున్న బ్లాక్‌బస్టర్ హిట్ మూవీ వివరాలు!'
    ]
  },
  {
    category: 'భక్తి & ఆధ్యాత్మికం (Devotional)',
    icon: '🕉️',
    headings: [
      'వైభవంగా ప్రారంభమైన చారిత్రక క్షేత్ర వార్షిక బ్రహ్మోత్సవాలు: పోటెత్తిన భక్తజనం!',
      'స్వామివారికి ప్రత్యేక స్వర్ణాభరణాల అలంకరణ: నేత్రపర్వంగా దర్శన భాగ్యం!',
      'పుణ్యక్షేత్రంలో భక్తులకు ఉచిత దర్శనం, వసతి మరియు ప్రసాద వితరణ ఏర్పాట్లు!'
    ]
  }
];

// ============================================================================
// ✍️ NEWS MATTER / SUMMARY TEMPLATES (సారాంశ నమూనాలు)
// ============================================================================
export const NEWS_MATTER_SUGGESTIONS: string[] = [
  'స్థానిక ప్రజల దీర్ఘకాలిక సమస్యల పరిష్కారానికి అధికారులు ప్రత్యేక చర్యలు చేపట్టారు. క్షేత్రస్థాయిలో పనులు వేగవంతం చేసి సకాలంలో పూర్తి చేయాలని ఆదేశించారు. దీనిపై స్థానిక ప్రజలు హర్షం వ్యక్తం చేస్తున్నారు.',
  'ప్రభుత్వ సంక్షేమ పథకాలు అర్హులైన ప్రతి లబ్ధిదారుడికి అందేలా నిరంతరం పర్యవేక్షిస్తున్నామని ప్రజాప్రతినిధులు తెలిపారు. గ్రామాల్లో అవగాహన సదస్సులు నిర్వహించి దరఖాస్తులను స్వీకరిస్తున్నారు.',
  'జిల్లా కలెక్టర్ కార్యాలయంలో నిర్వహించిన ప్రజావాణిలో ప్రజల నుండి వినతులు స్వీకరించారు. సమస్యలను వెంటనే పరిష్కరించాలని సంబంధిత శాఖల అధికారులకు ఆదేశాలు జారీ చేశారు.',
  'రాష్ట్రంలో నూతన పరిశ్రమల ఏర్పాటుతో స్థానిక యువతకు పెద్ద ఎత్తున ఉపాధి అవకాశాలు లభించనున్నాయి. అర్హులైన నిరుద్యోగులకు ఉచిత నైపుణ్య శిక్షణ అందించి ఉద్యోగాలు కల్పిస్తామని ప్రకటించారు.',
  'కురుస్తున్న భారీ వర్షాల దృష్ట్యా ప్రజలు అత్యవసరమైతే తప్ప బయటకు రావద్దని అధికార యంత్రాంగం హెచ్చరించింది. కంట్రోల్ రూమ్ నంబర్లను అందుబాటులో ఉంచారు.'
];

// ============================================================================
// 🎖️ REPORTER ROLE / DESIGNATION SUGGESTIONS
// ============================================================================
export const REPORTER_ROLE_SUGGESTIONS: string[] = [
  'ధ్రువీకరించిన రిపోర్టర్ (Verified Reporter)',
  'సీనియర్ ఇన్వెస్టిగేటివ్ జర్నలిస్ట్ (Senior Journalist)',
  'సిటిజన్ రిపోర్టర్ (Citizen Journalist)',
  'డిస్ట్రిక్ట్ బ్యూరో చీఫ్ (District Bureau Chief)',
  'మండల ప్రత్యేక ప్రతినిధి (Mandal Special Reporter)',
  'రైతు సంక్షేమ ప్రత్యేక ప్రతినిధి (Agri Reporter)',
  'క్రైమ్ & లీగల్ రిపోర్టర్ (Crime Reporter)',
  'యువజన & విద్యా కరస్పాండెంట్ (Education Correspondent)'
];

// ============================================================================
// 🏷️ POPULAR NEWS TAGS
// ============================================================================
export const POPULAR_NEWS_TAGS: string[] = [
  'బ్రేకింగ్', 'రైతుబంధు', 'రైతుభరోసా', 'ఉద్యోగాలు', 'వర్షాలు', 'సాగునీరు', 
  'హైదరాబాద్', 'వరంగల్', 'విజయవాడ', 'విశాఖ', 'తిరుపతి', 'సినిమా', 'క్రైమ్', 
  'వైరల్', 'ప్రజాసమస్యలు', 'సంక్షేమం', 'ఐటీ_జాబ్స్', 'ఆరోగ్యం'
];

// Return all unique districts across all states in India
export function getAllDistricts(): string[] {
  const districtSet = new Set<string>();
  ALL_INDIAN_STATES.forEach(st => {
    st.districts.forEach(d => districtSet.add(d));
  });
  return Array.from(districtSet).sort();
}

// Return districts for a given state, or all districts if state is 'All' or 'All India'
export function getDistrictsForState(stateName: string): string[] {
  if (!stateName || stateName === 'All' || stateName === 'All India') {
    return getAllDistricts();
  }
  const match = ALL_INDIAN_STATES.find(s => 
    s.name.toLowerCase() === stateName.toLowerCase() ||
    s.nameTe === stateName ||
    s.code.toLowerCase() === stateName.toLowerCase()
  );
  return match ? match.districts : [];
}

// Return mandals for a given district, with smart fallbacks
export function getMandalsForDistrict(districtName: string, stateName?: string): string[] {
  if (!districtName || districtName === 'All' || districtName === 'All Districts') {
    // Return sample prominent mandals across districts
    const prominentMandals = new Set<string>();
    Object.values(MANDALS_BY_DISTRICT).forEach(mandals => {
      mandals.slice(0, 3).forEach(m => prominentMandals.add(m));
    });
    return Array.from(prominentMandals);
  }

  // Exact district lookup
  if (MANDALS_BY_DISTRICT[districtName]) {
    return MANDALS_BY_DISTRICT[districtName];
  }

  // Case-insensitive / partial match lookup
  const cleanDistrict = districtName.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
  for (const [key, mandals] of Object.entries(MANDALS_BY_DISTRICT)) {
    const cleanKey = key.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
    if (cleanKey === cleanDistrict || cleanKey.includes(cleanDistrict) || cleanDistrict.includes(cleanKey)) {
      return mandals;
    }
  }

  // Default regional mandal / sub-division suggestions for any district
  return [
    `${districtName} Urban (అర్బన్)`,
    `${districtName} Rural (రూరల్)`,
    `${districtName} Central (సెంట్రల్)`,
    `${districtName} North (ఉత్తరం)`,
    `${districtName} South (దక్షిణం)`,
    `${districtName} East (తూర్పు)`,
    `${districtName} West (పశ్చిమం)`,
    'Main Town (ప్రధాన పట్టణం)',
    'Collectorate Area',
    'Railway Station Area',
    'Industrial Zone'
  ];
}

