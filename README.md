# Performance Thunderstorm

## Lighthouse Performance Testing Script

## Overview

This project provides a script to automate Lighthouse performance testing of websites. The script runs Lighthouse tests multiple times, collects specific performance metrics, and calculates their averages. The results are saved into a JSON file.

## Features

- Runs Lighthouse tests multiple times.
- Saves performance, accessibility, best practices, and SEO scores.
- Calculates and saves the average of these scores.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (includes npm)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse) (install globally using npm)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Solarkadakiadam/lighthouse-bot.git
   cd lighthouse-bot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Lighthouse globally:**

   ```bash
   npm install -g lighthouse
   ```

## Usage

1. **Run the script:**

   ```bash
   node lighthouse-bot.js
   ```

   - You will be prompted to enter the URL you want to test.
   - You will also be asked how many times you want the tests to run (press Enter to default to 10 runs).

2. **View results:**

- The average scores are saved in lighthouse-averages.json

## Example Result

Here’s an example of what the output JSON file might look like:

```json
{
  "url": "https://omeravsar.com/",
  "runs": 20,
  "performance": "0.92",
  "accessibility": "0.95",
  "bestPractices": "1.00",
  "seo": "1.00"
}
```

## Contact

For questions or feedback, please contact Ömer Avşar at [omeravsaroa@gmail.com](mailto:omeravsaroa@gmail.com).

## Contributing

Feel free to open issues or submit pull requests to contribute to this project.

## Medium Article
[https://medium.com/@omeravsaroa/supercharge-your-website-testing-with-the-performance-thunderstorm-script-09c06fec0076](https://medium.com/@omeravsaroa/supercharge-your-website-testing-with-the-performance-thunderstorm-script-09c06fec0076) click to see the medium article

