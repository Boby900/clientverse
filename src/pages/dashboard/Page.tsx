import Sidebar from "./Sidebar";

function Page() {
  return (
    <div>
 
      <div className="text-center sticky min-w-max text-nowrap border-4 p-4 m-4 ">
        This is a demo of Clientverse admin dashboard. The database resets every
        hour. Realtime data and file upload are disabled.
      </div>
     <Sidebar />
    </div>
  );
}

export default Page;
