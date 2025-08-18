import QueryUrl from "@/lib/api";

async function getProfile() {
    const response = await fetch(QueryUrl.profile);
    const data = await response.json();
    return data;
}

export { getProfile }