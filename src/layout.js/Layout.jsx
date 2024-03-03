// // Layout.jsx
// import React from "react";
// import Navbar from "../components/common/Navbar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>
//       <main
//         className="flex-grow overflow-hidden"
//         style={{ backgroundColor: "#0D0F23" }}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;


import React from "react";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <main
        className="flex-grow overflow-hidden bg-white"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
