import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false} data-testid="the-footer">
      <div>
        Footer
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
