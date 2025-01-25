import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import * as motion from "motion/react-client";

function Main() {
  return (
    <div className="flex gap-4 min-h-[600px] bg-[url('/cms.png')] bg-cover flex-col justify-center items-center  border border-[#006D75] p-4 m-4">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link to="/signup">
          <div className="flex border-2  p-4 bg-[#03262b] text-yellow-50 font-thin  border-[#006D75]">
            Live demo{" "}
            <span className="pl-1">
              <ArrowRight />
            </span>
          </div>
        </Link>
      </motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <a
          href="https://www.producthunt.com/products/contentverse/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-contentverse"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=879204&theme=dark"
            alt="ContentVerse - a&#0032;headless&#0032;cms | Product Hunt"
            width="250"
            height="54"
          />
        </a>
      </motion.button>
    </div>
  );
}

export default Main;
