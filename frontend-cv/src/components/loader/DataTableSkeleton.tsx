import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

const headerLabels = ['ID', 'First name', 'Last name', 'Age', 'Full name']
const headerWidths = ['2rem', '6rem', '6rem', '2.5rem', '7rem']
const rowCells = 5
const rows = 9

export default function DataTableSkeleton() {
  return (
    <Paper sx={{ height: 400, width: '100%', overflow: 'hidden' }} aria-busy="true">
      {/* Toolbar / search area */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Skeleton variant="text" width="70%" />
      </Box>

      {/* Column headers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: 2,
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'action.hover',
        }}
      >
        {headerLabels.map((label, i) => (
          <Skeleton key={label} variant="text" width={headerWidths[i]} />
        ))}
      </Box>

      {/* Skeleton rows instead of data */}
      <Stack sx={{ px: 2 }}>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <Box
            key={rowIndex}
            role="row"
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: 2,
              py: 1.5,
              borderBottom: rowIndex < rows - 1 ? 1 : 0,
              borderColor: 'divider',
            }}
          >
            {Array.from({ length: rowCells }, (_, cellIndex) => (
              <Skeleton
                key={cellIndex}
                variant="text"
                width={cellIndex === 2 ? '70%' : '90%'}
              />
            ))}
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}
