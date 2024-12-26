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
import { useEffect, useState } from "react";

interface CollectionData {
  id: number;
  createdAt: Date | null;
  tableName: string;
  userId: number;
}

function AllCollection() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [data, setData] = useState<CollectionData[]>([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${apiUrl}/api/collection/get_collections`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ); // Replace with the correct API endpoint
        if (response.ok) {
          const result = await response.json();
          console.log(result)
          if (result?.collections) {
            setData(result.collections); // Set the fetched collections array

          } else {
            console.error("Unexpected data format:", result);
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="grid sm:grid-cols-2 gap-6 p-6  rounded-lg">
     
      {data.length > 0?( data.map((card, index) => (
        <div key={index}>
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
              <CardTitle className="text-lg font-bold">{card.tableName}</CardTitle>
              <CardDescription>table id {card.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">user id {card.userId}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="ghost" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>
          </div>
      ))):<p>Loading collections...</p>
     }
    </div>
  );
}

export default AllCollection;
