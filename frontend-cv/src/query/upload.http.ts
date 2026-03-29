import {  UPLOADSERVICE, UPLOADTYPE } from '@/variables/upload/upload';
import { apiClient } from "@/lib/api";

function uploadFile(resource: UPLOADSERVICE, body: FormData, filesId: string, id: string, index?: number) {
    const bodyForm = new FormData();
    const file = body.get(filesId);
    console.log(file);
    if (file instanceof File) {
        bodyForm.append(UPLOADTYPE.FILE, file);
        return apiClient.uploadFile(resource, bodyForm, id, index);
    }
    throw new Error('File not found');
}

function uploadFiles(resource: UPLOADSERVICE, body: FormData, filesId: string, id: string) {
    const bodyForm = new FormData();
    const files = body.getAll(filesId);
    const filesArray = Array.isArray(files) ? files : [files];

    for (let i = 0; i < filesArray.length; i++) {
        bodyForm.append(UPLOADTYPE.FILES, filesArray[i]);
    }
    return apiClient.uploadFiles(resource, bodyForm, id);
}

export { uploadFile, uploadFiles };