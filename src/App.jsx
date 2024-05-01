import * as React from 'react';
import Routes from 'src/routes/index';
import ThemeCustomization from './themes';
import 'src/locales/i18n';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <ThemeCustomization>
      <SnackbarProvider maxSnack={3}>
        <Routes />
      </SnackbarProvider>
    </ThemeCustomization>
  );
}

export default App;
