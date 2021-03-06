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
mkdir -p qdata/dd1/keystore
cp keys/key1 qdata/dd1/keystore
geth --datadir qdata/dd1 init genesis.json

sleep 6

echo "[*] Starting Constellation nodes"
nohup constellation-node tm1.conf 2>> logs/constellation1.log &

echo "[*] Starting node 1"
sleep 3
PRIVATE_CONFIG=tm1.conf geth --datadir qdata/dd1 $GLOBAL_ARGS --rpcport 22000 --port 21000 --unlock 0 --password passwords.txt 2>>logs/1.log
