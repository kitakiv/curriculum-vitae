import Profile from "@/components/admin/components/Profile"
import AdminImage from "@/components/admin/components/AdminImage";
import header from "@/variables/header/header";
import ListSliders from "@/components/admin/components/ListSliders";
import SliderForm from "./components/SliderForm";
import form from "@/variables/form/form";
export default function AdminPage() {
    const {sliderText, sliderImage, sliderName} = form.sliderForm.initialValues
    return (
        <div className="padding lg:gap-4 sm:gap-2 gap-1">
            <AdminImage path={header.path} />
            <Profile />
            <SliderForm type="add" tailwind="padding-elements" sliderInfo={{title: sliderName, text: sliderText, image: sliderImage}}/>
            <ListSliders type="edit"/>

        </div>
    )
}