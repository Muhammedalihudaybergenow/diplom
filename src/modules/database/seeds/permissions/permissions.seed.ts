import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
const permissionSeeder = [
    {
        name: 'languages.read'
    },
    {
        name: 'languages.create'
    },
    {
        name: 'languages.update'
    },
    {
        name: 'languages.delete'
    },
    {
        name: 'users.create'
    },
    {
        name: 'users.read'
    },
    {
        name: 'users.update'
    },
    {
        name: 'users.delete'
    },
    
]
export class PermissionSeed implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const permissionRepo = dataSource.getRepository('permissions')
        const permissions =await permissionRepo.createQueryBuilder('permissions')
        .getMany()
        const entities = [];

        permissionSeeder.forEach((perm)=>{
            const permissionCheck = permissions.find(permission=>permission.name === perm.name)
            if(!permissionCheck){
                entities.push(perm)
            }
        })
        if(entities.length){
            await permissionRepo.save(entities)
        }
    }
    
}