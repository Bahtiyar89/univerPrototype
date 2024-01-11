import { CSmartTable } from "@coreui/react-pro";

const SubChildTable = ({ arr }: any) => {
  const columns = [
    {
      key: "RecID",
      filter: false,
      sorter: false,
    },
    {
      key: "RecDT",
      label: "RecDT",
    },
    "RecRockID",
    "RecType",
  ];

  return (
    <div style={{ background: "#363636" }}>
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

export default SubChildTable;
