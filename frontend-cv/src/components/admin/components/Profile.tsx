'use client'
import form from '@/variables/form/form';
import schema from '@/validation/schemaValidation';
import AdminBorder from '@/components/border/AdminBorder';
import MiddleText from '@/components/text/MiddleText';
import FlexibleForm from './FlexibleForm';
import header from '@/variables/header/header';



export default function Profile() {
    const profile = { name: header.name, surname: header.surname, typingText: header.text, email: header.email, phone: header.phone, location: header.location };
    function alertMessage(values: object) {
        alert(JSON.stringify(values));
    }
    return (
        <AdminBorder >
           <FlexibleForm type="oneElement"  initialValues={profile} formInputs={form.profileForm.inputs} submitFunction={alertMessage} schema={schema.profile} tailwind="padding-elements">
                <MiddleText tailwind='text-adminTx font-bold'>{form.profileForm.title}</MiddleText>
            </FlexibleForm>
        </AdminBorder>
    )
}