import React, { useEffect, useState } from 'react';
import Movie from './pages/Movie';
import { motion, AnimatePresence } from 'framer-motion';
import CustomPagination from './component/CustomPagination';
import Geners from './component/Geners';
import UseGenre from './component/UseGenre';

const KEY = 'd243bbfb0e548bd8cbba7dd08e72a07e';

function App() {
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState('');

  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = UseGenre(selectedGenres);

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  const fetchMovies = async () => {
    const data = await fetch(
      `
      https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&page=${page}&with_genres=${genreforURL}`
    );
    const movies = await data.json();

    setPopular(movies.results);
    setNumberOfPages(movies.total_pages);
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log('Searching');
    try {
      const url = `
      https://api.themoviedb.org/3/search/movie?api_key=${KEY}&page=${page}language=en-US&page=1&include_adult=false&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setPopular(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <section className="py-6 bg-gray-100 text-gray-800">
      <div class="flex justify-around   mb-4 ">
        <h2 className=" text-3xl font-bold text-black  ">Movie App</h2>
        <div class="relative">
          <label class="sr-only" for="search">
            Search
          </label>
          <form onSubmit={searchMovie}>
            <input
              class="w-full py-3 pl-3 pr-12 text-base border-2 border-gray-200 rounded-3xl leading-tight focus:outline-none focus:border-gray-500"
              id="search"
              type="search"
              value={query}
              setPage={1}
              onChange={changeHandler}
              placeholder="Search"
            />
          </form>

          <span class="absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2  right-4">
            <svg
              fill="currentColor"
              viewBox="0 0 512 512"
              className="w-4 h-4 text-gray-800"
            >
              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
            </svg>
          </span>
        </div>
      </div>
      <Geners
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        selectedGenres={selectedGenres}
        setPage={setPage}
      />
      <motion.div Layout className="container p-4 mx-auto space-y-16 sm:p-10">
        <div className="grid w-auto  grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {popular.map((movie) => {
              return <Movie key={movie.id} movie={movie} />;
            })}
          </AnimatePresence>
        </div>
      </motion.div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numberOfPages} />
      )}
    </section>
  );
}

export default App;
