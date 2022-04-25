import './App.css';
import { Outlet } from 'react-router-dom';
import Blocks from './components/page-blocks'


function App({person}) {
  
  return (
    <div className='home-page'>
     <div><Blocks.Header person={person}/></div>
      <div><Outlet/></div>
   
    </div>
  );


}

export default App;
