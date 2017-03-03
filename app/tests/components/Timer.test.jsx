var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
    it('should exist', () => {
        expect(Timer).toExist();
    });

    it('start timer when status is set started', (done) => {
        var timer = TestUtils.renderIntoDocument(<Timer/>);
        expect(timer.state.timerStatus).toBe('stopped');
        expect(timer.state.seconds).toBe(0);
        timer.handleStatusChange('started');
        setTimeout(() => {
            expect(timer.state.seconds).toBe(1);
            done();
        }, 1001);
    });

    it('should pause the timer on paused status', (done) => {
        var timer = TestUtils.renderIntoDocument(<Timer/>);
        timer.setState({seconds: 10});
        timer.handleStatusChange('started');
        timer.handleStatusChange('paused');
        setTimeout(() => {
            expect(timer.state.seconds).toBe(10);
            expect(timer.state.timerStatus).toBe('paused');
            done();
        }, 1001);
    });

    it('should reset the timer when stopped', (done) => {
        var timer = TestUtils.renderIntoDocument(<Timer/>);
        timer.setState({seconds: 10});
        timer.handleStatusChange('started');
        timer.handleStatusChange('stopped');
        setTimeout(() => {
            expect(timer.state.seconds).toBe(0);
            expect(timer.state.timerStatus).toBe('stopped');
            done();
        }, 1001);
    });
});