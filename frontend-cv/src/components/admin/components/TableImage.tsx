import Box from '@mui/material/Box'
interface Props {
    params: {
        value: string | null | string[]
    }
}


export default function TableImage({params}: Props) {
    if (!params.value) return null
    if (Array.isArray(params.value)) {
      return (
       params.value.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Image of resource"
          className="w-10 h-10 object-cover"
        />
       ))
      )
    }
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