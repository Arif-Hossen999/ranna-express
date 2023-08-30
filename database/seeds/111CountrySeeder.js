'use strict'

/*
|--------------------------------------------------------------------------
| CountrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Country = use('App/Models/Country')
const Database = use('Database')

class CountrySeeder {
  async run() {
    const data = [
      {
        iso_code: 'AF',
        name: 'Afghanistan',
        isd_code: '93',
      },
      {
        iso_code: 'AL',
        name: 'Albania',
        isd_code: '355',
      },
      {
        iso_code: 'DZ',
        name: 'Algeria',
        isd_code: '213',
      },
      {
        iso_code: 'AS',
        name: 'American Samoa',
        isd_code: '1684',
      },
      {
        iso_code: 'AD',
        name: 'Andorra',
        isd_code: '376',
      },
      {
        iso_code: 'AO',
        name: 'Angola',
        isd_code: '244',
      },
      {
        iso_code: 'AI',
        name: 'Anguilla',
        isd_code: '1264',
      },
      {
        iso_code: 'AQ',
        name: 'Antarctica',
        isd_code: '0',
      },
      {
        iso_code: 'AG',
        name: 'Antigua And Barbuda',
        isd_code: '1268',
      },
      {
        iso_code: 'AR',
        name: 'Argentina',
        isd_code: '54',
      },
      {
        iso_code: 'AM',
        name: 'Armenia',
        isd_code: '374',
      },
      {
        iso_code: 'AW',
        name: 'Aruba',
        isd_code: '297',
      },
      {
        iso_code: 'AU',
        name: 'Australia',
        isd_code: '61',
      },
      {
        iso_code: 'AT',
        name: 'Austria',
        isd_code: '43',
      },
      {
        iso_code: 'AZ',
        name: 'Azerbaijan',
        isd_code: '994',
      },
      {
        iso_code: 'BS',
        name: 'Bahamas The',
        isd_code: '1242',
      },
      {
        iso_code: 'BH',
        name: 'Bahrain',
        isd_code: '973',
      },
      {
        iso_code: 'BD',
        name: 'Bangladesh',
        isd_code: '880',
      },
      {
        iso_code: 'BB',
        name: 'Barbados',
        isd_code: '1246',
      },
      {
        iso_code: 'BY',
        name: 'Belarus',
        isd_code: '375',
      },
      {
        iso_code: 'BE',
        name: 'Belgium',
        isd_code: '32',
      },
      {
        iso_code: 'BZ',
        name: 'Belize',
        isd_code: '501',
      },
      {
        iso_code: 'BJ',
        name: 'Benin',
        isd_code: '229',
      },
      {
        iso_code: 'BM',
        name: 'Bermuda',
        isd_code: '1441',
      },
      {
        iso_code: 'BT',
        name: 'Bhutan',
        isd_code: '975',
      },
      {
        iso_code: 'BO',
        name: 'Bolivia',
        isd_code: '591',
      },
      {
        iso_code: 'BA',
        name: 'Bosnia and Herzegovina',
        isd_code: '387',
      },
      {
        iso_code: 'BW',
        name: 'Botswana',
        isd_code: '267',
      },
      {
        iso_code: 'BV',
        name: 'Bouvet Island',
        isd_code: '0',
      },
      {
        iso_code: 'BR',
        name: 'Brazil',
        isd_code: '55',
      },
      {
        iso_code: 'IO',
        name: 'British Indian Ocean Territory',
        isd_code: '246',
      },
      {
        iso_code: 'BN',
        name: 'Brunei',
        isd_code: '673',
      },
      {
        iso_code: 'BG',
        name: 'Bulgaria',
        isd_code: '359',
      },
      {
        iso_code: 'BF',
        name: 'Burkina Faso',
        isd_code: '226',
      },
      {
        iso_code: 'BI',
        name: 'Burundi',
        isd_code: '257',
      },
      {
        iso_code: 'KH',
        name: 'Cambodia',
        isd_code: '855',
      },
      {
        iso_code: 'CM',
        name: 'Cameroon',
        isd_code: '237',
      },
      {
        iso_code: 'CA',
        name: 'Canada',
        isd_code: '1',
      },
      {
        iso_code: 'CV',
        name: 'Cape Verde',
        isd_code: '238',
      },
      {
        iso_code: 'KY',
        name: 'Cayman Islands',
        isd_code: '1345',
      },
      {
        iso_code: 'CF',
        name: 'Central African Republic',
        isd_code: '236',
      },
      {
        iso_code: 'TD',
        name: 'Chad',
        isd_code: '235',
      },
      {
        iso_code: 'CL',
        name: 'Chile',
        isd_code: '56',
      },
      {
        iso_code: 'CN',
        name: 'China',
        isd_code: '86',
      },
      {
        iso_code: 'CX',
        name: 'Christmas Island',
        isd_code: '61',
      },
      {
        iso_code: 'CC',
        name: 'Cocos (Keeling) Islands',
        isd_code: '672',
      },
      {
        iso_code: 'CO',
        name: 'Colombia',
        isd_code: '57',
      },
      {
        iso_code: 'KM',
        name: 'Comoros',
        isd_code: '269',
      },
      {
        iso_code: 'CG',
        name: 'Republic Of The Congo',
        isd_code: '242',
      },
      {
        iso_code: 'CD',
        name: 'Democratic Republic Of The Congo',
        isd_code: '242',
      },
      {
        iso_code: 'CK',
        name: 'Cook Islands',
        isd_code: '682',
      },
      {
        iso_code: 'CR',
        name: 'Costa Rica',
        isd_code: '506',
      },
      {
        iso_code: 'CI',
        name: "Cote D'Ivoire (Ivory Coast)",
        isd_code: '225',
      },
      {
        iso_code: 'HR',
        name: 'Croatia (Hrvatska)',
        isd_code: '385',
      },
      {
        iso_code: 'CU',
        name: 'Cuba',
        isd_code: '53',
      },
      {
        iso_code: 'CY',
        name: 'Cyprus',
        isd_code: '357',
      },
      {
        iso_code: 'CZ',
        name: 'Czech Republic',
        isd_code: '420',
      },
      {
        iso_code: 'DK',
        name: 'Denmark',
        isd_code: '45',
      },
      {
        iso_code: 'DJ',
        name: 'Djibouti',
        isd_code: '253',
      },
      {
        iso_code: 'DM',
        name: 'Dominica',
        isd_code: '1767',
      },
      {
        iso_code: 'DO',
        name: 'Dominican Republic',
        isd_code: '1809',
      },
      {
        iso_code: 'TP',
        name: 'East Timor',
        isd_code: '670',
      },
      {
        iso_code: 'EC',
        name: 'Ecuador',
        isd_code: '593',
      },
      {
        iso_code: 'EG',
        name: 'Egypt',
        isd_code: '20',
      },
      {
        iso_code: 'SV',
        name: 'El Salvador',
        isd_code: '503',
      },
      {
        iso_code: 'GQ',
        name: 'Equatorial Guinea',
        isd_code: '240',
      },
      {
        iso_code: 'ER',
        name: 'Eritrea',
        isd_code: '291',
      },
      {
        iso_code: 'EE',
        name: 'Estonia',
        isd_code: '372',
      },
      {
        iso_code: 'ET',
        name: 'Ethiopia',
        isd_code: '251',
      },
      {
        iso_code: 'XA',
        name: 'External Territories of Australia',
        isd_code: '61',
      },
      {
        iso_code: 'FK',
        name: 'Falkland Islands',
        isd_code: '500',
      },
      {
        iso_code: 'FO',
        name: 'Faroe Islands',
        isd_code: '298',
      },
      {
        iso_code: 'FJ',
        name: 'Fiji Islands',
        isd_code: '679',
      },
      {
        iso_code: 'FI',
        name: 'Finland',
        isd_code: '358',
      },
      {
        iso_code: 'FR',
        name: 'France',
        isd_code: '33',
      },
      {
        iso_code: 'GF',
        name: 'French Guiana',
        isd_code: '594',
      },
      {
        iso_code: 'PF',
        name: 'French Polynesia',
        isd_code: '689',
      },
      {
        iso_code: 'TF',
        name: 'French Southern Territories',
        isd_code: '0',
      },
      {
        iso_code: 'GA',
        name: 'Gabon',
        isd_code: '241',
      },
      {
        iso_code: 'GM',
        name: 'Gambia The',
        isd_code: '220',
      },
      {
        iso_code: 'GE',
        name: 'Georgia',
        isd_code: '995',
      },
      {
        iso_code: 'DE',
        name: 'Germany',
        isd_code: '49',
      },
      {
        iso_code: 'GH',
        name: 'Ghana',
        isd_code: '233',
      },
      {
        iso_code: 'GI',
        name: 'Gibraltar',
        isd_code: '350',
      },
      {
        iso_code: 'GR',
        name: 'Greece',
        isd_code: '30',
      },
      {
        iso_code: 'GL',
        name: 'Greenland',
        isd_code: '299',
      },
      {
        iso_code: 'GD',
        name: 'Grenada',
        isd_code: '1473',
      },
      {
        iso_code: 'GP',
        name: 'Guadeloupe',
        isd_code: '590',
      },
      {
        iso_code: 'GU',
        name: 'Guam',
        isd_code: '1671',
      },
      {
        iso_code: 'GT',
        name: 'Guatemala',
        isd_code: '502',
      },
      {
        iso_code: 'XU',
        name: 'Guernsey and Alderney',
        isd_code: '44',
      },
      {
        iso_code: 'GN',
        name: 'Guinea',
        isd_code: '224',
      },
      {
        iso_code: 'GW',
        name: 'Guinea-Bissau',
        isd_code: '245',
      },
      {
        iso_code: 'GY',
        name: 'Guyana',
        isd_code: '592',
      },
      {
        iso_code: 'HT',
        name: 'Haiti',
        isd_code: '509',
      },
      {
        iso_code: 'HM',
        name: 'Heard and McDonald Islands',
        isd_code: '0',
      },
      {
        iso_code: 'HN',
        name: 'Honduras',
        isd_code: '504',
      },
      {
        iso_code: 'HK',
        name: 'Hong Kong S.A.R.',
        isd_code: '852',
      },
      {
        iso_code: 'HU',
        name: 'Hungary',
        isd_code: '36',
      },
      {
        iso_code: 'IS',
        name: 'Iceland',
        isd_code: '354',
      },
      {
        iso_code: 'IN',
        name: 'India',
        isd_code: '91',
      },
      {
        iso_code: 'ID',
        name: 'Indonesia',
        isd_code: '62',
      },
      {
        iso_code: 'IR',
        name: 'Iran',
        isd_code: '98',
      },
      {
        iso_code: 'IQ',
        name: 'Iraq',
        isd_code: '964',
      },
      {
        iso_code: 'IE',
        name: 'Ireland',
        isd_code: '353',
      },
      {
        iso_code: 'IL',
        name: 'Israel',
        isd_code: '972',
      },
      {
        iso_code: 'IT',
        name: 'Italy',
        isd_code: '39',
      },
      {
        iso_code: 'JM',
        name: 'Jamaica',
        isd_code: '1876',
      },
      {
        iso_code: 'JP',
        name: 'Japan',
        isd_code: '81',
      },
      {
        iso_code: 'XJ',
        name: 'Jersey',
        isd_code: '44',
      },
      {
        iso_code: 'JO',
        name: 'Jordan',
        isd_code: '962',
      },
      {
        iso_code: 'KZ',
        name: 'Kazakhstan',
        isd_code: '7',
      },
      {
        iso_code: 'KE',
        name: 'Kenya',
        isd_code: '254',
      },
      {
        iso_code: 'KI',
        name: 'Kiribati',
        isd_code: '686',
      },
      {
        iso_code: 'KP',
        name: 'Korea North',
        isd_code: '850',
      },
      {
        iso_code: 'KR',
        name: 'Korea South',
        isd_code: '82',
      },
      {
        iso_code: 'KW',
        name: 'Kuwait',
        isd_code: '965',
      },
      {
        iso_code: 'KG',
        name: 'Kyrgyzstan',
        isd_code: '996',
      },
      {
        iso_code: 'LA',
        name: 'Laos',
        isd_code: '856',
      },
      {
        iso_code: 'LV',
        name: 'Latvia',
        isd_code: '371',
      },
      {
        iso_code: 'LB',
        name: 'Lebanon',
        isd_code: '961',
      },
      {
        iso_code: 'LS',
        name: 'Lesotho',
        isd_code: '266',
      },
      {
        iso_code: 'LR',
        name: 'Liberia',
        isd_code: '231',
      },
      {
        iso_code: 'LY',
        name: 'Libya',
        isd_code: '218',
      },
      {
        iso_code: 'LI',
        name: 'Liechtenstein',
        isd_code: '423',
      },
      {
        iso_code: 'LT',
        name: 'Lithuania',
        isd_code: '370',
      },
      {
        iso_code: 'LU',
        name: 'Luxembourg',
        isd_code: '352',
      },
      {
        iso_code: 'MO',
        name: 'Macau S.A.R.',
        isd_code: '853',
      },
      {
        iso_code: 'MK',
        name: 'Macedonia',
        isd_code: '389',
      },
      {
        iso_code: 'MG',
        name: 'Madagascar',
        isd_code: '261',
      },
      {
        iso_code: 'MW',
        name: 'Malawi',
        isd_code: '265',
      },
      {
        iso_code: 'MY',
        name: 'Malaysia',
        isd_code: '60',
      },
      {
        iso_code: 'MV',
        name: 'Maldives',
        isd_code: '960',
      },
      {
        iso_code: 'ML',
        name: 'Mali',
        isd_code: '223',
      },
      {
        iso_code: 'MT',
        name: 'Malta',
        isd_code: '356',
      },
      {
        iso_code: 'XM',
        name: 'Man (Isle of)',
        isd_code: '44',
      },
      {
        iso_code: 'MH',
        name: 'Marshall Islands',
        isd_code: '692',
      },
      {
        iso_code: 'MQ',
        name: 'Martinique',
        isd_code: '596',
      },
      {
        iso_code: 'MR',
        name: 'Mauritania',
        isd_code: '222',
      },
      {
        iso_code: 'MU',
        name: 'Mauritius',
        isd_code: '230',
      },
      {
        iso_code: 'YT',
        name: 'Mayotte',
        isd_code: '269',
      },
      {
        iso_code: 'MX',
        name: 'Mexico',
        isd_code: '52',
      },
      {
        iso_code: 'FM',
        name: 'Micronesia',
        isd_code: '691',
      },
      {
        iso_code: 'MD',
        name: 'Moldova',
        isd_code: '373',
      },
      {
        iso_code: 'MC',
        name: 'Monaco',
        isd_code: '377',
      },
      {
        iso_code: 'MN',
        name: 'Mongolia',
        isd_code: '976',
      },
      {
        iso_code: 'MS',
        name: 'Montserrat',
        isd_code: '1664',
      },
      {
        iso_code: 'MA',
        name: 'Morocco',
        isd_code: '212',
      },
      {
        iso_code: 'MZ',
        name: 'Mozambique',
        isd_code: '258',
      },
      {
        iso_code: 'MM',
        name: 'Myanmar',
        isd_code: '95',
      },
      {
        iso_code: 'NA',
        name: 'Namibia',
        isd_code: '264',
      },
      {
        iso_code: 'NR',
        name: 'Nauru',
        isd_code: '674',
      },
      {
        iso_code: 'NP',
        name: 'Nepal',
        isd_code: '977',
      },
      {
        iso_code: 'AN',
        name: 'Netherlands Antilles',
        isd_code: '599',
      },
      {
        iso_code: 'NL',
        name: 'Netherlands The',
        isd_code: '31',
      },
      {
        iso_code: 'NC',
        name: 'New Caledonia',
        isd_code: '687',
      },
      {
        iso_code: 'NZ',
        name: 'New Zealand',
        isd_code: '64',
      },
      {
        iso_code: 'NI',
        name: 'Nicaragua',
        isd_code: '505',
      },
      {
        iso_code: 'NE',
        name: 'Niger',
        isd_code: '227',
      },
      {
        iso_code: 'NG',
        name: 'Nigeria',
        isd_code: '234',
      },
      {
        iso_code: 'NU',
        name: 'Niue',
        isd_code: '683',
      },
      {
        iso_code: 'NF',
        name: 'Norfolk Island',
        isd_code: '672',
      },
      {
        iso_code: 'MP',
        name: 'Northern Mariana Islands',
        isd_code: '1670',
      },
      {
        iso_code: 'NO',
        name: 'Norway',
        isd_code: '47',
      },
      {
        iso_code: 'OM',
        name: 'Oman',
        isd_code: '968',
      },
      {
        iso_code: 'PK',
        name: 'Pakistan',
        isd_code: '92',
      },
      {
        iso_code: 'PW',
        name: 'Palau',
        isd_code: '680',
      },
      {
        iso_code: 'PS',
        name: 'Palestinian Territory Occupied',
        isd_code: '970',
      },
      {
        iso_code: 'PA',
        name: 'Panama',
        isd_code: '507',
      },
      {
        iso_code: 'PG',
        name: 'Papua new Guinea',
        isd_code: '675',
      },
      {
        iso_code: 'PY',
        name: 'Paraguay',
        isd_code: '595',
      },
      {
        iso_code: 'PE',
        name: 'Peru',
        isd_code: '51',
      },
      {
        iso_code: 'PH',
        name: 'Philippines',
        isd_code: '63',
      },
      {
        iso_code: 'PN',
        name: 'Pitcairn Island',
        isd_code: '0',
      },
      {
        iso_code: 'PL',
        name: 'Poland',
        isd_code: '48',
      },
      {
        iso_code: 'PT',
        name: 'Portugal',
        isd_code: '351',
      },
      {
        iso_code: 'PR',
        name: 'Puerto Rico',
        isd_code: '1787',
      },
      {
        iso_code: 'QA',
        name: 'Qatar',
        isd_code: '974',
      },
      {
        iso_code: 'RE',
        name: 'Reunion',
        isd_code: '262',
      },
      {
        iso_code: 'RO',
        name: 'Romania',
        isd_code: '40',
      },
      {
        iso_code: 'RU',
        name: 'Russia',
        isd_code: '70',
      },
      {
        iso_code: 'RW',
        name: 'Rwanda',
        isd_code: '250',
      },
      {
        iso_code: 'SH',
        name: 'Saint Helena',
        isd_code: '290',
      },
      {
        iso_code: 'KN',
        name: 'Saint Kitts And Nevis',
        isd_code: '1869',
      },
      {
        iso_code: 'LC',
        name: 'Saint Lucia',
        isd_code: '1758',
      },
      {
        iso_code: 'PM',
        name: 'Saint Pierre and Miquelon',
        isd_code: '508',
      },
      {
        iso_code: 'VC',
        name: 'Saint Vincent And The Grenadines',
        isd_code: '1784',
      },
      {
        iso_code: 'WS',
        name: 'Samoa',
        isd_code: '684',
      },
      {
        iso_code: 'SM',
        name: 'San Marino',
        isd_code: '378',
      },
      {
        iso_code: 'ST',
        name: 'Sao Tome and Principe',
        isd_code: '239',
      },
      {
        iso_code: 'SA',
        name: 'Saudi Arabia',
        isd_code: '966',
      },
      {
        iso_code: 'SN',
        name: 'Senegal',
        isd_code: '221',
      },
      {
        iso_code: 'RS',
        name: 'Serbia',
        isd_code: '381',
      },
      {
        iso_code: 'SC',
        name: 'Seychelles',
        isd_code: '248',
      },
      {
        iso_code: 'SL',
        name: 'Sierra Leone',
        isd_code: '232',
      },
      {
        iso_code: 'SG',
        name: 'Singapore',
        isd_code: '65',
      },
      {
        iso_code: 'SK',
        name: 'Slovakia',
        isd_code: '421',
      },
      {
        iso_code: 'SI',
        name: 'Slovenia',
        isd_code: '386',
      },
      {
        iso_code: 'XG',
        name: 'Smaller Territories of the UK',
        isd_code: '44',
      },
      {
        iso_code: 'SB',
        name: 'Solomon Islands',
        isd_code: '677',
      },
      {
        iso_code: 'SO',
        name: 'Somalia',
        isd_code: '252',
      },
      {
        iso_code: 'ZA',
        name: 'South Africa',
        isd_code: '27',
      },
      {
        iso_code: 'GS',
        name: 'South Georgia',
        isd_code: '0',
      },
      {
        iso_code: 'SS',
        name: 'South Sudan',
        isd_code: '211',
      },
      {
        iso_code: 'ES',
        name: 'Spain',
        isd_code: '34',
      },
      {
        iso_code: 'LK',
        name: 'Sri Lanka',
        isd_code: '94',
      },
      {
        iso_code: 'SD',
        name: 'Sudan',
        isd_code: '249',
      },
      {
        iso_code: 'SR',
        name: 'Suriname',
        isd_code: '597',
      },
      {
        iso_code: 'SJ',
        name: 'Svalbard And Jan Mayen Islands',
        isd_code: '47',
      },
      {
        iso_code: 'SZ',
        name: 'Swaziland',
        isd_code: '268',
      },
      {
        iso_code: 'SE',
        name: 'Sweden',
        isd_code: '46',
      },
      {
        iso_code: 'CH',
        name: 'Switzerland',
        isd_code: '41',
      },
      {
        iso_code: 'SY',
        name: 'Syria',
        isd_code: '963',
      },
      {
        iso_code: 'TW',
        name: 'Taiwan',
        isd_code: '886',
      },
      {
        iso_code: 'TJ',
        name: 'Tajikistan',
        isd_code: '992',
      },
      {
        iso_code: 'TZ',
        name: 'Tanzania',
        isd_code: '255',
      },
      {
        iso_code: 'TH',
        name: 'Thailand',
        isd_code: '66',
      },
      {
        iso_code: 'TG',
        name: 'Togo',
        isd_code: '228',
      },
      {
        iso_code: 'TK',
        name: 'Tokelau',
        isd_code: '690',
      },
      {
        iso_code: 'TO',
        name: 'Tonga',
        isd_code: '676',
      },
      {
        iso_code: 'TT',
        name: 'Trinidad And Tobago',
        isd_code: '1868',
      },
      {
        iso_code: 'TN',
        name: 'Tunisia',
        isd_code: '216',
      },
      {
        iso_code: 'TR',
        name: 'Turkey',
        isd_code: '90',
      },
      {
        iso_code: 'TM',
        name: 'Turkmenistan',
        isd_code: '7370',
      },
      {
        iso_code: 'TC',
        name: 'Turks And Caicos Islands',
        isd_code: '1649',
      },
      {
        iso_code: 'TV',
        name: 'Tuvalu',
        isd_code: '688',
      },
      {
        iso_code: 'UG',
        name: 'Uganda',
        isd_code: '256',
      },
      {
        iso_code: 'UA',
        name: 'Ukraine',
        isd_code: '380',
      },
      {
        iso_code: 'AE',
        name: 'United Arab Emirates',
        isd_code: '971',
      },
      {
        iso_code: 'GB',
        name: 'United Kingdom',
        isd_code: '44',
      },
      {
        iso_code: 'US',
        name: 'United States',
        isd_code: '1',
      },
      {
        iso_code: 'UM',
        name: 'United States Minor Outlying Islands',
        isd_code: '1',
      },
      {
        iso_code: 'UY',
        name: 'Uruguay',
        isd_code: '598',
      },
      {
        iso_code: 'UZ',
        name: 'Uzbekistan',
        isd_code: '998',
      },
      {
        iso_code: 'VU',
        name: 'Vanuatu',
        isd_code: '678',
      },
      {
        iso_code: 'VA',
        name: 'Vatican City State (Holy See)',
        isd_code: '39',
      },
      {
        iso_code: 'VE',
        name: 'Venezuela',
        isd_code: '58',
      },
      {
        iso_code: 'VN',
        name: 'Vietnam',
        isd_code: '84',
      },
      {
        iso_code: 'VG',
        name: 'Virgin Islands (British)',
        isd_code: '1284',
      },
      {
        iso_code: 'VI',
        name: 'Virgin Islands (US)',
        isd_code: '1340',
      },
      {
        iso_code: 'WF',
        name: 'Wallis And Futuna Islands',
        isd_code: '681',
      },
      {
        iso_code: 'EH',
        name: 'Western Sahara',
        isd_code: '212',
      },
      {
        iso_code: 'YE',
        name: 'Yemen',
        isd_code: '967',
      },
      {
        iso_code: 'YU',
        name: 'Yugoslavia',
        isd_code: '38',
      },
      {
        iso_code: 'ZM',
        name: 'Zambia',
        isd_code: '260',
      },
      {
        iso_code: 'ZW',
        name: 'Zimbabwe',
        isd_code: '263',
      },
    ]
    await Database.raw('SET FOREIGN_KEY_CHECKS=0;')
    await Database.truncate('countries')
    await Database.raw('SET FOREIGN_KEY_CHECKS=1;')
    const countries = await Country.createMany(data)
  }
}

module.exports = CountrySeeder
