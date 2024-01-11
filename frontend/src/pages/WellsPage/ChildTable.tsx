import React, { useState } from "react";
import { CButton, CCollapse, CSmartTable } from "@coreui/react-pro";
import SubChildTable from "./SubChildTable";

const ChildTable = ({ arr }: any) => {
  const [details, setDetails] = useState<{ RecID: any }[]>([]);
  const columns = [
    {
      key: "RecID",
      label: "RecID",
      filter: false,
      sorter: false,
    },
    {
      key: "RecWellID",
      //  _style: { width: "20%" },
    },
    "RecTop",
    "RecBottom",
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
    <div style={{ background: "#877F7D" }}>
      <CSmartTable
        activePage={2}
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        items={arr}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        onFilteredItemsChange={(items) => {
          console.log(items);
        }}
        onSelectedItemsChange={(items) => {
          console.log(items);
        }}
        scopedColumns={{
          show_details: (item: any) => {
            console.log("111!: ", item);

            return (
              <td className="py-2">
                <CButton
                  color="warning"
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
                <SubChildTable arr={item.Searches} />
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

export default ChildTable;
