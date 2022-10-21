import './App.css';
import Login, { LoginFunction } from './Login/Login';

function App(props) {
  return (
    <>
      {props.mode === 'function' && <LoginFunction /> || <Login />}
    </>
  );
}

export default App;
