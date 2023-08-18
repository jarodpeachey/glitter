//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     BUTTON/ACTION VARIABLES     ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
const refreshButton = document.getElementById('refresh');
const editButton = document.getElementById('edit');
const createButton = document.getElementById('create');
const cancelButton = document.getElementById('cancel');
const saveButton = document.getElementById('save');
const newThemeButton = document.getElementById('new');

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     MISCELLANEOUS VARIABLES     ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
const presetsWrapper = document.getElementById('presets-wrapper');
let selectedTheme = '';
let selectedThemeTitle = '';
let selectedCategory = '';
const mainContent = document.getElementById('main-content');
const title = document.getElementById('title');

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     FUNCTION DECLARATIONS     /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
const changeTheme = (themeName) => {
  if (selectedCategory.toLowerCase() !== 'custom') {
    editButton.innerHTML = `Clone ${selectedCategory} ${selectedThemeTitle} Theme`;
  } else {
    editButton.innerHTML = `Edit ${selectedThemeTitle} Theme`;
  }

  chrome.cookies.get(
    {
      url: 'https://twitter.com',
      name: themeName,
    },
    function (cookie) {
      const newTheme = JSON.parse(cookie.value);

      inputs.forEach((input) => {
        updateCookie(input.name, newTheme[input.name]);
      });

      if (newTheme.cardshadow) {
        updateCookie('cardshadow', newTheme.cardshadow);
      }

      chrome.cookies.set(
        {
          url: 'https://twitter.com',
          name: 'theme',
          value: themeName,
          expirationDate: new Date().getTime() + 10 * 365 * 24 * 60 * 60,
        },
        function () {},
      );

      chrome.tabs.getSelected(null, function (tab) {
        var code = `
          document.documentElement.style.setProperty(
            '--primarycolor',
            '${newTheme.primarycolor}',
          );
          document.documentElement.style.setProperty(
            '--backgroundcolor',
            '${newTheme.backgroundcolor}',
          );
          document.documentElement.style.setProperty(
            '--hovercolor',
            '${newTheme.hovercolor}',
          );
          document.documentElement.style.setProperty(
            '--accentcolor',
            '${newTheme.accentcolor}',
          );
          document.documentElement.style.setProperty(
            '--bordercolor',
            '${newTheme.bordercolor}',
          );
          document.documentElement.style.setProperty(
            '--textcolor',
            '${newTheme.textcolor}',
          );
          document.documentElement.style.setProperty(
            '--cardbackground',
            '${newTheme.cardbackground}',
          );
          document.documentElement.style.setProperty(
            '--cardbordercolor',
            '${newTheme.cardbordercolor}',
          );
          document.documentElement.style.setProperty(
            '--cardborderwidth',
            '${newTheme.cardborderwidth}px',
          );
          document.documentElement.style.setProperty(
            '--cardborderradius',
            '${newTheme.cardborderradius}',
          );
          document.documentElement.style.setProperty(
            '--cardshadow',
            '${newTheme.cardshadow}',
          );
          document.documentElement.style.setProperty(
            '--buttontextcolor',
            '${newTheme.buttontextcolor}',
          );
          document.documentElement.style.setProperty(
            '--buttonborderradius',
            '${newTheme.buttonborderradius}',
          );
          document.documentElement.style.setProperty(
            '--inputtextcolor',
            '${newTheme.inputtextcolor}',
          );
          document.documentElement.style.setProperty(
            '--inputbackground',
            '${newTheme.inputbackground}',
          );
        `;
        chrome.tabs.executeScript(tab.id, { code: code });
      });
    },
  );
};

const setInputValue = (name, element) => {
  console.log('NAME: ', name);
  console.log('ELEMENT VALUE: ', element.value);

  chrome.cookies.get(
    { url: 'https://twitter.com', name: name },
    function (cookie) {
      if (cookie) {
        element.value = cookie.value || themes[0][name];
      } else {
        element.value = themes[0][name];
      }
    },
  );
};

