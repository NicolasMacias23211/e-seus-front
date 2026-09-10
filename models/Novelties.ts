export interface Novelties {
  id_novelty?: number,
  leave_type: string,
  e_user: string,
  start_date: string, 
  end_date: string,
  comments?: string,
  status:string,
  leave_type_name?: string,
  leave_type_color?: string,
  leave_type_time?: string | null,
  leave_type_full_day?: boolean | null,
  leave_type_half_day?: boolean | null,
  user_name?: string,
  user_last_name?: string
}

export interface NoveltiesPatch {
  leave_type?: string,
  e_user?: string,
  start_date?: string, 
  end_date?: string,
  comments?: string,
  status?:string
}

// export interface NoveltiesResponse {
//   id_novelty?: number,
//   leave_type: string,
//   e_user: string,
//   start_date: string, 
//   end_date: string,
//   comments?: string,
//   status:string,
//   leave_type_name: string,
//   leave_type_color: string,
//   user_name: string,
//   user_last_name: string
// }

export interface NoveltiesFiltered {
  leave_type?: string,
  e_user?: string,
  date?: string,
  status?:string,
  start_date?: string, 
  end_date?: string,
}

