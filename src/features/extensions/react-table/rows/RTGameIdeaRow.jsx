import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardText, CardTitle } from 'reactstrap'
import styled from 'styled-components'

import { getCurrentUser } from '../../../helpers/user.helper'

const CustomSpan = styled.span`
  margin: 0px 10px;
`

const RTGameIdeaRow = ({ row: { original: { id, summary, detail, upvotes = [], downvotes = [] } }, onUpvote, onDownvote }) => {

  const [isUpvote, setIsUpvote] = useState(false)
  const [isDownvote, setIsDownvote] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (upvotes.includes(currentUser.userId)) {
      setIsUpvote(true)
    } else if (downvotes.includes(currentUser.userId)) {
      setIsDownvote(true)
    }
  }, [upvotes, downvotes])

  return (
    <Card>
      <CardBody>
        <CardTitle tag={'h6'}>
          {summary}
        </CardTitle>
        <CardText>
          {detail}
        </CardText>
        {isUpvote
          ? <Button color='primary' size='sm' onClick={() => onUpvote({ id })}><i className='fa-solid fa-thumbs-up'></i></Button>
          : <Button color='primary' size='sm' outline onClick={() => onUpvote({ id })}><i className='fa-regular fa-thumbs-up'></i></Button>}
        <CustomSpan>{upvotes.length}</CustomSpan>
        {isDownvote
          ? <Button color='primary' size='sm' onClick={() => onDownvote({ id })}><i className='fa-solid fa-thumbs-down'></i></Button>
          : <Button color='primary' size='sm' outline onClick={() => onDownvote({ id })}><i className='fa-regular fa-thumbs-down'></i></Button>}
        <CustomSpan>{downvotes.length}</CustomSpan>
      </CardBody>
    </Card>)
}

export default RTGameIdeaRow