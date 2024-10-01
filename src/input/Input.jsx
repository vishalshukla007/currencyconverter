import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

function Input() {
  const [currencies, setcurrencies] = useState([]);
  const [amount, setamount] = useState(1);
  const [fromcurrency, setfromcurrency] = useState("USD");
  const [tocurrency, settocurrency] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(0);
  const [convertingAmount, setconvertingAmount] = useState(false);

  // Fetch currencies from API

  const fetchCurrency = async () => {
    try {
      const api = await fetch("https://api.frankfurter.app/currencies");
      const data = await api.json();
      const nationKey = Object.keys(data);
      setcurrencies(nationKey);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);
  console.log(currencies);

  const convertCurrency = async () => {
    if (!amount) return;
    setconvertingAmount(true);
    try {
      const api = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromcurrency}&to=${tocurrency}`
      );
      const data = await api.json();
      setconvertedAmount(data.rates[tocurrency] + "" + tocurrency);
    } catch (error) {
      console.log(error);
    } finally {
      setconvertingAmount(false);
    }
  };

  const swapCurrency = () => {
    setfromcurrency(tocurrency);
    settocurrency(fromcurrency);
  };

  return (
    <>
      <div className="max-w-xl rounded-xl bg-white p-3 mx-auto my-10 shadow-xl">
        <h2 className="text-gray-700 font-semibold text-center text-xl">
          Currency converter
        </h2>
        <div className="p-2 grid-cols-1 sm:grid-cols-3 justify-center items-center">
          <Dropdown
            title="from:"
            currencies={currencies}
            currency={fromcurrency}
            setcurrency={setfromcurrency}
          />
          {/* swap button */}
          <div className="w-full flex justify-center items-center p-3 my-3">
            <button
              onClick={swapCurrency}
              className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                SWAP
              </span>
            </button>
          </div>

          <Dropdown
            title="To:"
            currencies={currencies}
            currency={tocurrency}
            setcurrency={settocurrency}
          />
        </div>
        <div className="mt-10">
          <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
            <label
              className="block text-lg text-gray-700 font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              className="text-xl custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Enter text here"
              type="number"
            />
          </div>
        </div>
        <div className="flex justify-end p-3">
          <button
            onClick={convertCurrency}
            className={`cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
               border-blue-600
               border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                ${convertingAmount ? "animate-bounce opacity-75" : ""}`}
          >
            {convertingAmount ? "Converting..." : "Convert"}
          </button>
        </div>
        {convertedAmount && (
          <div className="text-center p-3 mt-3 text-green-900 font-bold text-xl">
            Your Converted Amount: {convertedAmount}
          </div>
        )}
        ;
      </div>
    </>
  );
}

export default Input;
