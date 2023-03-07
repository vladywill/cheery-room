import { Routes, Route } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Rooms from './components/rooms/Rooms';
import RoomDetails from './components/rooms/RoomDetails';
import ReservationCard from './components/reservations/ReservationCard';
import MyReservation from './components/reservations/MyReservation';
import Splash from './pages/Splash';
import SignUp from './components/user/Signup';
import Login from './components/user/Login';

const App = () => (
  <>
    <Sidebar />
    <Routes>
      <Route path="/" element={<MyReservation />} />
      <Route path="/reservations/:id" element={<ReservationCard />} />
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:id" element={<RoomDetails />} />
      <Route path="/rooms/:id" element={<RoomDetails />} />
    </Routes>
  </>
);
export default App;
