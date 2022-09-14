let myCar = {
    name: 'Fiat',
    model: '500',
    color: 'white',
    speed: 0,
    direction: 0,

    drive: function(newSpeed) {
        this.speed = newSpeed
    },

    isMoving: function() {
        return this.speed > 0;
    }
  };

//Example 1
//console.log(myCar.isMoving());

//Example 2
//myCar.drive(50);
//window.alert(myCar.isMoving() + ' - the speed is: ' + myCar.speed);