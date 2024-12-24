"use client";
import { motion, useSpring, useScroll } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

const cardData = [
  {
    title: "Magic Collection",
    description: "Enchanting items",
    content: "Discover mystical artifacts",
  },
  {
    title: "Tech Gadgets",
    description: "Cutting-edge devices",
    content: "Explore the future of technology",
  },
  {
    title: "Hot Deals",
    description: "Limited time offers",
    content: "Grab these bargains now",
  },
  {
    title: "Premium Selection",
    description: "Top-rated products",
    content: "Experience the best in class",
  },
];

function AllCollection() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="grid sm:grid-cols-2 gap-6 p-6  rounded-lg">
      {cardData.map((card) => (
        <>
          <motion.div
            style={{
              scaleX,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: 10,
              originX: 0,
              backgroundColor: "#ff0088   ",
              
            }}
          />
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="relative overflow-hidden pb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-10"></div>
              <Flame className={`w-8 h-8 text-purple-500 mb-2`} />
              <CardTitle className="text-lg font-bold">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="ghost" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </>
      ))}
    </div>
  );
}

export default AllCollection;
