import { http } from '../services/http';
import { ref } from "vue";
import type { ApiResponse } from '../services/http';

export class Holidays {
    private endPoint = "/project-date/holidays/"
    public holidays = ref<string[]>([]);
    public daysWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    async setHolidays(): Promise<void> {
        const response = await http.get<ApiResponse<string[]>>(this.endPoint)
        if (response.data?.data) {
            this.holidays.value = response.data.data
        }
    }

    public getHolidays(): string[] {
        return this.holidays.value;
    }

}