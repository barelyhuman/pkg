import { promises as fs } from 'fs';
import path from 'path';

export async function moduleOne() {
  try {
    const content = await fs.readFile(path.join(__dirname,'/index.js'));
    console.log(content.toString());
  } catch (err) {
    console.error(err);
  }
}

if(require.main.filename === __filename){
  moduleOne(); 
}