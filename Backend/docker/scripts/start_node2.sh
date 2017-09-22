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
mkdir -p qdata/dd2/keystore
cp keys/key2 qdata/dd2/keystore
cp keys/key3 qdata/dd2/keystore
geth --datadir qdata/dd2 init genesis.json

sleep 6

echo "[*] Starting Constellation nodes"
nohup constellation-node tm2.conf 2>> logs/constellation2.log &

echo "[*] Starting node 2"
sleep 3
PRIVATE_CONFIG=tm2.conf geth --datadir qdata/dd2 $GLOBAL_ARGS --rpcport 22001 --port 21001 --voteaccount "0x0fbdc686b912d7722dc86510934589e0aaf3b55a" --votepassword "" --blockmakeraccount "0xca843569e3427144cead5e4d5999a3d0ccf92b8e" --blockmakerpassword "" --singleblockmaker --minblocktime 2 --maxblocktime 5 2>>logs/2.log
