type SliderText = {title: string, text: string}

class ProjectCard {
    title: string = "";
    description: string = "";
    image: string | null | undefined;
    githubLink: string = "";
    demoLink: string = "";
}

class ContactsCard {
    name: string = "";
    contact: string = "";
    svg: string = "";
    href: string = "";
}

class FollowCard {
    name: string = "";
    link: string = "";
    svg: string = "";
}

class InputType {
    id: string = "";
    label: string = "";
    name: string = "";
    placeholder: string = "";
    type: string = "";
    as?: "input" | "textarea" | "select" = "input";
    readonly?: boolean = false
}

class MenuType {
    name: string = "";
    href: string = "";
    id: string = "";
}
type FormType = "add" | "edit" | "oneElement";
export type {SliderText, FormType};
export {ProjectCard, ContactsCard, FollowCard, InputType, MenuType};
