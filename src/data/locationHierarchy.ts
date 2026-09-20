import { DistrictLocation } from '../types';

export const INDIAN_LOCATIONS: DistrictLocation[] = [
  // Telangana
  {
    state: 'Telangana',
    district: 'Hyderabad',
    mandals: ['Ameerpet', 'Khairatabad', 'Charminar', 'Secunderabad', 'Jubilee Hills', 'Banjara Hills', 'Kukatpally', 'Madhapur', 'Gachibowli']
  },
  {
    state: 'Telangana',
    district: 'Warangal',
    mandals: ['Hanamkonda', 'Kazipet', 'Inavolu', 'Dharmasagar', 'Geesugonda', 'Atmakur', 'Wardhannapet']
  },
  {
    state: 'Telangana',
    district: 'Rangareddy',
    mandals: ['Rajendranagar', 'Serilingampally', 'Shamshabad', 'Maheshwaram', 'Ibrahimpatnam', 'Chevella', 'Shadnagar']
  },
  {
    state: 'Telangana',
    district: 'Karimnagar',
    mandals: ['Karimnagar Urban', 'Manakondur', 'Choppadandi', 'Huzurabad', 'Jammikunta', 'Thimmapur']
  },
  {
    state: 'Telangana',
    district: 'Nizamabad',
    mandals: ['Nizamabad South', 'Nizamabad North', 'Armoor', 'Bodhan', 'Dichpally', 'Bheemgal']
  },
  {
    state: 'Telangana',
    district: 'Khammam',
    mandals: ['Khammam Urban', 'Khammam Rural', 'Wyra', 'Madhira', 'Sathupally', 'Kallur']
  },
  {
    state: 'Telangana',
    district: 'Nalgonda',
    mandals: ['Nalgonda Town', 'Miryalaguda', 'Devarakonda', 'Nakrekal', 'Chityal', 'Haliya']
  },
  {
    state: 'Telangana',
    district: 'Mahabubnagar',
    mandals: ['Mahabubnagar Urban', 'Jadcherla', 'Bhoothpur', 'Devarkadra', 'Nawabpet']
  },

  // Andhra Pradesh
  {
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    mandals: ['Gajuwaka', 'Maharanipeta', 'Bheemunipatnam', 'Anandapuram', 'Pendurthi', 'Simhachalam']
  },
  {
    state: 'Andhra Pradesh',
    district: 'Krishna (Vijayawada)',
    mandals: ['Vijayawada Urban', 'Machilipatnam', 'Gannavaram', 'Gudivada', 'Penamaluru', 'Pamarru']
  },
  {
    state: 'Andhra Pradesh',
    district: 'Guntur',
    mandals: ['Guntur Urban', 'Tenali', 'Mangalagiri', 'Amaravati', 'Ponnur', 'Bapatla', 'Narasaraopet']
  },
  {
    state: 'Andhra Pradesh',
    district: 'Tirupati (Chittoor)',
    mandals: ['Tirupati Urban', 'Chandragiri', 'Srikalahasti', 'Renigunta', 'Chittoor', 'Punganur']
  },
  {
    state: 'Andhra Pradesh',
    district: 'East Godavari',
    mandals: ['Rajahmundry Urban', 'Kakinada', 'Amalapuram', 'Mandapeta', 'Rajanagaram']
  },
  {
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    mandals: ['Kurnool Urban', 'Nandyal', 'Adoni', 'Yemmiganur', 'Dhone', 'Allagadda']
  },

  // Maharashtra
  {
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    mandals: ['Andheri', 'Bandra', 'Borivali', 'Kurla', 'Ghatkopar', 'Mulund']
  },
  {
    state: 'Maharashtra',
    district: 'Pune',
    mandals: ['Haveli', 'Baramati', 'Maval', 'Khed', 'Shirur', 'Daund']
  },
  {
    state: 'Maharashtra',
    district: 'Nagpur',
    mandals: ['Nagpur City', 'Kamptee', 'Hingna', 'Katol', 'Ramtek', 'Umred']
  },
  {
    state: 'Maharashtra',
    district: 'Nashik',
    mandals: ['Nashik Urban', 'Malegaon', 'Sinnar', 'Niphad', 'Igatpuri', 'Yeola']
  },

  // Karnataka
  {
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    mandals: ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal', 'Yelahanka', 'Kengeri']
  },
  {
    state: 'Karnataka',
    district: 'Mysuru',
    mandals: ['Mysuru Taluk', 'Nanjangud', 'Hunsur', 'T. Narasipura', 'K.R. Nagar']
  },
  {
    state: 'Karnataka',
    district: 'Dakshina Kannada',
    mandals: ['Mangaluru', 'Bantwal', 'Puttur', 'Belthangady', 'Sullia']
  },

  // Tamil Nadu
  {
    state: 'Tamil Nadu',
    district: 'Chennai',
    mandals: ['Mylapore', 'T. Nagar', 'Guindy', 'Egmore', 'Ambattur', 'Velachery', 'Anna Nagar']
  },
  {
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    mandals: ['Coimbatore North', 'Coimbatore South', 'Pollachi', 'Sulur', 'Mettupalayam']
  },
  {
    state: 'Tamil Nadu',
    district: 'Madurai',
    mandals: ['Madurai North', 'Madurai South', 'Melur', 'Thirumangalam', 'Vadipatti']
  },

  // Uttar Pradesh
  {
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    mandals: ['Lucknow City', 'Bakshi Ka Talab', 'Malihabad', 'Mohanlalganj', 'Sarojini Nagar']
  },
  {
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    mandals: ['Varanasi Sadar', 'Pindra', 'Sewapuri', 'Rameshwar', 'Arajiline']
  },
  {
    state: 'Uttar Pradesh',
    district: 'Noida (Gautam Buddha Nagar)',
    mandals: ['Noida City', 'Greater Noida', 'Dadri', 'Jewar', 'Dankaur']
  },

  // Gujarat
  {
    state: 'Gujarat',
    district: 'Ahmedabad',
    mandals: ['Ahmedabad City', 'Daskroi', 'Sanand', 'Dholka', 'Viramgam', 'Bavla']
  },
  {
    state: 'Gujarat',
    district: 'Surat',
    mandals: ['Surat City', 'Chorasi', 'Olpad', 'Kamrej', 'Bardoli', 'Mahuva']
  },

  // West Bengal
  {
    state: 'West Bengal',
    district: 'Kolkata',
    mandals: ['Alipore', 'Sealdah', 'Bhowanipore', 'Salt Lake', 'Shyambazar', 'Garia']
  },
  {
    state: 'West Bengal',
    district: 'Howrah',
    mandals: ['Howrah Sadar', 'Uluberia', 'Bally', 'Domjur', 'Amta']
  },

  // Kerala
  {
    state: 'Kerala',
    district: 'Ernakulam (Kochi)',
    mandals: ['Kochi', 'Kanayannur', 'Aluva', 'Paravur', 'Kunnathunad', 'Muvattupuzha']
  },
  {
    state: 'Kerala',
    district: 'Thiruvananthapuram',
    mandals: ['Thiruvananthapuram Taluk', 'Neyyattinkara', 'Nedumangad', 'Chirayinkeezhu', 'Varkala']
  }
];

export const TOTAL_COVERED_DISTRICTS_COUNT = 412;
