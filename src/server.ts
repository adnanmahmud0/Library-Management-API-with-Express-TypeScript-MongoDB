import { Server } from 'http'
import app from './app';
import mongoose from 'mongoose';
import config from './config';


let server: Server;



async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${config.DB_USER}:${config.DB_PASS}@adnan.f8a3c.mongodb.net/library-management?retryWrites=true&w=majority&appName=adnan`);
        console.log("Database Connected!!");
        server = app.listen(config.PORT, () => {
            console.log(`app is listening on port ${config.PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}

main()