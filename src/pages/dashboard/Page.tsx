import Sidebar from "./Sidebar";


function Page() {
  return (
    <div>
 
      <div className="p-4 border-4 m-2  text-center  ">
        This is a demo of Clientverse admin dashboard. The database resets every
        hour. Realtime data and file upload are disabled.
      </div>
     <Sidebar />
  
     
    </div>
  );
}

export default Page;
