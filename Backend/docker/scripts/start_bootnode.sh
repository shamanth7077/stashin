#!/bin/bash
set -u
set -e
BOOTNODE_KEYHEX=77bd02ffa26e3fb8f324bda24ae588066f1873d95680104de5bc2db9e7b2e510

echo "[*] Init bootnode"
rm -rf qdata
mkdir -p logs

echo "[*] Starting bootnode"
bootnode --nodekeyhex "$BOOTNODE_KEYHEX" 2>>logs/bootnode.log
