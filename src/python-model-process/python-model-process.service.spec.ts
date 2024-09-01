import { Test, TestingModule } from '@nestjs/testing';
import { PythonModelProcessService } from './python-model-process.service';

describe('PythonModelProcessService', () => {
  let service: PythonModelProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PythonModelProcessService],
    }).compile();

    service = module.get<PythonModelProcessService>(PythonModelProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
