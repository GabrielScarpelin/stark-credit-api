import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PythonModelProcessService {
  constructor() {}

  public runPythonModelProcess() {
    return new Promise((resolve, reject) => {
      // Inicia o processo Python apontando para o arquivo do script
      const process = spawn('python', [
        path.resolve(__dirname, 'model/model.py'),
      ]);

      console.log('Python model process started');

      // Converte os dados em JSON string para enviar via stdin
      // const inputData = {
      //   key: 'MT-5107578-9B63E4A411A14A2FADF0B31C90C0F9D0',
      // };

      const inputData = {
        order_volume: 150,
        food_inventory: 2000,
        crop_yield: 5000,
      };

      // Escreve os dados no stdin do processo Python
      process.stdin.write(JSON.stringify(inputData));
      process.stdin.end(); // Encerra o stdin após escrever os dados

      // Recebe dados do stdout do script Python
      process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        resolve(data.toString());
      });

      // Recebe erros do stderr do script Python
      process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        resolve(data.toString());
      });

      // Evento para quando o processo termina
      process.on('close', (code) => {
        resolve(`child process exited with code ${code}`);
        console.log(`child process exited with code ${code}`);
      });
    });
  }
}

