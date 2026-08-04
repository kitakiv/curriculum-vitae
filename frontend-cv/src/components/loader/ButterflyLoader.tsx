
import LoadingFlyModel from "@/components/3D/butterfly/LoadingFlyModel";
import StartPage from "@/components/header/components/StartPage";





export default function FlyModelLoadingSection() {

  
  return <StartPage >
  <div className="loader fixed inset-0 grid place-items-center">
    <LoadingFlyModel />
  </div>
  </StartPage>
}