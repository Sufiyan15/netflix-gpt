import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.language);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
        <input
          type="text"
          placeholder={lang[languageKey]?.gptSearchPlaceholder}
          className="p-4 m-4 col-span-9"
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
          {lang[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
