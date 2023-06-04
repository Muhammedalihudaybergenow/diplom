import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class UserRoleSeed implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepo = dataSource.getRepository('users');
        const roleRepo = dataSource.getRepository('roles');
        const manager = dataSource.createEntityManager();
        const superUser = await userRepo.findOneBy({
            username: 'ali'
        })
        const adminRole = await roleRepo.findOneBy({
            name: 'admin'
        })
        const connection = manager.connection

        const userRoleCheck = await connection.createQueryBuilder()
        .select()
        .from('users_roles',null)
        .where('users_roles.user_id =:userId',{userId: superUser.id})
        .andWhere('users_roles.role_id =:roleId',{roleId: adminRole.id})
        .getRawOne()
        if(!userRoleCheck){
            await connection.createQueryBuilder()
            .insert()
            .into('users_roles',['role_id','user_id'])
            .values({role_id:adminRole.id,user_id:superUser.id})
            .execute()
        }
    }
    
}