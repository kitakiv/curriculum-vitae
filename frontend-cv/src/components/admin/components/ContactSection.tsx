import { Resource, resourceConfig

 } from "@/variables/admin/resource"

import FormCreate from "./FormCreate"

import MiddleText from "@/components/text/MiddleText"
export default function ContactSection() {
    if (resourceConfig[Resource.CONTACT].createForm === null) return null
    if (!resourceConfig[Resource.CONTACT].createForm.action) return null
    return (
        
        <FormCreate 
        resourceType={Resource.CONTACT}>
            <MiddleText tailwind='text-adminTx font-bold'>{resourceConfig[Resource.CONTACT].title}</MiddleText>
        </FormCreate>
    )
}