const Web3 = require('web3');
const web3 = new Web3();
const log4js = require('log4js');
const logger = log4js.getLogger('web3q');

exports.extend = {
	RPC: extendRPC,
	IPC: extendIPC
};

/*
	RPC Extension
*/

function extendRPC(host) {
	web3.setProvider(new web3.providers.HttpProvider(host));
	// logger.error('WARNING: You are using the RPC extension.');
    // logger.error('RPC extension is not recommended because it exposes the whole api through localhost.');
    // logger.error('Use this option for testing purposes only.');
	// Adding admin API to web3
	web3._extend({
		property: 'admin',
	  	methods: [
			new web3._extend.Method({
	      		name: 'addPeer',
	       		call: 'admin_addPeer',
	       		params: 1,
	       		inputFormatter: [toStringVal],
	       		outputFormatter: toBoolVal
	  		}),
			new web3._extend.Method({
	  	       name: 'peers',
	  	       call: 'admin_peers',
	  	       params: 0,
	  	       outputFormatter: toJSONObject
	  	  	}),
			new web3._extend.Method({
	  	       name: 'nodeInfo',
	  	       call: 'admin_nodeInfo',
	  	       params: 0,
	  	       outputFormatter: toJSONObject
		   }),
		   new web3._extend.Method({
	 	       name: 'datadir',
	 	       call: 'admin_datadir',
	 	       params: 0,
	 	       outputFormatter: toStringVal
		   }),
		   new web3._extend.Method({
	 	       name: 'setSolc',
	 	       call: 'admin_setSolc',
	 	       params: 1,
	 	       inputFormatter: [toStringVal],
	 	       outputFormatter: toStringVal
		   }),
		   new web3._extend.Method({
	 	       name: 'startNatSpec',
	 	       call: 'admin_startNatSpec',
	 	       params: 0
		   }),
		   new web3._extend.Method({
	 	       name: 'stopNatSpec',
	 	       call: 'admin_stopNatSpec',
	 	       params: 0
		   }),
		   new web3._extend.Method({
	 	       name: 'getContractInfo',
	 	       call: 'admin_getContractInfo',
	 	       params: 1,
	 	       inputFormatter: [web3._extend.utils.toAddress],
	 	       outputFormatter: toJSONObject
		   }),
		   new web3._extend.Method({
	 	       name: 'saveInfo',
	 	       call: 'admin_saveInfo',
	 	       params: 0,
	 	       inputFormatter: [toJSONObject, toStringVal],
	 	       outputFormatter: toStringVal
		   }),
		   new web3._extend.Method({
	 	       name: 'register',
	 	       call: 'admin_register',
	 	       params: 3,
	 	       inputFormatter: [web3._extend.utils.toAddress, web3._extend.utils.toAddress, toStringVal],
	 	       outputFormatter: toBoolVal
		   }),
		   new web3._extend.Method({
	 	       name: 'registerUrl',
	 	       call: 'admin_registerUrl',
	 	       params: 3,
	 	       inputFormatter: [web3._extend.utils.toAddress, toStringVal, toStringVal],
	 	       outputFormatter: toBoolVal
		   })
		]
	});

	// Adding miner API to web3
	web3._extend({
		property: 'miner',
		methods: [
			new web3._extend.Method({
				name: "hashrate",
				call: "miner_hashrate",
				params: 0,
				outputFormatter: toIntVal
			}),

			new web3._extend.Method({
				name: 'makeDAG',
				call: 'miner_makeDAG',
				params: 1,
				inputFormatter: [toIntVal],
				outputFormatter: toBoolVal
			}),

			new web3._extend.Method({
				name: 'setExtra',
				call: 'miner_setExtra',
				params: 1,
				inputFormatter: [toStringVal],
				outputFormatter: toBoolVal
			}),

			new web3._extend.Method({
				name: 'setGasPrice',
				call : 'miner_setGasPrice',
				params: 1,
				inputFormatter: [toIntVal],
				outputFormatter: toBoolVal
			}),

			new web3._extend.Method({
				name: 'start',
				call: 'miner_start',
				params: 1,
				inputFormatter: [toIntVal],
				outputFormatter: toBoolVal
			}),

			new web3._extend.Method({
				name: 'stop',
				call: 'miner_stop',
				params: 1,
				inputFormatter: [toIntVal],
				outputFormatter: toBoolVal
			}),

			new web3._extend.Method({
				name: 'startAutoDAG',
				call: 'miner_startAutoDAG',
				params: 1,
				inputFormatter: [toIntVal],
				outputFormatter: toBoolVal
			}),

			new web3._extend.Method({
				name: 'stopAutoDAG',
				call: 'miner_stopAutoDAG',
				params: 1,
				inputFormatter: [toIntVal],
				outputFormatter: toBoolVal
			}),
			new web3._extend.Method({
				name: 'setEtherbase',
				call: 'miner_setEtherbase',
				params: 1,
				inputFormatter: [toStringVal],
				outputFormatter: toBoolVal
			}),
		]
	})

	// Adding personal API to web3
	web3._extend({
	  property: 'personal',
	  methods: [
		  new web3._extend.Method({
			  name: 'unlockAccount',
	       	  call: 'personal_unlockAccount',
	          params: 3,
	          inputFormatter: [web3._extend.utils.toAddress, toStringVal, toIntVal],
	          outputFormatter: toBoolVal
		  }),
		  new web3._extend.Method({
		       name: 'newAccount',
		       call: 'personal_newAccount',
		       params: 1,
		       inputFormatter: [toStringVal],
		       outputFormatter: toStringVal
		  }),
		  new web3._extend.Method({
		       name: 'listAccounts',
		       call: 'personal_listAccounts',
		       params: 0,
		       outputFormatter: toJSONObject
		  }),
		  new web3._extend.Method({
		       name: 'deleteAccount',
		       call: 'personal_deleteAccount',
		       params: 2,
		       inputFormatter: [web3._extend.utils.toAddress, toStringVal],
		       outputFormatter: toBoolVal
		  }),
		]
	});

	// Adding debug API to web3
	web3._extend({
	  property: 'debug',
	  methods: [
		  new web3._extend.Method({
			  name: 'setHead',
	       	  call: 'debug_setHead',
	          params: 1,
	          inputFormatter: [toIntVal],
	          outputFormatter: toBoolVal
		  }),
		  new web3._extend.Method({
		       name: 'seedHash',
		       call: 'debug_seedHash',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  }),
		  new web3._extend.Method({
		       name: 'getBlockRlp',
		       call: 'debug_getBlockRlp',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  }),
		  new web3._extend.Method({
		       name: 'printBlock',
		       call: 'debug_printBlock',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  }),
		  new web3._extend.Method({
		       name: 'dumpBlock',
		       call: 'debug_dumpBlock',
		       params: 1,
		       inputFormatter: [toIntVal],
		       outputFormatter: toStringVal
		  }),
		  new web3._extend.Method({
		       name: 'metrics',
		       call: 'debug_metrics',
		       params: 1,
		       inputFormatter: [toBoolVal],
		       outputFormatter: toStringVal
		  }),
	  ]
	});

	web3._extend({
		property: 'quorum',
		methods: [
			new web3._extend.Method({
				name: 'nodeInfo',
				call: 'quorum_nodeInfo',
				params: 0,
				outputFormatter: toJSONObject
			}),
			new web3._extend.Method({
				name: 'vote',
				call: 'quorum_vote',
				params: 1,
				inputFormatter: [toStringVal],
				outputFormatter: toStringVal
			}),
			new web3._extend.Method({
				name: 'canonicalHash',
				call: 'quorum_canonicalHash',
				params: 1,
				inputFormatter: [toIntVal],
				outputFormatter: toStringVal
			}),
			new web3._extend.Method({
				name: 'isVoter',
				call: 'quorum_isVoter',
				params: 1,
				inputFormatter: [toStringVal],
				outputFormatter: toBoolVal
			}),
			new web3._extend.Method({
				name: 'isBlockMaker',
				call: 'quorum_isBlockMaker',
				params: 1,
				inputFormatter: [toStringVal],
				outputFormatter: toBoolVal
			}),
			new web3._extend.Method({
				name: 'makeBlock',
				call: 'quorum_makeBlock',
				params: 0,
				outputFormatter: toStringVal
			}),
			new web3._extend.Method({
				name: 'pauseBlockMaker',
				call: 'quorum_pauseBlockMaker',
				params: 0,
				outputFormatter: toStringVal
			}),
			new web3._extend.Method({
				name: 'resumeBlockMaker',
				call: 'quorum_resumeBlockMaker',
				params: 0,
				outputFormatter: toStringVal
			})
		]
	});

	function toStringVal(val) {
		return String(val);
	}

	function toBoolVal(val) {
		if (String(val) === 'true') {
			return true;
		} else {
			return false;
		}
	}

	function toIntVal(val) {
		return parseInt(val);
	}

	function toIntValRestricted(val) {
		var check = parseInt(val);
		if (check > 0 && check <= 6) {
			return check;
		} else {
			return null;
		}

	}

	function toJSONObject(val) {
		try {
			return val;
		} catch (e){
			return String(val);
		}
	}

	return web3;
}

