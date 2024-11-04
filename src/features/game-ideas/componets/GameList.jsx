import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import { useState } from 'react'

import RTGameIdeaRow from '../../extensions/react-table/rows/RTGameIdeaRow'
import RTFilter from '../../extensions/react-table/filters/RTFilter'

const CustomTable = styled(Table)`
  margin-top: 20px;
`

const CustomHeader = styled.h5`
  font-weight: 800;
  color: rgb(46, 39, 160);
`

const GameList = ({ gameIdeas, onUpvote, onDownvote }) => {

  const [columnFilters, setColumnFilters] = useState([])

  const columns = [
    {
      header: <CustomHeader>Game Ideas</CustomHeader>,
      accessorKey: 'detail',
      filterFn: 'customFilter',
      cell: ({ row }) => {
        return <RTGameIdeaRow row={row} onUpvote={onUpvote} onDownvote={onDownvote} />
      }
    }
  ]

  const myFilter = ({ original: { summary, detail } }, columnIds, filterValue) => {
    return summary.toLowerCase().includes(filterValue.toLowerCase())
      || detail.toLowerCase().includes(filterValue.toLowerCase())
  }

  const table = useReactTable({
    data: gameIdeas,
    columns,
    filterFns: {
      customFilter: myFilter
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <CustomTable borderless>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : <>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none text-center'
                          : 'text-center',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <>&nbsp;<i className='fa-solid fa-angle-up'></i></>,
                        desc: <>&nbsp;<i className='fa-solid fa-angle-down'></i></>,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        <RTFilter column={header.column} />
                      </div>
                    ) : null}
                  </>}
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