import api from "../index"

export const getAllTurunanBrand = async () => {
    try {
        const response = await api.get(`/turunan-brand`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}