import React from 'react'
import { CButton, CContainer, CRow } from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'

const AppContentPageWrapper = (props: any) => {
  const navigate = useNavigate()

  // eslint-disable-next-line react/prop-types
  const { pageTitle, createUrl, content, actionButtons = [], onClickActionButtons, actionButtonsIsLoading } = props

  return (
    <CContainer lg style={{ padding: '1rem', backgroundColor: '#fff' }}>
      <CRow>
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottom: '1px solid #EAEAEA',
          }}
        >
          <h4>{pageTitle}</h4>

          <div>
            {createUrl && (
              <CButton color="primary" className="mb-2" onClick={() => navigate(createUrl)}>
                Добавить
              </CButton>
            )}
            {actionButtons.map((el: any, index: number) => (
              <CButton
                style={{ marginRight: '10px' }}
                key={index}
                color={el?.id === 'UPDATE' ? 'warning' : el?.id === 'DELETE' ? 'danger' : 'secondary'}
                className="mb-2"
                disabled={actionButtonsIsLoading}
                onClick={() => onClickActionButtons(el?.id)}
              >
                {actionButtonsIsLoading ? 'Ждите...' : el?.label}
              </CButton>
            ))}
          </div>
        </div>
      </CRow>
      <CRow>{content}</CRow>
    </CContainer>
  )
}

export default AppContentPageWrapper
