import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';
import type { OctokitResponse } from '@octokit/types/dist-types/OctokitResponse';
import type { CheckRunAppAuth, CheckRun } from './types';

export const configCheckRun = ({ appId, privateKey, installationId }: CheckRunAppAuth) => {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId,
      privateKey,
      installationId,
    },
  });

  return {
    /** @see https://docs.github.com/pt/rest/checks/runs */
    createCheckRun: (
      /** The account owner of the repository. The name is not case sensitive. */
      owner: string,
      /** The name of the repository. The name is not case sensitive. */
      repo: string,
      checkRunProps: CheckRun,
    ): Promise<OctokitResponse<{ [key: string]: unknown }>> => {
      const parameters = {
        owner,
        repo,
        ...checkRunProps,
      };

      return octokit.request(
        'POST /repos/{owner}/{repo}/check-runs',
        // @ts-expect-error
        parameters,
      );
    },
  };
};
