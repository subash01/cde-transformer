# Architecture Note: CDE Transformer Service

This document outlines the architecture and design choices for the `cde-transformer` microservice, as required by the project specification.

## 1. Core Architecture: Layered Monolith / Microservice

The service is built as a single Node.js application but follows a **layered architecture** that is standard for microservices. This approach provides a clean separation of concerns, making the system easier to develop, test, and maintain.

-   **API Layer (`api/`):** Responsible for handling HTTP requests, routing, and input validation. It uses Express.js. It knows nothing about where the data comes from, only how to request it from the Service Layer.
-   **Service Layer (`services/`):** Contains the core business logic. The `AggregationService` orchestrates the entire process: fetching from multiple sources, triggering transformations, resolving duplicates, and sorting. It acts as a mediator between the API and Provider layers.
-   **Provider Layer (`providers/`):** Responsible for all interactions with external CDEs. This is the only layer that understands the native formats and communication protocols of the external APIs.

This structure allows us to replace any layer (e.g., switch the web framework from Express to Fastify) with minimal impact on the other layers.

## 2. Design Choices & Trade-offs

### [cite_start]Provider Abstraction (The "Pluggable" Pattern) 

-   **Choice:** A common TypeScript `interface` (`ICDEProvider`) is used to define a contract for all CDE providers. A `ProviderFactory` is used to instantiate the correct provider class based on a string name.
-   **Reasoning:** This is the most critical design choice. It makes the system extensible. To add a new provider (e.g., "Aconex"), we only need to:
    1.  Implement the new provider's native data types.
    2.  Create a new mapper function (`aconex.mapper.ts`).
    3.  Create a new provider class (`AconexProvider.ts`) that implements `ICDEProvider`.
    4.  Update the `ProviderFactory` and `AggregationService` to recognize "aconex".
-   **Trade-off:** No significant trade-offs for this approach; it is a standard and robust design pattern for this type of problem.

### Concurrency and Resilience

-   **Choice:** `Promise.allSettled` is used to fetch data from all providers concurrently.
-   **Reasoning:** Concurrency dramatically reduces the total response time by running I/O operations in parallel. `Promise.allSettled` was chosen over `Promise.all` for resilience. If one provider's API fails or times out, the entire request doesn't fail. The service can return the data it successfully fetched from the other providers, leading to a more robust user experience.

### [cite_start]Transformation and Mapping 

-   **Choice:** Dedicated `mapper` functions are responsible for transforming a provider's native data structure into the common `CdeFile` schema.
-   **Reasoning:** This isolates the transformation logic. If a provider (e.g., Procore) changes its API response format, we only need to update `procore.mapper.ts` and `ProcoreNativeFile` type definitions. The rest of the application remains untouched.

### [cite_start]Stubbing and API Interaction [cite: 6]

-   **Choice:** Provider `fetchFiles` methods currently return hardcoded, realistic JSON data instead of making live HTTP calls. The specific API endpoints and data structures are documented in the mapper files.
-   **Reasoning:** This was done as per the requirements to focus on code structure. In a real-world scenario, these methods would use a library like `axios` to perform HTTP requests. Logic for **pagination**, **rate-limiting (with exponential backoff)**, and **auth token refresh** would be encapsulated within each provider's implementation, as these concerns are specific to each external API.

### [cite_start]Configuration Management 

-   **Choice:** The `dotenv` library is used to manage environment variables and secrets. An `.env.example` file is provided for clear documentation of required variables.
-   **Reasoning:** This is a standard, secure practice. It prevents hardcoding secrets in the source code and allows for different configurations across environments (development, staging, production).