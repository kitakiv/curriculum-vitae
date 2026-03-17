"use client";
import { Resource } from "@/variables/admin/resource";
import UpdateFormContactImage from "@/components/admin/contact/UpdateFormContactImage";
import UpdateFormContact from "@/components/admin/contact/UpdateFormContact";
import UpdateFormSlider from "@/components/admin/slider/UpdateFormSlider";
import UpdateFormSliderImage from "@/components/admin/slider/UpdateFormSliderImage";
import { Contact, Slider } from "@/gql/graphql";
interface ResourceSectionProps<R> {
    currentResource: Resource;
    resourceId: string;
    resource: R;
}

export default function ResourceUpdateSection<R>({currentResource, resourceId, resource}: ResourceSectionProps<R>) {
    switch (currentResource) {
       case Resource.CONTACT:
            return (
                <>
                    <UpdateFormContact initialValues={resource as Contact} resourceId={resourceId}/>
                    <UpdateFormContactImage initialValues={resource as Contact} resourceId={resourceId}/>
                </>
            )
        case Resource.SLIDER:
            return (
                <>
                    <UpdateFormSlider initialValues={resource as Slider} resourceId={resourceId}/>
                    <UpdateFormSliderImage initialValues={resource as Slider} resourceId={resourceId}/>
                </>
            )

        default:
            return null; 
    }
}