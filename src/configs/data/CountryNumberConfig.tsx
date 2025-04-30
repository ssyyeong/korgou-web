const countryNumberList = [
  { value: "+93", label: "+93" }, // Afghanistan
  { value: "+355", label: "+355" }, // Albania
  { value: "+213", label: "+213" }, // Algeria
  { value: "+376", label: "+376" }, // Andorra
  { value: "+244", label: "+244" }, // Angola
  { value: "+1-268", label: "+1-268" }, // Antigua and Barbuda
  { value: "+54", label: "+54" }, // Argentina
  { value: "+374", label: "+374" }, // Armenia
  { value: "+61", label: "+61" }, // Australia
  { value: "+43", label: "+43" }, // Austria
  { value: "+994", label: "+994" }, // Azerbaijan
  { value: "+1-242", label: "+1-242" }, // Bahamas
  { value: "+973", label: "+973" }, // Bahrain
  { value: "+880", label: "+880" }, // Bangladesh
  { value: "+1-246", label: "+1-246" }, // Barbados
  { value: "+375", label: "+375" }, // Belarus
  { value: "+32", label: "+32" }, // Belgium
  { value: "+501", label: "+501" }, // Belize
  { value: "+229", label: "+229" }, // Benin
  { value: "+975", label: "+975" }, // Bhutan
  { value: "+591", label: "+591" }, // Bolivia
  { value: "+387", label: "+387" }, // Bosnia and Herzegovina
  { value: "+267", label: "+267" }, // Botswana
  { value: "+55", label: "+55" }, // Brazil
  { value: "+673", label: "+673" }, // Brunei
  { value: "+359", label: "+359" }, // Bulgaria
  { value: "+226", label: "+226" }, // Burkina Faso
  { value: "+257", label: "+257" }, // Burundi
  { value: "+238", label: "+238" }, // Cabo Verde
  { value: "+855", label: "+855" }, // Cambodia
  { value: "+237", label: "+237" }, // Cameroon
  { value: "+1", label: "+1" }, // Canada
  { value: "+236", label: "+236" }, // Central African Republic
  { value: "+235", label: "+235" }, // Chad
  { value: "+56", label: "+56" }, // Chile
  { value: "+86", label: "+86" }, // China
  { value: "+57", label: "+57" }, // Colombia
  { value: "+269", label: "+269" }, // Comoros
  { value: "+242", label: "+242" }, // Congo (Brazzaville)
  { value: "+243", label: "+243" }, // Congo (Kinshasa)
  { value: "+506", label: "+506" }, // Costa Rica
  { value: "+385", label: "+385" }, // Croatia
  { value: "+53", label: "+53" }, // Cuba
  { value: "+357", label: "+357" }, // Cyprus
  { value: "+420", label: "+420" }, // Czech Republic
  { value: "+45", label: "+45" }, // Denmark
  { value: "+253", label: "+253" }, // Djibouti
  { value: "+1-767", label: "+1-767" }, // Dominica
  { value: "+1-809", label: "+1-809" }, // Dominican Republic
  { value: "+593", label: "+593" }, // Ecuador
  { value: "+20", label: "+20" }, // Egypt
  { value: "+503", label: "+503" }, // El Salvador
  { value: "+240", label: "+240" }, // Equatorial Guinea
  { value: "+291", label: "+291" }, // Eritrea
  { value: "+372", label: "+372" }, // Estonia
  { value: "+268", label: "+268" }, // Eswatini
  { value: "+251", label: "+251" }, // Ethiopia
  { value: "+679", label: "+679" }, // Fiji
  { value: "+358", label: "+358" }, // Finland
  { value: "+33", label: "+33" }, // France
  { value: "+241", label: "+241" }, // Gabon
  { value: "+220", label: "+220" }, // Gambia
  { value: "+995", label: "+995" }, // Georgia
  { value: "+49", label: "+49" }, // Germany
  { value: "+233", label: "+233" }, // Ghana
  { value: "+30", label: "+30" }, // Greece
  { value: "+1-473", label: "+1-473" }, // Grenada
  { value: "+502", label: "+502" }, // Guatemala
  { value: "+224", label: "+224" }, // Guinea
  { value: "+245", label: "+245" }, // Guinea-Bissau
  { value: "+592", label: "+592" }, // Guyana
  { value: "+509", label: "+509" }, // Haiti
  { value: "+504", label: "+504" }, // Honduras
  { value: "+36", label: "+36" }, // Hungary
  { value: "+354", label: "+354" }, // Iceland
  { value: "+91", label: "+91" }, // India
  { value: "+62", label: "+62" }, // Indonesia
  { value: "+98", label: "+98" }, // Iran
  { value: "+964", label: "+964" }, // Iraq
  { value: "+353", label: "+353" }, // Ireland
  { value: "+972", label: "+972" }, // Israel
  { value: "+39", label: "+39" }, // Italy
  { value: "+1-876", label: "+1-876" }, // Jamaica
  { value: "+81", label: "+81" }, // Japan
  { value: "+962", label: "+962" }, // Jordan
  { value: "+7", label: "+7" }, // Kazakhstan
  { value: "+254", label: "+254" }, // Kenya
  { value: "+686", label: "+686" }, // Kiribati
  { value: "+850", label: "+850" }, // North Korea
  { value: "+82", label: "+82" }, // South Korea
  { value: "+965", label: "+965" }, // Kuwait
  { value: "+996", label: "+996" }, // Kyrgyzstan
  { value: "+856", label: "+856" }, // Laos
  { value: "+371", label: "+371" }, // Latvia
  { value: "+961", label: "+961" }, // Lebanon
  { value: "+266", label: "+266" }, // Lesotho
  { value: "+231", label: "+231" }, // Liberia
  { value: "+218", label: "+218" }, // Libya
  { value: "+423", label: "+423" }, // Liechtenstein
  { value: "+370", label: "+370" }, // Lithuania
  { value: "+352", label: "+352" }, // Luxembourg
  { value: "+261", label: "+261" }, // Madagascar
  { value: "+265", label: "+265" }, // Malawi
  { value: "+60", label: "+60" }, // Malaysia
  { value: "+960", label: "+960" }, // Maldives
  { value: "+223", label: "+223" }, // Mali
  { value: "+356", label: "+356" }, // Malta
  { value: "+692", label: "+692" }, // Marshall Islands
  { value: "+222", label: "+222" }, // Mauritania
  { value: "+230", label: "+230" }, // Mauritius
  { value: "+52", label: "+52" }, // Mexico
  { value: "+691", label: "+691" }, // Micronesia
  { value: "+373", label: "+373" }, // Moldova
  { value: "+377", label: "+377" }, // Monaco
  { value: "+976", label: "+976" }, // Mongolia
  { value: "+382", label: "+382" }, // Montenegro
  { value: "+212", label: "+212" }, // Morocco
  { value: "+258", label: "+258" }, // Mozambique
  { value: "+95", label: "+95" }, // Myanmar (Burma)
  { value: "+264", label: "+264" }, // Namibia
  { value: "+674", label: "+674" }, // Nauru
  { value: "+977", label: "+977" }, // Nepal
  { value: "+31", label: "+31" }, // Netherlands
  { value: "+64", label: "+64" }, // New Zealand
  { value: "+505", label: "+505" }, // Nicaragua
  { value: "+227", label: "+227" }, // Niger
  { value: "+234", label: "+234" }, // Nigeria
  { value: "+47", label: "+47" }, // Norway
  { value: "+968", label: "+968" }, // Oman
  { value: "+92", label: "+92" }, // Pakistan
  { value: "+680", label: "+680" }, // Palau
  { value: "+970", label: "+970" }, // Palestine
  { value: "+507", label: "+507" }, // Panama
  { value: "+675", label: "+675" }, // Papua New Guinea
  { value: "+595", label: "+595" }, // Paraguay
  { value: "+51", label: "+51" }, // Peru
  { value: "+63", label: "+63" }, // Philippines
  { value: "+48", label: "+48" }, // Poland
  { value: "+351", label: "+351" }, // Portugal
  { value: "+1-787", label: "+1-787" }, // Puerto Rico
  { value: "+974", label: "+974" }, // Qatar
  { value: "+40", label: "+40" }, // Romania
  { value: "+7", label: "+7" }, // Russia
  { value: "+250", label: "+250" }, // Rwanda
  { value: "+1-869", label: "+1-869" }, // Saint Kitts and Nevis
  { value: "+1-758", label: "+1-758" }, // Saint Lucia
  { value: "+1-784", label: "+1-784" }, // Saint Vincent and the Grenadines
  { value: "+685", label: "+685" }, // Samoa
  { value: "+378", label: "+378" }, // San Marino
  { value: "+239", label: "+239" }, // Sao Tome and Principe
  { value: "+966", label: "+966" }, // Saudi Arabia
  { value: "+221", label: "+221" }, // Senegal
  { value: "+381", label: "+381" }, // Serbia
  { value: "+248", label: "+248" }, // Seychelles
  { value: "+232", label: "+232" }, // Sierra Leone
  { value: "+65", label: "+65" }, // Singapore
  { value: "+421", label: "+421" }, // Slovakia
  { value: "+386", label: "+386" }, // Slovenia
  { value: "+677", label: "+677" }, // Solomon Islands
  { value: "+252", label: "+252" }, // Somalia
  { value: "+27", label: "+27" }, // South Africa
  { value: "+211", label: "+211" }, // South Sudan
  { value: "+34", label: "+34" }, // Spain
  { value: "+94", label: "+94" }, // Sri Lanka
  { value: "+249", label: "+249" }, // Sudan
  { value: "+597", label: "+597" }, // Suriname
  { value: "+46", label: "+46" }, // Sweden
  { value: "+41", label: "+41" }, // Switzerland
  { value: "+963", label: "+963" }, // Syria
  { value: "+886", label: "+886" }, // Taiwan
  { value: "+992", label: "+992" }, // Tajikistan
  { value: "+255", label: "+255" }, // Tanzania
  { value: "+66", label: "+66" }, // Thailand
  { value: "+228", label: "+228" }, // Togo
  { value: "+676", label: "+676" }, // Tonga
  { value: "+1-868", label: "+1-868" }, // Trinidad and Tobago
  { value: "+216", label: "+216" }, // Tunisia
  { value: "+90", label: "+90" }, // Turkey
  { value: "+993", label: "+993" }, // Turkmenistan
  { value: "+688", label: "+688" }, // Tuvalu
  { value: "+256", label: "+256" }, // Uganda
  { value: "+380", label: "+380" }, // Ukraine
  { value: "+971", label: "+971" }, // United Arab Emirates
  { value: "+44", label: "+44" }, // United Kingdom
  { value: "+1", label: "+1" }, // United States
  { value: "+598", label: "+598" }, // Uruguay
  { value: "+998", label: "+998" }, // Uzbekistan
  { value: "+678", label: "+678" }, // Vanuatu
  { value: "+379", label: "+379" }, // Vatican City
  { value: "+58", label: "+58" }, // Venezuela
  { value: "+84", label: "+84" }, // Vietnam
  { value: "+967", label: "+967" }, // Yemen
  { value: "+260", label: "+260" }, // Zambia
  { value: "+263", label: "+263" }, // Zimbabwe
];

export { countryNumberList };
