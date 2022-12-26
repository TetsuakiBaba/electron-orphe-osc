var osc = new OSC();

window.addEventListener('DOMContentLoaded', () => {
    // bles: defined in coreToolkit.js
    let ble = bles[0]; // bles[0], bles[1] are predefined by CoreToolkit.js
    ble.setup();
    ble.onConnect = function (uuid) {
        console.log('onConnect:', uuid);
        document.querySelector(`#status${ble.id}`).innerText = 'ONLINE';
        document.querySelector(`#status${ble.id}`).classList = 'bg-primary text-white'
    }
    ble.onDisconnect = function () {
        document.querySelector(`#status${ble.id}`).innerText = 'OFFLINE';
        document.querySelector(`#status${ble.id}`).classList = 'bg-secondary text-white'
    }
    ble.gotAcc = function (acc) {
        document.querySelector(`#acc${ble.id}`).innerText = `${acc.x.toFixed(2)}`;
        let message = new OSC.Message('/orphe/acc', acc.x, acc.y, acc.z);
        osc.send(message);
    }
    ble.gotQuat = function (quat) {
        document.querySelector(`#quat${ble.id}`).innerText = `${quat.w.toFixed(2)}`;
    }
    ble.gotStride = function (stride) {
        document.querySelector(`#stride${ble.id}`).innerText = `${stride.x.toFixed(2)}`;
    }

    buildCoreToolkit(document.querySelector('#toolkit_placeholder'),
        `CORE 0${ble.id + 1}`,
        ble.id);

    document.getElementById('send').addEventListener('click', () => {
        let message = new OSC.Message('/orphe/test', "Hello ORPHE CORE!!");
        osc.send(message);
    });

    osc.open(); // connect by default to ws://localhost:8080
})


