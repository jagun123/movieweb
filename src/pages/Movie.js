import React from 'react';
import { motion } from 'framer-motion';
function Movie({ movie }) {
  return (
    <motion.div
      Layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <img
        class="object-cover  w-full   h-56 shadow-xl rounded-xl"
        src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path}
        alt=""
      />
      <div class="flex justify-between  mt-6">
        <p className={'text-base text-black font-medium '}> {movie.title} </p>

        <p
          className={
            ' text-md mr-2 py-1 px-4 text-white bg-yellow-500   rounded-3xl'
          }
        >
          {movie.vote_average}
        </p>
      </div>
    </motion.div>
  );
}

export default Movie;
