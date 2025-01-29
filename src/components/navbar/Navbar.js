import React, { useContext, useState } from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import { useNotificationStore } from '../Lib/NotificationStore.js';

const Navbar = () => {
   const [open, setOpen] = useState(false);
   const user = true;  // Placeholder: You might want to update this with real user authentication logic.
   const { currentUser } = useContext(AuthContext);
   const fetch = useNotificationStore(state => state.fetch);
   const number = useNotificationStore(state => state.number);

   return (
     <nav>
       <div className="left">
         <a href="/" className='logo'>
           <img src="/logo.png" alt="Logo" />
           <span>RoyalEstate</span>
         </a>
         <a href="/">Home</a>
         <a href="/">About</a>
         <a href="/">Contact</a>
         <a href="/">Agents</a>
       </div>

       <div className="right">
         { user ? (
           <div className='user'>
             <img 
               src={currentUser?.avatar || "/noavatar.jpg"}  // Safe check for avatar
               alt="User Avatar"
             />
             <span>{currentUser?.username || 'Guest'}</span>  {/* Safe check for username */}
             <Link to="/profile" className='profile'>
               { number > 0 && <div className="notification">{number}</div> }
               <span>Profile</span>
             </Link>
           </div>
         ) : (
           <>
             <a href="/login" className='login'> Sign In</a>
             <a href="/register" className='register'> Sign Up</a>
           </>
         )}

         <div className="menuIcon">
           <img src="/menu.png" alt="Menu" onClick={() => setOpen(prev => !prev)} />
         </div>

         <div className={open ? "menu active" : "menu"}>
           <a href="/">Home</a>
           <a href="/">About</a>
           <a href="/">Contact</a>
           <a href="/">Agents</a>
           <a href="/login">Sign In</a>
           <a href="/register">Sign Up</a>
         </div>
       </div>
     </nav>
   )
}

export default Navbar;
