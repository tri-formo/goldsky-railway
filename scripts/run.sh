#!/bin/sh

echo "Logging in to goldsky..."
if [ -n "$GOLDSKY_TOKEN" ]; then
  goldsky login --token "$GOLDSKY_TOKEN"
else
  echo "Error: GOLDSKY_TOKEN environment variable is not set"
  exit 1
fi

echo "Successfully logged in to goldsky"

echo "Starting the app..."

npm start
