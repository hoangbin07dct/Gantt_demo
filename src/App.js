import Header from "./components/Header/Index";
import Contents from "./components/Contents/Index";
import Footer from "./components/Footer/Index";
import { connect } from 'react-redux';

function App() {
  return (
    <div className="App">
        <Header />
        <Contents/>
        <Footer/>
    </div>
  );
}

export default App;
