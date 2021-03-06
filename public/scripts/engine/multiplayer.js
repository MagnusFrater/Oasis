//
//      Callbacks
//

// loads world tilemap from server
function loadWorld (tilemap) {
    // set world's tilemap
    OasisWorld.tilemap = tilemap;

    // update that the world has been loaded
    loading.world = true;

    // world tilemap loaded, start game!
    startGame();
}

// initializes the container for other players
function initOtherPlayers () {
    // create container
    OasisPlayers = {};

    // ask for all the users
    socket.emit('send connected players');
}

// loads data on all currently connected players
function loadConnectedPlayers (players) {
    // load all connected players locally
    Object.keys(players).forEach(function (socketID) {
        OasisPlayers[socketID] = new OtherPlayer(players[socketID].username, players[socketID].stats);
    });

    // update that all other players have been loaded
    loading.otherPlayers = true;

    // all other players loaded, start the game!
    startGame();
}

// join the Oasis
function joinGame () {
    // prep username
    const username = OasisPlayer.username;

    // prep other user stats
    const stats = {};
    stats.location = OasisPlayer.location;
    stats.size = OasisPlayer.size;
    stats.speed = OasisPlayer.speed;
    stats.color = OasisPlayer.color;
    stats.facing = OasisPlayer.facing;
    stats.health = OasisPlayer.health;
    stats.killCount = OasisPlayer.killCount;

    // join
    socket.emit('join', username, stats);
}

// handles a new player joining
function playerJoined (socketID, username, stats) {
    OasisPlayers[socketID] = new OtherPlayer(username, stats);
}

// handles a player leaving
function playerLeft (socketID) {
    delete OasisPlayers[socketID];
}

// handles updating a player's location
function updatePlayerLocation (socketID, location) {
    OasisPlayers[socketID].location = location;
}

// handles updating a player's direction
function updatePlayerDirection (socketID, direction) {
    OasisPlayers[socketID].facing = direction;
}

// handles a player's punch event
function playerPunched (socketID, hand) {
    OasisPlayers[socketID].punch(hand);
}

// handles when a player has been hit
function playerHit (socketID, damage) {
    if (socketID === socket.id) {
        OasisPlayer.hurt();
        OasisPlayer.health -= damage;
    } else {
        // show that the player has been hurt
        OasisPlayers[socketId].hurt();
    }
}

// handles a player being killed
function playerKilled (socketID) {
    // you died
    if (socketID === socket.id) {
        respawn();
    }
}

// handles respawning a player
function respawn () {
    // tell everyone you're back at the origin
    socket.emit('location update', new Location(0, 0));

    // actually move player to origin
    OasisPlayer.location = new Location(0, 0);

    // reset client side health
    OasisPlayer.health = 100;
}

// handles updating a player's killCount
function updateKillCount (socketID, killCount) {
    if (socketID === socket.id) {
        OasisPlayer.killCount = killCount;
    } else {
        OasisPlayers[socketID].killCount = killCount;
    }
}