import React from "react";
import Header from "../components/Header";
import HeaderMobile from "../views/mobile/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Admin = ({ children, user }) => (
  <div>
    <Header user={user} />
    <Sidebar user={user} />
    {children}
    <Footer user={user} />
  </div>
);

const Mobile = ({ children }) => (
  <div>
    <HeaderMobile />
    {children}
  </div>
);

export { Admin, Mobile };
