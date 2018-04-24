// Player model
// (String) username , ({}) stats
class Player extends Entity {
    constructor (username, stats) {
        super(stats.location, stats.size);

        // initialize player stats
        this.username = username;
        this.speed = stats.speed;
        this.color = stats.color;
        this.facing = stats.facing;

        // initialize player body parts
        this.hands = [
            new Hand(this, 'left'),
            new Hand(this, 'right')
        ];

        // true if recently taken damage, false otherwise
        this.hurting = false;
    }

    // update the player's data
    tick () {
        this.move();
        this.updateHands();
    }

    // render the player to the screen
    render () {
        this.renderBody();
        this.renderHands();
        this.renderUsername();
    }

    // handles moving the player
    move () {
        // to be overridden
    }

    // updates the player's hand data
    updateHands () {
        for (let i=0; i<this.hands.length; i++) {
            const boundHandTick = this.hands[i].tick.bind(this.hands[i]);
            boundHandTick(this);
        }
    }

    // thrusts the specified hand outward for punching
    // ('left' || 'right') hand
    punch (hand) {
        this.hands[(hand === 'left')? 0 : 1].punch();
    }

    // flashes the player red to show that they're hurt
    hurt () {
        this.hurting = true;
    }

    // renders the player's body
    renderBody () {
        // use regular location
        let x = this.location.x;
        let y = this.location.y;

        // if player has a render location, use that one
        if (this.renderLocation) {
            x = this.renderLocation.x;
            y = this.renderLocation.y;
        }

        // render body
        OasisCanvasContext.fillStyle = (this.hurting)? 'red' : this.color;
        OasisCanvasContext.fillRect(
            x - OasisCamera.location.x,
            y - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );

        // reset hurt status
        if (this.hurting) this.hurting = false;

        // render outline
        OasisCanvasContext.fillStyle = "black";
        OasisCanvasContext.strokeRect(
            x - OasisCamera.location.x,
            y - OasisCamera.location.y,
            this.size.width,
            this.size.height
        );
    }

    // renders the player's hands
    renderHands () {
        for (let i=0; i<this.hands.length; i++) {
            const boundHandRender = this.hands[i].render.bind(this.hands[i]);
            boundHandRender(this.color);
        }
    }

    // renders the player's username
    renderUsername () {
        // use regular location
        let x = this.location.x;
        let y = this.location.y;

        // if player has a render location, use that one
        if (this.renderLocation) {
            x = this.renderLocation.x;
            y = this.renderLocation.y;
        }

        // render username
        OasisCanvasContext.fillStyle = "black";
        OasisCanvasContext.font = "15px Arial";
        OasisCanvasContext.fillText(
            this.username,
            x - OasisCamera.location.x,
            y - OasisCamera.location.y - this.size.height + 5
        );
    }
}

// vaiety of human-like colors for player's color
// https://htmlcolorcodes.com/color-names/
Player.colors = [
    'pink', 'orange', 'gold', 'yellow', 'darkkhaki',
    'lavender', 'violet', 'fuschia', 'rebeccapurple', 'indigo', 'slateblue',
    'greenyellow', 'lime', 'springgreen', 'seagreen', 'darkgreen', 'olive', 'darkcyan', 'teal',
    'aqua', 'aquamarine', 'turquoise', 'cadetblue', 'steelblue', 'deepskyblue', 'dodgerblue', 'blue', 'navy',
    'burlywood', 'sandybrown', 'chocolate', 'saddlebrown', 'brown',
    'white', 'silver', 'darkgray', 'gray', 'lighslategray', 'darkslategray', 'black'
]