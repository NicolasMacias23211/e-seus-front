// import { Holidays } from './holidays';
import { http } from '../services/http';
import { ref } from "vue";
import type { ApiResponse } from '../services/http';

export class Holidays {
    private endPoint = "/project-date/holidays/"
    public holidays = ref<string[]>([]);
    private year: number = 0;
    public daysWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    async setHolidays(): Promise<void> {
        const response = await http.get<ApiResponse<string[]>>(this.endPoint)
        if (response.data?.data) {
            this.holidays.value = response.data.data
            this.setLocalStorage();
        }
    }

    public getHolidays(): string[] {
        return this.holidays.value;
    }

    public setLocalStorage(): void {
        const today = new Date()
        this.year = today.getFullYear()
        const holidays = JSON.stringify({
            holidays: this.getHolidays(),
            year: this.year
        })
        localStorage.setItem('holidays', holidays)
    }
    public getLocalStorage(): string[] {

        if(!localStorage.getItem('holidays')) {
            this.setHolidays()
        };

        let holidays = JSON.parse(localStorage.getItem('holidays') || '{}')

        if(new Date().getFullYear() !== holidays.year){
            this.setHolidays()
        }

        holidays = JSON.parse(localStorage.getItem('holidays') || '{}')

        return holidays.holidays
    }

}