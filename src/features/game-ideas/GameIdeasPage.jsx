import { Col, Row } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'
import storage from 'local-storage-fallback'

import { CustomContainer } from '../common/styled/bootstraps.styled'
import IdeaForm from './componets/IdeaForm'
import GameList from './componets/GameList'
import { generateGUID } from '../helpers/guid.helper'
import { getCurrentUser } from '../helpers/user.helper'

const GAME_IDEAS_KEY = 'GAME_IDEAS'

const GameIdeasPage = () => {

  const user = useRef(getCurrentUser())

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

  const handleUpvote = ({ id }) => {
    upvote({ userId: user.current.userId, ideaId: id })
  }

  const handleDownvote = ({ id }) => {
    downvote({ userId: user.current.userId, ideaId: id })
  }

  const upvote = ({ userId, ideaId }) => {
    setGameIdeas(prevIdeas => {
      const currentGameIdeas = [...prevIdeas]
      const currentIdea = currentGameIdeas.find(e => e.id === ideaId)
      if (!currentIdea) return currentGameIdeas

      const { upvotes = [], downvotes = [] } = currentIdea
      const upvoteIndex = upvotes.findIndex(e => e === userId)
      const downvoteIndex = downvotes.findIndex(e => e === userId)

      if (upvoteIndex > -1) {
        upvotes.splice(upvoteIndex, 1)
      } else {
        upvotes.push(userId)
      }

      if (downvoteIndex > -1)
        downvotes.splice(downvoteIndex, 1)

      currentIdea.upvotes = upvotes
      currentIdea.downvotes = downvotes

      return currentGameIdeas
    })
  }

  const downvote = ({ userId, ideaId }) => {
    setGameIdeas(prevIdeas => {
      const currentGameIdeas = [...prevIdeas]
      const currentIdea = currentGameIdeas.find(e => e.id === ideaId)
      if (!currentIdea) return currentGameIdeas

      const { upvotes = [], downvotes = [] } = currentIdea
      const upvoteIndex = upvotes.findIndex(e => e === userId)
      const downvoteIndex = downvotes.findIndex(e => e === userId)

      if (upvoteIndex > -1) {
        upvotes.splice(upvoteIndex, 1)
      }

      if (downvoteIndex > -1) {
        downvotes.splice(downvoteIndex, 1)
      } else {
        downvotes.push(userId)
      }

      currentIdea.upvotes = upvotes
      currentIdea.downvotes = downvotes

      return currentGameIdeas
    })
  }

  useEffect(() => {
    setGameIdeas(JSON.parse(storage.getItem(GAME_IDEAS_KEY) || '[]'))
  }, [])

  useEffect(() => {
    storage.setItem(GAME_IDEAS_KEY, JSON.stringify(gameIdeas))
  }, [gameIdeas])

  return (
    <CustomContainer>
      <Row>
        <Col xs={{ offset: 3, size: 6 }}>
          <IdeaForm onSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row>
        <Col>
          <GameList gameIdeas={gameIdeas} onUpvote={handleUpvote} onDownvote={handleDownvote} />
          {/* {gameIdeas.length
            ? <GameList gameIdeas={gameIdeas} />
            : null} */}
        </Col>
      </Row>
    </CustomContainer>
  )
}

export default GameIdeasPage