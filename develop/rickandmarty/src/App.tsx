import logo from './logo.svg';
import './App.css';
import AppHeader from '../src/components/AppHeader/AppHeader.tsx'
import AppContainer from '../src/components/AppContainer/AppContainer.tsx'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppContainer />
    </div>
  );
}

export default App;
