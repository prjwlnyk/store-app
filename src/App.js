
import './assets/css/styles.css'
import '../src/App.css'
import StoreContext from './components/StoreContext';
import HomePage from './components/HomePage';

function App() {


  return (
    <StoreContext>
      <div className="App">
        <HomePage />
      </div>
    </StoreContext>
  );
}

export default App;
