import request from 'supertest';
import app from '@/app';

import { getMockBim360Files, getMockProcoreFiles } from '../mocks/mockApiData';

// Mock the provider implementations to avoid actual file system/network access
jest.mock('@/providers/implementation/Bim360Provider', () => {
  return {
    Bim360Provider: jest.fn().mockImplementation(() => {
      return {
        fetchFiles: () => Promise.resolve(getMockBim360Files(5)),
      };
    }),
  };
});

jest.mock('@/providers/implementation/ProcoreProvider', () => {
  return {
    ProcoreProvider: jest.fn().mockImplementation(() => {
      return {
        fetchFiles: () => Promise.resolve(getMockProcoreFiles(5)),
      };
    }),
  };
});


describe('GET /v1/files', () => {
  it('should return 400 if providers or project query params are missing', async () => {
    await request(app).get('/v1/files?providers=bim360').expect(400);
    await request(app).get('/v1/files?project=123').expect(400);
  });

  it('should return a 200 and an aggregated list of files', async () => {
    const response = await request(app)
      .get('/v1/files?providers=bim360,procore&project=test-project')
      .expect(200);
    
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(10);
    expect(response.body.length).toBeGreaterThan(0);

    const firstFileDate = new Date(response.body[0].updatedAt).getTime();
    const lastFileDate = new Date(response.body[response.body.length - 1].updatedAt).getTime();
    expect(firstFileDate).toBeGreaterThanOrEqual(lastFileDate);
  });
});