const { exec } = require("child_process");
const fs = require("fs");
const readline = require("readline");

// Function to ask for user input
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

// Function to run Lighthouse and get scores
const runLighthouse = (url) => {
  return new Promise((resolve, reject) => {
    exec(
      `lighthouse ${url} --output json --quiet --emulated-form-factor mobile`,
      { maxBuffer: 1024 * 1024 * 10 },
      (error, stdout, stderr) => {
        // buffer size is 10MB
        if (error) {
          reject(`Error running Lighthouse: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Error in Lighthouse output: ${stderr}`);
          return;
        }
        try {
          // Extract scores from the report
          const report = JSON.parse(stdout);
          const categories = report.categories;

          if (
            categories &&
            categories.performance &&
            categories.accessibility &&
            categories["best-practices"] &&
            categories.seo
          ) {
            resolve({
              performance: categories.performance.score || 0,
              accessibility: categories.accessibility.score || 0,
              bestPractices: categories["best-practices"].score || 0,
              seo: categories.seo.score || 0,
            });
          } else {
            reject("Invalid report structure");
          }
        } catch (e) {
          reject(`Error parsing report: ${e.message}`);
        }
      }
    );
  });
};

// Run Lighthouse multiple times concurrently and extract scores
const runTests = async (url, runs) => {
  const concurrentRuns = 3; // Number of concurrent runs
  const allScores = [];

  // Run tests in batches of concurrentRuns
  for (let i = 0; i < Math.ceil(runs / concurrentRuns); i++) {
    const promises = [];
    for (let j = 0; j < concurrentRuns && i * concurrentRuns + j < runs; j++) {
      promises.push(runLighthouse(url));
    }
    try {
      console.log(
        `Running batch ${i + 1}/${Math.ceil(runs / concurrentRuns)}...`
      );
      const scores = await Promise.all(promises);
      allScores.push(...scores);
    } catch (error) {
      console.error(error);
    }
  }

  // Calculate averages and save them to a file
  const averages = calculateAverages(allScores, runs, url);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const averageFile = `./lighthouse-averages-${timestamp}.json`;
  fs.writeFileSync(averageFile, JSON.stringify(averages, null, 2));
  console.log("Averages saved to", averageFile);
};

// Function to calculate averages of scores
const calculateAverages = (scores, runs, url) => {
  const totals = {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  };

  scores.forEach((score) => {
    totals.performance += score.performance;
    totals.accessibility += score.accessibility;
    totals.bestPractices += score.bestPractices;
    totals.seo += score.seo;
  });

  const count = scores.length;
  return {
    url: url,
    runs: runs,
    performance: (totals.performance / count).toFixed(2),
    accessibility: (totals.accessibility / count).toFixed(2),
    bestPractices: (totals.bestPractices / count).toFixed(2),
    seo: (totals.seo / count).toFixed(2),
  };
};

// Start the process
(async () => {
  const url = await askQuestion("Enter the URL to test: ");
  let runs = await askQuestion(
    "How many times do you want the tests to run (press Enter to default to 10): "
  );
  runs = runs ? parseInt(runs) : 10;

  runTests(url, runs);
})();
