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
  items: any;
  columnName: string;
  modal3: boolean;
  newObjectToColumn: (el: string) => void;
  onClose: () => void;
}

const ModalCurrentColumn = ({
  items,
  columnName,
  modal3,
  newObjectToColumn,
  onClose,
}: Props) => {
  return (
    <CModal
      visible={modal3}
      onClose={onClose}
      aria-labelledby="ToggleBetweenModalsExample2"
    >
      <CModalHeader>
        <CModalTitle id="ToggleBetweenModalsExample2">
          Добавление нового обьекта "{columnName}" к колонке
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {items.map((el: any) => (
          <CButton
            onClick={() => newObjectToColumn(el)}
            style={{ margin: 10 }}
            color="primary"
          >
            {el.name}
          </CButton>
        ))}
      </CModalBody>
    </CModal>
  );
};

export default ModalCurrentColumn;
