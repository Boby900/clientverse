import { Button } from "@/components/ui/button";

function Page2() {
  return (
    <div className="lg:grid lg:grid-cols-[30%,70%]  min-h-[600px] border border-[#006D75] p-4 m-4 ">
      {/* Left Column */}
      <div className="border-2 flex  flex-col gap-4 border-[#004953] bg-[#002c36] text-white m-2 p-2 rounded-md">
        <a href="#">
          <div className="p-2 bg-[#00363e] rounded-md">
            <p className="font-bold text-lg">Realtime database</p>
            <p className="text-sm">
              Embedded performant db with schema builder, data validations,
              realtime subscriptions, and easy-to-use REST API.
            </p>
          </div>
        </a>
        <a href="#">
        <div className="p-2 bg-[#00363e] rounded-md">
          <p className="font-bold text-lg">Authentication</p>
          <p className="text-sm">
            Manage your app users and handle email/password and OAuth2 sign-ups
            (Google, GitHub) without the hassle.
          </p>
        </div>
        </a>
        <a href="#">
          <div className="p-2 bg-[#00363e] rounded-md">
            <p className="font-bold text-lg">File Storage</p>
            <p className="text-sm">
              Sanely store files locally or in Pinata. Easily attach media to
              your database records and generate thumbnails on the fly.
            </p>
          </div>
        </a>
        <a href="#">
          <div className="p-2 bg-[#00363e] rounded-md">
            <p className="font-bold text-lg">Dashboard</p>
            <p className="text-sm">
              Leverage the power of the Admin Dashboard to control the flow of
              the data.
            </p>
          </div>
        </a>
        <a href="#">
          <div className=" p-2 bg-[#00363e] rounded-md">
            <p className="font-bold text-lg">Websockets</p>
            <p className="text-sm">
              Easily integrate Websockets using Socket.IO for realtime
              communication between users.
            </p>
          </div>
        </a>
        <a href="#">
          <div className=" p-2">
            <Button className="bg-[#006D75] text-white hover:bg-[#004953]">
              Explore all features
            </Button>
          </div>
        </a>
      </div>

      {/* Right Column */}
      <div className="border-2 min-h-[200px] bg-[url('/page2.png')] bg-cover bg-center border-[#004953]  text-white m-2 p-2 rounded-md">
      
      </div>
    </div>
  );
}

export default Page2;
