#!/bin/bash
set -u
set -e
NETID=87234
BOOT_IP=$(host bootnode | awk '/has address/ {print $4}')
BOOTNODE_ENODE=enode://61077a284f5ba7607ab04f33cfde2750d659ad9af962516e159cf6ce708646066cd927a900944ce393b98b95c914e4d6c54b099f568342647a1cd4a262cc0423@$BOOT_IP:30301
GLOBAL_ARGS="--bootnodes $BOOTNODE_ENODE --networkid $NETID --rpc --rpcaddr 0.0.0.0 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum"

echo "[*] Init node"
rm -rf qdata
mkdir -p logs
mkdir -p qdata/dd7/keystore
geth --datadir qdata/dd7 init genesis.json

sleep 6

echo "[*] Starting Constellation nodes"
nohup constellation-node tm7.conf 2>> logs/constellation7.log &

echo "[*] Starting node 7"
sleep 3
PRIVATE_CONFIG=tm7.conf geth --datadir qdata/dd7 $GLOBAL_ARGS --rpcport 22006 --port 21006 2>>logs/7.log

