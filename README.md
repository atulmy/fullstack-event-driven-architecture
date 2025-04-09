# Full-Stack Event Driven Architecture

## Overview

<table>
  <tbody>
    <tr>
      <td>
        <img alt="Landing" src="https://raw.githubusercontent.com/atulmy/storage/master/images/fullstack-event-driven-architecture/architecture-overview.png" />
      </td>
      <td>
        <img alt="Landing" src="https://raw.githubusercontent.com/atulmy/storage/master/images/fullstack-event-driven-architecture/data-flow.png" />
      </td>
    </tr>
  </tbody>
</table>

[View in Figjam](https://www.figma.com/board/zCAWl74Q1a6bURhXyx2Pvc/fullstack-event-driven-architecture)

## Structure

- packages

  - common
  - model
  - ui

- projects
  - api
    - core
      - [localhost:3001](http://localhost:3001)
    - stt (speech-to-text)
      - [localhost:3002](http://localhost:3002)
    - tts (text-to-speech)
      - [localhost:3003](http://localhost:3003)
  - app
    - console
      - [localhost:4002](http://localhost:4002)
    - web
      - [localhost:4001](http://localhost:4001)
  - site
    - web
      - [localhost:5001](http://localhost:5001)

## Setup & Running

- **Prerequisites**

  - Node (`v18.x`)
  - MongoDB
  - Redis

- Clone repository `git clone git@github.com:atulmy/fullstack-event-driven-architecture.git fullstack`
- Switch to directory `cd fullstack`
- Install packages `npm install`
- Clean up `npm run clean`
- Reinstall packages `npm run reinstall`

## Notes

Redis as a message broker is only used for development purpose. It should be replaced with a more feature rich pub/sub like RabbitMQ, Kafka, Google Cloud Pub/Sub, etc. for production.

## Deploying

Check `.github/workflow` for GCP Cloud Run deployment example. Requires `GCP_PROJECT` and `GCP_SA_KEY` added to repository secret along with Redis instance configured in GCP.

## License

Copyright (c) 2025 Atul Yadav

[GitHub](http://github.com/atulmy) · [X (Twitter)](https://x.com/atulmy)

[The MIT License](http://www.opensource.org/licenses/mit-license.php)
