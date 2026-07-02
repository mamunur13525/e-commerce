export interface Area {
  name: string;
}

export interface City {
  name: string;
  areas: Area[];
}

export interface Region {
  name: string;
  cities: City[];
}

export const locations: Region[] = [
  {
    name: "Dhaka Division",
    cities: [
      {
        name: "Dhaka",
        areas: [
          { name: "Banani" },
          { name: "Gulshan" },
          { name: "Dhanmondi" },
          { name: "Mirpur" },
          { name: "Uttara" },
          { name: "Mohammadpur" },
          { name: "Motijheel" },
          { name: "Bashundhara R/A" },
          { name: "Badda" },
          { name: "Hatirpool" },
          { name: "Farmgate" },
          { name: "Kawran Bazar" },
          { name: "Malibagh" },
          { name: "Shahbagh" },
          { name: "Ramna" },
          { name: "New Market" },
          { name: "Lalmatia" },
          { name: "Shyamoli" },
          { name: "Mohakhali" },
          { name: "Tejgaon" },
          { name: "Kakrail" },
          { name: "Paltan" },
          { name: "Wari" },
          { name: "Jatrabari" },
          { name: "Kamrangirchar" },
          { name: "Sutrapur" },
          { name: "Demra" },
          { name: "Sabujbagh" },
          { name: "Khilgaon" },
          { name: "Rampura" },
          { name: "Hazaribagh" },
          { name: "Kallyanpur" },
          { name: "Pallabi" },
          { name: "Rupnagar" },
          { name: "Cantonment" },
          { name: "Sher-e-Bangla Nagar" },
        ],
      },
      {
        name: "Gazipur",
        areas: [
          { name: "Tongi" },
          { name: "Joydebpur" },
          { name: "Kaliakoir" },
          { name: "Kapasia" },
          { name: "Sreepur" },
          { name: "Kaliganj" },
        ],
      },
      {
        name: "Narayanganj",
        areas: [
          { name: "Siddhirganj" },
          { name: "Sonargaon" },
          { name: "Bandar" },
          { name: "Rupganj" },
          { name: "Araihazar" },
          { name: "Fatullah" },
        ],
      },
      {
        name: "Tangail",
        areas: [
          { name: "Tangail Sadar" },
          { name: "Kalihati" },
          { name: "Bashail" },
          { name: "Mirzapur" },
          { name: "Sakhipur" },
          { name: "Nagarpur" },
        ],
      },
      {
        name: "Faridpur",
        areas: [
          { name: "Faridpur Sadar" },
          { name: "Alfadanga" },
          { name: "Boalmari" },
          { name: "Sadarpur" },
          { name: "Madhukhali" },
          { name: "Bhanga" },
          { name: "Nagarkanda" },
          { name: "Charbhadrasan" },
        ],
      },
      {
        name: "Kishoreganj",
        areas: [
          { name: "Kishoreganj Sadar" },
          { name: "Bhairab" },
          { name: "Kuliarchar" },
          { name: "Bajitpur" },
          { name: "Hossainpur" },
        ],
      },
      {
        name: "Manikganj",
        areas: [
          { name: "Manikganj Sadar" },
          { name: "Saturia" },
          { name: "Shivalaya" },
          { name: "Daulatpur" },
          { name: "Singair" },
        ],
      },
      {
        name: "Munshiganj",
        areas: [
          { name: "Munshiganj Sadar" },
          { name: "Sreenagar" },
          { name: "Lohajang" },
          { name: "Tongibari" },
          { name: "Gazaria" },
        ],
      },
      {
        name: "Narsingdi",
        areas: [
          { name: "Narsingdi Sadar" },
          { name: "Palash" },
          { name: "Shibpur" },
          { name: "Monohardi" },
          { name: "Raipura" },
          { name: "Belabo" },
        ],
      },
      {
        name: "Gopalganj",
        areas: [
          { name: "Gopalganj Sadar" },
          { name: "Kashiani" },
          { name: "Tungipara" },
          { name: "Kotalipara" },
          { name: "Muksudpur" },
        ],
      },
      {
        name: "Madaripur",
        areas: [
          { name: "Madaripur Sadar" },
          { name: "Shibchar" },
          { name: "Kalkini" },
          { name: "Rajoir" },
        ],
      },
      {
        name: "Shariatpur",
        areas: [
          { name: "Shariatpur Sadar" },
          { name: "Naria" },
          { name: "Zanjira" },
          { name: "Bhedarganj" },
          { name: "Damudya" },
        ],
      },
      {
        name: "Rajbari",
        areas: [
          { name: "Rajbari Sadar" },
          { name: "Goalanda" },
          { name: "Pangsha" },
          { name: "Baliakandi" },
          { name: "Kalukhali" },
        ],
      },
    
    ],
  },
  {
    name: "Chattogram Division",
    cities: [
      {
        name: "Chattogram",
        areas: [
          { name: "Agrabad" },
          { name: "Halishahar" },
          { name: "Nasirabad" },
          { name: "Chandgaon" },
          { name: "Panchlaish" },
          { name: "Double Mooring" },
          { name: "Kotwali" },
          { name: "Bakalia" },
          { name: "Pahartali" },
          { name: "Bayezid Bostami" },
          { name: "Khulshi" },
          { name: "Patenga" },
          { name: "Sitakunda" },
          { name: "Mirsharai" },
          { name: "Fatikchhari" },
          { name: "Rangunia" },
          { name: "Boalkhali" },
          { name: "Patiya" },
          { name: "Anwara" },
          { name: "Banshkhali" },
          { name: "Sandwip" },
          { name: "Hathazari" },
          { name: "Raozan" },
        ],
      },
      {
        name: "Cox's Bazar",
        areas: [
          { name: "Cox's Bazar Sadar" },
          { name: "Ramu" },
          { name: "Ukhia" },
          { name: "Teknaf" },
          { name: "Chakaria" },
          { name: "Kutubdia" },
          { name: "Pekua" },
          { name: "Maheshkhali" },
        ],
      },
      {
        name: "Comilla",
        areas: [
          { name: "Comilla Sadar" },
          { name: "Cantonment" },
          { name: "Laksam" },
          { name: "Chandina" },
          { name: "Barura" },
          { name: "Daudkandi" },
          { name: "Brahmanpara" },
          { name: "Debidwar" },
        ],
      },
      {
        name: "Noakhali",
        areas: [
          { name: "Majidee" },
          { name: "Begumganj" },
          { name: "Chatkhil" },
          { name: "Senbagh" },
          { name: "Sonaimuri" },
          { name: "Kabirhat" },
          { name: "Companiganj" },
          { name: "Subarnachar" },
        ],
      },
      {
        name: "Feni",
        areas: [
          { name: "Feni Sadar" },
          { name: "Chhagalnaiya" },
          { name: "Daganbhuiyan" },
          { name: "Sonagazi" },
          { name: "Fulgazi" },
          { name: "Parshuram" },
        ],
      },
      {
        name: "Brahmanbaria",
        areas: [
          { name: "Brahmanbaria Sadar" },
          { name: "Ashuganj" },
          { name: "Sarail" },
          { name: "Kasba" },
          { name: "Nabinagar" },
          { name: "Bancharampur" },
        ],
      },
      {
        name: "Chandpur",
        areas: [
          { name: "Chandpur Sadar" },
          { name: "Kachua" },
          { name: "Shahrasti" },
          { name: "Hajiganj" },
          { name: "Matlab Uttar" },
          { name: "Matlab Dakshin" },
        ],
      },
      {
        name: "Lakshmipur",
        areas: [
          { name: "Lakshmipur Sadar" },
          { name: "Ramganj" },
          { name: "Ramgati" },
          { name: "Raipur" },
          { name: "Kamalnagar" },
        ],
      },
      {
        name: "Rangamati",
        areas: [
          { name: "Rangamati Sadar" },
          { name: "Kaptai" },
          { name: "Kawkhali" },
          { name: "Bagaichhari" },
          { name: "Barkal" },
          { name: "Langadu" },
        ],
      },
      {
        name: "Khagrachhari",
        areas: [
          { name: "Khagrachhari Sadar" },
          { name: "Dighinala" },
          { name: "Panchhari" },
          { name: "Mahalchhari" },
          { name: "Matiranga" },
          { name: "Ramgarh" },
        ],
      },
      {
        name: "Bandarban",
        areas: [
          { name: "Bandarban Sadar" },
          { name: "Ruma" },
          { name: "Thanchi" },
          { name: "Lama" },
          { name: "Naikhongchhari" },
          { name: "Ali Kadam" },
        ],
      },
    ],
  },
  {
    name: "Rajshahi Division",
    cities: [
      {
        name: "Rajshahi",
        areas: [
          { name: "Boalia" },
          { name: "Motihar" },
          { name: "Shah Makhdum" },
          { name: "Rajpara" },
          { name: "Kashiadanga" },
          { name: "Baneswar" },
          { name: "Nowhata" },
          { name: "Kazla" },
          { name: "Katakhali" },
        ],
      },
      {
        name: "Bogra",
        areas: [
          { name: "Bogra Sadar" },
          { name: "Shajahanpur" },
          { name: "Gabtali" },
          { name: "Sherpur" },
          { name: "Shibganj" },
          { name: "Sonatala" },
          { name: "Nandigram" },
        ],
      },
      {
        name: "Sirajganj",
        areas: [
          { name: "Sirajganj Sadar" },
          { name: "Shahjadpur" },
          { name: "Ullahpara" },
          { name: "Raiganj" },
          { name: "Kazipur" },
          { name: "Belkuchi" },
          { name: "Chauhali" },
        ],
      },
      {
        name: "Pabna",
        areas: [
          { name: "Pabna Sadar" },
          { name: "Ishwardi" },
          { name: "Bera" },
          { name: "Atgharia" },
          { name: "Chatmohar" },
          { name: "Bhangura" },
          { name: "Santhia" },
        ],
      },
      {
        name: "Natore",
        areas: [
          { name: "Natore Sadar" },
          { name: "Baraigram" },
          { name: "Bagatipara" },
          { name: "Lalpur" },
          { name: "Singra" },
          { name: "Naldanga" },
          { name: "Gurudaspur" },
        ],
      },
      {
        name: "Naogaon",
        areas: [
          { name: "Naogaon Sadar" },
          { name: "Manda" },
          { name: "Niamatpur" },
          { name: "Atrai" },
          { name: "Raninagar" },
          { name: "Patnitala" },
          { name: "Sapahar" },
        ],
      },
      {
        name: "Joypurhat",
        areas: [
          { name: "Joypurhat Sadar" },
          { name: "Akkelpur" },
          { name: "Kalai" },
          { name: "Khetlal" },
          { name: "Panchbibi" },
        ],
      },
      {
        name: "Chapainawabganj",
        areas: [
          { name: "Chapainawabganj Sadar" },
          { name: "Shibganj" },
          { name: "Gomastapur" },
          { name: "Nachole" },
          { name: "Bholahat" },
        ],
      },
    ],
  },
  {
    name: "Khulna Division",
    cities: [
      {
        name: "Khulna",
        areas: [
          { name: "Sonadanga" },
          { name: "Khalishpur" },
          { name: "Daulatpur" },
          { name: "Khanjahan Ali" },
          { name: "Aranghata" },
          { name: "Harintana" },
          { name: "Dakshin Batiaghata" },
          { name: "Phultala" },
          { name: "Rupsha" },
          { name: "Dighalia" },
          { name: "Terokhada" },
        ],
      },
      {
        name: "Jessore",
        areas: [
          { name: "Jessore Sadar" },
          { name: "Chanchra" },
          { name: "Monirampur" },
          { name: "Abhaynagar" },
          { name: "Bagherpara" },
          { name: "Chaugachha" },
          { name: "Sharsha" },
        ],
      },
      {
        name: "Satkhira",
        areas: [
          { name: "Satkhira Sadar" },
          { name: "Assasuni" },
          { name: "Debhata" },
          { name: "Kalaroa" },
          { name: "Kaliganj" },
          { name: "Shyamnagar" },
          { name: "Tala" },
        ],
      },
      {
        name: "Bagerhat",
        areas: [
          { name: "Bagerhat Sadar" },
          { name: "Mongla" },
          { name: "Fakirhat" },
          { name: "Mollahat" },
          { name: "Rampal" },
          { name: "Kachua" },
          { name: "Morrelganj" },
        ],
      },
      {
        name: "Kushtia",
        areas: [
          { name: "Kushtia Sadar" },
          { name: "Kumarkhali" },
          { name: "Khoksa" },
          { name: "Mirpur" },
          { name: "Daulatpur" },
          { name: "Bheramara" },
        ],
      },
      {
        name: "Magura",
        areas: [
          { name: "Magura Sadar" },
          { name: "Shalikha" },
          { name: "Mohammadpur" },
          { name: "Sreepur" },
        ],
      },
      {
        name: "Meherpur",
        areas: [
          { name: "Meherpur Sadar" },
          { name: "Mujibnagar" },
          { name: "Gangni" },
        ],
      },
      {
        name: "Narail",
        areas: [
          { name: "Narail Sadar" },
          { name: "Lohagara" },
          { name: "Kalia" },
        ],
      },
      {
        name: "Chuadanga",
        areas: [
          { name: "Chuadanga Sadar" },
          { name: "Alamdanga" },
          { name: "Damurhuda" },
          { name: "Jibannagar" },
        ],
      },
      {
        name: "Jhenaidah",
        areas: [
          { name: "Jhenaidah Sadar" },
          { name: "Shailkupa" },
          { name: "Harinakunda" },
          { name: "Kotchandpur" },
          { name: "Maheshpur" },
          { name: "Kaliganj" },
        ],
      },
    ],
  },
  {
    name: "Barisal Division",
    cities: [
      {
        name: "Barisal",
        areas: [
          { name: "Barisal Sadar" },
          { name: "Kotwali" },
          { name: "Rupatali" },
          { name: "Hizar" },
          { name: "Gournadi" },
          { name: "Babuganj" },
          { name: "Muladi" },
          { name: "Mehendiganj" },
        ],
      },
      {
        name: "Patuakhali",
        areas: [
          { name: "Patuakhali Sadar" },
          { name: "Bauphal" },
          { name: "Dashmina" },
          { name: "Galachipa" },
          { name: "Kalapara" },
          { name: "Mirzaganj" },
          { name: "Dumki" },
        ],
      },
      {
        name: "Bhola",
        areas: [
          { name: "Bhola Sadar" },
          { name: "Borhanuddin" },
          { name: "Char Fasson" },
          { name: "Daulatkhan" },
          { name: "Lalmohan" },
          { name: "Manpura" },
          { name: "Tazumuddin" },
        ],
      },
      {
        name: "Pirojpur",
        areas: [
          { name: "Pirojpur Sadar" },
          { name: "Bhandaria" },
          { name: "Kawkhali" },
          { name: "Mathbaria" },
          { name: "Nazirpur" },
          { name: "Nesarabad" },
        ],
      },
      {
        name: "Jhalokati",
        areas: [
          { name: "Jhalokati Sadar" },
          { name: "Kathalia" },
          { name: "Nalchity" },
          { name: "Rajapur" },
        ],
      },
      {
        name: "Barguna",
        areas: [
          { name: "Barguna Sadar" },
          { name: "Amtali" },
          { name: "Betagi" },
          { name: "Bamna" },
          { name: "Patharghata" },
          { name: "Taltali" },
        ],
      },
    ],
  },
  {
    name: "Sylhet Division",
    cities: [
      {
        name: "Sylhet",
        areas: [
          { name: "Sylhet Sadar" },
          { name: "Jalalabad" },
          { name: "South Surma" },
          { name: "Khadimnagar" },
          { name: "Zakiganj" },
          { name: "Kanaighat" },
          { name: "Beanibazar" },
          { name: "Golapganj" },
          { name: "Fenchuganj" },
        ],
      },
      {
        name: "Moulvibazar",
        areas: [
          { name: "Moulvibazar Sadar" },
          { name: "Sreemangal" },
          { name: "Kamalganj" },
          { name: "Barlekha" },
          { name: "Juri" },
          { name: "Rajnagar" },
          { name: "Kulaura" },
        ],
      },
      {
        name: "Habiganj",
        areas: [
          { name: "Habiganj Sadar" },
          { name: "Nabiganj" },
          { name: "Bahubal" },
          { name: "Ajmiriganj" },
          { name: "Lakhai" },
          { name: "Madhabpur" },
          { name: "Chunarughat" },
        ],
      },
      {
        name: "Sunamganj",
        areas: [
          { name: "Sunamganj Sadar" },
          { name: "Chhatak" },
          { name: "Derai" },
          { name: "Dharampasha" },
          { name: "Jagannathpur" },
          { name: "Jamalganj" },
          { name: "Shantiganj" },
        ],
      },
    ],
  },
  {
    name: "Rangpur Division",
    cities: [
      {
        name: "Rangpur",
        areas: [
          { name: "Rangpur Sadar" },
          { name: "Badarganj" },
          { name: "Pirganj" },
          { name: "Kaunia" },
          { name: "Mithapukur" },
          { name: "Gangachara" },
          { name: "Taraganj" },
        ],
      },
      {
        name: "Dinajpur",
        areas: [
          { name: "Dinajpur Sadar" },
          { name: "Birampur" },
          { name: "Birganj" },
          { name: "Kaharol" },
          { name: "Khansama" },
          { name: "Bochaganj" },
          { name: "Parbatipur" },
        ],
      },
      {
        name: "Thakurgaon",
        areas: [
          { name: "Thakurgaon Sadar" },
          { name: "Baliadangi" },
          { name: "Ranisankail" },
          { name: "Haripur" },
          { name: "Pirganj" },
        ],
      },
      {
        name: "Panchagarh",
        areas: [
          { name: "Panchagarh Sadar" },
          { name: "Debiganj" },
          { name: "Atwari" },
          { name: "Boda" },
          { name: "Tetulia" },
        ],
      },
      {
        name: "Nilphamari",
        areas: [
          { name: "Nilphamari Sadar" },
          { name: "Saidpur" },
          { name: "Domar" },
          { name: "Dimla" },
          { name: "Jaldhaka" },
          { name: "Kishoreganj" },
        ],
      },
      {
        name: "Kurigram",
        areas: [
          { name: "Kurigram Sadar" },
          { name: "Nageshwari" },
          { name: "Bhurungamari" },
          { name: "Ulipur" },
          { name: "Chilmari" },
          { name: "Rajarhat" },
        ],
      },
      {
        name: "Lalmonirhat",
        areas: [
          { name: "Lalmonirhat Sadar" },
          { name: "Hatibandha" },
          { name: "Kaliganj" },
          { name: "Patgram" },
          { name: "Aditmari" },
        ],
      },
      {
        name: "Gaibandha",
        areas: [
          { name: "Gaibandha Sadar" },
          { name: "Gobindaganj" },
          { name: "Palashbari" },
          { name: "Saghata" },
          { name: "Sadullapur" },
          { name: "Sundarganj" },
        ],
      },
    ],
  },
  {
    name: "Mymensingh Division",
    cities: [
      {
        name: "Mymensingh",
        areas: [
          { name: "Mymensingh Sadar" },
          { name: "Trishal" },
          { name: "Muktagachha" },
          { name: "Bhaluka" },
          { name: "Phulpur" },
          { name: "Gafargaon" },
          { name: "Ishwarganj" },
          { name: "Nandail" },
          { name: "Haluaghat" },
        ],
      },
      {
        name: "Jamalpur",
        areas: [
          { name: "Jamalpur Sadar" },
          { name: "Dewanganj" },
          { name: "Islampur" },
          { name: "Madarganj" },
          { name: "Sarishabari" },
          { name: "Bakshiganj" },
        ],
      },
      {
        name: "Netrokona",
        areas: [
          { name: "Netrokona Sadar" },
          { name: "Kendua" },
          { name: "Atpara" },
          { name: "Barhatta" },
          { name: "Durgapur" },
          { name: "Kalmakanda" },
          { name: "Purbadhala" },
        ],
      },
      {
        name: "Sherpur",
        areas: [
          { name: "Sherpur Sadar" },
          { name: "Nalitabari" },
          { name: "Sreebardi" },
          { name: "Jhenaigati" },
        ],
      },
    ],
  },
];

export function getRegions(): string[] {
  return locations.map((r) => r.name);
}

export function getCitiesByRegion(regionName: string): string[] {
  const region = locations.find((r) => r.name === regionName);
  return region ? region.cities.map((c) => c.name) : [];
}

export function getAreasByCity(regionName: string, cityName: string): string[] {
  const region = locations.find((r) => r.name === regionName);
  if (!region) return [];
  const city = region.cities.find((c) => c.name === cityName);
  return city ? city.areas.map((a) => a.name) : [];
}