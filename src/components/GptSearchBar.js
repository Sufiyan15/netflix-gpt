import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const languageKey = useSelector((store) => store.config.language);
  const dispatch = useDispatch();

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/" +
        movie +
        "?include_adult=false&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    // Make an API call to GPT API and get movie results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Pathaan, Jawan, Badla, Don";

    const gptResults = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptQuery }],
    });
    console.log(gptResults.choices[0].message.content);
    // We get result like - "Andaaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan"

    const gptMovies = gptResults.choices[0].message.content.split(",");

    // For each movie, search the TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[languageKey]?.gptSearchPlaceholder}
          className="p-4 m-4 col-span-9"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGPTSearchClick}
        >
          {lang[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
