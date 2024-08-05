// src/constants.js
export const VOWELS = {
    'dirgha' : ['Layer','आ','ई','ऊ','⌫','ऐ','औ', 'ॠ'],
    'harshwa' : ['<','अ','इ','उ','>','ए','ओ','ऋ']
}
export const SPECIAL_CHARS = {
    'set1': ['ं','ः','ॅ','ॉ','ँ'],
    'set2' : ['ळ','॥','ऽ','ॐ','॰'] 
}

export const DIACRATICS = ['्', '', 'ा', 'ि','ी', 'ु', 'ू', 'ृ','ॄ', 'े', 'ै', 'ो','ौ','ं', 'ः','ँ', 'ॅ', 'ॉ']
export const CONSONANTS = {
  'varg-1' :['क', 'ख', 'ग', 'घ', 'ङ','्','।'],
  'varg-2':['च', 'छ', 'ज', 'झ', 'ञ',',','↵'],
  'varg-3':['ट', 'ठ', 'ड', 'ढ', 'ण'],
  'varg-4':['त', 'थ', 'द', 'ध', 'न'],
  'varg-5':['प', 'फ', 'ब', 'भ', 'म','्','।'],
  'varg-6':['य', 'र', 'ल', 'व', 'श',',','↵'],
  'varg-7':['ष', 'स', 'ह', 'क्ष','ज्ञ'],
};

export const CONSTANT_COMBINATIONS_MAPPING = {
    '्':'्',
  'अ': '',
  'आ': 'ा',
  'इ': 'ि',
  'ई': 'ी',
  'उ': 'ु',
  'ऊ': 'ू',
  'ऋ': 'ृ',
  'ॠ': 'ॄ',
  'ए': 'े',
  'ऐ': 'ै',
  'ओ': 'ो',
  'औ': 'ौ',
  'ं': 'ं',
  'ः': 'ः',
  'ँ': 'ँ', 
  'ॅ': 'ॅ',
  'ॉ': 'ॉ',
  ' ':' '
};
