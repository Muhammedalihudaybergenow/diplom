import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


export class RolePermissionsSeed implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
       const roleRepo = dataSource.getRepository('roles');
       const permissionRepo = dataSource.getRepository('permissions') 
       const admin = await roleRepo.createQueryBuilder('roles')
        .where('roles.name =:name',{name: 'admin'})
        .getOne()
        const manager = dataSource.createEntityManager()
        const connection = manager.connection
        const permissions = await permissionRepo.createQueryBuilder('permissions')
        .getMany()
        const rolePermissions = await connection.createQueryBuilder()
        .select()
        .from('roles_permissions',null)
        .where('roles_permissions.role_id =:role_id',{role_id: admin.id})
        .getRawMany()
        const entities = []
            permissions.forEach((permission)=>{
                const rolePermissionCheck = rolePermissions.find((rP)=>rP.role_id === admin.id && rP.permission_id ===permission.id)
                if(!rolePermissionCheck){
                    entities.push({
                        role_id: admin.id,
                        permission_id: permission.id
                    })
                }
            })
        if(entities.length){
            await connection.createQueryBuilder()
            .insert()
            .into('roles_permissions')
            .values(entities)
            .execute()
        }
    }
    
}