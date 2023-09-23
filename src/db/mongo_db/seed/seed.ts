import Model from "../../../models";

const SeedData = async () => {
    try {
        const user_model = Model.User;

        // Create User
        const save_user = {
            first_name: "User",
            last_name: "User",
            email: "user@example.com",
            username: "user",
            phone_number: "+2348012345678"
        }

        const email_exist = await user_model.exists({ email: save_user.email })
        if (email_exist) {
            return
        }

        const username_exist = await user_model.exists({ email: save_user.username })
        if (username_exist) {
            return
        }

        await user_model.create({...save_user});

        console.log("Seed data created successfully");

    } catch (error) {
        console.log(`Error seeding data: ${error}`);
        
    }
}

export default SeedData;