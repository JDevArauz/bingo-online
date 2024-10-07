import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './Auth/AuthContext';
import { ellipse, gameControllerSharp, homeOutline, homeSharp, personCircleSharp, square, triangle } from 'ionicons/icons';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/registerPage';
import AdminRegister from './pages/Register/adminRegister';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark Mode configuration */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MainRoutes /> {/* El componente con las rutas y tabs */}
    </IonReactRouter>
  </IonApp>
);

const MainRoutes: React.FC = () => {
  const location = useLocation();

  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AuthProvider>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <HomePage />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route exact path="/admin_register">
            <AdminRegister />
          </Route>
          <Route exact path="/events">
            <EventsPage />
          </Route>
        </IonRouterOutlet>

        {/* Siempre renderiza el IonTabBar pero ocúltalo con CSS si estamos en login o register */}
        <IonTabBar slot="bottom" style={{ display: isLoginOrRegister ? 'none' : 'flex' }}>
          <IonTabButton tab="tab1" href="/Home">
            <IonIcon aria-hidden="true" icon={homeSharp} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/events">
            <IonIcon aria-hidden="true" icon={gameControllerSharp} />
            <IonLabel>Eventos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={personCircleSharp} />
            <IonLabel>Mi Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </AuthProvider>
  );
};

export default App;