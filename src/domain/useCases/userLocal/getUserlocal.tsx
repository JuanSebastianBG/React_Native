import { UserLocalRepositoryImp } from 
'../../../data/repositories/userLocalRepository'; 
 
const { getUser } = new UserLocalRepositoryImp(); 
 
export const GetUserLocalUseCase = async() => { 
    return await getUser(); 
}