const { exec } = require('child_process');
const fs = require('fs');

const url = 'THIS SHOULD BE YOUR WEBSITE URL'; // Replace with your URL
const runs = 20; // Number of times to run the test CHANGE IF NEEDED TO REDUCE THE TIME AND ACCURACY
const averageFile = './lighthouse-averages.json'; // File to save averages

// Function to run Lighthouse and get scores
const runLighthouse = () => {
    return new Promise((resolve, reject) => {
        exec(`lighthouse ${url} --output json --quiet`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => { // buffer size is 10MB
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

                if (categories && categories.performance && categories.accessibility && categories['best-practices'] && categories.seo) {
                    resolve({
                        performance: categories.performance.score || 0,
                        accessibility: categories.accessibility.score || 0,
                        bestPractices: categories['best-practices'].score || 0,
                        seo: categories.seo.score || 0,
                    });
                } else {
                    reject('Invalid report structure');
                }
            } catch (e) {
                reject(`Error parsing report: ${e.message}`);
            }
        });
    });
};

// Run Lighthouse multiple times and extract scores
const runTests = async () => {
    const allScores = [];

    for (let i = 1; i <= runs; i++) {
        try {
            console.log(`Running test ${i}/${runs}...`);
            const scores = await runLighthouse();
            allScores.push(scores);
        } catch (error) {
            console.error(error);
        }
    }

    // Calculate averages and save them to a file
    const averages = calculateAverages(allScores);
    fs.writeFileSync(averageFile, JSON.stringify(averages, null, 2));
    console.log('Averages saved to', averageFile);
};

// Function to calculate averages of scores
const calculateAverages = (scores) => {
    const totals = {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0
    };

    scores.forEach(score => {
        totals.performance += score.performance;
        totals.accessibility += score.accessibility;
        totals.bestPractices += score.bestPractices;
        totals.seo += score.seo;
    });

    const count = scores.length;
    return {
        performance: (totals.performance / count).toFixed(2),
        accessibility: (totals.accessibility / count).toFixed(2),
        bestPractices: (totals.bestPractices / count).toFixed(2),
        seo: (totals.seo / count).toFixed(2),
    };
};

// Start the process
runTests();
