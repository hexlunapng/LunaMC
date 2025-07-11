const path = require('path');
const { Client } = require('minecraft-launcher-core');

async function downloadMinecraftVersion(version = '1.16') {
  const launcher = new Client();

  const options = {
    root: path.join(__dirname, '.minecraft'),
    version: {
      number: version,
      type: 'release',
    },
    memory: {
      max: "2G",
      min: "1G"
    },
    authorization: {
      access_token: "dummy_token",
      client_token: "dummy_client",
      uuid: "00000000-0000-0000-0000-000000000000",
      name: "Luna",
    }
  };
console.log("Minecraft Downloader From Luna ;3")
  launcher.on('progress', (e) => {
    console.log(`Downloading: ${e.type} - ${Math.floor(e.progress)}%`);
  });

  launcher.on('debug', (e) => {
    console.log(`[DEBUG]: ${e}`);
  });

  launcher.on('error', (e) => {
    console.error('[ERROR]:', e);
  });

  try {
    await launcher.launch(options);
    console.log(`Minecraft ${version} is downloaded and ready to play!`);
  } catch (err) {
    console.error(`Failed to launch: ${err.message}`);
  }
}

downloadMinecraftVersion();
