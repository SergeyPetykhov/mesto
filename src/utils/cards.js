const arhyzImage = new URL('.././images/arkhyz.jpg', import.meta.url);
const chelyabinskOblastImage = new URL('.././images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('.././images/ivanovo.jpg', import.meta.url);
const kamchatkaImage = new URL('.././images/kamchatka.jpg', import.meta.url);
const kholmogorskyRayonImage = new URL('.././images/kholmogorsky-rayon.jpg', import.meta.url);
const baikalImage = new URL('.././images/baikal.jpg', import.meta.url);


export const initialElements = [
  {
    name: 'Архыз',
    link: arhyzImage,
  },
  {
    name: 'Челябинская область',
    link: chelyabinskOblastImage,
  },
  {
    name: 'Иваново',
    link: ivanovoImage,
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage,
  },
  {
    name: 'Холмогорский район',
    link: kholmogorskyRayonImage,
  },
  {
    name: 'Байкал',
    link: baikalImage,
  }
];
