// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setHasStarted } from '../../features/navigationSlice.js'; // Redux action

// import './StartPage.css'; // CSS file for styling

// const StartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     dispatch(setHasStarted(true)); // Redux state को अपडेट करें
//     navigate('/dashboard'); // 'dashboard' route पर navigate करें
//   };

//   return (
//     <div className="landing-container">
//       <div className="landing-content">
//         <div className="landing-logo">
//           {/* Logo और टेक्स्ट */}
//           <div className="logo-image"></div>
//           <h1>E-LIBRARY MANAGEMENT SYSTEM</h1>
//         </div>
//         <div className="main-image">
//           {/* Main illustration */}
//           <div className="illustration"></div>
//         </div>
//         <button onClick={handleGetStarted} className="get-started-button">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StartPage;