import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "./background-beams-with-collision";




export const Beam = () => {
  const boxWidth = 400;
  const boxHeight = 200;
  const beamLength = 80; // length of the glowing streak

  return (
    <>
      <div
        className="relative bg-black rounded-xl overflow-hidden"
        style={{ width: boxWidth, height: boxHeight }}
      >
        {/* Neon meteor beam */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{
            // Stair-step path: right → down → right → down
            x: [
              0,
              boxWidth / 2,
              boxWidth / 2,
              boxWidth,
              boxWidth
            ],
            y: [
              0,
              0,
              boxHeight / 2,
              boxHeight / 2,
              boxHeight
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute h-1 w-20 rounded-full
                     bg-gradient-to-r from-pink-400 via-purple-500 to-transparent
                     shadow-[0_0_25px_rgba(236,72,153,0.9)]"
        />
      </div>
      <BackgroundBeamsWithCollision>
        <h4
          className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          I craft exceptional digital experiences with clean, efficient code and{" "}
          <div
            className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div
              className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">beautiful designs.</span>
            </div>
            <div
              className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">beautiful designs.</span>
            </div>
          </div>
        </h4>
      </BackgroundBeamsWithCollision>
    </>
  );
};