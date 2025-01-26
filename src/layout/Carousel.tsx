import { motion } from 'framer-motion';

const brands = [
  { name: 'Hercel', logo: 'https://img.icons8.com/?size=100&id=zFAQPgmSWgd7&format=png&color=000000' },
  { name: 'Chequebook' },
  { name: 'Uzi.dev', logo: "https://img.icons8.com/?size=100&id=UeyMrVzY8vP0&format=png&color=000000" },
  { name: 'DirectHunt' },
];

const BrandCarousel = () => {
  return (
    <div className="relative overflow-hidden w-full py-8 bg-background/5">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-100%'],
          transition: {
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }
        }}
      >
        {brands.concat(brands).map((brand, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 mx-[6em] p-4 my-4 grayscale hover:grayscale-0 transition-all duration-300"
          >
             {brand.logo ? (
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="text-2xl font-semibold font-Ubuntu opacity-60 hover:opacity-100 transition-opacity">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BrandCarousel;