let dependencyUrls = []
const maxLoadTimesTrys = 4;

//Main Libraries
dependencyUrls.push("https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
//Firebase/Google Libraries
dependencyUrls.push("js/Firebase/firebase-init.js?v=2", "js/Firebase/firebase-login.js?v=2", "js/Firebase/firebase-config.js?v=2", "js/Firebase/firebase-firestore.js?v=2")
//Game Libraries
dependencyUrls.push("js/unityUrls.js?v=2", "js/unityGame.js?v=2", "js/fullscreen.js")
//etc. Libraries
dependencyUrls.push("js/macUserAgent.js", "js/visibilityChangeListener.js")

dynamicallyLoadScripts();

async function dynamicallyLoadScripts() {
    for (let i = 0; i < dependencyUrls.length; i++) {
        let url = dependencyUrls[i];
        let script = document.createElement("script");
        script.src = url;

        document.head.appendChild(script);
    }

    let trys = 0;
    while (window.loadedUrls === undefined || window.firebaseLoaded === undefined || window.gameScriptLoaded === undefined || window.configInit === undefined) {
        await sleep(500)
        trys++;
        if(trys >= maxLoadTimesTrys) {
            break;
        }
    }

    loadGame();
    initFirebaseLibraries();
    fixMacUserAgent();
}

function loadGame() {
    let gameLoader = document.createElement("script")
    gameLoader.src = getGameLoaderUrl();
    gameLoader.id = "unity-loader"
    gameLoader.onload = function () {
        showGame();
    };

    let gameLoadDiv = document.getElementById("unity-loader-div");
    gameLoadDiv.innerHTML = "";
    gameLoadDiv.appendChild(gameLoader);
}

function initFirebaseLibraries() {
    initializeFireBase();
    initRemoteConfig();
}

function onUnityReady() {
    sendConfig();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