/*
	IPC Extension
*/

function extendIPC(path, net) {
	web3.setProvider(new web3.providers.IpcProvider(path, net));

	// Adding admin API to web3
	web3._extend({
		property: 'admin',
	  	methods: [
			new web3._extend.Method({
	      		name: 'addPeer',
	       		call: 'admin_addPeer',
	       		params: 1
	  		}),
			new web3._extend.Method({
	  	       name: 'peers',
	  	       call: 'admin_peers',
	  	       params: 0
	  	  	}),
			new web3._extend.Method({
	  	       name: 'nodeInfo',
	  	       call: 'admin_nodeInfo',
	  	       params: 0
		   }),
		   new web3._extend.Method({
	 	       name: 'datadir',
	 	       call: 'admin_datadir',
	 	       params: 0
		   }),
		   new web3._extend.Method({
	 	       name: 'setSolc',
	 	       call: 'admin_setSolc',
	 	       params: 1
		   }),
		   new web3._extend.Method({
	 	       name: 'startNatSpec',
	 	       call: 'admin_startNatSpec',
	 	       params: 0
		   }),
		   new web3._extend.Method({
	 	       name: 'stopNatSpec',
	 	       call: 'admin_stopNatSpec',
	 	       params: 0
		   }),
		   new web3._extend.Method({
	 	       name: 'getContractInfo',
	 	       call: 'admin_getContractInfo',
	 	       params: 1
		   }),
		   new web3._extend.Method({
	 	       name: 'saveInfo',
	 	       call: 'admin_saveInfo',
	 	       params: 0
		   }),
		   new web3._extend.Method({
	 	       name: 'register',
	 	       call: 'admin_register',
	 	       params: 3
		   }),
		   new web3._extend.Method({
	 	       name: 'registerUrl',
	 	       call: 'admin_registerUrl',
	 	       params: 3
		   })
		]
	});

	// Adding miner API to web3
	web3._extend({
		property: 'miner',
		methods: [
			new web3._extend.Method({
				name: "hashrate",
				call: "miner_hashrate",
				params: 0
			}),

			new web3._extend.Method({
				name: 'makeDAG',
				call: 'miner_makeDAG',
				params: 1
			}),

			new web3._extend.Method({
				name: 'setExtra',
				call: 'miner_setExtra',
				params: 1
			}),

			new web3._extend.Method({
				name: 'setGasPrice',
				call : 'miner_setGasPrice',
				params: 1
			}),

			new web3._extend.Method({
				name: 'start',
				call: 'miner_start',
				params: 1,

			}),

			new web3._extend.Method({
				name: 'stop',
				call: 'miner_stop',
				params: 1
			}),

			new web3._extend.Method({
				name: 'startAutoDAG',
				call: 'miner_startAutoDAG',
				params: 1
			}),

			new web3._extend.Method({
				name: 'stopAutoDAG',
				call: 'miner_stopAutoDAG',
				params: 1
			}),
			new web3._extend.Method({
				name: 'setEtherbase',
				call: 'miner_setEtherbase',
				params: 1
			}),
		]
	})

	// Adding personal API to web3
	web3._extend({
	  property: 'personal',
	  methods: [
		  new web3._extend.Method({
			  name: 'unlockAccount',
	       	  call: 'personal_unlockAccount',
	          params: 3
		  }),
		  new web3._extend.Method({
		       name: 'newAccount',
		       call: 'personal_newAccount',
		       params: 1
		  }),
		  new web3._extend.Method({
		       name: 'listAccounts',
		       call: 'personal_listAccounts',
		       params: 0
		  }),
		  new web3._extend.Method({
		       name: 'deleteAccount',
		       call: 'personal_deleteAccount',
		       params: 2
		  }),
		]
	});

	// Adding debug API to web3
	web3._extend({
	  property: 'debug',
	  methods: [
		  new web3._extend.Method({
			  name: 'setHead',
	       	  call: 'debug_setHead',
	          params: 1
		  }),
		  new web3._extend.Method({
		       name: 'seedHash',
		       call: 'debug_seedHash',
		       params: 1
		  }),
		  new web3._extend.Method({
		       name: 'getBlockRlp',
		       call: 'debug_getBlockRlp',
		       params: 1
		  }),
		  new web3._extend.Method({
		       name: 'printBlock',
		       call: 'debug_printBlock',
		       params: 1
		  }),
		  new web3._extend.Method({
		       name: 'dumpBlock',
		       call: 'debug_dumpBlock',
		       params: 1
		  }),
		  new web3._extend.Method({
		       name: 'metrics',
		       call: 'debug_metrics',
		       params: 1
		  }),
	  ]
	});

	web3._extend({
		property: 'quorum',
		methods: [
			new web3._extend.Method({
				name: 'nodeInfo',
				call: 'quorum_nodeInfo',
				params: 0
			}),
			new web3._extend.Method({
				name: 'vote',
				call: 'quorum_vote',
				params: 1
			}),
			new web3._extend.Method({
				name: 'canonicalHash',
				call: 'quorum_canonicalHash',
				params: 1
			}),
			new web3._extend.Method({
				name: 'isVoter',
				call: 'quorum_isVoter',
				params: 1
			}),
			new web3._extend.Method({
				name: 'isBlockMaker',
				call: 'quorum_isBlockMaker',
				params: 1
			}),
			new web3._extend.Method({
				name: 'makeBlock',
				call: 'quorum_makeBlock',
				params: 0
			}),
			new web3._extend.Method({
				name: 'pauseBlockMaker',
				call: 'quorum_pauseBlockMaker',
				params: 0
			}),
			new web3._extend.Method({
				name: 'resumeBlockMaker',
				call: 'quorum_resumeBlockMaker',
				params: 0
			})
		]
	});

	return web3;
}
