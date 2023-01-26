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
    alt: 'Вид на долину Архыз'
  },
  {
    name: 'Челябинская область',
    link: chelyabinskOblastImage,
    alt: 'Зимний вид на лесное озеро'
  },
  {
    name: 'Иваново',
    link: ivanovoImage,
    alt: 'Вид на жилой массив в городе'
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage,
    alt: 'Вид на гору с плато'
  },
  {
    name: 'Холмогорский район',
    link: kholmogorskyRayonImage,
    alt: 'Железная дорога посреди леса'
  },
  {
    name: 'Байкал',
    link: baikalImage,
    alt: 'Вид на берег зимнего озера'
  }
];
