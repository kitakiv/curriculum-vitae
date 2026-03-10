import { uploadVariables, UPLOADSERVICE, UPLOADTYPE } from '@/variables/upload/upload';
import { apiClient } from "@/lib/api";

function uploadFile(resource: UPLOADSERVICE, body: FormData, filesId: string, id: string, index?: number) {
    const bodyForm = new FormData();
    const file = body.get(filesId);

    if (file instanceof File) {
        if(uploadVariables[resource].multiFile) {
            bodyForm.append(UPLOADTYPE.FILES, file);

        } else {
            bodyForm.append(UPLOADTYPE.FILE, file);
        }
        return apiClient.uploadFile(resource, bodyForm, id, index);
    }
    throw new Error('File not found');
}

export { uploadFile };