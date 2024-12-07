import { ArrowRight } from "lucide-react";

function Main() {
    return (
      <div className="flex gap-4 min-h-[600px] bg-[url('/cms.png')] bg-cover flex-col justify-center items-center  border border-[#006D75] p-4 m-4">
        <a href="#">
        <div className="flex border-2  p-4 bg-[#03262b] text-yellow-50 font-thin  border-[#006D75]">Live demo <span className="pl-1"><ArrowRight /></span></div>
        </a>
        <a href="">
        <div className="flex border-2  p-4 bg-[#03262b]  text-yellow-50 font-thin border-[#006D75]">Read the documentation <span className="pl-1"><ArrowRight /></span></div>
        </a>
      </div>
    );
  }
  
  export default Main;
  