import HomeIcon from '@mui/icons-material/Home';
import { adminVariables } from "@/variables/admin/resource";
import MiddleText from "@/components/text/MiddleText";

export default function Default() {
    return (
         <div className="flex gap-2 text-adminGr0">
                    <HomeIcon />
                    <MiddleText>
                        {adminVariables.dashBoard}
                    </MiddleText>
                </div>
    )
}