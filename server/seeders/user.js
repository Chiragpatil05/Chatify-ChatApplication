// seeders are used to create fake data (or) it initial data required to run the app and use the application , here we will use the faker library

import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";

// createUser with create fake users and , numUsers is the number of user to be created
const createUser = async (numUsers) => {
    try {
        const userPromise = []; // is array mai saare users ko store karenge

        // numUsers(eg:10) user banayenge and usko userPromise array mai push kar denge
        for(let i=0 ; i<numUsers ; i++){
            const tempUser = User.create({
                name: faker.person.fullName(),
                username: faker.internet.userName(),
                bio: faker.lorem.sentence(10),
                password: "password@123",
                avatar:{
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName(),
                }
            });

            userPromise.push(tempUser);
        }

        
        await Promise.all(userPromise);
        console.log(`${numUsers} fake user created using seeders`);
        process.exit(1);
    } 
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export {
    createUser,
};