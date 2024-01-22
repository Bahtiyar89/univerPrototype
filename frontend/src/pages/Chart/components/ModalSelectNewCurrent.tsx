import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react-pro";

interface Props {
  modal: boolean;
  items: any;
  handleModal: (el: boolean) => void;
  handleModal2: (el: boolean) => void;
  handleCurrentColumn: () => void;
}

const ModalSelectNewCurrent = ({
  modal,
  handleModal,
  handleModal2,
  handleCurrentColumn,
  items,
}: Props) => {
  return (
    <>
      <CModal
        size="lg"
        visible={modal}
        onClose={() => handleModal(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader closeButton={true}>
          <CModalTitle id="LiveDemoExampleLabel">
            Добавление параметр
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {items.length > 0 && (
              <CButton onClick={handleCurrentColumn} color="primary">
                Добавление в текуший колонку
              </CButton>
            )}
            <CButton
              onClick={() => {
                handleModal(false);
                handleModal2(true);
              }}
              color="success"
            >
              Добавление в новую колонку
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default ModalSelectNewCurrent;
