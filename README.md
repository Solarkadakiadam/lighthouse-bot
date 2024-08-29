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
   git clone https://github.com/Solarkadakiadam/your-repository-name.git
   cd your-repository-name
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

1. **Configure the script:**
Open run-lighthouse.js and set your desired website URL in the url variable.


2. **Run the script:**

   ```bash
   node run-lighthouse.js
   ```

   - This script will run Lighthouse tests, save individual reports, and calculate the average scores.

3. **View results:**

The results of each run are saved in results.json.
The average scores are saved in average.json.



## Contact

For questions or feedback, please contact Ömer Avşar at [omeravsaroa@gmail.com](mailto:omeravsaroa@gmail.com).

## Contributing

Feel free to open issues or submit pull requests to contribute to this project.
