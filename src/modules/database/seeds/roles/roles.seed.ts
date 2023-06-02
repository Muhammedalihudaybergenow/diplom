import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

const roleSeed = [
    {
        name: "admin",
    },
    {
        name: "courier"
    },
    {
        name: "operator"
    },
    {
        name: "developer"
    }
]
export class RoleSeed implements Seeder{
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const roleRepo = dataSource.getRepository("roles");
        const roles = await roleRepo.createQueryBuilder('roles')
        .getMany()
        const entities = []
        roleSeed.forEach((role)=>{
            const roleCheck = roles.find((r)=>r.name === role.name)
            if(!roleCheck){
                entities.push(role);
            }
        })
        if(entities.length){
            await roleRepo.save(entities)
        }
    }
    
}