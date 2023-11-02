import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useLoginMutation } from "hook/mutation";
import { setItemToStorage } from "utils/localStorage";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  const [validated, setValidated] = useState(false);

  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();

    const form = e.currentTarget;

    setItemToStorage(
      "access_token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0MDcxOTM2LCJpYXQiOjE2OTQwNzAxMzYsImp0aSI6IjYyZWJmMWRlNGIwNjQxZmU4ZDIxNmQ2ZDE3MzEwNDY3IiwidXNlcl9pZCI6M30.bJ5pPumbohCcsoG7C8M4HVAW_ALDRK7t5yUAt8iGwH0"
    );
    setItemToStorage(
      "refresh_token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0MDcxOTM2LCJpYXQiOjE2OTQwNzAxMzYsImp0aSI6IjYyZWJmMWRlNGIwNjQxZmU4ZDIxNmQ2ZDE3MzEwNDY3IiwidXNlcl9pZCI6M30.bJ5pPumbohCcsoG7C8M4HVAW_ALDRK7t5yUAt8iGwH0"
    );
    navigate("/");
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit} noValidate validated={validated}>
                    <h2>Вход в систему</h2>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Логин"
                        autoComplete="username"
                        name="username"
                        feedbackInvalid={errors.username || ""}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Пароль"
                        autoComplete="current-password"
                        name="password"
                        feedbackInvalid={errors.password || ""}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          disabled={loading}
                          type={"submit"}
                          color="primary"
                          className="px-4"
                        >
                          {loading ? "Ждите...." : "Войти"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
