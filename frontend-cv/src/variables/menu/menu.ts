import aboutme from "@/variables/aboutme/aboutme";
import projects from "@/variables/projects/projects";
import form from "@/variables/form/form";
import footer from "@/variables/footer/footer";
import header from "@/variables/header/header";

const menu = {
        mainHeader:  [
            { href: `#${aboutme.id}`, name: aboutme.name, id: aboutme.id },
            { href: `#${projects.id}`, name: projects.name, id: projects.id },
            { href: `#${footer.id}`, name: footer.name, id: footer.id },
            { href: `${form.loginForm.id}`, name: form.loginForm.name, id: form.loginForm.id },
            { href: `#${header.id}`, name: '', id: header.id },
        ],
        adminHeader: [
            { href: `#${form.profileForm.id}`, name: form.profileForm.title, id: form.profileForm.id },
            { href: `#${form.sliderForm.id}`, name: form.sliderForm.title, id: form.sliderForm.id },
            { href: `#${form.projectForm.id}`, name: form.projectForm.title, id: form.projectForm.id },
            { href: `#${form.contactsForm.id}`, name: form.contactsForm.title, id: form.contactsForm.id },
        ]
}

export default menu;