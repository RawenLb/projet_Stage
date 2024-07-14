import { promises as fs } from 'fs';

async function writeDataToFile(filename, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filename, jsonData, 'utf8');
        console.log('Data written to file successfully.');
    } catch (error) {
        console.error('Failed to write data to file:', error);
    }
}

export { writeDataToFile };
