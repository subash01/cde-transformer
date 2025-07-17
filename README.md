# CDE Transformer Service

Node.js (TypeScript) microservice designed to aggregate file metadata from multiple Construction Data Environments (CDEs) into a single, unified payload.This service connects to various CDEs, fetches file information, transforms it into a common schema, and exposes it through a REST API.

## Features

  * **Unified API**: Provides a single endpoint (`GET /v1/files`) to fetch file metadata from multiple sources.
  * **Provider Integration**: Connects to various CDEs including Autodesk BIM 360, Procore, Viewpoint, Trimble Connect, and Aconex.
  * **Concurrent Fetching**: Gathers data from all requested CDEs in parallel for maximum performance.
  * **Standardized Schema**: Maps each provider's unique data structure into a consistent, common schema.
  * **Duplicate Resolution**: Intelligently de-duplicates records based on project and file name, keeping only the newest version.
  * **API Documentation**: Includes full API documentation via Swagger/OpenAPI 3.
  * **High Performance**: Built to aggregate and process 500 records in under 200 ms.
  * **Tested**: Includes unit and end-to-end tests with a target of ≥ 80% code coverage for core logic.

## API Documentation

For detailed information on the API endpoint, parameters, and schemas, visit the live Swagger documentation once the service is running:

**[http://localhost:3000/api-docs](https://www.google.com/search?q=http://localhost:3000/api-docs)**

## Core Technologies

  * **Node.js**: JavaScript runtime environment.
  * **TypeScript**: Strongly typed superset of JavaScript.
  * **Express.js**: Web application framework for Node.js.
  * **Jest & Supertest**: For unit and end-to-end testing.

## Prerequisites

  * Node.js (v18.x or later recommended)
  * npm (v9.x or later recommended)

## Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/subash01/cde-transformer.git
    cd cde-transformer
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file,

    Fill in the `_TOKEN` values in the new `.env` file if you have real credentials. The dummy values will work for running the mocked service.

## Available Scripts

  * **Run in development mode:**
    Starts the server with `ts-node` for live reloading.

    ```bash
    npm start
    ```

  * **Run tests:**
    Executes all unit and end-to-end tests using Jest.

    ```bash
    npm test
    ```

  * **Run performance test:**
    Runs a script to validate the aggregation performance against the 200ms target.

    ```bash
    npm run perf
    ```

  * **Build for production:**
    Transpiles the TypeScript code into JavaScript in the `/dist` directory.

    ```bash
    npm run build
    ```

  * **Run in production:**
    Starts the server from the compiled JavaScript code.

    ```bash
    npm run serve
    ```

## API Endpoint

The service exposes a single GET endpoint to retrieve the aggregated file list.

### `GET /v1/files`

Fetches, merges, and sorts file metadata from the specified CDE providers.

#### Query Parameters

| Parameter   | Type     | Description                                               | Required | Example                     |
| :---------- | :------- | :-------------------------------------------------------- | :------- | :-------------------------- |
| `providers` | `string` | A comma-separated list of providers to query.           | Yes      | `bim360,procore`            |
| `project`   | `string` | The unique identifier for the project within the CDEs.    | Yes      | `project-xyz-789`           |

#### Example Request

```bash
curl "http://localhost:3000/v1/files?providers=bim360,procore&project=123"
```

## Common Payload Schema

All data returned from the API will conform to the following JSON object structure.

```json
{
  "source": "bim360",
  "projectId": "string",
  "fileId": "string",
  "name": "string",
  "version": "string",
  "size": 123456,
  "downloadUrl": "https://bim360.com/download/File2",
  "updatedAt": "2025-07-04T16:21:00Z"
}
```
