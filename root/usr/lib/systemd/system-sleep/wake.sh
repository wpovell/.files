#!/bin/sh
# ::lambda

case $1/$2 in
  pre/*)
    echo "Going to $2..."
    ;;
  post/*)
    echo "Waking up from $2..."
    echo 1 > /sys/bus/pci/rescan
    ;;
esac
