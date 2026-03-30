'use client'
import {
    Action, Resource, resourceConfig

} from "@/variables/admin/resource";
import FormCreate from "@/components/admin/components/FormCreate";
import MainText from "@/components/text/MainText";
import FromUpdate from "@/components/admin/components/FormUpdate";
import { Contact, CreateContactInput, GetContactsQuery, GetUserMutation } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions"
import table from "@/variables/table/table";
import Table from "../components/Table";
interface Props {
    user: GetUserMutation['getUser'],
    rows: GetContactsQuery['contacts']
}
const columns = table.contactsTable.columns;

export default function ContactSection({ user, rows }: Props) {
    const canRead = hasPermission(user, Resource.CONTACT, [Action.READ]);
    const canCreate = hasPermission(user, Resource.CONTACT, [Action.CREATE]);
    const canUpdate = hasPermission(user, Resource.CONTACT, [Action.UPDATE]);
    const canDelete = hasPermission(user, Resource.CONTACT, [Action.DELETE]);
    return (
        <>
            <Table
                canCreate={canCreate}
                canRead={canRead}
                canUpdate={canUpdate}
                resource={Resource.CONTACT}
                rows={rows}
                columns={columns}
                resouce={Resource.CONTACT}
                canDelete={canDelete}
            />
        </>
  )
}

export function createFormContact() {
    const contactCreate = resourceConfig[Resource.CONTACT].createForm;
    return (
        <>
            <FormCreate<CreateContactInput>
                inputs={contactCreate.inputs}
                intialValues={contactCreate.initialValues}
                actionForm={(formData) => contactCreate.action(undefined, formData)}
                schema={contactCreate.schema}
                title={contactCreate.title}
            >
                <MainText tailwind="text-center">
                    {contactCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}

export function createUpdateFrom(intialValues: Contact, id: string) {
    const initialValuesEmpty = resourceConfig[Resource.CONTACT].editFrom.initialValues;
    Object.keys(initialValuesEmpty).forEach((key: string) => {
        initialValuesEmpty[key] = intialValues[key];
    })
    const contactUpdate = resourceConfig[Resource.CONTACT].editFrom;

    return (
        <FromUpdate<CreateContactInput>
            inputs={contactUpdate.inputs}
            intialValues={initialValuesEmpty}
            actionForm={(formData) =>
                contactUpdate.action(
                    undefined,
                    formData,
                    initialValuesEmpty,
                    id
                )
            }
            schema={contactUpdate.schema}
            title={contactUpdate.title}
        >
            <MainText tailwind="text-center">
                {contactUpdate.title}
            </MainText>
        </FromUpdate>
    )

}

export function createUpdateFromImage(intialValues: Contact, id: string) {
    const intialValuesEmpty = resourceConfig[Resource.CONTACT].editFormImage.initialValues;
    Object.keys(intialValuesEmpty).forEach((key: string) => {
        intialValuesEmpty[key] = intialValues[key];
    })
    const contactUpdate = resourceConfig[Resource.CONTACT].editFormImage;

    return (
        <FromUpdate<CreateContactInput>
            inputs={contactUpdate.inputs}
            intialValues={intialValuesEmpty}
            actionForm={(formData) =>
                contactUpdate.action(
                    undefined,
                    formData,
                    id
                )
            }
            schema={contactUpdate.schema}
            title={contactUpdate.title}
        >
            <MainText tailwind="text-center">
                {contactUpdate.title}
            </MainText>
        </FromUpdate>
    )
}