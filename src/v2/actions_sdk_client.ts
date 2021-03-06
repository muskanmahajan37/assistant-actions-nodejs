// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';
import * as path from 'path';

import * as protos from '../../protos/protos';
import * as gapicConfig from './actions_sdk_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Actions SDK API which allows developers to build projects using the SDK.
 * @class
 * @memberof v2
 */
export class ActionsSdkClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  actionsSdkStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ActionsSdkClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - client configuration override.
   *     TODO(@alexander-fenster): link to gax documentation.
   * @param {boolean} fallback - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof ActionsSdkClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback = opts?.fallback ?? typeof window !== 'undefined';
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback
        ? // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../protos/protos.json')
        : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      previewPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/previews/{preview}'
      ),
      projectPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}'
      ),
    };

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this.descriptors.stream = {
      writePreview: new this._gaxModule.StreamDescriptor(
        gax.StreamType.CLIENT_STREAMING
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.actions.sdk.v2.ActionsSdk',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.actionsSdkStub) {
      return this.actionsSdkStub;
    }

    // Put together the "service stub" for
    // google.actions.sdk.v2.ActionsSdk.
    this.actionsSdkStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.actions.sdk.v2.ActionsSdk'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.actions.sdk.v2.ActionsSdk,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const actionsSdkStubMethods = ['writePreview'];
    for (const methodName of actionsSdkStubMethods) {
      const callPromise = this.actionsSdkStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor = this.descriptors.stream[methodName] || undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.actionsSdkStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'actions.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'actions.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return [];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------

  writePreview(
    options?: gax.CallOptions,
    callback?: Callback<
      protos.google.actions.sdk.v2.IPreview,
      protos.google.actions.sdk.v2.IWritePreviewRequest | null | undefined,
      {} | null | undefined
    >
  ): gax.CancellableStream;
  writePreview(
    callback?: Callback<
      protos.google.actions.sdk.v2.IPreview,
      protos.google.actions.sdk.v2.IWritePreviewRequest | null | undefined,
      {} | null | undefined
    >
  ): gax.CancellableStream;
  /**
   * Updates the user's project preview based on the model.
   *
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream} - A writable stream which accepts objects representing
   * [WritePreviewRequest]{@link google.actions.sdk.v2.WritePreviewRequest}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#client-streaming)
   *   for more details and examples.
   * @example
   * const stream = client.writePreview(callback);
   * stream.write(request);
   * stream.end();
   */
  writePreview(
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.actions.sdk.v2.IPreview,
          protos.google.actions.sdk.v2.IWritePreviewRequest | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.actions.sdk.v2.IPreview,
      protos.google.actions.sdk.v2.IWritePreviewRequest | null | undefined,
      {} | null | undefined
    >
  ): gax.CancellableStream {
    if (optionsOrCallback instanceof Function && callback === undefined) {
      callback = optionsOrCallback;
      optionsOrCallback = {};
    }
    const options = optionsOrCallback as gax.CallOptions;
    this.initialize();
    return this.innerApiCalls.writePreview(null, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified preview resource name string.
   *
   * @param {string} project
   * @param {string} preview
   * @returns {string} Resource name string.
   */
  previewPath(project: string, preview: string) {
    return this.pathTemplates.previewPathTemplate.render({
      project: project,
      preview: preview,
    });
  }

  /**
   * Parse the project from Preview resource.
   *
   * @param {string} previewName
   *   A fully-qualified path representing Preview resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromPreviewName(previewName: string) {
    return this.pathTemplates.previewPathTemplate.match(previewName).project;
  }

  /**
   * Parse the preview from Preview resource.
   *
   * @param {string} previewName
   *   A fully-qualified path representing Preview resource.
   * @returns {string} A string representing the preview.
   */
  matchPreviewFromPreviewName(previewName: string) {
    return this.pathTemplates.previewPathTemplate.match(previewName).preview;
  }

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  projectPath(project: string) {
    return this.pathTemplates.projectPathTemplate.render({
      project: project,
    });
  }

  /**
   * Parse the project from Project resource.
   *
   * @param {string} projectName
   *   A fully-qualified path representing Project resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectName(projectName: string) {
    return this.pathTemplates.projectPathTemplate.match(projectName).project;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.actionsSdkStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
