import React, { useState } from "react";
import {
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

const ChartPage = (props: any) => {
  const [canvas, setCanvas] = useState<boolean>(false);
  return (
    <>
      <CIcon
        onClick={() => setCanvas(true)}
        icon={cilHamburgerMenu}
        size="xl"
      />
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
      <COffcanvas
        style={{ width: 300 }}
        backdrop="static"
        placement="start"
        visible={canvas}
        onHide={() => setCanvas(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>
            <CAvatar
              style={{
                filter:
                  "saturate(500%) contrast(800%) brightness(500%) invert(80%) sepia(50%) hue-rotate(120deg)",
              }}
              src={tower}
              size="md"
            />
            Скважина XXXX
          </COffcanvasTitle>
          <CCloseButton
            className="text-reset"
            onClick={() => setCanvas(false)}
          />
        </COffcanvasHeader>
        <COffcanvasBody>
          {/* <h5 style={{ textTransform: "uppercase", textAlign: "right" }}></h5>*/}
          <div
            style={{
              paddingTop: "30%",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
          >
            <CButtonGroup
              role="group"
              style={{ width: "100%" }}
              aria-label="Basic mixed styles example"
            >
              <CButton color="danger">По порядку</CButton>
              <CButton color="success">По глубине</CButton>
            </CButtonGroup>
          </div>
          <div style={{ paddingTop: "30%" }} className="d-grid gap-2">
            <CButton
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
              color="dark"
            >
              XXXXX<div>xxxx</div>
            </CButton>
            <CButton
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
              color="dark"
            >
              XXXXX<div>xxxx</div>
            </CButton>
            <CButton
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
              color="dark"
            >
              XXXXX<div>xxxx</div>
            </CButton>
            <CButton
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
              color="dark"
            >
              XXXXX<div>xxxx</div>
            </CButton>
          </div>
        </COffcanvasBody>
      </COffcanvas>
    </>
  );
};

export default ChartPage;
