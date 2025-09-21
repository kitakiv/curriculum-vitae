
import AdminImage from "@/components/admin/components/AdminImage";
import header from "@/variables/header/header";
import ListSliders from "@/components/admin/components/ListSliders";
import form from "@/variables/form/form";
import ListProjects from "./components/ListProjects";
import ListContacts from "./components/ListContacts";
import Profile from "./components/Profile";
import MainText from "@/components/text/MainText";

export default function AdminPage() {
    const {sliderText, sliderName} = form.sliderForm.initialValues;
    const {projectTitle, projectDescription, projectImage, projectDemoLink, projectGithubLink} = form.projectForm.initialValues;
    const {contactName, contactLink, contactSvg} = form.contactsForm.initialValues;
    return (
        <div className="padding lg:gap-4 sm:gap-2 gap-4 flex flex-col">
            <section id={form.profileForm.id} className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <MainText tailwind="text-adminTx font-bold flex lg:col-span-2">{form.profileForm.title}</MainText>
            <AdminImage path={header.path} />
            <Profile />
            </section>
            <section id={form.sliderForm.id} className="flex flex-col lg:gap-4 sm:gap-2 gap-2">
            <MainText tailwind="text-adminTx font-bold flex">{form.sliderForm.title}</MainText>
            <ListSliders type="add" images={[""]} titles={[{title: sliderName, text: sliderText}]}/>
            <ListSliders type="edit"/>
            </section>
            <section id={form.projectForm.id} className="flex flex-col lg:gap-4 sm:gap-2 gap-2">
            <MainText tailwind="text-adminTx font-bold flex">{form.projectForm.title}</MainText>
            <ListProjects type="add" projects={[{title: projectTitle, description: projectDescription, image: projectImage, githubLink: projectGithubLink, demoLink: projectDemoLink}]} />
            <ListProjects type="edit" />
            </section>
            <section id={form.contactsForm.id} className="flex flex-col lg:gap-4 sm:gap-2 gap-2">
            <MainText tailwind="text-adminTx font-bold flex">{form.contactsForm.title}</MainText>
            <ListContacts type="add" contacts={[{name: contactName, link: contactLink, svg: contactSvg}]} />
            <ListContacts type="edit" />
            </section>

        </div>
    )
}