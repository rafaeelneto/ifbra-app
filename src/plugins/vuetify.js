import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';

import '@mdi/font/css/materialdesignicons.css';

const light = {
  dark: false,
  colors: {
    primary: '#0277BD',
  },
};

const dark = {
  dark: true,
  colors: {
    primary: '#29B6F6',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      light,
      dark,
    },
  },
});

export default vuetify;
