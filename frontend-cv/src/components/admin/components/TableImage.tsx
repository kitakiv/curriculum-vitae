import Box from '@mui/material/Box'
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
interface Props {
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    tailwind?: string
}


export default function TableImage({params, tailwind}: Props) {
    if (!params.value) return null
    if (Array.isArray(params.value)) {
      return (
       params.value.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Image of resource"
          className={`w-10 h-10 object-cover ${tailwind || ''}`}
        />
       ))
      )
    }
    return (
        <Box className="grid items-center justify-center h-full w-full"  sx={{ display: 'flex' }}> 
        {params.value ? (
          <img
            src={params.value}
            alt="Image of resource"
            className={`w-10 h-10 object-cover ${tailwind || ''}`}
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </Box>
    )
}