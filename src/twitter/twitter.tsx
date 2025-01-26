import { Twitter } from "lucide-react";
interface TwitterShareButtonProps {
    text: string;
    url: string;
    hashtags: string[];
  }
const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({ text, url, hashtags }) => {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
    hashtags.join(',')
  )}`;

  return (
    <a
      href={twitterShareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
    >
     
      Share on  <span className="pl-1"><Twitter /></span>
    </a>
  );
};

export default TwitterShareButton;
