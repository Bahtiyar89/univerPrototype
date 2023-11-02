import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CCollapse,
  CNav,
  CNavItem,
  CNavLink,
  CSmartTable,
  CTabContent,
  CTabPane,
} from "@coreui/react-pro";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./style.scss";
import { useBranchOptionsQuery, useDemoListQuery } from "hook/query";
import CIcon from "@coreui/icons-react";
import { cilChevronDoubleDown, cilChevronDoubleUp } from "@coreui/icons";
import CustomSpinner from "components/Spinner/CustomSpinner";
import DemoResultBadge from "../components/DemoResultBadge";
import { RefOptionsField } from "../../../../components/field/RefOptionsField";
import { DatePickerField } from "../../../../components/field/DatePickerField";
import DemoViewPage from "../view";

function DemonstrationPage() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(1);
  const [details, setDetails] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [searchParams, setSearchParams] = useState({
    branchId: undefined,
    fromDate: undefined,
    toDate: undefined,
    result: "",
  });

  const branchOptions = useBranchOptionsQuery({});
  const demoListQuery = useDemoListQuery(searchParams);

  useEffect(() => {
    loadData();
  }, [searchParams]);

  const loadData = () => {
    setLoading(true);
    demoListQuery
      .refetch()
      .then((response: any) => {
        setData(response.data);
      })
      .catch((error: any) => {
        console.error("err", error);
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      key: "customerName",
      label: "ФИО клиента",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    { key: "dateTime", label: "Дата-время", _style: { width: "20%" } },
    { key: "dealerName", label: "Дилер", _style: { width: "20%" } },
    { key: "demosecName", label: "Демосек.", _style: { width: "20%" } },
    { key: "resultName", label: "Резултать", _style: { width: "30%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
      _props: { className: "fw-semibold" },
    },
  ];

  const toggleDetails = (index: number) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <div className="demonstration">
      <h1>Список демонстрации</h1>
      <div className="demonstration__filter">
        <RefOptionsField
          fieldName={"branchId"}
          options={branchOptions.data}
          handleChange={handleChange}
        />

        <DatePickerField fieldName={"fromDate"} handleChange={handleChange} />

        <DatePickerField fieldName={"toDate"} handleChange={handleChange} />

        <CButton onClick={loadData} disabled={loading}>
          {loading ? "Ждите..." : "Загрузить"}
        </CButton>
      </div>

      <CNav variant="tabs" style={{ marginTop: 20 }} role="tablist">
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === 1}
            onClick={() => {
              setActiveKey(1);
              setSearchParams({ ...searchParams, result: "" });
            }}
          >
            Все
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === 2}
            onClick={() => {
              setActiveKey(2);
              setSearchParams({ ...searchParams, result: "NEW" });
            }}
          >
            Новые
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === 3}
            onClick={() => {
              setActiveKey(3);
              setSearchParams({ ...searchParams, result: "DONE" });
            }}
          >
            Пройденные
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === 4}
            onClick={() => {
              setActiveKey(4);
              setSearchParams({ ...searchParams, result: "RESCHEDULED" });
            }}
          >
            Перенесенные
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === 5}
            onClick={() => {
              setActiveKey(5);
              setSearchParams({ ...searchParams, result: "CANCELLED" });
            }}
          >
            Отмененные
          </CNavLink>
        </CNavItem>
      </CNav>
      {loading ? (
        <CustomSpinner />
      ) : (
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
            <CSmartTable
              activePage={1}
              // cleaner
              // clickableRows
              columns={columns}
              columnFilter
              //columnSorter
              // footer
              items={data}
              itemsPerPageSelect
              itemsPerPage={10}
              pagination
              scopedColumns={{
                demosecName: (item: any) => {
                  return <td>{item.demosecName}</td>;
                },
                resultName: (item: any) => {
                  return (
                    <td>
                      <DemoResultBadge
                        result={item.result}
                        resultName={item.resultName}
                      />
                    </td>
                  );
                },
                show_details: (item: any) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(item.id);
                        }}
                      >
                        {details.includes(item.id) ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye
                            onClick={() =>
                              navigate("/crm/list-demonstration/id")
                            }
                          />
                        )}
                      </CButton>
                    </td>
                  );
                },
              }}
              // selectable
              sorterValue={{ column: "name", state: "asc" }}
              // tableFilter
              // tableHeadProps={{
              //   color: "danger",
              // }}
              tableProps={{
                striped: true,
                hover: true,
              }}
            />
          </CTabPane>
        </CTabContent>
      )}
    </div>
  );
}

export default DemonstrationPage;
