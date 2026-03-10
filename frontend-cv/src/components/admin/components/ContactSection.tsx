import { Resource, resourceConfig

 } from "@/variables/admin/resource"

import FormCreate from "./FormCreate"
import MainText from "@/components/text/MainText"
export default function ContactSection() {
    if (resourceConfig[Resource.CONTACT].createForm === null) return null
    if (!resourceConfig[Resource.CONTACT].createForm.action) return null
    return (
        
        <FormCreate
        resourceType={Resource.CONTACT}>
            <MainText tailwind="text-center">
                {resourceConfig[Resource.CONTACT].createForm.title}
            </MainText>
        </FormCreate>
    )
}