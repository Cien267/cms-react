import React from 'react'
import useEffectAfterMount from '@/hooks/useEffectAfterMount'

import CheckBoxFilter from '@/components/Table/CheckboxFilter'
import DateRangeFilter from '@/components/Table/DateRangeFilter'
import RadioFilter from '@/components/Table/RadioFilter'
import RangeNumberFilter from '@/components/Table/RangeNumberFilter'
import TextFilter from '@/components/Table/TextFilter'

const TableMetaContext = React.createContext()

const actionTypes = {
  changePage: 'changePage',
  changeAllFilter: 'changeAllFilter',
  changeFilter: 'changeFilter',
  clearAllFilter: 'clearAllFilter',
  clearKeyFilter: 'clearKeyFilter',
  changeSorter: 'changeSorter',
}

function filterReducer(state, action) {
  switch (action.type) {
    case actionTypes.changePage: {
      return { ...state, page: action.payload }
    }
    case actionTypes.changeAllFilter: {
      return { ...state, page: 1, ...action.payload }
    }
    case actionTypes.clearAllFilter: {
      const newState = { ...state }
      Object.keys(newState).forEach(key => {
        if (key === 'page') {
          state.page = 1
        } else if (key === 'limit' || key.startsWith('sort')) {
        } else {
          newState[key] = null
        }
      })
      return newState
    }
    case actionTypes.changeFilter: {
      const { key, value } = action.payload
      return { ...state, page: 1, [key]: value }
    }
    case actionTypes.changeSorter: {
      const { columnKey, order } = action.payload
      if (order) {
        return { ...state, page: 1, sort: `${columnKey}_${order}` }
      } else {
        return { ...state, page: 1, sort: null }
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function TableMetaProvider({ children, initialValue, onChange, columns }) {
  const [state, dispatch] = React.useReducer(
    filterReducer,
    typeof initialValue === 'function' ? initialValue() : initialValue,
  )

  useEffectAfterMount(() => {
    if (typeof onChange === 'function') {
      onChange(state)
    }
  }, [state])

  const value = { state, dispatch, columns }
  return (
    <TableMetaContext.Provider value={value}>
      {children}
    </TableMetaContext.Provider>
  )
}

function useMetaTable() {
  const context = React.useContext(TableMetaContext)
  if (context === undefined) {
    throw new Error(`useTableProvider must be used within a TableMetaProvider`)
  }
  return context
}

function useColumns() {
  const { columns, state } = useMetaTable()

  const enhancedColumns = React.useMemo(() => {
    const sortParam = state.sort || ''
    const [sortField, sortDirection] = sortParam.split('_')
    return columns.map(col => {
      const newCol = { ...col }

      if (newCol.filterSearch) {
        if (!newCol.filteredValue) {
          newCol.filteredValue = state[newCol.key] || null
        }

        if (newCol.filterType === 'text') {
          newCol.filterDropdown = props => {
            return (
              <TextFilter {...props} placeholder={newCol.filterPlaceholder} />
            )
          }
        }

        if (newCol.filterType === 'checkbox') {
          newCol.filterDropdown = props => {
            return <CheckBoxFilter {...props} options={newCol.filterOptions} />
          }
        }

        if (newCol.filterType === 'radio') {
          newCol.filterDropdown = props => {
            return <RadioFilter {...props} options={newCol.filterOptions} />
          }
        }

        if (newCol.filterType === 'numberRange') {
          newCol.filterDropdown = props => {
            return (
              <RangeNumberFilter
                {...props}
                formatter={newCol.formatter}
                parser={newCol.parser}
                minRange={newCol.minRange}
                maxRange={newCol.maxRange}
              />
            )
          }
        }

        if (newCol.filterType === 'dateRange') {
          newCol.filterDropdown = props => {
            return <DateRangeFilter {...props} />
          }
        }
      }

      if (newCol.sorter && newCol.key === sortField) {
        newCol.sortOrder = sortDirection
      }
      return newCol
    })
  }, [columns, state])
  return enhancedColumns
}

// function getInitialValueFromSearchParams(searchParams, columns) {
//   const defaultValue = {
//     page: searchParams.has('page') ? +searchParams.get('page') : 1,
//     limit: searchParams.has('limit') ? +searchParams.get('limit') : 15,
//   }

//   const sortParam = searchParams.get('sort') || ''
//   const [sortField] = sortParam.split('_')

//   let isSort = false
//   columns.forEach(col => {
//     if (col.filterSearch && searchParams.has(col.key)) {
//       if (col.filterType === 'text') {
//         defaultValue[col.key] = searchParams.get(col.key)
//       } else {
//         defaultValue[col.key] = searchParams.get(col.key).split(',')
//       }
//     }

//     if (col.sorter && col.key === sortField) {
//       isSort = true
//     }
//   })

//   if (isSort) {
//     defaultValue.sort = sortParam
//   }
//   return defaultValue
// }
// #TODO: update from react router - to - react location if needed
// function useSyncMetaTableToSearchParams(columns) {
//   const [searchParams, setSearchParams] = useSearchParams()

//   const initialValue = React.useRef(
//     getInitialValueFromSearchParams(searchParams, columns),
//   )

//   const onChange = React.useCallback(
//     filters => {
//       Object.keys(filters).forEach(key => {
//         if (searchParams.has(key) && !filters[key]) {
//           searchParams.delete(key)
//         } else if (filters[key]) {
//           searchParams.set(key, filters[key])
//         }
//       })
//       setSearchParams(searchParams)
//     },
//     [searchParams, setSearchParams],
//   )

//   return {
//     initialValue: initialValue.current,
//     onChange,
//   }
// }

export { actionTypes, TableMetaProvider, useColumns, useMetaTable }
