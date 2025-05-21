#!/bin/sh

echo "Login to goldsky"
if [ -n "$GOLDSKY_TOKEN" ]; then
  echo "GOLDSKY_TOKEN is set"
  goldsky login --token "$GOLDSKY_TOKEN"
else
  echo "GOLDSKY_TOKEN is not set"
fi 