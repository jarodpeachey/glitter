themes.forEach((theme) => {
  chrome.cookies.get(
    { url: 'https://twitter.com', name: theme.name },
    function (cookie) {
      if (
        cookie &&
        cookie.value &&
        cookie.value !== '{}' &&
        cookie.value !== '' &&
        JSON.parse(cookie.value) !== {}
      ) {
        // console.log('Setting from cookies');
      } else {
        chrome.cookies.set(
          {
            url: 'https://twitter.com',
            name: theme.name,
            value: JSON.stringify(theme),
            expirationDate: new Date().getTime() + 10 * 365 * 24 * 60 * 60,
          },
          function () {},
        );

        window.location.reload();
      }
    },
  );
});
