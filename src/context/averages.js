import React, { createContext, useState } from "react";

export const averagesContext = createContext();

export function AveragesProvider({ children }) {
  const [x, setx] = useState([]);
  const [f, setf] = useState([]);
  const [fx, setfx] = useState([]);
  const [x_mean, setx_mean] = useState([]);
  const [_x_mean, set_x_mean] = useState([]);
  const [fx_mean, setfx_mean] = useState([]);
  const [var_x_mean, setvar_x_mean] = useState([]);
  const [f_var_x_mean, setf_var_x_mean] = useState([]);
  const [std_dev, setstd_dev] = useState([]);

  return (
    <averagesContext.Provider
      value={{
        number: [x, setx],
        freq: [f, setf],
        freqx: [fx, setfx],
        xMinusMean: [x_mean, setx_mean],
        positive_x_mean: [_x_mean, set_x_mean],
        freqx_mean: [fx_mean, setfx_mean],
        square_x_mean: [var_x_mean, setvar_x_mean],
        f_square_x_mean: [f_var_x_mean, setf_var_x_mean],
        std_dev: [std_dev, setstd_dev],
      }}
    >
      {children}
    </averagesContext.Provider>
  );
}
