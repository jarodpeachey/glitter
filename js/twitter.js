const getCookie = (cookieName) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

// DEFAULT THEME IF FIRST LOAD
const lightTheme = {
  name: 'theme-light',
  title: 'Default',
  category: 'light',
  primarycolor: '#1DA1F2',
  backgroundcolor: '#f1f1f1',
  hovercolor: '#f7f7f7',
  cardbackground: '#ffffff',
  accentcolor: '#f1f1f1',
  bordercolor: '#bbbbbb',
  textcolor: '#222222',
  cardborderradius: '8px',
  cardbordercolor: '#000000',
  cardborderwidth: '0',
  cardshadow:
    'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  buttonborderradius: '6px',
  buttontextcolor: '#ffffff',
  inputtextcolor: '#111111',
  inputbackground: '#ffffff',
};

// LOAD CURRENT THEME
const primarycolor = getCookie('primarycolor');
const backgroundcolor = getCookie('backgroundcolor');
const hovercolor = getCookie('hovercolor');
const accentcolor = getCookie('accentcolor');
const bordercolor = getCookie('bordercolor');
const textcolor = getCookie('textcolor');

const cardbackground = getCookie('cardbackground');
const cardborderradius = getCookie('cardborderradius');
const cardbordercolor = getCookie('cardbordercolor');
const cardborderwidth = getCookie('cardborderwidth');
const cardshadow = getCookie('cardshadow');

const buttontextcolor = getCookie('buttontextcolor');
const buttonborderradius = getCookie('buttonborderradius');

const inputbackground = getCookie('inputbackground');
const inputtextcolor = getCookie('inputtextcolor');

document.documentElement.style.setProperty(
  '--primarycolor',
  primarycolor || lightTheme.primarycolor,
);
document.documentElement.style.setProperty(
  '--backgroundcolor',
  backgroundcolor || lightTheme.backgroundcolor,
);
document.documentElement.style.setProperty(
  '--hovercolor',
  hovercolor || lightTheme.hovercolor,
);
document.documentElement.style.setProperty(
  '--accentcolor',
  accentcolor || lightTheme.accentcolor,
);
document.documentElement.style.setProperty(
  '--bordercolor',
  bordercolor || lightTheme.bordercolor,
);
document.documentElement.style.setProperty(
  '--textcolor',
  textcolor || lightTheme.textcolor,
);
document.documentElement.style.setProperty(
  '--cardbackground',
  cardbackground || lightTheme.cardbackground,
);
document.documentElement.style.setProperty(
  '--cardborderradius',
  cardborderradius || lightTheme.cardborderradius,
);
document.documentElement.style.setProperty(
  '--cardborderwidth',
  `${cardborderwidth || lightTheme.cardborderwidth}px`,
);
document.documentElement.style.setProperty(
  '--cardbordercolor',
  cardbordercolor || lightTheme.cardbordercolor,
);
document.documentElement.style.setProperty(
  '--cardshadow',
  cardshadow || lightTheme.cardshadow,
);
document.documentElement.style.setProperty(
  '--buttontextcolor',
  buttontextcolor === ''
    ? 'white'
    : buttontextcolor || lightTheme.buttontextcolor,
);
document.documentElement.style.setProperty(
  '--buttonborderradius',
  buttonborderradius === ''
    ? cardborderradius || lightTheme.cardborderradius
    : buttonborderradius || lightTheme.buttonborderradius,
);
document.documentElement.style.setProperty(
  '--inputtextcolor',
  inputtextcolor || lightTheme.inputtextcolor,
);
document.documentElement.style.setProperty(
  '--inputbackground',
  inputbackground || lightTheme.inputbackground,
);

// LOAD CURRENT PAGE STYLESHEETS
if (window.location.pathname.includes('messages')) {
  document.body.classList.add('messages');
  document.body.classList.remove('home');
  document.body.classList.remove('status');
  document.body.classList.remove('login');
  document.body.classList.remove('settings');
} else if (window.location.pathname.includes('status')) {
  document.body.classList.add('home');
  document.body.classList.add('status');
  document.body.classList.remove('messages');
  document.body.classList.remove('settings');
} else if (window.location.pathname.includes('settings')) {
  document.body.classList.add('settings');
  document.body.classList.remove('messages');
  document.body.classList.remove('status');
  document.body.classList.remove('login');
  document.body.classList.remove('home');
} else if (
  window.location.pathname.includes('login') ||
  window.location.pathname.includes('signup')
) {
  document.body.classList.add('login');
  document.body.classList.remove('messages');
  document.body.classList.remove('status');
  document.body.classList.remove('settings');
  document.body.classList.remove('home');
} else {
  document.body.classList.add('home');
  document.body.classList.remove('messages');
  document.body.classList.remove('status');
  document.body.classList.remove('login');
  document.body.classList.remove('settings');
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.url);
  if (
    request.url.includes('messages') &&
    !getCookie('previousurl').includes('messages')
  ) {
    document.body.classList.add('messages');
    document.body.classList.remove('home');
    document.body.classList.remove('status');
    document.body.classList.remove('login');
    document.body.classList.remove('settings');
  } else if (request.url.includes('status')) {
    document.body.classList.add('status');
    document.body.classList.add('home');
    document.body.classList.remove('messages');
  } else if (
    request.url.includes('settings') &&
    !getCookie('previousurl').includes('settings')
  ) {
    document.body.classList.add('settings');
    document.body.classList.remove('messages');
    document.body.classList.remove('home');
    document.body.classList.remove('status');
    document.body.classList.remove('login');
  } else if (
    !request.url.includes('messages') &&
    !request.url.includes('settings') &&
    !(
      getCookie('previousurl') === '/notifications' &&
      request.url === '/notifications/mentions'
    )
  ) {
    document.body.classList.add('home');
    document.body.classList.remove('messages');
    document.body.classList.remove('status');
    document.body.classList.remove('login');
    document.body.classList.remove('settings');
  }
});
