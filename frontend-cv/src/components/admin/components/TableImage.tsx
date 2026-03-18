import Box from '@mui/material/Box'
interface Props {
    params: {
        value: string | null
    }
}


export default function TableImage({params}: Props) {
    return (
        <Box className="flex items-center justify-center h-full w-full">
        {params.value ? (
          <img
            src={params.value}
            alt="Image of resource"
            className="w-10 h-10 object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </Box>
    )
}