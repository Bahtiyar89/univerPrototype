import React, { useState } from "react";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAvatar,
  CButton,
  CButtonGroup,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import tower from "assets/images/electric-tower.png";
import CanvasMenu from "./CanvasMenu";

const GraphicScreen = (props: any) => {
  return (
    <>
      <CChart
        type="line"
        color="red"
        data={{
          labels: [
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 115, 120, 130, 140,
            150, 160, 170, 180, 190, 200, 210, 220,
          ],

          datasets: [
            {
              pointRadius: 8,
              label: "My First dataset",
              backgroundColor: "orange",
              borderColor: "orange",
              pointBackgroundColor: "orange",
              pointBorderColor: "orange",
              data: [
                { y: 100, x: 20 },
                { y: 70, x: 60 },
                { y: 45, x: 110 },
                { y: 30, x: 170 },
                { y: 20, x: 220 },
              ],
              fill: false,
              tension: 0.5,
            },
            {
              pointRadius: 8,
              label: "My Second dataset",
              backgroundColor: "blue",
              borderColor: "blue",
              pointBackgroundColor: "blue",
              pointBorderColor: "blue",
              data: [
                { y: 95, x: 110 },
                { y: 65, x: 115 },
                { y: 50, x: 120 },
                { y: 30, x: 150 },
                { y: 20, x: 210 },
              ],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle("--cui-body-color"),
              },
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              grid: {
                color: getStyle("--cui-body-color"),
              },
              ticks: {
                color: getStyle("--cui-body-color"),
              },
              display: true,
              title: {
                display: true,
              },
            },
            y: {
              grid: {
                color: getStyle("--cui-body-color"),
              },
              ticks: {
                color: getStyle("--cui-body-color"),
              },
            },
          },
        }}
      />
    </>
  );
};

export default GraphicScreen;
