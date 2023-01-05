export type CheckRunStatatus = 'queued' | 'in_progress' | 'completed';
export type CheckRunConclusion =
  | 'action_required'
  | 'cancelled'
  | 'failure'
  | 'neutral'
  | 'success'
  | 'skipped'
  | 'stale'
  | 'timed_out';
export type CheckRunOutputAnnotationsAnnotationLevel = 'notice' | 'warning' | 'failure';

export interface CheckRunOutputAnnotation {
  /** The path of the file to add an annotation to. For example, `assets/css/main.css`. */
  path: string;

  /** The start line of the annotation. Line numbers start at 1. */
  start_line: number;

  /** The end line of the annotation. */
  end_line: number;

  /** The start column of the annotation. Annotations only support `start_column` and `end_column` on the same line. Omit this parameter if `start_line` and `end_line` have different values. Column numbers start at 1. */
  start_column?: number;

  /** The end column of the annotation. Annotations only support `start_column` and `end_column` on the same line. Omit this parameter if `start_line` and `end_line` have different values. */
  end_column?: number;

  /** The level of the annotation.
   *
   * Can be one of: `notice`, `warning`, `failure` */
  annotation_level: CheckRunOutputAnnotationsAnnotationLevel;

  /** A short description of the feedback for these lines of code. The maximum size is 64 KB. */
  message: string;

  /** The title that represents the annotation. The maximum size is 255 characters. */
  title?: string;

  /** Details about this annotation. The maximum size is 64 KB. */
  raw_details?: string;
}

export type CheckRunOutputAnnotations = Array<CheckRunOutputAnnotation>;

export interface CheckRunOutputImage {
  /** The alternative text for the image. */
  alt: string;

  /** The full URL of the image. */
  image_url: string;

  /** A short image description. */
  caption?: string;
}

export type CheckRunOutputImages = Array<CheckRunOutputAnnotation>;

/**
 * Check runs can accept a variety of data in the output object, including a title and summary and can optionally provide descriptive details about the run.
 */
export interface CheckRunOutput {
  /** The title of the check run. */
  title: string;

  /** The summary of the check run. This parameter supports Markdown. Maximum length: 65535 characters. */
  summary: string;

  /** The details of the check run. This parameter supports Markdown. Maximum length: 65535 characters. */
  text?: string;

  /**
   * Adds information from your analysis to specific lines of code. Annotations are visible on GitHub in the Checks and Files changed tab of the pull request. The Checks API limits the number of annotations to a maximum of 50 per API request. To create more than 50 annotations, you have to make multiple requests to the Update a check run endpoint. Each time you update the check run, annotations are appended to the list of annotations that already exist for the check run. For details about how you can view annotations on GitHub, see "About status checks".
   */
  annotations?: CheckRunOutputAnnotations;

  /** Adds images to the output displayed in the GitHub pull request UI. */
  images?: CheckRunOutputImages;
}

/**
 * @see https://docs.github.com/en/rest/checks/runs#create-a-check-run
 *
 * Note: The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty pull_requests array.
 *
 * Creates a new check run for a specific commit in a repository. Your GitHub App must have the checks:write permission to create check runs.
 *
 * In a check suite, GitHub limits the number of check runs with the same name to 1000. Once these check runs exceed 1000, GitHub will start to automatically delete older check runs.
 * */
export interface CheckRun {
  /** The name of the check. For example, "code-coverage". */
  name: string;

  /** The SHA of the commit. */
  head_sha?: string;

  /** The URL of the integrator's site that has the full details of the check. If the integrator does not provide this, then the homepage of the GitHub app is used. */
  details_url?: string;

  /** A reference for the run on the integrator's system. */
  external_id?: string;

  /** The current status.
   *
   * Default: `queued`
   *
   * Can be one of: `queued`, `in_progress`, `completed` */
  status?: CheckRunStatatus;

  /** The time that the check run began. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. */
  started_at?: string;

  /** Required if you provide completed_at or a status of completed. The final conclusion of the check. Note: Providing conclusion will automatically set the status parameter to completed. You cannot change a check run conclusion to stale, only GitHub can set this.
   *
   * Can be one of: `action_required`, `cancelled`, `failure`, `neutral`, `success`, `skipped`, `stale`, `timed_out` */
  conclusion?: CheckRunConclusion;

  /** The time the check completed. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. */
  completed_at?: string;

  /** Check runs can accept a variety of data in the output object, including a title and summary and can optionally provide descriptive details about the run. */
  output?: CheckRunOutput;
}

export interface CheckRunAppAuth {
  appId: number;
  privateKey: string;
  installationId: number;
}
