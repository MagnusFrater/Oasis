// Entity model
// (Location) location , (Size) size
class Entity {
    constructor (location, size) {
        this.location = location;
        this.size = size;
    }

    // returns (Location) location of where the player is on the screen (game canvas)
    getScreenLocation () {
        // use regular location
        let x = this.location.x;
        let y = this.location.y;

        // if player has a render location, use that one
        if (this.renderLocation) {
            x = this.renderLocation.x;
            y = this.renderLocation.y;
        }

        // return position according to the screen
        return new Location(
            x - (this.size.width / 2) - OasisCamera.location.x,
            y - (this.size.height / 2) - OasisCamera.location.y
        );
    }

    isAboveScreen () {
        // get current screen location and player height
        const screenLocation = this.getScreenLocation();
        const bottom = screenLocation.y + this.size.height;

        // is above the screen
        if (bottom < 0) {
            return true;
        }

        return false;
    }

    isBelowScreen () {
        // get current screen location
        const screenLocation = this.getScreenLocation();
        const top = screenLocation.y;

        // is below the screen
        if (top > OasisCanvas.height) {
            return true;
        }

        return false;
    }

    isLeftOfScreen () {
        // get current screen location and player width
        const screenLocation = this.getScreenLocation();
        const right = screenLocation.x + this.size.width;

        // is left of the screen
        if (right < 0) {
            return true;
        }

        return false;
    }

    isRightOfScreen () {
        // get current screen location
        const screenLocation = this.getScreenLocation();
        const left = screenLocation.x;

        // is above the screen
        if (left > OasisCanvas.width) {
            return true;
        }

        return false;
    }

    // returns true if the player is visibly on the screen (game canvas), false otherwise
    isOnScreen () {
        // is not on screen
        if (this.isAboveScreen() || this.isBelowScreen() || this.isLeftOfScreen() || this.isRightOfScreen()) {
            return false;
        }

        return true;
    }
}