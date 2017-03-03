var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function() {
        return {
            seconds: 0,
            timerStatus: 'stopped'
        };
    },
    handleStatusChange: function(newStatus) {
        this.setState({
            timerStatus: newStatus
        });
    },
    componentDidUpdate: function(prevProps, prevState) {
        if(prevState.timerStatus !== this.state.timerStatus) {
            switch(this.state.timerStatus) {
                case 'started':
                    this.startTimer();
                    break;

                case 'stopped':
                    this.setState({seconds: 0});

                case 'paused':
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
            }
        }
    },
    componentWillUnmount: function() {
        clearInterval(this.timer);
    },
    startTimer: function() {
        this.timer = setInterval(() => {
            var newTime = this.state.seconds + 1;
            this.setState({
                seconds: newTime
            });
        }, 1000);
    },
    render: function() {
        var {seconds, timerStatus} = this.state;
        return (
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={seconds}/>
                <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
            </div>
        );
    }
});

module.exports = Timer;