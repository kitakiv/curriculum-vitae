
import LoadingFlyModel from "@/components/3D/butterfly/LoadingFlyModel";
import StartPage from "@/components/header/components/StartPage";





export default function FlyModelLoadingSection() {

  
  return <div className="max-w-screen max-h-screen overflow-hidden"><StartPage>
  <div className="loader fixed inset-0 grid place-items-center">
    {/* <LoadingFlyModel /> */}
  </div>
  </StartPage>
  </div>
}