import './App.css';
import { Outlet } from 'react-router-dom';
import Blocks from './components/page-blocks'
import Footer from './components/footer';


function App() {
  
  return (
    <div className='app-page'>
     <div className='page-header'><Blocks.Header/></div>
      <div><Outlet/></div>
      <div><Footer/></div>
   
    </div>
  );


}

export default App;
