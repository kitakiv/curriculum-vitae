import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const variants = [
  'h1',
  'h3',
  'body1',
  'caption',
] as readonly TypographyProps['variant'][];

export default function TypographyDemo(props: { loading?: boolean, variant: TypographyProps['variant'], tailwind?: string }) {
  const { loading = true, variant = variants[0] } = props;

  return (
    <div>
        <Typography  component="div" key={variant} variant={variant}>
          {loading ? <Skeleton sx={{ backgroundColor: 'var(--form)' }} /> : variant}
        </Typography>
    </div>
  );
}