import { UserLocalRepositoryImp } from 
'../../../data/repositories/userLocalRepository'; 
import { User } from '../../entities/User'; 
const { remove } = new UserLocalRepositoryImp(); 
export const RemoveUserLocalUseCase = async () => { 
return await remove(); 
}