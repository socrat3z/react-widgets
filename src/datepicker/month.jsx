var React = require('react')
  , Week  = require('./week.jsx')
  , cx = require('react/lib/cx')
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    date:         React.PropTypes.instanceOf(Date),
    selected:     React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),

    format:       React.PropTypes.string,
  },

  render: function(){
    return (
      <table>
        <thead>
          <tr>{ this._headers() }</tr>
        </thead>
        <tbody tabIndex='-1' onKeyUp={this._keyUp}>
          { this._body() }
        </tbody>
      </table>
    )
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },

  _body: function(){
    var month = dates.visibleDays(this.props.date)
      , rows  = chunk(month, 7 );

    return _.map(rows, week => (
      <Week 
        days={week} 
        selected={this.props.selected}
        month={dates.month(this.props.date)}
        year ={dates.year(this.props.date)}
        min={this.props.min}
        max={this.props.max}
        onClick={this._onClick}/>))
  },


  _headers: function(format){
    var days = dates.daysOfWeek(this.props.date, format);

    return _.map(days, function(day){
      return (<th>{day}</th>)
    })
  }

});
