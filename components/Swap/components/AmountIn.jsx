import React, { useState, useEffect, useRef } from "react";
import { CgChevronDownR } from 'react-icons'


const AmountIn = ({ value, onChange, currencyValue, onSelect, currencies, isSwapping }) => {
  const [showList, setShowList] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState("Select");
  const ref = useRef()

  useOnClickOutside(ref, () => setShowList(false))

  return (
    <div className='amountContainer'>
      <input
        placeholder="0.0"
        type="number"
        value={value}
        disabled={isSwapping}
        onChange={(e) => typeof onChange === "function" && onChange(e.target.value)}
        className='amountInput'
      />

      <div className="relative" onClick={() => setShowList(!showList)}>
        <button className='currencyButton'>
          {activeCurrency}
          <img
            src={CgChevronDownR}
            alt="cheveron-down"
            className={`w-4 h-4 object-contain ml-2 ${
              showList ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {showList && (
          <ul ref={ref} className='currencyList'>
            {Object.entries(currencies).map(([token, tokenName], index) => (
              <li
                key={index}
                className={`${'currencyListItem'} ${
                  activeCurrency === tokenName ? "bg-gray-700" : ""
                } cursor-pointer`}
                onClick={() => {
                  if (typeof onSelect === "function") onSelect(token);
                  setActiveCurrency(tokenName);
                  setShowList(false);
                }}
              >
                {tokenName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AmountIn