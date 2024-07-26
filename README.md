# Full-Stack Event Driven Architecture

## Overview

<table>
  <tbody>
    <tr>
      <td>
        <img alt="Landing" src="https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/fullstack-event-driven-architecture/architecture-overview.png" />
      </td>
      <td>
        <img alt="Landing" src="https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/fullstack-event-driven-architecture/data-flow.png" />
      </td>
    </tr>
  </tbody>
</table>

[View in Figjam](https://www.figma.com/board/zCAWl74Q1a6bURhXyx2Pvc/fullstack-event-driven-architecture)

## Setup

- **Prerequisites**

  - Node (`v18.x`)
  - MongoDB
  - Redis

- Clone repository `git clone git@github.com:atulmy/fullstack-event-driven-architecture.git speechy`
- Switch to directory `cd speechy`
- Setup
  - Install packages `npm install`
 
## Running
- Packages
  - common `npm start common`
  - model `npm start model`
  - ui `npm start ui`
- Projects
  - api
    - core
      - `npm start api.core`
      - [localhost:3001](http://localhost:3001)
    - stt (speech-to-text)
      - `npm start api.stt`
      - [localhost:3002](http://localhost:3002)
    - tts (text-to-speech)
      - `npm start api.tts`
      - [localhost:3003](http://localhost:3003)
  - app
    - web
      - `npm start app.web`
      - [localhost:4001](http://localhost:4001)
    - console
      - `npm start app.console`
      - [localhost:4002](http://localhost:4002)
  - site
    - web
      - `npm start site.web`
      - [localhost:5001](http://localhost:5001)

## Notes
Redis as a message broker is only used for development purposed. It should be replaced with a more feature rich pub/sub like RabbitMQ, Kafka, Google Cloud Pub/Sub, etc. for production.

## Deploying

Check `.github/workflow` for GCP Cloud Run deployment example. Requires `GCP_PROJECT` and `GCP_SA_KEY` added to repository secret along with Redis instance configured in GCP.

## License

Copyright (c) 2024 Atul Yadav 

[GitHub](http://github.com/atulmy) · [X (Twitter)](https://x.com/atulmy)

[The MIT License](http://www.opensource.org/licenses/mit-license.php)
