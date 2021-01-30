const IPFS = require("ipfs");

async function createNode() {
    let node = await IPFS.create(
        {
            repo: (() => `repo-${Math.random()}`)(),
                "Addresses": {
                    "Swarm": [
                        "/ip4/0.0.0.0/tcp/4001"
                    ],
                    "API": "/ip4/127.0.0.1/tcp/5001",
                    "Gateway": "/ip4/127.0.0.1/tcp/8080"
                }
        }
        );

    try {
        await node.start();
        console.log('Node started!');

        const file = {
            path: "myfile.txt",
            content: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>IPFS</title>
                    </head>
                    <body>
                        <h1>Welcome to my IPFS app</h1>
                    </body>
                </html>
                `
        };

        for await (const result of await node.add(file)) {
            console.log("file added: ", file.path, result.cid.toString());
        };

    } catch (error) {
        console.error('Node failed to start!', error);
    };
};
createNode()
