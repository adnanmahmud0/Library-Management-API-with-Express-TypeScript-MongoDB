import { Server } from 'http'
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://library-management:library-management@adnan.f8a3c.mongodb.net/library-management?retryWrites=true&w=majority&appName=adnan');
        console.log("mongos connected");
        server = app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}

main()