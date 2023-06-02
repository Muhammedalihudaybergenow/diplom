import {Seeder} from 'typeorm-extension'
import {DataSource} from 'typeorm';
const languageSeed = [
   {
      name: 'TURKMEN',
   },
   {
      name: 'РУССКИЙ'
   },
   {
      name: 'ENGLISH'
   }
]
export class LanguageSeed implements Seeder{
 async run(dataSource: DataSource):Promise<any>{
    const languageRepo = dataSource.getRepository('languages');
    const languages =await  languageRepo.createQueryBuilder('languages')
   .getMany()
   const entities = [];
   languageSeed.forEach((lang)=>{
      const langCheck = languages.find(language => language.name === lang.name)
      if(!langCheck){
         entities.push(lang);
      }
   })
   if(entities.length){
      await languageRepo.save(entities);
   }
   }   
}