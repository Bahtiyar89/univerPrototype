import React, { useEffect, useState } from "react";
import axios from "axios";
import { CButton, CCollapse, CSmartTable } from "@coreui/react-pro";
import ChildTable from "./ChildTable";

const WellsPage = () => {
  const [wells, setWells] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/well/?RecID=-1",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log("response", response.data);
        setWells(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log("err,", response);
      });
  }, []);

  const [details, setDetails] = useState<{ RecID: any }[]>([]);
  const columns = [
    {
      key: "RecID",
      label: "RecID",
      filter: false,
      sorter: false,
    },
    {
      key: "RecIDPlaceHolder",
      label: "Place Holder",
      filter: false,
      sorter: false,
    },
    {
      key: "RecRegion",
      label: "RecRegion",
      filter: false,
      sorter: false,
    },
    "RecName",
    {
      key: "RecPlaceOwner",
      _style: { width: "20%" },
    },

    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
    },
  ];

  const toggleDetails = (RecID: any) => {
    const position = details.indexOf(RecID);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, RecID];
    }
    setDetails(newDetails);
  };

  return (
    <div style={{ backgroundColor: "grey" }}>
      <CSmartTable
        activePage={2}
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        items={wells}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        scopedColumns={{
          show_details: (item: any) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item?.RecID);
                  }}
                >
                  {details.includes(item.RecID) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse visible={details.includes(item.RecID)}>
                <ChildTable arr={item.Rocks} />
              </CCollapse>
            );
          },
        }}
        sorterValue={{ column: "status", state: "asc" }}
        tableProps={{
          className: "add-this-class",
          responsive: true,
          striped: true,
          hover: true,
        }}
        tableBodyProps={{
          className: "align-middle",
        }}
      />
    </div>
  );
};

export default WellsPage;
