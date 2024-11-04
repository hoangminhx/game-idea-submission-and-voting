import { Form as FForm, Field } from 'react-final-form'
import { Button, Form, FormGroup, Label } from 'reactstrap'
import { object, string } from 'yup'

import FFCustomInputAdapter from '../../extensions/final-form/FFCustomInputAdapter'
import FFFormFeedback from '../../extensions/final-form/FFFormFeedback'
import FFMultilineInputAdapter from '../../extensions/final-form/FFMultilineInputAdapter'

const IdeaForm = ({ onSubmit }) => {

  const validationSchema = object().shape({
    detail: string().required('Required'),
  })

  const validate = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false })
    } catch (err) {
      const errors = {}
      err.inner.forEach((validationError) => {
        errors[validationError.path] = validationError.message
      })
      return errors
    }
  }

  return (
    <FForm
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>{'Summary'}</Label>
              <Field
                name='summary'
                placeholder='Enter summary of your idea'
                component={FFCustomInputAdapter}
              />
              <FFFormFeedback name='summary' />
            </FormGroup>
            <FormGroup>
              <Label>{'Detail'}</Label>
              <Field
                name='detail'
                placeholder='Give us more detail'
                component={FFMultilineInputAdapter}
              />
              <FFFormFeedback name='detail' />
            </FormGroup>
            <Button color='primary' type='submit' block disabled={submitting}>
              <i className='fa-solid fa-plus'></i>&nbsp;{submitting ? 'Submitting' : 'Submit'}
            </Button>
          </Form>)
      }}
    />
  )
}

export default IdeaForm