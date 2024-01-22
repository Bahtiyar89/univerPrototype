import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react-pro";

interface Props {
  columnName: string;
  modal2: boolean;
  handleColumntAdd: () => void;
  handleColumnName: (el: string) => void;
}

const ModalNewColumn = ({
  columnName,
  modal2,
  handleColumntAdd,
  handleColumnName,
}: Props) => {
  return (
    <CModal visible={modal2} aria-labelledby="ToggleBetweenModalsExample2">
      <CModalHeader>
        <CModalTitle id="ToggleBetweenModalsExample2">
          Наименование новой колонки
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          type="text"
          placeholder="Large input"
          aria-label="lg input example"
          onChange={(val: any) => handleColumnName(val.target.value)}
          value={columnName}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleColumntAdd}>
          Добавить
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalNewColumn;