const updateInputValue = (input, value) => {
  input.value = value;
};

const updateCookie = (name, value) => {
  chrome.cookies.set(
    {
      url: 'https://twitter.com',
      name: name,
      value: value,
      expirationDate: new Date().getTime() + 10 * 365 * 24 * 60 * 60,
    },
    function () {},
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////     INPUT VARIABLES     ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
const primarycolorInput = document.getElementById('primarycolor');
const backgroundcolorInput = document.getElementById('backgroundcolor');
const hovercolorInput = document.getElementById('hovercolor');
const accentcolorInput = document.getElementById('accentcolor');
const bordercolorInput = document.getElementById('bordercolor');
const textcolorInput = document.getElementById('textcolor');
const cardbackgroundInput = document.getElementById('cardbackground');
const cardborderradiusInput = document.getElementById('cardborderradius');
const cardbordercolorInput = document.getElementById('cardbordercolor');
const cardborderwidthInput = document.getElementById('cardborderwidth');
// const cardshadowInput = document.getElementById('cardshadow');
const buttontextcolorInput = document.getElementById('buttontextcolor');
const buttonborderradiusInput = document.getElementById('buttonborderradius');
const inputtextcolorInput = document.getElementById('inputtextcolor');
const inputbackgroundInput = document.getElementById('inputbackground');

const inputs = [
  {
    name: 'primarycolor',
    element: primarycolorInput,
  },
  {
    name: 'backgroundcolor',
    element: backgroundcolorInput,
  },
  {
    name: 'hovercolor',
    element: hovercolorInput,
  },
  {
    name: 'accentcolor',
    element: accentcolorInput,
  },
  {
    name: 'bordercolor',
    element: bordercolorInput,
  },
  {
    name: 'textcolor',
    element: textcolorInput,
  },
  {
    name: 'cardbackground',
    element: cardbackgroundInput,
  },
  {
    name: 'cardborderradius',
    element: cardborderradiusInput,
  },
  {
    name: 'cardbordercolor',
    element: cardbordercolorInput,
  },
  {
    name: 'cardborderwidth',
    element: cardborderwidthInput,
  },
  // {
  //   name: 'cardshadow',
  //   element: cardshadowInput,
  // },
  {
    name: 'buttontextcolor',
    element: buttontextcolorInput,
  },
  {
    name: 'buttonborderradius',
    element: buttonborderradiusInput,
  },
  {
    name: 'inputtextcolor',
    element: inputtextcolorInput,
  },
  {
    name: 'inputbackground',
    element: inputbackgroundInput,
  },
];

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     BUTTON EVENTS LISTENERS     ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
newThemeButton.addEventListener('click', (e) => {
  if (document.body.classList.contains('edit')) {
    chrome.cookies.remove(
      {
        url: 'https://twitter.com',
        name: selectedTheme,
      },
      function () {
        selectedTheme = 'theme-light';
        selectedThemeTitle = 'Light';
        changeTheme('theme-light');

        // chrome.tabs.getSelected(null, function (tab) {
        //   var code = 'window.location.reload();';
        //   chrome.tabs.executeScript(tab.id, { code: code });
        // });

        setTimeout(() => {
          document.body.classList.remove('new');
          document.body.classList.remove('edit');
          title.value = 'Themes';
          title.classList.remove('active');
          title.disabled = true;
          newThemeButton.style.display = 'block';

          setTimeout(() => {
            window.location.reload();
          }, 200);
        }, 400);
      },
    );
  } else {
    document.body.classList.add('new');
    title.value = 'New Theme';
    title.classList.add('active');
    newThemeButton.style.display = 'none';
    title.disabled = false;

    chrome.cookies.get(
      {
        url: 'https://twitter.com',
        name: selectedTheme,
      },
      function (cookie) {
        const theme = JSON.parse(cookie.value);

        inputs.forEach((input) => {
          updateInputValue(input.element, theme[input.name]);
        });
      },
    );
  }
});

cancelButton.addEventListener('click', (e) => {
  document.body.classList.remove('new');
  document.body.classList.remove('edit');
  title.value = 'Themes';
  title.classList.remove('active');
  title.classList.remove('width');
  title.disabled = true;
  newThemeButton.innerHTML = '+ NEW';
  newThemeButton.style.display = 'block';
});

editButton.addEventListener('click', (e) => {
  if (selectedCategory.toLowerCase() === 'custom') {
    let themeTitle = selectedTheme.substring(6, selectedTheme.length);
    themeTitle = themeTitle
      .replace('-', ' ')
      .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

    document.body.classList.add('edit');
    title.value = themeTitle;
    title.classList.add('width');
    title.disabled = true;
    newThemeButton.innerHTML = `Delete`;

    chrome.cookies.get(
      {
        url: 'https://twitter.com',
        name: selectedTheme,
      },
      function (cookie) {
        const theme = JSON.parse(cookie.value);

        inputs.forEach((input) => {
          updateInputValue(input.element, theme[input.name]);
        });
      },
    );
  } else {
    document.body.classList.add('new');
    title.value = `${selectedCategory} ${selectedThemeTitle} Copy`;
    title.classList.add('active');
    newThemeButton.style.display = 'none';
    title.disabled = false;

    chrome.cookies.get(
      {
        url: 'https://twitter.com',
        name: selectedTheme,
      },
      function (cookie) {
        const theme = JSON.parse(cookie.value);

        inputs.forEach((input) => {
          updateInputValue(input.element, theme[input.name]);
        });
      },
    );
  }
});

saveButton.addEventListener('click', (e) => {
  chrome.cookies.get(
    {
      url: 'https://twitter.com',
      name: selectedTheme,
    },
    function (cookie) {
      const theme = JSON.parse(cookie.value);

      inputs.forEach((input) => {
        theme[input.name] = input.element.value;
      });

      chrome.cookies.set(
        {
          url: 'https://twitter.com',
          name: selectedTheme,
          value: JSON.stringify(theme),
          expirationDate: new Date().getTime() + 10 * 365 * 24 * 60 * 60,
        },
        function () {},
      );
    },
  );

  setTimeout(() => {
    document.body.classList.remove('new');
    document.body.classList.remove('edit');
    title.value = 'Themes';
    title.classList.remove('active');
    title.disabled = true;
    newThemeButton.style.display = 'block';
    newThemeButton.innerHTML = '+ New';

    changeTheme(selectedTheme);
  }, 400);
});

createButton.addEventListener('click', (e) => {
  const theme = {
    name: `theme-${title.value.toLowerCase().replace(/ /, '-')}`,
    title: title.value,
  };

  inputs.forEach((input) => {
    theme[input.name] = input.element.value;
    updateCookie(input.name, input.element.value);
  });

  chrome.cookies.set(
    {
      url: 'https://twitter.com',
      name: theme.name,
      value: JSON.stringify(theme),
      expirationDate: new Date().getTime() + 10 * 365 * 24 * 60 * 60,
    },
    function () {},
  );

  chrome.cookies.set(
    {
      url: 'https://twitter.com',
      name: 'theme',
      value: `theme-${title.value.toLowerCase().replace(/ /, '')}`,
      expirationDate: new Date().getTime() + 10 * 365 * 24 * 60 * 60,
    },
    function () {},
  );

  // chrome.tabs.getSelected(null, function (tab) {
  //   var code = 'window.location.reload();';
  //   chrome.tabs.executeScript(tab.id, { code: code });
  // });

  setTimeout(() => {
    document.body.classList.remove('new');
    document.body.classList.remove('edit');
    title.value = 'Themes';
    title.classList.remove('active');
    title.disabled = true;
    newThemeButton.style.display = 'block';

    setTimeout(() => {
      window.location.reload();
      selectedTheme = theme.name;
      selectedThemeTitle = theme.title;
      changeTheme(selectedTheme);
    }, 200);
  }, 400);
});

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     LOAD PRESET THEMES INFO     ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
chrome.cookies.getAll(
  {
    url: 'https://twitter.com',
  },
  function (array) {
    const themes = {};
    const themesArray = array.filter((item) => item.name.includes('theme-'));

    categories.forEach((category) => {
      const collapse = document.createElement('div');
      const h3 = document.createElement('h3');
      const spanOne = document.createElement('span');
      const spanTwo = document.createElement('span');
      const content = document.createElement('div');
      const contentInner = document.createElement('div');
      const row = document.createElement('div');

      collapse.className = 'collapse';
      collapse.id = category.toLowerCase();
      spanOne.innerHTML = category;
      spanTwo.innerHTML = '+';
      h3.className = `collapse__title ${category.toLowerCase()}__title`;
      content.className = `collapse__content ${category.toLowerCase()}__content`;
      contentInner.id = `${category.toLowerCase()}__inner`;
      row.className = 'row padding';
      row.id = `${category.toLowerCase()}__row`;

      themesArray
        .filter((theme) => JSON.parse(theme.value).category)
        .filter(
          (theme) =>
            JSON.parse(theme.value).category.toLowerCase() ===
            category.toLowerCase(),
        )
        .forEach((item) => {
          item = JSON.parse(item.value);

          const themeItem = document.createElement('div');
          themeItem.className = 'theme__item';
          themeItem.id = item.name.toLowerCase();
          themeItem.innerHTML = item.title;

          const column = document.createElement('div');
          column.classList.add('col');
          column.appendChild(themeItem);

          row.appendChild(column);
        });

      h3.appendChild(spanOne);
      h3.appendChild(spanTwo);
      contentInner.appendChild(row);
      content.appendChild(contentInner);
      collapse.appendChild(h3);
      collapse.appendChild(content);

      presetsWrapper.appendChild(collapse);

      // GET ELEMENTS
      const collapseTitle = collapse.children[0];
      const collapseContent = collapse.children[1];

      // ADD EVENT LISTENER
      collapseTitle.addEventListener('click', toggleCollapse);

      // IMPORTANT VARIABLES
      let open = false;
      const childrenHeight = collapseContent.children[0].clientHeight + 16;

      function toggleCollapse() {
        if (open) {
          collapse.classList.remove('open');
          collapseContent.style.maxHeight = '0px';

          open = false;
        } else {
          collapse.classList.add('open');
          collapseContent.style.maxHeight = `${childrenHeight}px`;

          open = true;
        }
      }
    });

    const collapse = document.createElement('div');
    const h3 = document.createElement('h3');
    const spanOne = document.createElement('span');
    const spanTwo = document.createElement('span');
    const content = document.createElement('div');
    const contentInner = document.createElement('div');
    const row = document.createElement('div');

    collapse.className = 'collapse';
    collapse.id = 'custom';
    spanOne.innerHTML = 'Custom';
    spanTwo.innerHTML = '+';
    h3.className = `collapse__title custom__title`;
    content.className = `collapse__content custom__content`;
    contentInner.id = `custom__inner`;
    row.className = 'row padding';
    row.id = `custom__row`;

    const filteredArray = themesArray.filter(
      (theme) =>
        !JSON.parse(theme.value).category && JSON.parse(theme.value).name,
    );

    if (filteredArray.length > 0) {
      filteredArray
        .sort(function (a, b) {
          var nameA = JSON.parse(a.value).title.toLowerCase(),
            nameB = JSON.parse(b.value).title.toLowerCase();

          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        })
        .forEach((item) => {
          item = JSON.parse(item.value);

          const themeItem = document.createElement('div');
          themeItem.className = 'theme__item';
          themeItem.id = item.name.toLowerCase();
          themeItem.innerHTML = item.title;

          const column = document.createElement('div');
          column.classList.add('col');
          column.appendChild(themeItem);

          row.appendChild(column);
        });

      h3.appendChild(spanOne);
      h3.appendChild(spanTwo);
      contentInner.appendChild(row);
      content.appendChild(contentInner);
      collapse.appendChild(h3);
      collapse.appendChild(content);

      presetsWrapper.appendChild(collapse);

      // GET ELEMENTS
      const collapseTitle = collapse.children[0];
      const collapseContent = collapse.children[1];

      // ADD EVENT LISTENER
      collapseTitle.addEventListener('click', toggleCollapse);

      // IMPORTANT VARIABLES
      let open = false;
      const childrenHeight = collapseContent.children[0].clientHeight + 16;

      function toggleCollapse() {
        if (open) {
          collapse.classList.remove('open');
          collapseContent.style.maxHeight = '0px';

          open = false;
        } else {
          collapse.classList.add('open');
          collapseContent.style.maxHeight = `${childrenHeight}px`;

          open = true;
        }
      }
    }

    chrome.cookies.get(
      {
        url: 'https://twitter.com',
        name: 'theme',
      },
      function (cookie) {
        const presetButtons = document.querySelectorAll('.theme__item');

        if (cookie) {
          presetButtons.forEach((presetButton) => {
            if (cookie && presetButton.id === cookie.value) {
              presetButton.classList.add('active');
              selectedTheme = presetButton.id;

              chrome.cookies.get(
                {
                  url: 'https://twitter.com',
                  name: presetButton.id,
                },
                function (newCookie) {
                  const newCookieValue = JSON.parse(newCookie.value);

                  if (newCookieValue.category) {
                    selectedCategory = newCookieValue.category;
                  } else {
                    selectedCategory = 'Custom';
                  }

                  selectedThemeTitle = newCookieValue.title;

                  changeTheme(presetButton.id);
                },
              );
            }

            presetButton.addEventListener('click', (e) => {
              selectedTheme = presetButton.id;
              chrome.cookies.get(
                {
                  url: 'https://twitter.com',
                  name: presetButton.id,
                },
                function (newCookie) {
                  const newCookieValue = JSON.parse(newCookie.value);

                  if (newCookieValue.category) {
                    selectedCategory = newCookieValue.category;
                  } else {
                    selectedCategory = 'Custom';
                  }

                  selectedThemeTitle = newCookieValue.title;

                  changeTheme(presetButton.id);
                },
              );

              const presetButtons = document.querySelectorAll('.theme__item');

              presetButtons.forEach((presetButton) => {
                presetButton.classList.remove('active');
              });

              document.getElementById(selectedTheme).classList.add('active');
            });
          });
        } else {
          document.getElementById('theme-light').classList.add('active');
          selectedTheme = 'theme-light';
          selectedThemeTitle = 'Light';
          editButton.innerHTML = `Clone Light Default Theme`;

          presetButtons.forEach((presetButton) => {
            presetButton.addEventListener('click', (e) => {
              selectedTheme = presetButton.id;
              chrome.cookies.get(
                {
                  url: 'https://twitter.com',
                  name: presetButton.id,
                },
                function (newCookie) {
                  const newCookieValue = JSON.parse(newCookie.value);

                  if (newCookieValue.category) {
                    selectedCategory = newCookieValue.category;
                  } else {
                    selectedCategory = 'Custom';
                  }

                  selectedThemeTitle = newCookieValue.title;

                  changeTheme(presetButton.id);
                },
              );

              const presetButtons = document.querySelectorAll('.theme__item');

              presetButtons.forEach((presetButton) => {
                presetButton.classList.remove('active');
              });

              document.getElementById(selectedTheme).classList.add('active');
            });
          });
        }
      },
    );
  },
);

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////     UPDATE VALUES OF INPUTS     ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
inputs.forEach((input) => {
  setInputValue(input.name, input.element);
});

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////     SEND UPDATED TAB INFO     ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.sendMessage(tabId, {
    message: 'hello!',
    url: tab.url,
  });
});
