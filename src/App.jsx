import * as React from 'react';
import Routes from 'src/routes/index';
import ThemeCustomization from './themes';

// TODO: add SideBar to App
// TODO: add AppBar to App
// TODO: add MainLayout component to the App
// TODO: add Sign-In & Sign-up (temp) to the App

function App() {
  return (
    <ThemeCustomization>
      <Routes />
    </ThemeCustomization>
  );
}

export default App;
