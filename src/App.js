import './App.css';
import { Outlet } from 'react-router-dom';
import Blocks from './components/page-blocks'
import Footer from './components/footer';


function App({person}) {
  
  return (
    <div className='home-page'>
     <div><Blocks.Header person={person}/></div>
      <div><Outlet/></div>
      <div><Footer/></div>
   
    </div>
  );


}

export default App;
