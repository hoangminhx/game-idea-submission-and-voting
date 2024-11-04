import { Col, Row } from 'reactstrap'
import { useEffect, useState } from 'react'

import { CustomContainer } from '../common/styled/bootstraps.styled'
import IdeaForm from './componets/IdeaForm'
import GameList from './componets/GameList'
import { generateGUID } from '../helpers/guid.helper'

const GameIdeasPage = () => {

  const [gameIdeas, setGameIdeas] = useState([])

  const handleSubmit = (values) => {
    setGameIdeas(prevState => {
      const newIdea = {
        id: generateGUID(),
        summary: values.summary,
        detail: values.detail
      }

      prevState.push(newIdea)
      return [...prevState]
    })
  }

  useEffect(() => {

  }, [])

  return (
    <CustomContainer>
      <Row>
        <Col>
          <IdeaForm onSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row>
        <Col>
          <GameList gameIdeas={gameIdeas} />
          {/* {gameIdeas.length
            ? <GameList gameIdeas={gameIdeas} />
            : null} */}
        </Col>
      </Row>
    </CustomContainer>
  )
}

export default GameIdeasPage