import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    showPassword: boolean;
};
export default function CheckButton({ showPassword, ...props }: Props) {
    return (
        <div  {...props}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
    )
}