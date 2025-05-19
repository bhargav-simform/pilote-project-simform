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

export interface MenuCategory {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
  available: boolean;
}

