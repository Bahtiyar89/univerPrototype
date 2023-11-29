import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CCollapse,
  CContainer,
  CFormInput,
  CRow,
} from "@coreui/react-pro";
import Plot from "react-plotly.js";

const FirstColumn = () => {
  let result = new Array(100);
  result = result
    .fill()
    .map(() => Math.round(Math.random() * (25000 - 8000 + 1)) + 8000);

  let res = new Array(100);
  res = res

    .fill()
    .map(() => Math.round(Math.random() * (3200 - 500 + 1)) + 500)
    .sort((a, b) => a - b);
  let res2 = new Array(100);
  res2 = res2.fill().map(() => Math.round(Math.random() * (20 - 5 + 1)) + 5);
  console.log("res: ", res);
  console.log("result: ", result);
  const trace1 = {
    type: "scatter",
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: "lines",
    name: "Red",
    line: {
      color: "rgb(219, 64, 82)",
      width: 3,
    },
  };

  const trace2 = {
    type: "scatter",
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: "lines",
    name: "Blue",
    line: {
      color: "rgb(55, 128, 191)",
      width: 1,
    },
  };

  const data = [trace1, trace2];
  return (
    <div style={{ display: "flex", background: "red" }}>
      <Plot
        debug={true}
        data={[
          {
            mode: "lines+markers",
            line: { color: "black" },
            name: "CALI",
            type: "scatter",
            x: res2,
            xaxis: "x",
            y: res,
            yaxis: "y",
          },
          {
            line: {
              color: "firebrick",
            },
            name: "RDEP",
            type: "scatter",
            x: [
              1.79868138, 1.7956413, 1.80073333, 8.24981689, 8.30395889,
              8.33829117,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "green",
            },
            name: "GR",
            type: "scatter",
            x: [
              20.20085144, 20.26288605, 20.8219986, 18.6468792, 18.25358391,
              19.82991982,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "mediumaquamarine",
            },
            name: "RHOB",
            type: "scatter",
            x: [
              1.88418579, 1.88979352, 1.89652276, 2.68129992, 2.7383368,
              2.79292154,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "goldenrod",
            },
            name: "SP",
            type: "scatter",
            x: [
              15.61237907, 15.8955307, 15.91635704, 10.10922241, 10.75323486,
              10.96128845,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
        ]}
        layout={{
          hidesources: true,
          height: 750,
          showlegend: false,
          hoverdistance: 1,
          width: 400,
          xaxis: {
            side: "top",
            anchor: "y",
            domain: [0, 10],
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showline: true,
            tickangle: 0,
            ticks: "inside",
            title: { text: "CALI" },
          },

          yaxis: {
            anchor: "x",
            autorange: "reversed",

            dtick: 250,
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showline: true,
            tick0: 0,
            tickmode: "linear",
            ticks: "outside",
          },
        }}
      />
      <Plot
        data={[
          {
            mode: "lines+markers",
            line: { color: "black" },
            name: "CALI",
            type: "scatter",
            x: res2,
            xaxis: "x",
            y: res,
            yaxis: "y",
          },
          {
            line: {
              color: "firebrick",
            },
            name: "RDEP",
            type: "scatter",
            x: [
              1.79868138, 1.7956413, 1.80073333, 8.24981689, 8.30395889,
              8.33829117,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "green",
            },
            name: "GR",
            type: "scatter",
            x: [
              20.20085144, 20.26288605, 20.8219986, 18.6468792, 18.25358391,
              19.82991982,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "mediumaquamarine",
            },
            name: "RHOB",
            type: "scatter",
            x: [
              1.88418579, 1.88979352, 1.89652276, 2.68129992, 2.7383368,
              2.79292154,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "goldenrod",
            },
            name: "SP",
            type: "scatter",
            x: [
              15.61237907, 15.8955307, 15.91635704, 10.10922241, 10.75323486,
              10.96128845,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
        ]}
        layout={{
          showlegend: false,
          hoverdistance: 1,
          width: 300,
          height: 750,
          xaxis: {
            side: "top",
            anchor: "y",
            domain: [0, 10],
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showline: true,
            tickangle: 0,
            ticks: "inside",
            title: { text: "CALI" },
          },
          yaxis: {
            anchor: "x",
            autorange: "reversed",
            dtick: 250,
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showline: true,
            tick0: 0,
            tickmode: "linear",
            ticks: "outside",
          },
        }}
      />
      <Plot
        debug={true}
        data={[
          {
            mode: "lines+markers",
            line: { color: "black" },
            name: "CALI",
            type: "scatter",
            x: res2,
            xaxis: "x",
            y: res,
            yaxis: "y",
          },
          {
            line: {
              color: "firebrick",
            },
            name: "RDEP",
            type: "scatter",
            x: [
              1.79868138, 1.7956413, 1.80073333, 8.24981689, 8.30395889,
              8.33829117,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "green",
            },
            name: "GR",
            type: "scatter",
            x: [
              20.20085144, 20.26288605, 20.8219986, 18.6468792, 18.25358391,
              19.82991982,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "mediumaquamarine",
            },
            name: "RHOB",
            type: "scatter",
            x: [
              1.88418579, 1.88979352, 1.89652276, 2.68129992, 2.7383368,
              2.79292154,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
          {
            line: {
              color: "goldenrod",
            },
            name: "SP",
            type: "scatter",
            x: [
              15.61237907, 15.8955307, 15.91635704, 10.10922241, 10.75323486,
              10.96128845,
            ],
            xaxis: "x",
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
            yaxis: "y",
          },
        ]}
        layout={{
          hidesources: true,
          height: 750,
          showlegend: false,
          hoverdistance: 1,
          width: 400,
          xaxis: {
            side: "top",
            anchor: "y",
            domain: [0, 10],
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showline: true,
            tickangle: 0,
            ticks: "inside",
            title: { text: "CALI" },
          },

          yaxis: {
            anchor: "x",
            autorange: "reversed",
            dtick: 250,
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showline: true,
            tick0: 0,
            tickmode: "linear",
            ticks: "outside",
          },
        }}
      />
    </div>
  );
};

export default FirstColumn;
