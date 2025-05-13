export interface FormData {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
}

export interface FormDataTableProps  {
  dataSource: FormData[]; 
  handleDelete : (id:string) => void  
}

export interface FormContainerProps {
  formData: FormData[]; 
  updateFormData: (newFormData: FormData) => void; 
}
