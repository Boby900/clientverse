import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import * as motion from "motion/react-client";

function Main() {
  return (
    <div className="flex gap-4 min-h-[600px] bg-[url('https://plus.unsplash.com/premium_photo-1680392933151-af04ecbaaac4?q=10&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover flex-col justify-center items-center  border  p-4 m-4">
      <motion.button whileHover={{ scale: 0.9}} whileTap={{ scale: 0.95 }}>
        <Link to="/signup">
          <div className="flex font-bold rounded-lg border-2  p-4 bg-stone-900 text-yellow-50">
            Live demo{" "}
            <span className="pl-1">
              <ArrowRight />
            </span>
          </div>
        </Link>
      </motion.button>
      <motion.button whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.95 }}>
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
