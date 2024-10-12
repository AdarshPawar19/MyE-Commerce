import Image from "next/image";
import CustomerFormPage from "./customer/createCustomer/page";
import Header from "./_component/header";
import Footer from "./_component/footer";

export default function Home() {
  return (
   <>
  
   <Header/>
   <div className="m-10">
   <CustomerFormPage/>
   </div>
   <hr />
   <Footer/>
   </>
  );
}
