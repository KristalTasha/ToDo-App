import { Navigate, Outlet } from 'react-router-dom'

const Auth = ({ children }) => {
   const user = JSON.parse(window.localStorage.getItem('logged'))
   console.log(user)

   if(user){
       return children ? children : <Outlet/>
   } else {
       return <Navigate to='/login' replace/>
   }
}

export default Auth;