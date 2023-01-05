export const octokitRequest = jest.fn().mockResolvedValue({});

export const octokit = {
  Octokit: jest.fn().mockImplementation(() => ({
    request: octokitRequest,
  })),
};

export const octokitAuthApp = {
  createAppAuth: jest.fn(),
};
