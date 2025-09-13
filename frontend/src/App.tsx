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
import { AuthProvider, useAuth } from './Auth/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { ellipse, gameControllerSharp, homeOutline, homeSharp, personCircleSharp, square, triangle } from 'ionicons/icons';
import AdminDashboard from './pages/AdminDashboard';
import AdminBingoPage from './pages/AdminBingoPage';
import AdminRegister from './pages/Register/adminRegister';
import UserBingoPage from './pages/UserBingoPage';
import UserDashboard from './pages/UserDashboard';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';
import WinnersPage from './pages/WinnersPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/registerPage';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import GamesPage from './pages/GamesPage';

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
import './index.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    {/* Asegúrate de que ambos proveedores de contexto envuelvan el router. */}
    <AuthProvider>
      <SocketProvider>
        <IonReactRouter>
          <MainRoutes /> 
        </IonReactRouter>
      </SocketProvider>
    </AuthProvider>
  </IonApp>
);

const MainRoutes: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  const isLoginOrRegister = location.pathname === '/Login' || location.pathname === '/Register';

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/Home">
          <HomePage />
        </Route>
        <Route path="/Login">
          <LoginPage />
        </Route>
        <Route path="/RegisterPage">
          <RegisterPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/RegisterAdmin">
          {isAuthenticated && (role === 'Administrador') ? <AdminRegister /> : <Redirect to="/Login" />}
        </Route>
        <Route exact path="/Events">
          <EventsPage />
        </Route>
        <Route exact path="/GameHome">
          <GamesPage />
        </Route>
        <Route exact path="/Bingo/Play">
          {isAuthenticated && (role === 'Usuario') ? <UserBingoPage /> : <Redirect to="/Login" />}
        </Route>
        <Route exact path="/Bingo/Admin">
          {isAuthenticated && (role === 'Administrador') ? <AdminBingoPage /> : <Redirect to="/Login" />}
        </Route>
        <Route exact path="/Users">
          {isAuthenticated && (role === 'Administrador') ? <UserBingoPage /> : <Redirect to="/Login" />}
        </Route>
        <Route exact path="/Winners">
          {isAuthenticated && (role === 'Administrador') ? <WinnersPage /> : <Redirect to="/Login" />}
        </Route>
        <Route exact path="/ProfilePage">
        <ProfilePage />
        </Route>
      </IonRouterOutlet>
        

      <IonTabBar slot="bottom" style={{ display: isLoginOrRegister ? 'none' : 'flex' }}>
        <IonTabButton tab="Home" href="/Home">
          <IonIcon aria-hidden="true" icon={homeSharp} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Events" href="/Events">
          <IonIcon aria-hidden="true" icon={gameControllerSharp} />
          <IonLabel>Bingos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Profile" href="/ProfilePage">
          <IonIcon aria-hidden="true" icon={personCircleSharp} />
          <IonLabel>Mi Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default App;