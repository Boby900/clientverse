import Sidebar from "./Sidebar";
import { useSearchParams } from "react-router";

function Page() {
  const [params] = useSearchParams()
  const github_avatar = params.get('github_avatar');
  
  return (
    <div>
 
      <div className="p-4 border-4 m-2  text-center  ">
        This is a demo of Clientverse admin dashboard. The database resets every
        hour. Realtime data and file upload are disabled.
      </div>
     <Sidebar githubAvatar={github_avatar} />
  
     
    </div>
  );
}

export default Page;
