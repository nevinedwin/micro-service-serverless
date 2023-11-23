import fs from 'fs';
import archiver from 'archiver';


const createLambdaLayerZip = async () => {

    if (fs.existsSync('nodejs.zip')) fs.unlinkSync('nodejs.zip');

    const output = fs.createWriteStream('./nodejs.zip');
    const archive = archiver('zip');

    archive.pipe(output);

    archive.directory('./node_modules/', 'nodejs/node_modules');

    await archive.finalize();

    console.log('nodejs.zip is ready');
};

await createLambdaLayerZip();