import DebouncedInput from '../../../common/DebounceInput'

const RTFilter = ({ column }) => {
  const columnFilterValue = column.getFilterValue()

  return (
    <DebouncedInput
      onChange={value => column.setFilterValue(value)}
      placeholder={'Search...'}
      type='text'
      value={(columnFilterValue ?? '')}
    />
  )
}

export default RTFilter