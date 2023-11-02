import { CSpinner } from "@coreui/react-pro";

function CustomSpinner() {
  return (
    <CSpinner
      style={{
        top: "50%",
        left: "40%",
        height: 100,
        width: 100,
        position: "absolute",
      }}
    />
  );
}

export default CustomSpinner;
