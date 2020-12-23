import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes/routes';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
