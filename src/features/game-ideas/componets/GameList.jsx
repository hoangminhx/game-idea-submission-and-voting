import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table } from 'reactstrap'
import styled from 'styled-components'

import RTGameIdeaRow from '../../extensions/react-table/RTGameIdeaRow'

const CustomTable = styled(Table)`
  margin-top: 20px;
`

const GameList = ({gameIdeas}) => {

  const columns = [
    {
      header: 'Game Ideas',
      accessorKey: 'detail',
      cell: ({ row }) => {
        return <RTGameIdeaRow row />
      }
    }
  ]

  const table = useReactTable({
    columns,
    data: gameIdeas,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <CustomTable hover>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </CustomTable>
  )
}

export default GameList