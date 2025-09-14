'use client'
import AdminImage from "@/components/admin/components/AdminImage";
import header from "@/variables/header/header";
import ListSliders from "@/components/admin/components/ListSliders";
import form from "@/variables/form/form";
import ListProjects from "./components/ListProjects";
import ListContacts from "./components/ListContacts";
import Profile from "./components/Profile";

export default function AdminPage() {
    const {sliderText, sliderName} = form.sliderForm.initialValues;
    const {projectTitle, projectDescription, projectImage, projectDemoLink, projectGithubLink} = form.projectForm.initialValues;
    const {contactName, contactLink, contactSvg} = form.contactsForm.initialValues;
    return (
        <div className="padding lg:gap-4 sm:gap-2 gap-4 flex flex-col">
            <div id={form.profileForm.id} className="grid grid-cols-2 gap-4">
            <AdminImage path={header.path} />
            <Profile />
            </div>
            <div id={form.sliderForm.id}>
            <ListSliders type="add" images={[""]} titles={[{title: sliderName, text: sliderText}]}/>
            <ListSliders type="edit"/>
            </div>
            <div id={form.projectForm.id}>
            <ListProjects type="add" projects={[{title: projectTitle, description: projectDescription, image: projectImage, githubLink: projectGithubLink, demoLink: projectDemoLink}]} />
            <ListProjects type="edit" />
            </div>
            <div id={form.contactsForm.id}>
            <ListContacts type="add" contacts={[{name: contactName, link: contactLink, svg: contactSvg}]} />
            <ListContacts type="edit" />
            </div>

        </div>
    )
}