#!/bin/bash

# Create a log file
LOGFILE="init.log"
> $LOGFILE

# Function to run a command and log its output
run_and_log() {
  echo "Running: $1"
  $1 &>> $LOGFILE &
}

ROOT_DIR=$(pwd)

# Start Docker Compose services
run_and_log "docker compose up -d"

# Wait for a few seconds to ensure that Docker services are up
sleep 10

# Start the first NestJS instance
cd $ROOT_DIR/producer
npm install
npm run migration:run
run_and_log "npm run start"

# Start the second NestJS instance
cd $ROOT_DIR/consumer
npm install
npm run migration:run
run_and_log "npm run start"

# Start the React instance
cd $ROOT_DIR/ui
npm install
run_and_log "npm run dev"

# Wait for all background processes to finish
wait

# Output the log file to the console
cat $LOGFILE