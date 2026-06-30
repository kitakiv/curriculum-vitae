import { ExperienceCard } from "@/types/index"

const experiences = {
    id: "experience",
    heading: "My Experience",
    text: "A collection of professional certifications and achievements that showcase my expertise across various technologies and platforms.",
    githubButton: "View on GitHub",
    githubSvg: "/svg/github.svg",
    demoButton: "View Deploy",
    defaultImage: "/svg/image-broken.svg",
    name: "Certificates",
    arrowSvg: "/svg/ok.svg",
    companySvg: "/svg/company.svg",
    periodSvg: "/svg/period.svg",
    doneSvg: "/svg/done.svg",
    portfolio: "Professional Journey",
}

const cards: ExperienceCard[] = [
    {
        title: "Frontend Course",
        company: "Udemy",
        description: "Achive this course with 100% score",
        period: "2023",
        certificate: "developer.jpg",
    },
    {
        title: "Middle Frontend Developer",
        company: "Epam",
        description: "Create own projects and do homeworks",
        period: "2022 - 2023",
        certificate: "developer2.jpg",
    },
    {
        title: "Middle Frontend Developer",
        company: "GoIT",
        description: "Create own projects and do homeworks",
        period: "2021 - 2022",
        certificate: "developer3.jpg",
    },
    {
        title: "Frontend Course",
        company: "Udemy",
        description: "Achive this course with 100% score",
        period: "2023",
        certificate: "developer.jpg",
    },
    {
        title: "Middle Frontend Developer",
        company: "Epam",
        description: "Create own projects and do homeworks",
        period: "2022 - 2023",
        certificate: "developer2.jpg",
    }
]
export { cards }
export default experiences