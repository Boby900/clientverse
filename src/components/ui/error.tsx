import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center bg-black p-10 rounded-lg shadow-lg">
        <h1 className="text-8xl font-bold text-red-500 animate-bounce">404</h1>
        <p className="text-lg text-gray-300 mt-4">
          Oops! Looks like you're lost in space.
        </p>
        <img
          src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"
          alt="Lost in space"
          className="w-72 mx-auto mt-6"
        />
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          🏠 Beam me back home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
