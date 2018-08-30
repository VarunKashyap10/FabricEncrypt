console.log('DockerFunction.js runnig!');
const nrc=require('node-command-line');
//const Promise=require('es6-promise').Promise;
const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const sleep = require('sleep');
var keysize = 256;
var hash_algo = 'sha2';
//const client = require(__dirname+'/fabric-sdk-node/node_modules/fabric-client'); 
/*
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

module.exports.firstStart=async function (callback){
    
    containers=await exec('docker ps');
    return containers;
    document.getElementById("StartNetworkButton").setAttribute("html:asdf")
};
*/

const button = document.getElementById('startNetwork');
button.addEventListener('click', function(e) {
    button.innerHTML = "Launching Docker Containers";
    /*promise5 = new Promise (function(resolve, reject){
        nrc.run('pwd > '+__dirname+'/Logs/dockerSetup.txt');
        try{
            nrc.run('docker-compose -f '+__dirname +'/businessLogic/docker-compose.yaml up -d  > '+__dirname+'/Logs/dockerSetup.txt');
        }
        catch(err){
            console.log(err);
            nrc.run('docker rm -f $(docker ps -aq)');
        }        
    });*/
    promise6= new Promise(function(resolve,reject){
        button.innerHTML = "Starting Network";
        //sleep.sleep(7);
    });
    promise7=new Promise(function(resolve,reject){
        nrc.run('node '+__dirname+'/fabric-sdk-node/test/integration/e2e.js > '+__dirname+'/Logs/e2e.txt');
    });
    promise8 = new Promise(function(resolve,reject){
        sleep.sleep(20);
        const modalView = path.join('file://',__dirname,'/Logs/e2e.txt');
        let win = new BrowserWindow({width: 1000, height:1000});
        win.on('close',function(){win=null;
        viewDockerButton.innerHTML="Network Running";});
        win.loadURL(modalView);
        win.show();
    });
    return Promise.all(promise6,promise7,promise8)
});

const viewDockerButton = document.getElementById('dockerView');

viewDockerButton.addEventListener('click',function(e){
    viewDockerButton.innerHTML = "Calculating...";
    promise1= new Promise (function(resolve, reject){
        nrc.run('docker ps > '+__dirname+'/Logs/dockerLog.txt');
    });
    promise2=new Promise(function(resolve,reject){
        nrc.run('docker network ls >> '+__dirname+'/Logs/dockerLog.txt');
    });
    promise3=new Promise(function(resolve,reject){
        nrc.run('docker container ls >> '+__dirname+'/Logs/dockerLog.txt');
    });
    promise4=new Promise(function(resolve,result){
        sleep.sleep(5);
        viewDockerButton.innerHTML = "Showing...";
        const modalView = path.join('file://',__dirname,'/Logs/dockerLog.txt');
        let win = new BrowserWindow({width: 500, height:1000});
        win.on('close',function(){win=null;
        viewDockerButton.innerHTML="View Log";});
        win.loadURL(modalView);
        win.show();
    });
    return Promise.all(promise1,promise2,promise3,promise4);
});
    
const transferA2BButton= document.getElementById('transfer1Button');

transferA2BButton.addEventListener('click',function(e){
    transferA2BButton.innerHTML = 'Transfering ....';
    promise9 = new Promise(function(resolve,reject){
        nrc.run('node '+__dirname+'/fabric-sdk-node/test/integration/e2e/invoke-transaction.js > '+__dirname+'/Logs/transactionA2B.txt');
    });
    promise10=new Promise(function(resolve,reject){
        sleep.sleep(10);
        transferA2BButton.innerHTML = "Showing...";
        const modalView = path.join('file://',__dirname,'/Logs/transactionA2B.txt');
        let win = new BrowserWindow({width: 400, height:200});
        win.on('close',function(){win=null;
        transferA2BButton.innerHTML="Transfer";});
        win.loadURL(modalView);
        win.show();
    });
    return Promise.all(promise9,promise10);
});

const transferB2AButton= document.getElementById('transfer2Button');

transferB2AButton.addEventListener('click',function(e){
    transferB2AButton.innerHTML = 'Transfering ....';
    promise11 = new Promise(function(resolve,reject){
        nrc.run('node '+__dirname+'/fabric-sdk-node/test/integration/e2e/query.js > '+__dirname+'/Logs/transferB2A.txt');
    });
    promise12=new Promise(function(resolve,reject){
        sleep.sleep(7);
        transferB2AButton.innerHTML = "Showing...";
        const modalView = path.join('file://',__dirname,'/Logs/transferB2A.txt');
        let win = new BrowserWindow({width: 400, height:200});
        win.on('close',function(){win=null;
        transferB2AButton.innerHTML="Transfer";});
        win.loadURL(modalView);
        win.show();
    });
    return Promise.all(promise11,promise12);
});

const queryButton= document.getElementById('queryButton');

queryButton.addEventListener('click',function(e){
    queryButton.innerHTML = 'Querying ....';
    promise13 = new Promise(function(resolve,reject){
        nrc.run('node '+__dirname+'/fabric-sdk-node/test/integration/e2e/query.js > '+__dirname+'/Logs/query.txt');
    });
    promise14=new Promise(function(resolve,reject){
        sleep.sleep(7);
        queryButton.innerHTML = "Showing...";
        const modalView = path.join('file://',__dirname,'/Logs/query.txt');
        let win = new BrowserWindow({width: 400, height:200});
        win.on('close',function(){win=null;
        queryButton.innerHTML="Query";});
        win.loadURL(modalView);
        win.show();
    });
    return Promise.all(promise13,promise14);
});

const cryptosuiteButton = document.getElementById('custom-cryptosuite');
const keysize_select = document.getElementById('key-category');
const hash_select = document.getElementById('hash-category');
const testString = document.getElementById('sample-string');
cryptosuiteButton.addEventListener('click',function(e){
    cryptosuiteButton.innerHTML='Applying ...';
    keysize = keysize_select.options[keysize_select.selectedIndex].value;
    hash_algo = hash_select.options[hash_select.selectedIndex].value;
    console.log(keysize);
    console.log(hash_algo);
    promise17 = new Promise(function(resolve,reject){
        nrc.run('node '+__dirname+'/fabric-sdk-node/test/integration/e2e/hashNew.js  '+keysize+' '+hash_algo+' '+testString+' > '+__dirname+'/Logs/crypto.txt');
    });
    promise18 = new Promise(function(resolve,reject){
        sleep.sleep(5);
        cryptosuiteButton.innerHTML = "Calculating ...";
        const modalView = path.join('file://',__dirname,'/Logs/crypto.txt');
        let win = new BrowserWindow({width: 400, height:200});
        win.on('close',function(){win=null;
        cryptosuiteButton.innerHTML="Test CryptoSuite";});
        win.loadURL(modalView);
        win.show();       
    });
    return Promise(promise17,promise18);
});

const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click',function(e){
    refreshButton.innerHTML = 'Refreshing ...';
    promise15 = new Promise(function(resolve,reject){
        nrc.run('docker rm -f $(docker ps -aq)');
    });
    promise16 = new Promise(function(resolve,reject){
        nrc.run('docker network prune');
    });
    refreshButton.innerHTML="Refresh";
    return Promise.all(promise15);
});