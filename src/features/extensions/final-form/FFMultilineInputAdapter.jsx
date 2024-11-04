import { Input } from 'reactstrap'
import styled from 'styled-components'

const MultilineInput = styled(Input).attrs({ type: 'textarea' })`
  min-height: 150px;
`

const FFMultilineInputAdapter = ({ input, meta, ...rest }) => {
  return <MultilineInput {...input} invalid={meta.error && meta.touched} {...rest} />
}

export default FFMultilineInputAdapter