import styled from 'styled-components'

const StyledTitle = styled.h1`
  font-weight: 800;
  color: rgb(46, 39, 160);
`

const Wrapper = styled.div.attrs({ className: 'd-flex justify-content-center' })`
  height: 100px;
  align-items: center;
`

const MainTitle = () => {
  return (
    <Wrapper>
      <StyledTitle>{'Game submission and vote'}</StyledTitle>
    </Wrapper>
  )
}

export default MainTitle