  import React, { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import { toast } from "react-toastify";
  import {
    FaPaperPlane,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendar,
    FaGraduationCap,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaIdCard,
    FaBook,
  } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  // API Base URL
  // const API_BASE = "http://localhost:5000";
  const API_BASE = "https://clc-backend-0isa.onrender.com";

  // State → District mapping
  const stateDistricts = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa"
  ],
  "Arunachal Pradesh": [
    "Tawang",
    "West Kameng",
    "East Kameng",
    "Papum Pare",
    "Kurung Kumey",
    "Kra Daadi",
    "Lower Subansiri",
    "Upper Subansiri",
    "West Siang",
    "East Siang",
    "Siang",
    "Upper Siang",
    "Lower Siang",
    "Lower Dibang Valley",
    "Dibang Valley",
    "Anjaw",
    "Lohit",
    "Namsai",
    "Changlang",
    "Tirap",
    "Longding"
  ],
  "Assam": [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup Metropolitan",
    "Kamrup",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran (Motihari)",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur (Bhabua)",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger (Monghyr)",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia (Purnea)",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran"
  ],
  "Chandigarh (UT)": [
    "Chandigarh"
  ],
  "Chhattisgarh": [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada (South Bastar)",
    "Dhamtari",
    "Durg",
    "Gariyaband",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham (Kawardha)",
    "Kanker (North Bastar)",
    "Kondagaon",
    "Korba",
    "Korea (Koriya)",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja"
  ],
  "Dadra and Nagar Haveli (UT)": [
    "Dadra & Nagar Haveli"
  ],
  "Daman and Diu (UT)": [
    "Daman",
    "Diu"
  ],
  "Delhi (NCT)": [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi"
  ],
  "Goa": [
    "North Goa",
    "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha (Palanpur)",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udepur",
    "Dahod",
    "Dangs (Ahwa)",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kachchh",
    "Kheda (Nadiad)",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada (Rajpipla)",
    "Navsari",
    "Panchmahal (Godhra)",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha (Himmatnagar)",
    "Surat",
    "Surendranagar",
    "Tapi (Vyara)",
    "Vadodara",
    "Valsad"
  ],
  "Haryana": [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurgaon",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Mewat",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul & Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur (Sirmour)",
    "Solan",
    "Una"
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipore",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kargil",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Leh",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur"
  ],
  "Jharkhand": [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribag",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Seraikela-Kharsawan",
    "Simdega",
    "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkot",
    "Ballari (Bellary)",
    "Belagavi (Belgaum)",
    "Bengaluru (Bangalore) Rural",
    "Bengaluru (Bangalore) Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru (Chikmagalur)",
    "Chitradurga",
    "Dakshina Kannada",
    "Davangere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi (Gulbarga)",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru (Mysore)",
    "Raichur",
    "Ramanagara",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayapura (Bijapur)",
    "Yadgir"
  ],
  "Kerala": [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
  ],
  "Lakshadweep (UT)": [
    "Agatti",
    "Amini",
    "Androth",
    "Bithra",
    "Chethlath",
    "Kavaratti",
    "Kadmath",
    "Kalpeni",
    "Kilthan",
    "Minicoy"
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl",
    "Champhai",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Serchhip"
  ],
  "Nagaland": [
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Peren",
    "Phek",
    "Tuensang",
    "Wokha",
    "Zunheboto"
  ],
  "Odisha": [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghapur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Sonepur",
    "Sundargarh"
  ],
  "Puducherry (UT)": [
    "Karaikal",
    "Mahe",
    "Pondicherry",
    "Yanam"
  ],
  "Punjab": [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Mansa",
    "Moga",
    "Muktsar",
    "Nawanshahr (Shahid Bhagat Singh Nagar)",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar (Mohali)",
    "Sangrur",
    "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur"
  ],
  "Sikkim": [
    "East Sikkim",
    "North Sikkim",
    "South Sikkim",
    "West Sikkim"
  ],
  "Tamil Nadu": [
    "Ariyalur",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Salem",
    "Sivaganga",
    "Thanjavur",
    "Theni",
    "Thoothukudi (Tuticorin)",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhoopalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal",
    "Nagarkurnool",
    "Nalgonda",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal (Rural)",
    "Warangal (Urban)",
    "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura"
  ],
  "Uttarakhand": [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi"
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Allahabad",
    "Ambedkar Nagar",
    "Amethi (Chatrapati Sahuji Mahraj Nagar)",
    "Amroha (J.P. Nagar)",
    "Auraiya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur (Panchsheel Nagar)",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kanshiram Nagar (Kasganj)",
    "Kaushambi",
    "Kushinagar (Padrauna)",
    "Lakhimpur - Kheri",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "RaeBareli",
    "Rampur",
    "Saharanpur",
    "Sambhal (Bhim Nagar)",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamali (Prabuddh Nagar)",
    "Shravasti",
    "Siddharth Nagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi"
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Burdwan (Bardhaman)",
    "Cooch Behar",
    "Dakshin Dinajpur (South Dinajpur)",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Medinipur (West Medinipur)",
    "Purba Medinipur (East Medinipur)",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur (North Dinajpur)"
  ]
};

  const Registration = () => {
    const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
      // Personal Details
      studentName: "",
      dateOfBirth: "",
      fatherName: "",
      motherName: "",
      nationality: "Indian",
      category: "",
      gender: "",
      phone: "",
      fatherContact: "",
      adhaarNo: "",
      subCategory: "",
      // Educational Details - 10th
      tenthBoard: "",
      tenthYear: "",
      tenthMarksheetNo: "",
      tenthRollNo: "",
      tenthTotalMarks: "",
      tenthMarksObtained: "",
      tenthPercentage: "",
      // Educational Details - 12th
      twelfthBoard: "",
      twelfthYear: "",
      twelfthMarksheetNo: "",
      twelfthRollNo: "",
      twelfthTotalMarks: "",
      twelfthMarksObtained: "",
      twelfthPercentage: "",
      // Educational Details - Graduation
      graduationBoard: "",
      graduationYear: "",
      graduationMarksheetNo: "",
      graduationRollNo: "",
      graduationTotalMarks: "",
      graduationMarksObtained: "",
      graduationPercentage: "",
      // Educational Details - Other
      otherBoard: "",
      otherYear: "",
      otherMarksheetNo: "",
      otherRollNo: "",
      otherTotalMarks: "",
      otherMarksObtained: "",
      otherPercentage: "",
      // Course
      course: "",
      // Communication Details
      address: "",
      state: "",
      district: "",
      pincode: "",
      email: "",
      panVoterIdNumber: "",
      // Declaration
      declarationAccepted: false,
    });

    const [photo, setPhoto] = useState(null);
    const [signature, setSignature] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const courses = [
      { code: "BBA", name: "Bachelor of Business Administration" },
      { code: "BCA", name: "Bachelor of Computer Applications" },
      { code: "BCom", name: "Bachelor of Commerce" },
      { code: "BSc(AG)", name: "Bachelor of Science (Agriculture)" },
      { code: "BEd", name: "Bachelor of Education" },
      { code: "MEd", name: "Master of Education" },
      { code: "DElEd", name: "Diploma in Elementary Education" },
    ];

    // Calculate percentage automatically
    const calculatePercentage = (obtained, total) => {
      if (!obtained || !total || total === "0") return "";
      const percentage = (parseFloat(obtained) / parseFloat(total)) * 100;
      return percentage.toFixed(2);
    };

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === "state") {
        setFormData((prev) => ({
          ...prev,
          state: value,
          district: "",
        }));
        return;
      }

      // Auto-calculate percentages when marks are entered
      let updatedFormData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      };

      // 10th percentage calculation
      if (name === "tenthTotalMarks" || name === "tenthMarksObtained") {
        const total = name === "tenthTotalMarks" ? value : formData.tenthTotalMarks;
        const obtained = name === "tenthMarksObtained" ? value : formData.tenthMarksObtained;
        updatedFormData.tenthPercentage = calculatePercentage(obtained, total);
      }

      // 12th percentage calculation
      if (name === "twelfthTotalMarks" || name === "twelfthMarksObtained") {
        const total = name === "twelfthTotalMarks" ? value : formData.twelfthTotalMarks;
        const obtained = name === "twelfthMarksObtained" ? value : formData.twelfthMarksObtained;
        updatedFormData.twelfthPercentage = calculatePercentage(obtained, total);
      }

      // Graduation percentage calculation
      if (name === "graduationTotalMarks" || name === "graduationMarksObtained") {
        const total = name === "graduationTotalMarks" ? value : formData.graduationTotalMarks;
        const obtained = name === "graduationMarksObtained" ? value : formData.graduationMarksObtained;
        updatedFormData.graduationPercentage = calculatePercentage(obtained, total);
      }

      // Other percentage calculation
      if (name === "otherTotalMarks" || name === "otherMarksObtained") {
        const total = name === "otherTotalMarks" ? value : formData.otherTotalMarks;
        const obtained = name === "otherMarksObtained" ? value : formData.otherMarksObtained;
        updatedFormData.otherPercentage = calculatePercentage(obtained, total);
      }

      setFormData(updatedFormData);
    };

    const handleFileChange = (e) => {
      const { name, files } = e.target;
      if (files && files[0]) {
        if (name === "photo") {
          setPhoto(files[0]);
        } else if (name === "signature") {
          setSignature(files[0]);
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        const formDataToSend = new FormData();

        // Append all form fields
        Object.keys(formData).forEach((key) => {
          if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
            formDataToSend.append(key, formData[key]);
          }
        });

        // Append files
        if (photo) formDataToSend.append("photo", photo);
        if (signature) formDataToSend.append("signature", signature);

        const response = await axios.post(
          `${API_BASE}/api/students/register`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          toast.success("Registration submitted successfully!");
          const studentId = response.data.data._id;
          // Navigate to details page
          navigate(`/registration-details/${studentId}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(
          error.response?.data?.message || "Failed to submit registration. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    };

    const stateOptions = Object.keys(stateDistricts);
    const districtOptions = formData.state ? stateDistricts[formData.state] : [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Student Registration Form
              </h1>
              {/* <p className="text-gray-600 text-lg">
                City Academy - Academic Session 2024-25
              </p> */}
            </motion.div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 sm:p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Personal Details Section */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-100">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FaUser className="text-blue-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Personal Details
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Step 1 of 4</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Student Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Student Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                            placeholder="Enter full name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaCalendar className="text-gray-400" />
                          </div>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                      </div>

                      {/* Mother Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mother Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleChange}
                          required
                          placeholder="Mother's full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Father Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Father Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                          required
                          placeholder="Father's full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        >
                          <option value="">Select Category</option>
                          <option value="General">General</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="EWS">EWS</option>
                        </select>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="10-digit mobile number"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                      </div>

                      {/* Adhar Number */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Adhar Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="adhaarNo"
                          value={formData.adhaarNo}
                          onChange={handleChange}
                          required
                          placeholder="12-digit Adhar number"
                          pattern="[0-9]{12}"
                          maxLength="12"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        />
                      </div>

                      {/* Sub Category */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Sub Category
                        </label>
                        <input
                          type="text"
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleChange}
                          placeholder="If applicable"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        />
                      </div>

                      {/* Father Contact Number */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Father Contact No.
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="fatherContact"
                            value={formData.fatherContact}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Educational Details Section */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-green-100">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <FaGraduationCap className="text-green-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Educational Details
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Step 2 of 4</p>
                      </div>
                    </div>

                    {/* 10th Details */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        10th or Equivalent
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Board/University Name
                          </label>
                          <input
                            type="text"
                            name="tenthBoard"
                            value={formData.tenthBoard}
                            onChange={handleChange}
                            placeholder="e.g., CBSE, UP Board"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year
                          </label>
                          <input
                            type="text"
                            name="tenthYear"
                            value={formData.tenthYear}
                            onChange={handleChange}
                            placeholder="YYYY"
                            pattern="[0-9]{4}"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Roll No
                          </label>
                          <input
                            type="text"
                            name="tenthRollNo"
                            value={formData.tenthRollNo}
                            onChange={handleChange}
                            placeholder="Roll number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Marksheet No
                          </label>
                          <input
                            type="text"
                            name="tenthMarksheetNo"
                            value={formData.tenthMarksheetNo}
                            onChange={handleChange}
                            placeholder="Marksheet number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Total Marks
                          </label>
                          <input
                            type="number"
                            name="tenthTotalMarks"
                            value={formData.tenthTotalMarks}
                            onChange={handleChange}
                            placeholder="Total"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Obtained Marks
                          </label>
                          <input
                            type="number"
                            name="tenthMarksObtained"
                            value={formData.tenthMarksObtained}
                            onChange={handleChange}
                            placeholder="Obtained"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Percentage (%)
                          </label>
                          <input
                            type="text"
                            name="tenthPercentage"
                            value={formData.tenthPercentage}
                            readOnly
                            placeholder="Auto-calculated"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 12th Details */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        12th or Equivalent
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Board/University Name
                          </label>
                          <input
                            type="text"
                            name="twelfthBoard"
                            value={formData.twelfthBoard}
                            onChange={handleChange}
                            placeholder="e.g., CBSE, UP Board"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year
                          </label>
                          <input
                            type="text"
                            name="twelfthYear"
                            value={formData.twelfthYear}
                            onChange={handleChange}
                            placeholder="YYYY"
                            pattern="[0-9]{4}"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Roll No
                          </label>
                          <input
                            type="text"
                            name="twelfthRollNo"
                            value={formData.twelfthRollNo}
                            onChange={handleChange}
                            placeholder="Roll number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Marksheet No
                          </label>
                          <input
                            type="text"
                            name="twelfthMarksheetNo"
                            value={formData.twelfthMarksheetNo}
                            onChange={handleChange}
                            placeholder="Marksheet number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Total Marks
                          </label>
                          <input
                            type="number"
                            name="twelfthTotalMarks"
                            value={formData.twelfthTotalMarks}
                            onChange={handleChange}
                            placeholder="Total"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Obtained Marks
                          </label>
                          <input
                            type="number"
                            name="twelfthMarksObtained"
                            value={formData.twelfthMarksObtained}
                            onChange={handleChange}
                            placeholder="Obtained"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Percentage (%)
                          </label>
                          <input
                            type="text"
                            name="twelfthPercentage"
                            value={formData.twelfthPercentage}
                            readOnly
                            placeholder="Auto-calculated"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Graduation Details */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Graduation (if applicable)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Board/University Name
                          </label>
                          <input
                            type="text"
                            name="graduationBoard"
                            value={formData.graduationBoard}
                            onChange={handleChange}
                            placeholder="University name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year
                          </label>
                          <input
                            type="text"
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            placeholder="YYYY"
                            pattern="[0-9]{4}"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Roll No
                          </label>
                          <input
                            type="text"
                            name="graduationRollNo"
                            value={formData.graduationRollNo}
                            onChange={handleChange}
                            placeholder="Roll number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Marksheet No
                          </label>
                          <input
                            type="text"
                            name="graduationMarksheetNo"
                            value={formData.graduationMarksheetNo}
                            onChange={handleChange}
                            placeholder="Marksheet number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Total Marks
                          </label>
                          <input
                            type="number"
                            name="graduationTotalMarks"
                            value={formData.graduationTotalMarks}
                            onChange={handleChange}
                            placeholder="Total"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Obtained Marks
                          </label>
                          <input
                            type="number"
                            name="graduationMarksObtained"
                            value={formData.graduationMarksObtained}
                            onChange={handleChange}
                            placeholder="Obtained"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Percentage (%)
                          </label>
                          <input
                            type="text"
                            name="graduationPercentage"
                            value={formData.graduationPercentage}
                            readOnly
                            placeholder="Auto-calculated"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Other Qualification */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Other Qualification (if any)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Board/University Name
                          </label>
                          <input
                            type="text"
                            name="otherBoard"
                            value={formData.otherBoard}
                            onChange={handleChange}
                            placeholder="University/Board name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year
                          </label>
                          <input
                            type="text"
                            name="otherYear"
                            value={formData.otherYear}
                            onChange={handleChange}
                            placeholder="YYYY"
                            pattern="[0-9]{4}"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Roll No
                          </label>
                          <input
                            type="text"
                            name="otherRollNo"
                            value={formData.otherRollNo}
                            onChange={handleChange}
                            placeholder="Roll number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Marksheet No
                          </label>
                          <input
                            type="text"
                            name="otherMarksheetNo"
                            value={formData.otherMarksheetNo}
                            onChange={handleChange}
                            placeholder="Marksheet number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Total Marks
                          </label>
                          <input
                            type="number"
                            name="otherTotalMarks"
                            value={formData.otherTotalMarks}
                            onChange={handleChange}
                            placeholder="Total"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Obtained Marks
                          </label>
                          <input
                            type="number"
                            name="otherMarksObtained"
                            value={formData.otherMarksObtained}
                            onChange={handleChange}
                            placeholder="Obtained"
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Percentage (%)
                          </label>
                          <input
                            type="text"
                            name="otherPercentage"
                            value={formData.otherPercentage}
                            readOnly
                            placeholder="Auto-calculated"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Course Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Course <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course.code} value={course.code}>
                            {course.name} ({course.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>

                  {/* Communication Details Section */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-purple-100">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <FaMapMarkerAlt className="text-purple-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Communication Details
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Step 3 of 4</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {/* Address */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows="3"
                          placeholder="Enter complete address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none resize-none"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* State */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            State <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          >
                            <option value="">Select State</option>
                            {stateOptions.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* District */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            District <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                            disabled={!formData.state}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">
                              {formData.state ? "Select District" : "Select State First"}
                            </option>
                            {districtOptions.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Pincode */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pincode <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            placeholder="6-digit pincode"
                            pattern="[0-9]{6}"
                            maxLength="6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="your.email@example.com"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                            />
                          </div>
                        </div>

                        {/* PAN/Voter ID */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            PAN/Voter ID Number
                          </label>
                          <input
                            type="text"
                            name="panVoterIdNumber"
                            value={formData.panVoterIdNumber}
                            onChange={handleChange}
                            placeholder="PAN or Voter ID"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Document Upload Section */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-100">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FaIdCard className="text-blue-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          Document Upload
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Step 4 of 4</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Upload Photo <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Passport size photo (Max 2MB, JPG/PNG)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Upload Signature <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            name="signature"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Clear signature (Max 1MB, JPG/PNG)
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Declaration Section */}
                  <section className="space-y-4">
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <input
                          type="checkbox"
                          name="declarationAccepted"
                          checked={formData.declarationAccepted}
                          onChange={handleChange}
                          required
                          className="mt-1 h-5 w-5 border-2 border-gray-400 rounded text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1">
                          <label className="text-base font-bold text-gray-900 flex items-center gap-2 cursor-pointer">
                            <FaCheckCircle className="text-blue-600" />
                            Declaration and Acceptance
                          </label>
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            मैं प्रमाणित करता हूँ कि आनलाइन आवेदन में भरी गयी समस्त
                            प्रविष्टियों मेरे पास उपलब्ध अभिलेखों पर आधारित है एवं मेरे
                            व्यक्तिगत जानकारी में सही एवं सत्य है। आवेदन करने की तिथि
                            को मेरे पास आनलाइन आवेदन में उल्लिखित समस्त
                            अंकपत्र/प्रमाणपत्र, आरक्षण एवं विशेष आरक्षण सम्बन्धी प्रमाण
                            पत्र उपलब्ध है। ऑनलाइन आवेदन पत्र में अपलोड की गयी मेरी फोटो
                            स्वतः स्पष्ट एवं दिये गये निर्देशानुसार हैं। मुझे विज्ञापन
                            की दी गयी समस्त शर्तें मान्य हैं। यदि परीक्षा के पूर्व अथवा
                            बाद में किसी भी स्तर पर जाँचोपरांत ऑनलाइन आवेदन पत्र में
                            कोई भी विवरण त्रुटिपूर्ण / असत्य पाया जाता है तो उसका समस्त
                            उत्तरदायित्व मेरा होगा और सम्बन्धित अधिकारी को मेरा
                            अभ्यर्थन निरस्त करने तथा मेरे विरुद्ध वैधानिक कार्यवाही
                            करने का अधिकार होगा।
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <motion.button
                      type="submit"
                      disabled={!formData.declarationAccepted || submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-xl" />
                          Submit Application
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  };

  export default Registration;