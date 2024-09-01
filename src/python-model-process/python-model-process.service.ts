import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { BedrockClient } from '@aws-sdk/client-bedrock';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import * as path from 'path';
import { Plugin } from '@prisma/client';

@Injectable()
export class PythonModelProcessService {
  private bedrockClient: BedrockRuntimeClient;
  constructor() {
    this.bedrockClient = new BedrockRuntimeClient({
      region: 'us-west-2',
    });
  }

  public async runPythonModelProcess(plugins: Plugin[]) {
    const mainModel = new BedrockRuntimeClient({
      region: 'us-west-2',
    });
    const mainResponse = await mainModel.send(
      new InvokeModelCommand({
        modelId: 'antropic.claude-v2:1',
        body: `{ "business_age": "10 years", "industry_sector": "Manufacturing", "company_size": 50, "annual_revenue": 5000000, "net_profit": 500000, "total_assets": 3000000, "total_liabilities": 1500000, "credit_score": 750, "payment_history": "On-time", "existing_debts": 200000, "loan_amount_requested": 300000, "purpose": "Expansion", "loan_term": 36 }`,
      }),
    );
    const data = {
      main: mainResponse.body,
    };
    for (let i = 0; i < plugins.length; i++) {
      const alternativeModel = new BedrockRuntimeClient({
        region: 'us-west-2',
      });
      const answer = await alternativeModel.send(
        new InvokeModelCommand({
          modelId: plugins[i].model,
          body: `{ "business_age": "10 years", "industry_sector": "Manufacturing", "company_size": 50, "annual_revenue": 5000000, "net_profit": 500000, "total_assets": 3000000, "total_liabilities": 1500000, "credit_score": 750, "payment_history": "On-time", "existing_debts": 200000, "loan_amount_requested": 300000, "purpose": "Expansion", "loan_term": 36 }`,
        }),
      );
      data[plugins[i].model];
    }
    return data;
  }
}

