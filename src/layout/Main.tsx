import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

function Main() {
    return (
      <div className="flex gap-4 min-h-[600px] bg-[url('/cms.png')] bg-cover flex-col justify-center items-center  border border-[#006D75] p-4 m-4">
        <Link to='/login'>
        <div className="flex border-2  p-4 bg-[#03262b] text-yellow-50 font-thin  border-[#006D75]">Live demo <span className="pl-1"><ArrowRight /></span></div>
        </Link>
       
     
        <a href="">
        <div className="flex border-2  p-4 bg-[#03262b]  text-yellow-50 font-thin border-[#006D75]">Read the documentation <span className="pl-1"><ArrowRight /></span></div>
        </a>
      </div>
    );
  }
  
  export default Main;
  