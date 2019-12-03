//
// A Node.js-based microservice for log aggregation on Kubernetes.
// This microservice must be deployed to Kubernetes as a Daemonset so that it can run on each node in the cluster.
// See README.MD for instructions.
//

'use strict';

const tail = require("tail");
const globby = require("globby");
const chokidar = require("chokidar");
const path = require("path");

//
// The directory on the Kubernetes node that contains log files for pods running on the node.
//
const LOG_FILES_DIRECTORY = "/var/log/containers";

//
// A glob that identifies the log files we'd like to track.
//
const LOG_FILES_GLOB = [
    `${LOG_FILES_DIRECTORY}/*.log`,                 // Track all log files in the log files diretory.
    `!${LOG_FILES_DIRECTORY}/*kube-system*.log`,    // Except... don't track logs for Kubernetes system pods.
];

//
// Map of log files currently being tracked.
//
const trackedFiles = {};

//
// This function is called when a line of output is received from any container on the node.
//
function onLogLine(containerName, line) {
    //
    // At this point you want to forward your logs to someother log collector for aggregration.
    // For this simple example we'll just print them as output from this pod.
    //
    const data = JSON.parse(line); // The line is a JSON object so parse to extract relevant data.
    const isError = data.stream === "stderr"; // Is the output an error?
    const level = isError ? "error" : "info";
    console.log(`${containerName}/[${level}] : ${data.log}`);
}

//
// Commence tracking a particular log file.
//
function trackFile(logFilePath) {
    const logFileTail = new tail.Tail(logFilePath);
    trackedFiles[logFilePath] = logFileTail; // Take note that we are now tracking this file.
    const logFileName = path.basename(logFilePath);
    const containerName = logFileName.split("-")[0]; // Super simple way to extract the container name from the log filename.
    logFileTail.on("line", line => onLogLine(containerName, line));
    logFileTail.on("error", error => console.error(`ERROR: ${error}`));
}

//
// Identify log files to be tracked and start tracking them.
//
async function trackFiles() {
    const logFilePaths = await globby(LOG_FILES_GLOB);
    for (const logFilePath of logFilePaths) {
        if (trackedFiles[logFilePaths]) {
            continue; // Already tracking this file, ignore it now.
        }

        trackFile(logFilePath); // Start tracking this log file we just identified.
    }
}

async function main() {
    //
    // Start tracking initial log files.
    //
    await trackFiles();

    //
    // Track new log files as they are created.
    //
    chokidar.watch(LOG_FILES_GLOB) 
        .on("add", newLogFilePath => trackFile(newLogFilePath)); 
}

main() 
    .then(() => console.log("Online"))
    .catch(err => {
        console.error("Failed to start!");
        console.error(err && err.stack || err);
    });


