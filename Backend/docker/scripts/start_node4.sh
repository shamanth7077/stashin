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
mkdir -p qdata/dd4/keystore
cp keys/key4 qdata/dd4/keystore
geth --datadir qdata/dd4 init genesis.json

sleep 6

echo "[*] Starting Constellation nodes"
nohup constellation-node tm4.conf 2>> logs/constellation4.log &

echo "[*] Starting node 4"
sleep 3
PRIVATE_CONFIG=tm4.conf geth --datadir qdata/dd4 $GLOBAL_ARGS --rpcport 22003 --port 21003 --voteaccount "0x9186eb3d20cbd1f5f992a950d808c4495153abd5" --votepassword "" 2>>logs/4.log

