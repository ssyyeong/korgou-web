const countryList = [
  {
    value: "Afghanistan - أفغانستان - 아프가니스탄",
    label: "Afghanistan - أفغانستان - 아프가니스탄",
  },
  {
    value: "Albania - Shqipëri - 알바니아",
    label: "Albania - Shqipëri - 알바니아",
  },
  { value: "Algeria - الجزائر - 알제리", label: "Algeria - الجزائر - 알제리" },
  { value: "Andorra - Andorra - 안도라", label: "Andorra - Andorra - 안도라" },
  { value: "Angola - Angola - 앙골라", label: "Angola - Angola - 앙골라" },
  {
    value: "Antigua and Barbuda - Antigua and Barbuda - 앤티가 바부다",
    label: "Antigua and Barbuda - Antigua and Barbuda - 앤티가 바부다",
  },
  {
    value: "Argentina - Argentina - 아르헨티나",
    label: "Argentina - Argentina - 아르헨티나",
  },
  {
    value: "Armenia - Հայաստան - 아르메니아",
    label: "Armenia - Հայաստան - 아르메니아",
  },
  {
    value: "Australia - Australia - 오스트레일리아",
    label: "Australia - Australia - 오스트레일리아",
  },
  {
    value: "Austria - Österreich - 오스트리아",
    label: "Austria - Österreich - 오스트리아",
  },
  {
    value: "Azerbaijan - Azərbaycan - 아제르바이잔",
    label: "Azerbaijan - Azərbaycan - 아제르바이잔",
  },
  {
    value: "Bahamas - The Bahamas - 바하마",
    label: "Bahamas - The Bahamas - 바하마",
  },
  { value: "Bahrain - البحرين - 바레인", label: "Bahrain - البحرين - 바레인" },
  {
    value: "Bangladesh - বাংলাদেশ - 방글라데시",
    label: "Bangladesh - বাংলাদেশ - 방글라데시",
  },
  {
    value: "Barbados - Barbados - 바베이도스",
    label: "Barbados - Barbados - 바베이도스",
  },
  {
    value: "Belarus - Беларусь - 벨라루스",
    label: "Belarus - Беларусь - 벨라루스",
  },
  { value: "Belgium - België - 벨기에", label: "Belgium - België - 벨기에" },
  { value: "Belize - Belize - 벨리즈", label: "Belize - Belize - 벨리즈" },
  { value: "Benin - Bénin - 베닌", label: "Benin - Bénin - 베닌" },
  { value: "Bhutan - Bhutan - 부탄", label: "Bhutan - Bhutan - 부탄" },
  {
    value: "Bolivia - Bolivia - 볼리비아",
    label: "Bolivia - Bolivia - 볼리비아",
  },
  {
    value:
      "Bosnia and Herzegovina - Bosna i Hercegovina - 보스니아 헤르체고비나",
    label:
      "Bosnia and Herzegovina - Bosna i Hercegovina - 보스니아 헤르체고비나",
  },
  {
    value: "Botswana - Botswana - 보츠와나",
    label: "Botswana - Botswana - 보츠와나",
  },
  { value: "Brazil - Brasil - 브라질", label: "Brazil - Brasil - 브라질" },
  { value: "Brunei - بروناي - 브루나이", label: "Brunei - بروناي - 브루나이" },
  {
    value: "Bulgaria - България - 불가리아",
    label: "Bulgaria - България - 불가리아",
  },
  {
    value: "Burkina Faso - Burkina Faso - 부르키나파소",
    label: "Burkina Faso - Burkina Faso - 부르키나파소",
  },
  { value: "Burundi - Burundi - 부룬디", label: "Burundi - Burundi - 부룬디" },
  {
    value: "Cabo Verde - Cabo Verde - 카보베르데",
    label: "Cabo Verde - Cabo Verde - 카보베르데",
  },
  {
    value: "Cambodia - កម្ពុជា - 캄보디아",
    label: "Cambodia - កម្ពុជា - 캄보디아",
  },
  {
    value: "Cameroon - Cameroun - 카메룬",
    label: "Cameroon - Cameroun - 카메룬",
  },
  { value: "Canada - Canada - 캐나다", label: "Canada - Canada - 캐나다" },
  {
    value:
      "Central African Republic - République centrafricaine - 중앙 아프리카 공화국",
    label:
      "Central African Republic - République centrafricaine - 중앙 아프리카 공화국",
  },
  { value: "Chad - Tchad - 차드", label: "Chad - Tchad - 차드" },
  { value: "Chile - Chile - 칠레", label: "Chile - Chile - 칠레" },
  { value: "China - 中国 - 중국", label: "China - 中国 - 중국" },
  {
    value: "Colombia - Colombia - 콜롬비아",
    label: "Colombia - Colombia - 콜롬비아",
  },
  { value: "Comoros - Comores - 코모로", label: "Comoros - Comores - 코모로" },
  {
    value: "Congo (Congo-Brazzaville) - Congo - 콩고",
    label: "Congo (Congo-Brazzaville) - Congo - 콩고",
  },
  {
    value:
      "Congo (Democratic Republic) - République Démocratique du Congo - 콩고 민주 공화국",
    label:
      "Congo (Democratic Republic) - République Démocratique du Congo - 콩고 민주 공화국",
  },
  {
    value: "Costa Rica - Costa Rica - 코스타리카",
    label: "Costa Rica - Costa Rica - 코스타리카",
  },
  {
    value: "Croatia - Hrvatska - 크로아티아",
    label: "Croatia - Hrvatska - 크로아티아",
  },
  { value: "Cuba - Cuba - 쿠바", label: "Cuba - Cuba - 쿠바" },
  { value: "Cyprus - Κύπρος - 키프로스", label: "Cyprus - Κύπρος - 키프로스" },
  {
    value: "Czech Republic - Česká republika - 체코",
    label: "Czech Republic - Česká republika - 체코",
  },
  { value: "Denmark - Danmark - 덴마크", label: "Denmark - Danmark - 덴마크" },
  { value: "Djibouti - جيبوتي - 지부티", label: "Djibouti - جيبوتي - 지부티" },
  {
    value: "Dominica - Dominica - 도미니카",
    label: "Dominica - Dominica - 도미니카",
  },
  {
    value: "Dominican Republic - República Dominicana - 도미니카 공화국",
    label: "Dominican Republic - República Dominicana - 도미니카 공화국",
  },
  {
    value: "Ecuador - Ecuador - 에콰도르",
    label: "Ecuador - Ecuador - 에콰도르",
  },
  { value: "Egypt - مصر - 이집트", label: "Egypt - مصر - 이집트" },
  {
    value: "El Salvador - El Salvador - 엘살바도르",
    label: "El Salvador - El Salvador - 엘살바도르",
  },
  {
    value: "Equatorial Guinea - Guinea Ecuatorial - 적도 기니",
    label: "Equatorial Guinea - Guinea Ecuatorial - 적도 기니",
  },
  {
    value: "Eritrea - إريتريا - 에리트레아",
    label: "Eritrea - إريتريا - 에리트레아",
  },
  {
    value: "Estonia - Eesti - 에스토니아",
    label: "Estonia - Eesti - 에스토니아",
  },
  {
    value: "Eswatini - Eswatini - 에스와티니",
    label: "Eswatini - Eswatini - 에스와티니",
  },
  {
    value: "Ethiopia - Ethiopia - 에티오피아",
    label: "Ethiopia - Ethiopia - 에티오피아",
  },
  { value: "Fiji - Fiji - 피지", label: "Fiji - Fiji - 피지" },
  { value: "Finland - Suomi - 핀란드", label: "Finland - Suomi - 핀란드" },
  { value: "France - France - 프랑스", label: "France - France - 프랑스" },
  { value: "Gabon - Gabon - 가봉", label: "Gabon - Gabon - 가봉" },
  { value: "Gambia - Gambia - 감비아", label: "Gambia - Gambia - 감비아" },
  {
    value: "Georgia - საქართველო - 조지아",
    label: "Georgia - საქართველო - 조지아",
  },
  {
    value: "Germany - Deutschland - 독일",
    label: "Germany - Deutschland - 독일",
  },
  { value: "Ghana - Ghana - 가나", label: "Ghana - Ghana - 가나" },
  { value: "Greece - Ελλάδα - 그리스", label: "Greece - Ελλάδα - 그리스" },
  {
    value: "Grenada - Grenada - 그레나다",
    label: "Grenada - Grenada - 그레나다",
  },
  {
    value: "Guatemala - Guatemala - 과테말라",
    label: "Guatemala - Guatemala - 과테말라",
  },
  { value: "Guinea - Guinée - 기니", label: "Guinea - Guinée - 기니" },
  {
    value: "Guinea-Bissau - Guiné-Bissau - 기니비사우",
    label: "Guinea-Bissau - Guiné-Bissau - 기니비사우",
  },
  { value: "Guyana - Guyana - 가이아나", label: "Guyana - Guyana - 가이아나" },
  { value: "Haiti - Haïti - 아이티", label: "Haiti - Haïti - 아이티" },
  {
    value: "Honduras - Honduras - 온두라스",
    label: "Honduras - Honduras - 온두라스",
  },
  {
    value: "Hungary - Magyarország - 헝가리",
    label: "Hungary - Magyarország - 헝가리",
  },
  {
    value: "Iceland - Ísland - 아이슬란드",
    label: "Iceland - Ísland - 아이슬란드",
  },
  { value: "India - भारत - 인도", label: "India - भारत - 인도" },
  {
    value: "Indonesia - Indonesia - 인도네시아",
    label: "Indonesia - Indonesia - 인도네시아",
  },
  { value: "Iran - ایران - 이란", label: "Iran - ایران - 이란" },
  { value: "Iraq - العراق - 이라크", label: "Iraq - العراق - 이라크" },
  { value: "Ireland - Éire - 아일랜드", label: "Ireland - Éire - 아일랜드" },
  { value: "Israel - ישראל - 이스라엘", label: "Israel - ישראל - 이스라엘" },
  { value: "Italy - Italia - 이탈리아", label: "Italy - Italia - 이탈리아" },
  {
    value: "Jamaica - Jamaica - 자메이카",
    label: "Jamaica - Jamaica - 자메이카",
  },
  { value: "Japan - 日本 - 일본", label: "Japan - 日本 - 일본" },
  { value: "Jordan - الأردن - 요르단", label: "Jordan - الأردن - 요르단" },
  {
    value: "Kazakhstan - Қазақстан - 카자흐스탄",
    label: "Kazakhstan - Қазақстан - 카자흐스탄",
  },
  { value: "Kenya - Kenya - 케냐", label: "Kenya - Kenya - 케냐" },
  {
    value: "Kiribati - Kiribati - 키리바시",
    label: "Kiribati - Kiribati - 키리바시",
  },
  { value: "Korea, North - 북한 - 북한", label: "Korea, North - 북한 - 북한" },
  {
    value: "Korea, South - 대한민국 - 대한민국",
    label: "Korea, South - 대한민국 - 대한민국",
  },
  { value: "Kuwait - الكويت - 쿠웨이트", label: "Kuwait - الكويت - 쿠웨이트" },
  {
    value: "Kyrgyzstan - Кыргызстан - 키르기스스탄",
    label: "Kyrgyzstan - Кыргызстан - 키르기스스탄",
  },
  { value: "Laos - ລາວ - 라오스", label: "Laos - ລາວ - 라오스" },
  {
    value: "Latvia - Latvija - 라트비아",
    label: "Latvia - Latvija - 라트비아",
  },
  { value: "Lebanon - لبنان - 레바논", label: "Lebanon - لبنان - 레바논" },
  { value: "Lesotho - Lesotho - 레소토", label: "Lesotho - Lesotho - 레소토" },
  {
    value: "Liberia - Liberia - 라이베리아",
    label: "Liberia - Liberia - 라이베리아",
  },
  { value: "Libya - ليبيا - 리비아", label: "Libya - ليبيا - 리비아" },
  {
    value: "Liechtenstein - Liechtenstein - 리히텐슈타인",
    label: "Liechtenstein - Liechtenstein - 리히텐슈타인",
  },
  {
    value: "Lithuania - Lietuva - 리투아니아",
    label: "Lithuania - Lietuva - 리투아니아",
  },
  {
    value: "Luxembourg - Lëtzebuerg - 룩셈부르크",
    label: "Luxembourg - Lëtzebuerg - 룩셈부르크",
  },
  {
    value: "Madagascar - Madagascar - 마다가스카르",
    label: "Madagascar - Madagascar - 마다가스카르",
  },
  { value: "Malawi - Malawi - 말라위", label: "Malawi - Malawi - 말라위" },
  {
    value: "Malaysia - Malaysia - 말레이시아",
    label: "Malaysia - Malaysia - 말레이시아",
  },
  { value: "Maldives - ދިވެހި - 몰디브", label: "Maldives - ދިވެހި - 몰디브" },
  { value: "Mali - Mali - 말리", label: "Mali - Mali - 말리" },
  { value: "Malta - Malta - 몰타", label: "Malta - Malta - 몰타" },
  {
    value: "Marshall Islands - Marshall Islands - 마셜 제도",
    label: "Marshall Islands - Marshall Islands - 마셜 제도",
  },
  {
    value: "Mauritania - موريتانيا - 모리타니",
    label: "Mauritania - موريتانيا - 모리타니",
  },
  {
    value: "Mauritius - Mauritius - 모리셔스",
    label: "Mauritius - Mauritius - 모리셔스",
  },
  { value: "Mexico - México - 멕시코", label: "Mexico - México - 멕시코" },
  {
    value: "Micronesia - Micronesia - 미크로네시아",
    label: "Micronesia - Micronesia - 미크로네시아",
  },
  { value: "Moldova - Moldova - 몰도바", label: "Moldova - Moldova - 몰도바" },
  { value: "Monaco - Monaco - 모나코", label: "Monaco - Monaco - 모나코" },
  {
    value: "Mongolia - Монгол улс - 몽골",
    label: "Mongolia - Монгол улс - 몽골",
  },
  {
    value: "Montenegro - Crna Gora - 몬테네그로",
    label: "Montenegro - Crna Gora - 몬테네그로",
  },
  { value: "Morocco - المغرب - 모로코", label: "Morocco - المغرب - 모로코" },
  {
    value: "Mozambique - Moçambique - 모잠비크",
    label: "Mozambique - Moçambique - 모잠비크",
  },
  {
    value: "Myanmar (Burma) - မြန်မာ - 미얀마",
    label: "Myanmar (Burma) - မြန်မာ - 미얀마",
  },
  {
    value: "Namibia - Namibia - 나미비아",
    label: "Namibia - Namibia - 나미비아",
  },
  { value: "Nauru - Nauru - 나우루", label: "Nauru - Nauru - 나우루" },
  { value: "Nepal - नेपाल - 네팔", label: "Nepal - नेपाल - 네팔" },
  {
    value: "Netherlands - Nederland - 네덜란드",
    label: "Netherlands - Nederland - 네덜란드",
  },
  {
    value: "New Zealand - Aotearoa - 뉴질랜드",
    label: "New Zealand - Aotearoa - 뉴질랜드",
  },
  {
    value: "Nicaragua - Nicaragua - 니카라과",
    label: "Nicaragua - Nicaragua - 니카라과",
  },
  { value: "Niger - Niger - 니제르", label: "Niger - Niger - 니제르" },
  {
    value: "Nigeria - Nigeria - 나이지리아",
    label: "Nigeria - Nigeria - 나이지리아",
  },
  {
    value: "North Macedonia - Северна Македонија - 북마케도니아",
    label: "North Macedonia - Северна Македонија - 북마케도니아",
  },
  { value: "Norway - Norge - 노르웨이", label: "Norway - Norge - 노르웨이" },
  { value: "Oman - عمان - 오만", label: "Oman - عمان - 오만" },
  {
    value: "Pakistan - پاکستان - 파키스탄",
    label: "Pakistan - پاکستان - 파키스탄",
  },
  { value: "Palau - Palau - 팔라우", label: "Palau - Palau - 팔라우" },
  { value: "Panama - Panamá - 파나마", label: "Panama - Panamá - 파나마" },
  {
    value: "Papua New Guinea - Papua New Guinea - 파푸아뉴기니",
    label: "Papua New Guinea - Papua New Guinea - 파푸아뉴기니",
  },
  {
    value: "Paraguay - Paraguay - 파라과이",
    label: "Paraguay - Paraguay - 파라과이",
  },
  { value: "Peru - Perú - 페루", label: "Peru - Perú - 페루" },
  {
    value: "Philippines - Pilipinas - 필리핀",
    label: "Philippines - Pilipinas - 필리핀",
  },
  { value: "Poland - Polska - 폴란드", label: "Poland - Polska - 폴란드" },
  {
    value: "Portugal - Portugal - 포르투갈",
    label: "Portugal - Portugal - 포르투갈",
  },
  { value: "Qatar - قطر - 카타르", label: "Qatar - قطر - 카타르" },
  {
    value: "Romania - România - 루마니아",
    label: "Romania - România - 루마니아",
  },
  { value: "Russia - Россия - 러시아", label: "Russia - Россия - 러시아" },
  { value: "Rwanda - Rwanda - 르완다", label: "Rwanda - Rwanda - 르완다" },
  {
    value: "Saint Kitts and Nevis - Saint Kitts and Nevis - 세인트키츠네비스",
    label: "Saint Kitts and Nevis - Saint Kitts and Nevis - 세인트키츠네비스",
  },
  {
    value: "Saint Lucia - Saint Lucia - 세인트루시아",
    label: "Saint Lucia - Saint Lucia - 세인트루시아",
  },
  {
    value:
      "Saint Vincent and the Grenadines - Saint Vincent and the Grenadines - 세인트빈센트그레나딘",
    label:
      "Saint Vincent and the Grenadines - Saint Vincent and the Grenadines - 세인트빈센트그레나딘",
  },
  { value: "Samoa - Samoa - 사모아", label: "Samoa - Samoa - 사모아" },
  {
    value: "San Marino - San Marino - 산마리노",
    label: "San Marino - San Marino - 산마리노",
  },
  {
    value: "Sao Tome and Principe - São Tomé e Príncipe - 상투메프린시페",
    label: "Sao Tome and Principe - São Tomé e Príncipe - 상투메프린시페",
  },
  {
    value: "Saudi Arabia - السعودية - 사우디아라비아",
    label: "Saudi Arabia - السعودية - 사우디아라비아",
  },
  { value: "Senegal - Sénégal - 세네갈", label: "Senegal - Sénégal - 세네갈" },
  { value: "Serbia - Србија - 세르비아", label: "Serbia - Србија - 세르비아" },
  {
    value: "Seychelles - Seychelles - 세이셸",
    label: "Seychelles - Seychelles - 세이셸",
  },
  {
    value: "Sierra Leone - Sierra Leone - 시에라리온",
    label: "Sierra Leone - Sierra Leone - 시에라리온",
  },
  {
    value: "Singapore - Singapore - 싱가포르",
    label: "Singapore - Singapore - 싱가포르",
  },
  {
    value: "Slovakia - Slovensko - 슬로바키아",
    label: "Slovakia - Slovensko - 슬로바키아",
  },
  {
    value: "Slovenia - Slovenija - 슬로베니아",
    label: "Slovenia - Slovenija - 슬로베니아",
  },
  {
    value: "Solomon Islands - Solomon Islands - 솔로몬제도",
    label: "Solomon Islands - Solomon Islands - 솔로몬제도",
  },
  {
    value: "Somalia - Soomaaliya - 소말리아",
    label: "Somalia - Soomaaliya - 소말리아",
  },
  {
    value: "South Africa - South Africa - 남아프리카공화국",
    label: "South Africa - South Africa - 남아프리카공화국",
  },
  {
    value: "South Sudan - South Sudan - 남수단",
    label: "South Sudan - South Sudan - 남수단",
  },
  { value: "Spain - España - 스페인", label: "Spain - España - 스페인" },
  {
    value: "Sri Lanka - ශ්‍රී ලංකා - 스리랑카",
    label: "Sri Lanka - ශ්‍රී ලංකා - 스리랑카",
  },
  { value: "Sudan - السودان - 수단", label: "Sudan - السودان - 수단" },
  {
    value: "Suriname - Suriname - 수리남",
    label: "Suriname - Suriname - 수리남",
  },
  { value: "Sweden - Sverige - 스웨덴", label: "Sweden - Sverige - 스웨덴" },
  {
    value: "Switzerland - Schweiz/Suisse/Svizzera - 스위스",
    label: "Switzerland - Schweiz/Suisse/Svizzera - 스위스",
  },
  { value: "Syria - سوريا - 시리아", label: "Syria - سوريا - 시리아" },
  { value: "Taiwan - 台灣 - 대만", label: "Taiwan - 台灣 - 대만" },
  {
    value: "Tajikistan - Тоҷикистон - 타지키스탄",
    label: "Tajikistan - Тоҷикистон - 타지키스탄",
  },
  {
    value: "Tanzania - Tanzania - 탄자니아",
    label: "Tanzania - Tanzania - 탄자니아",
  },
  {
    value: "Thailand - ประเทศไทย - 태국",
    label: "Thailand - ประเทศไทย - 태국",
  },
  { value: "Togo - Togo - 토고", label: "Togo - Togo - 토고" },
  { value: "Tonga - Tonga - 통가", label: "Tonga - Tonga - 통가" },
  {
    value: "Trinidad and Tobago - Trinidad and Tobago - 트리니다드토바고",
    label: "Trinidad and Tobago - Trinidad and Tobago - 트리니다드토바고",
  },
  { value: "Tunisia - تونس - 튀니지", label: "Tunisia - تونس - 튀니지" },
  {
    value: "Turkey - Türkiye - 튀르키예",
    label: "Turkey - Türkiye - 튀르키예",
  },
  {
    value: "Turkmenistan - Türkmenistan - 투르크메니스탄",
    label: "Turkmenistan - Türkmenistan - 투르크메니스탄",
  },
  { value: "Tuvalu - Tuvalu - 투발루", label: "Tuvalu - Tuvalu - 투발루" },
  { value: "Uganda - Uganda - 우간다", label: "Uganda - Uganda - 우간다" },
  {
    value: "Ukraine - Україна - 우크라이나",
    label: "Ukraine - Україна - 우크라이나",
  },
  {
    value: "United Arab Emirates - الإمارات العربية المتحدة - 아랍에미리트",
    label: "United Arab Emirates - الإمارات العربية المتحدة - 아랍에미리트",
  },
  {
    value: "United Kingdom - United Kingdom - 영국",
    label: "United Kingdom - United Kingdom - 영국",
  },
  {
    value: "United States - United States - 미국",
    label: "United States - United States - 미국",
  },
  {
    value: "Uruguay - Uruguay - 우루과이",
    label: "Uruguay - Uruguay - 우루과이",
  },
  {
    value: "Uzbekistan - O‘zbekiston - 우즈베키스탄",
    label: "Uzbekistan - O‘zbekiston - 우즈베키스탄",
  },
  {
    value: "Vanuatu - Vanuatu - 바누아투",
    label: "Vanuatu - Vanuatu - 바누아투",
  },
  {
    value: "Vatican City - Città del Vaticano - 바티칸",
    label: "Vatican City - Città del Vaticano - 바티칸",
  },
  {
    value: "Venezuela - Venezuela - 베네수엘라",
    label: "Venezuela - Venezuela - 베네수엘라",
  },
  {
    value: "Vietnam - Việt Nam - 베트남",
    label: "Vietnam - Việt Nam - 베트남",
  },
  { value: "Yemen - اليمن - 예멘", label: "Yemen - اليمن - 예멘" },
  { value: "Zambia - Zambia - 잠비아", label: "Zambia - Zambia - 잠비아" },
  {
    value: "Zimbabwe - Zimbabwe - 짐바브웨",
    label: "Zimbabwe - Zimbabwe - 짐바브웨",
  },
];

export { countryList };
