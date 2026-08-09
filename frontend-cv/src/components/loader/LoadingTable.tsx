import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import CheckBox from '@mui/icons-material/CheckBox'

const COLUMNS = 5
const ROWS = 5

export default function LoadingTable() {
  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="loading table"
          aria-busy="true"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="text" width="70%" />
              </TableCell>

              {Array.from({ length: COLUMNS - 1 }).map((_, index) => (
                <TableCell key={index} align="right">
                  <Skeleton variant="text" width={70} sx={{ ml: 'auto' }} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: ROWS }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                <CheckBox />
                {Array.from({ length: COLUMNS }).map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    align={colIndex === 0 ? 'left' : 'right'}
                  >
                    <Skeleton
                      variant="text"
                      width={colIndex === 0 ? '70%' : 48}
                      sx={{
                        ml: colIndex === 0 ? 0 : 'auto',
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}