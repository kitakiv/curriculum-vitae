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
export type {SliderText}
export {ProjectCard, ContactsCard, FollowCard}
