import React, { useState } from "react" 
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; 
import { RegisterAuthUseCase } from "../../../domain/useCases/auth/RegisterAuth"; 
 
const RegisterViewModel = () => { 
    const [values, setValues] = useState({ 
        name: '', 
        lastname: '', 
        email: '', 
        phone: '', 
        password: '', 
        confirmPassword: '' 
    }); 
 
    const onChange = (property: string, value: any) => { 
        setValues({ ...values, [property]: value }); 
    } 
 
    const register =  async() => { 
        const { result } = await RegisterAuthUseCase(values); 
        console.log('result' + JSON.stringify(result)); 
    } 
 
    return { 
        ...values, 
        onChange, 
        register 
    } 
} 
 
export default RegisterViewModel;