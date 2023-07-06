import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';

import '@mdi/font/css/materialdesignicons.css';

const light = {
  dark: false,
  colors: {
    primary: '#1E817F',
    'primary-light-1': '#44CDB5',
    'primary-dark-1': '#0E6A6D',
    secondary: '#FD8753',
  },
};

const dark = {
  dark: true,
  colors: {
    primary: '#1E817F',
    'primary-light-1': '#44CDB5',
    'primary-dark-1': '#0E6A6D',
    secondary: '#FD8753',
    background: '#1c262e',
    surface: '#1c262e',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
});

export default vuetify;
