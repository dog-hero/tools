import { configCheckRun } from './checkRun';
import * as instancesMock from './__mocks__/ocktokit';
import type { CheckRun } from './types';

jest.mock('octokit', () => jest.requireActual('./__mocks__/ocktokit').octokit);
jest.mock('@octokit/auth-app', () => jest.requireActual('./__mocks__/ocktokit').octokitAuthApp);

describe('CheckRun', () => {
  describe('on configCheckRun', () => {
    test('should create an Octokit instance', () => {
      configCheckRun({
        appId: 99,
        installationId: 9999,
        privateKey: 'some_key',
      });

      expect(instancesMock.octokit.Octokit).toHaveBeenCalledTimes(1);
      expect(instancesMock.octokit.Octokit).toHaveBeenCalledWith({
        authStrategy: instancesMock.octokitAuthApp.createAppAuth,
        auth: {
          appId: 99,
          installationId: 9999,
          privateKey: 'some_key',
        },
      });
    });

    test('should return function createCheckRun', () => {
      expect(
        configCheckRun({
          appId: 99,
          installationId: 9999,
          privateKey: 'some_key',
        }),
      ).toEqual({
        createCheckRun: expect.any(Function),
      });
    });
  });

  describe('on createCheckRun', () => {
    test('should call ocktokit.request with github check-run endpoint api and parameters', async () => {
      const checkRun = configCheckRun({
        appId: 99,
        installationId: 9999,
        privateKey: 'some_key',
      });

      const checkRunParameters: CheckRun = {
        name: 'Dog hero check run',
        output: {
          summary: 'summary',
          title: 'title',
          annotations: [
            {
              annotation_level: 'warning',
              start_line: 1,
              end_line: 1,
              message: 'some message',
              path: 'path/somefile.ts',
            },
          ],
        },
      };

      await expect(checkRun.createCheckRun('dog-hero', 'gihub-check-run', checkRunParameters)).resolves.toEqual({});

      expect(instancesMock.octokitRequest).toHaveBeenCalledTimes(1);
      expect(instancesMock.octokitRequest).toHaveBeenCalledWith('POST /repos/{owner}/{repo}/check-runs', {
        owner: 'dog-hero',
        repo: 'gihub-check-run',
        ...checkRunParameters,
      });
    });
  });
});
