import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        Footer
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
