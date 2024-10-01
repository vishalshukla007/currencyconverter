import React from "react";

const Dropdown = ({
  currencies,
  currency,
  setcurrency,
  title,
  favorites,
  handleFavorite,
}) => {
  return (
    <>
      <label
        htmlFor={title}
        className="block text-lg mt-2 p-2 font-semibold text-gray-700"
      >
        {title}
      </label>
      <div>
        <select
          id={title}
          value={currency}
          onChange={(e) => setcurrency(e.target.value)}
          className="mt-1 block w-full  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {currencies.map((curr) => {
            return (
              <option key={curr} value={curr}>
                {curr}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
