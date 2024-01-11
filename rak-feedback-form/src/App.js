import LayoutPage from './components/pages/LayoutPage';
import { Provider } from 'react-redux';
import store from './components/store';

function App() {
  return (
    <Provider store={store}>
      <LayoutPage />
    </Provider>
  );
}

export default App;
