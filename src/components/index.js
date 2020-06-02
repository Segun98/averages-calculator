import React, { useState, useContext } from "react";
import { averagesContext } from "../context/averages";

export default function Index() {
  const [required, setrequired] = useState(false);
  const [showsum, setshowsum] = useState(false);

  //array of input values
  const {
    number,
    freq,
    freqx,
    xMinusMean,
    positive_x_mean,
    freqx_mean,
    square_x_mean,
    f_square_x_mean,
  } = useContext(averagesContext);

  const [x] = number;
  const [f] = freq;
  const [fx] = freqx;
  const [x_mean] = xMinusMean;
  const [_x_mean] = positive_x_mean;
  const [fx_mean] = freqx_mean;
  const [var_x_mean] = square_x_mean;
  const [f_var_x_mean] = f_square_x_mean;

  //answers
  const [meanAns, setmeanAns] = useState();
  const [meanDeviation] = useState([]);
  const [Variance] = useState([]);
  const [StandardDeviation] = useState([]);
  //Input states
  const [x_input, setx_input] = useState("");
  const [f_input, setf_input] = useState(1);

  //sums
  const [fsum, setfsum] = useState();
  const [fxsum, setfxsum] = useState();
  const [fx_meansum] = useState([]);
  const [fvarx_meansum] = useState([]);


  function submitX(e) {
    e.preventDefault();
    if (f_input === "") return null;
    // if theres a frequency
    if (f_input !== "") {
      f.push(f_input);
      x.push(x_input);
      //make frequency required when it has an input
      setrequired(true);
      //multiply number and frequency
      let mult = 0;
      for (let index = 0; index < x.length; index++) {
        mult = x[index] * f[index];
      }
      fx.push(mult);
    } else if (f_input === "") {
      x.push(x_input);
    }
    setx_input("");
    setf_input(1);
  }

  function findMean(e) {
    e.preventDefault();
    if (x.length === 0) return null;
    //if no frequency
    if (f.length === 0) {
      const mean = x.reduce((a, b) => parseInt(a) + parseInt(b)) / x.length;
      setmeanAns(Math.round(mean));
    } else if (f.length > 0) {
      let fxsum = fx.reduce((a, b) => parseInt(a) + parseInt(b));
      setfxsum(fxsum);
      let fsum = f.reduce((a, b) => parseInt(a) + parseInt(b));
      setfsum(fsum);
      //Mean
      let meanWithF = fxsum / fsum;
      setmeanAns(Math.round(meanWithF));
      setshowsum(true);
    }
  }

  //find x minus mean
  if (meanAns !== undefined) {
    let minusMean = 0;

    for (let index = 0; index < x.length; index++) {
      minusMean = x[index] - meanAns;
      x_mean.push(minusMean);
      _x_mean.push(Math.abs(minusMean));
      var_x_mean.push(Math.pow(minusMean, 2));
    }
  }

  //find f times x minus mean
  if (meanAns !== undefined) {
    for (let index = 0; index < x.length; index++) {
      let mult = 0;
      mult = f[index] * _x_mean[index];
      fx_mean.push(mult);
    }
  }

  //find f times x minus mean squared
  if (meanAns !== undefined) {
    for (let index = 0; index < x.length; index++) {
      let mult = 0;
      mult = f[index] * var_x_mean[index];
      f_var_x_mean.push(mult);
    }
  }

  //sum of fx_mean
  if (fx_mean.length > 0) {
    let fxmeansum = fx_mean.reduce((a, b) => a + b);
    fx_meansum.push(fxmeansum);

    //sum of f(x-mean)^2
    let fvarxmeansum = f_var_x_mean.reduce((a, b) => a + b);
    fvarx_meansum.push(fvarxmeansum);

    //Mean deviation
    let meanDev = fx_meansum / fsum;
    meanDeviation.push(meanDev.toFixed(2));

    //Variance
    let Varian = fvarx_meansum / fsum;
    Variance.push(Varian.toFixed(2));

    // StandardDeviation
    StandardDeviation.push(Math.sqrt(Variance[0]).toFixed(2))
  }  

  return (
    <div className="index-page">
      <h5 style={{ textAlign: "center", marginBottom: "20px" }}>
        Mean, Mean Deviation, Variance and Standard Deviation Calculator
      </h5>
      <div className="table-grid">
        <div className="long-tablename">x</div>
        <div className="long-tablename">f</div>
        <div className="long-tablename">fx</div>
        <div className="long-tablename">x-m</div>
        <div className="long-tablename">|x-m|</div>
        <div className="long-tablename">f|x-m|</div>
        <div className="long-tablename">(x-m)^2</div>
        <div className="long-tablename">f(x-m)^2</div>
      </div>
      <div className="table-grid">
        <div>
          {x.map((x, index) => (
            <ul key={index}>
              <li>{x}</li>
            </ul>
          ))}
        </div>
        <div>
          {f.map((f, index) => (
            <ul key={index}>
              <li>{f}</li>
            </ul>
          ))}
        </div>
        <div>
          {fx.map((fx, index) => (
            <ul key={index}>
              <li>{fx}</li>
            </ul>
          ))}
        </div>
        <div>
          {x_mean.map((xm, index) => (
            <ul key={index}>
              <li>{xm}</li>
            </ul>
          ))}
        </div>
        <div>
          {_x_mean.map((plusx, index) => (
            <ul key={index}>
              <li>{plusx}</li>
            </ul>
          ))}
        </div>
        <div>
          {fx_mean.map((fxmean, index) => (
            <ul key={index}>
              <li>{fxmean}</li>
            </ul>
          ))}
        </div>
        <div>
          {var_x_mean.map((varx, index) => (
            <ul key={index}>
              <li>{varx}</li>
            </ul>
          ))}
        </div>
        <div>
          {f_var_x_mean.map((fvarx, index) => (
            <ul key={index}>
              <li>{fvarx}</li>
            </ul>
          ))}
        </div>
      </div>
      <div
        className="table-grid"
        style={{ display: showsum ? "grid" : "none" }}
      >
        <div>{""}</div>
        <div className="long-tablename">Ef: {fsum}</div>
        <div className="long-tablename">Efx: {fxsum}</div>
        <div>{""}</div>
        <div>{""}</div>
        <div className="long-tablename">Ef|x-m|: {fx_meansum[0]}</div>
        <div>{""}</div>
        <div className="long-tablename">Ef(x-m)sq: {fvarx_meansum[0]} </div>
      </div>
      <div className="input-items">
        <form className="input-form" onSubmit={submitX}>
          <div className="number-input">
            <div>
              <label htmlFor="Number(x)">Number(x)</label>
              <br />
              <input
                required
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="enter number..."
                value={x_input}
                onChange={(e) => setx_input(e.target.value)}
              />
            </div>
            <div
              style={{
                display: x.length > 0 && f.length === 0 ? "none" : "block",
              }}
            >
              <label htmlFor="Frequency(x)">Frequency(F)</label>
              <br />
              <input
                required={required}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="enter number..."
                value={f_input}
                onChange={(e) => setf_input(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "5px" }}>
            <button>Submit</button>
          </div>
        </form>
        <br />
        <button onClick={findMean}>Calculate</button>
        <br />
        <br />
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Reset
        </button>
      </div>
      <br />
      <div className="answer">
      <h3>Results</h3>
        <div>Mean: {meanAns}</div>
        <br />
        <div>Mean Deviation: {meanDeviation[0]}</div>
        <br />
        <div>Variance: {Variance[0]}</div>
        <br />
        <div style={{ display: "flex" }}>
          Standard deviation: {StandardDeviation[0]}
        </div>
      </div>
      <footer style={{ textAlign: "center", marginTop: "10px" }}>
        <p>
          Made by{" "}
          <a
            href="https://segunos.tk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Segun
          </a>
        </p>
      </footer>
    </div>
  );
}
